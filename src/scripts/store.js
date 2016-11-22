import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

import {Colors, Elements, Icons} from './constants';

export class Stage {
    static stages = [];
    static getStage (id) {
        return Stage.stages.find((stg) => stg.id === id);
    }
    constructor (id, name, available = true, pointable = false, help = null) {
        this.id = id;
        this.displayName = name;
        this.available = available;
        this.pointable = pointable;
        this.help = help;
        this.childs = [];
        this.parent = null;
        Stage.stages.push(this);
    }

    hasChilds () {
        return this.childs.length > 0;
    }

    // addChild (child) {
    //     child.parent = this;
    //     this.childs.push(child);
    // }
    addChilds (...childs) {
        childs.map((chld) => {chld.parent = this;});
        this.childs.push(...childs);
    }
    getChildById (id) {
        return this.childs.find((child) => child.id === id);
    }
    getChildByIndex (index) {
        return this.childs[index];
    }

    getFirstChildAvailableIndex () {
        return this.childs.findIndex((stg) => stg.pointable && stg.available)
    }
}

class Item extends Stage {
    constructor (id, name, pointable = false, help = null, color = 'white', icon = Icons.NOICON) {
        super(id, name, true, pointable, help);
        this.color = color;
        this.icon = icon;
    }
}

class Stat extends Stage {
    constructor (id, name, pointable = false, help = null, quantity = null, color = Colors.NOCOLOR) {
        super(id, name, true, pointable, help);
        this.quantity = quantity;
        this.color = color;
    }
}

class Spell extends Stage {
    constructor (id, name, pointable = false, help = null, element = Elements.NOELEMENT) {
        super(id, name, true, pointable, help);
        this.element = element;
    }
}



class Link extends Stage {
    constructor (id, name, link = '#', icon = Icons.LINK) {
        super(id, name, true, true, null);
        this.link = link;
        this.icon = icon;
    }
}

class Schemata extends Stage {
    constructor (id, name, year = (new Date().getFullYear())) {
        super(id, name, true, true, null);
        this.year = year;
    }
}

/*
PROPIEDADES Y METODOS DEL STORE
GETCURRENTCURSOR
GETCURRENTSTAGE

UP - mueve el cursor
DOWN

NEXT - mueve el stage
PREV

REPASAR DONDE ENTRAN EN JUEGO LOS DISPATCHER Y LOS ACTIONS
CREO QUE LOS METODOS UP, DOWN, NEXT Y PREV SON ACTIONS QUE TRANSMITEN EVENTOS AL STORE,
EL STORE HACE COSAS INTERNAS Y SE ACCEDE AL RESULTADO POR METODOS DEL STORE

EMITIR EVENTO CHANGE CUANDO CAMBIE EL CURRENT CURSOR O STAGE
 */

class NavigatorStore extends EventEmitter {
  /*
  MANTENER PUNTERO INTERNO
  ACCEDER AL STAGE ACTUAL Y CURSOR ACTUAL
   */
    constructor () {
        super();
        const stages = StageFactory.createStages();
        const firstStage = stages[0];
        this.path = [firstStage.id];
        const firstChildAvailable = firstStage.getFirstChildAvailableIndex();
        this.currentIndex = firstChildAvailable;
        this.lastSelectedIndex = 0;
    }

    get currentCursor () {
        const stage = this.getLastStage();
        return stage.getChildByIndex(this.currentIndex);
    }

    lastPath () {
        if (this.path.length > 1) {
            return this.path[this.path.length - 1];
        }
        return this.path[0];
    }

    getLastStage () {
        return Stage.getStage(this.lastPath());
    }

    down () {
        const currStage = this.getLastStage();
        const max = currStage.childs.length;
        let futureIndex = this.currentIndex + 1;
        while (futureIndex < max) {
            const futureStage = currStage.getChildByIndex(futureIndex);
            if (futureStage.pointable) {
                this.currentIndex = futureIndex;
                this.emit('cursor');
                break;
            }
            futureIndex++;
        }
    }

    up () {
        const currStage = this.getLastStage();
        let futureIndex = this.currentIndex - 1;
        while (futureIndex >= 0) {
            const futureStage = currStage.getChildByIndex(futureIndex);
            if (futureStage.pointable) {
                this.currentIndex = futureIndex;
                this.emit('cursor');
                break;
            }
            futureIndex--;
        }
    }

    // down () {
    //     const currStage = this.getLastStage();
    //     const max = currStage.childs.length;
    //     const futurePos = this.currentIndex + 1;
    //     if (futurePos < max) {
    //         this.currentIndex++;
    //         this.emit('cursor', currStage.childs[this.currentIndex].id, this.currentIndex);
    //         // console.log('cursor:down', currStage.childs[this.currentIndex].id, this.currentIndex);
    //     }
    // }

    /*
    PARA MOVER:
    MOVER 1 POSICION
    COMPROBAR SI ES POINTABLE
    SI NO, MOVER 1 POSICION
    COMPROBAR SI ES POINTABLE
    ...
    SI ENCUENTRA POINTABLE MUEVE CURSOR
    SI NO HAY POINTABLE O SE ACABA LA LISTA NO MOVER
     */

    // up () {
    //     const currStage = Stage.getStage(this.lastPath());
    //     const futurePos = this.currentIndex - 1;
    //     if (futurePos >= 0) {
    //         this.currentIndex--;
    //         this.emit('cursor', currStage.childs[this.currentIndex].id, this.currentIndex);
    //         // console.log('cursor:up', currStage.childs[this.currentIndex].id, this.currentIndex);
    //     }
    // }

    next () {
        const currStage = Stage.getStage(this.lastPath());
        const next = currStage.childs[this.currentIndex];
        if (next.hasChilds()) {
            this.path.push(next.id);
            this.lastSelectedIndex = this.currentIndex;
            this.currentIndex = next.getFirstChildAvailableIndex();
            this.emit('navigate');
        }
        // console.log('navigate:next');
    }

    prev () {
        if (this.path.length > 1) {
            this.path.pop();
            this.currentIndex = this.lastSelectedIndex;
            this.emit('navigate');
            // console.log('navigate:previous');
        }
    }

    handleActions (action) {
        console.log(action);
        switch (action.type) {
            case 'CURSOR_UP': {
                this.up();
                break;
            }
            case 'CURSOR_DOWN': {
                this.down();
                break;
            }
            case 'STAGE_NEXT': {
                this.next();
                break;
            }
            case 'STAGE_PREV': {
                this.prev();
                break;
            }
        }
    }
}

export class StageFactory {
    static createStages () {
        const stages = [];
        const main = new Stage('main', 'Main', true, true);

        /////////////////
        ///MAIN STAGES///
        /////////////////
        const items = new Stage('items', 'Items', false, false);
        const abilities = new Stage('abilities', 'Abilities', false, false);
        const equip = new Stage('equip', 'Equip', true, true);
        const spells = new Stage('spells', 'Spells', true, true);
        const status = new Stage('status', 'Status', false, false);
        const formation = new Stage('formation', 'Formation', false, false);
        const config = new Stage('config', 'Config', false, false);
        const datalog = new Stage('datalog', 'Datalog', false, false);
        const schemata = new Stage('schemata', 'Schemata', true, true);
        const map = new Stage('map', 'Map', false, false);
        const help = new Stage('help', 'Help', false, false);
        const save = new Stage('save', 'Save', true, true);
        main.addChilds(items, abilities, equip, spells, status, formation, config, datalog, schemata, map, help, save);

        ///////////////////
        ///SPELLS STAGES///
        ///////////////////
        const git = new Spell('git', 'Git', true, 'Fire-elemental version controll spell', Elements.FIRE);
        const gulp = new Spell('gulp', 'Gulp', true, 'Automated sip of ice n\' task', Elements.ICE);
        const webpack = new Spell('webpack', 'Webpack', true, 'Reduces the target\'s complexity by 1/2', Elements.LIGHTNING);
        const sass = new Spell('sass', 'SASS', true, 'I hope you like it hot', Elements.FIRE);
        const bootstrap = new Spell('bootstrap', 'Bootstrap', true, 'Icing on the cake', Elements.ICE);
        const php = new Spell('php', 'PHP', true, 'Power from the scripted ground', Elements.EARTH);
        const java = new Spell('java', 'Java', true, 'Write once, execute everybody', Elements.GRAVITY);
        const google = new Spell('google', 'Google', true, 'Reveals the target\'s level, HP, MP, and elemental weaknesses', Elements.HOLY);
        const photoshop = new Spell('photoshop', 'Photoshop', true, 'Inflicts Confusion on all enemies', Elements.CURSE);
        spells.addChilds(git, gulp, webpack, sass, bootstrap, php, java, google, photoshop);

        const webdev = new Stage('webdev', 'Web Development Degree', true, true);
        webdev.help = 'The best type of dev';
        const pro = new Stage('pro', 'Professional', true, true);
        pro.help = 'You put the target, I put the silver bullets';
        const passion = new Stage('passion', 'Passionate', true, true);
        passion.help = 'Man I love doing this stuff';
        const problemRes = new Stage('problemRes', 'Problem Resolver', true, true);
        problemRes.help = 'Workaround is not my way';
        const organized = new Stage('organized', 'Organized', true, true);
        organized.help = 'File this info wherever it belongs, would you?';
        const oldGames = new Stage('oldGames', 'Old Videogames Lover', true, true);
        oldGames.help = 'C\'mon! Look at this place!';
        spells.addChilds(webdev, pro, passion, problemRes, organized, oldGames);


        //////////////////
        ///EQUIP STAGES///
        //////////////////
        const rhand = new Item('rhand', 'Good Practices', true, 'some rhand help text');
        const lhand = new Item('lhand', 'Resourcefulness', true, 'some lhand help text');
        const head = new Item('head', 'Eager to Lear', true, 'some head help text');
        const body = new Item('body', 'Passion', true, 'some body help text');
        equip.addChilds(rhand, lhand, head, body);

        const js = new Stat('js', 'JavaScript', true, null, 87, Colors.YELLOW);
        const es6 = new Stat('es6', 'ES6', true, null, 72, Colors.ORANGE);
        const jquery = new Stat('jquery', 'jQuery', true, null, 87, Colors.SKYBLUE);
        const angular = new Stat('angular', 'AngularJS', true, null, 76, Colors.BROWN);
        const react = new Stat('react', 'React', true, null, 62, Colors.LIGHTBLUE);
        const node = new Stat('node', 'NodeJS', true, null, 70, Colors.LIGHTGREEN);
        const css = new Stat('css', 'CSS', true, null, 62, Colors.BLUE);
        const csharp = new Stat('csharp', 'C#', true, null, 79, Colors.PURPLE);
        const tridion = new Stat('tridion', 'SDL Tridion', true, null, 60, Colors.GREEN);
        const sql = new Stat('sql', 'SQL', true, null, 56, Colors.RED);
        equip.addChilds(js, es6, jquery, angular, react, node, css, csharp, tridion, sql);


        /////////////////////
        ///SCHEMATA STAGES///
        /////////////////////
        const thisWeb = new Schemata('thisWeb', 'This Website', 2016);
        const thisWebLink = new Link('thisGithubLink', 'See on Github', 'http://github.com', Icons.GITHUB);
        thisWeb.addChilds(thisWebLink);

        const canapi = new Schemata('canapi', 'CanaPi', 2016);
        const canapiLink = new Link('canapiGithubLink', 'See on Github', 'http://github.com', Icons.GITHUB);
        canapi.addChilds(canapiLink);

        const pintamonas = new Schemata('pintamonas', 'Pintamonas', 2016);
        const pintaLink = new Link('pintamonasGithubLink', 'See on Github', 'http://github.com', Icons.GITHUB);
        pintamonas.addChilds(pintaLink);

        const itgf = new Schemata('itgf', 'Is This Game Fun?', 2015);
        const itgfSLink = new Link('itgfSiteLink', 'Visit site', 'http://github.com', Icons.LINK);
        const itgfDLink = new Link('itgfDocsLink', 'View docs', 'http://github.com', Icons.LINK);
        const itgfSlLink = new Link('itgfSlidesLink', 'View Slides', 'http://github.com', Icons.LINK);
        const itgfGLink = new Link('itgfGithubLink', 'See on Github', 'http://github.com', Icons.GITHUB);
        itgf.addChilds(itgfSLink, itgfDLink, itgfSlLink, itgfGLink);

        const ecuestria = new Schemata('ecuestria', 'Ecuestria', 2014);
        const ecuestriaLink = new Link('ecuestriaGithubLink', 'See on Github', 'http://github.com', Icons.GITHUB);
        ecuestria.addChilds(ecuestriaLink);

        const christmas = new Schemata('christmas', 'Christmas Greeting', 2014);
        const christmasLink = new Link('christmasGithubLink', 'See on Github', 'http://github.com', Icons.GITHUB);
        christmas.addChilds(christmasLink);

        schemata.addChilds(thisWeb, canapi, pintamonas, itgf, ecuestria, christmas);


        /////////////////
        ///SAVE STAGES///
        /////////////////
        const email = new Link('email', 'diego@rodribus.com', 'mailto:diego@rodribus.com', Icons.NOICON);
        const linkedin = new Link('linkedin', '/in/rodribus', 'https://www.linkedin.com/in/rodribus', Icons.NOICON);
        const github = new Link('github', 'github.com/RodriBus', 'https://github.com/RodriBus', Icons.NOICON);

        save.addChilds(email, linkedin, github);

        stages.push(main);

        return stages;
    }

}

export const navigatorStore = new NavigatorStore();
dispatcher.register(navigatorStore.handleActions.bind(navigatorStore));
