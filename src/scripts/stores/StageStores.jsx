import { EventEmitter } from 'events';

class StageStore {
  constructor() {
    super();
    this.stages=[];
    const main = new Stage('main', 'Main', true, true);

    const spells = new Stage('spells', 'Spells', true, true);
    const equip = new Stage('equip', 'Equip', true, true);
    const achievements = new Stage('achievements', 'Achievements', true, true);
    const save = new Stage('save', 'Save', true, true);
    main.addChilds(spells, equip, achievements, save);

    const git = new Stage('git', 'Git', true, true);
    git.help = 'Fire-elemental version controll spell';
    const gulp = new Stage('gulp', 'Gulp', true, true);
    gulp.help = 'Automated sip of ice n\' task';
    const webpack = new Stage('webpack', 'Webpack', true, true);
    webpack.help = 'Reduces the target\'s complexity by 1/2';
    const sass = new Stage('sass', 'SASS', true, true);
    sass.help = 'I hope you like it hot';
    const bootstrap = new Stage('bootstrap', 'Bootstrap', true, true);
    bootstrap.help = 'Icing on the cake';
    const php = new Stage('php', 'PHP', true, true);
    php.help = 'Power from the scripted ground';
    const java = new Stage('java', 'Java', true, true);
    java.help = 'Write once, execute everybody';
    const google = new Stage('google', 'Google', true, true);
    google.help = 'Reveals the target\'s level, HP, MP, and elemental weaknesses';
    const photoshop = new Stage('photoshop', 'Photoshop', true, true);
    photoshop.help = 'Inflicts Confusion on all enemies';
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

    this.stages.push(main, spells, equip, achievements, save)
  }

  getStage(id) {
    return Stage.getStage(id);
  }

}

class Stage {
  static stages = [];
  static getStage(id) {
    return Stage.stages.find((stg) => stg.id === id);
  }
  constructor(id, name, available = true, pointable = false, help = null) {
    this.id = id;
    this.displayName = name;
    this.available = available;
    this.pointable = pointable;
    this.help = help;
    this.childs = [];
    this.parent = null;
    Stage.stages.push(this);
  }

  hasChilds(){
    return this.childs.length > 0;
  }

  addChild(child) {
    child.parent = this;
    this.childs.push(child);
  }
  addChilds(...childs) {
    childs.map((chld) => chld.parent=this);
    this.childs.push(...childs);
  }
}

class StagePathStore extends EventEmitter {
  constructor() {
    super();
    this.path = ['main'];
    this.currentPos = 0;
  }

  lastPath() {
    if (this.path.length > 1) {
      return this.path[this.path.length-1];
    }
    return this.path[0];
  }

  down() {
    const currStage = Stage.getStage(this.lastPath());
    const max = currStage.childs.length;
    const futurePos = this.currentPos+1;
    if (futurePos < max) {
      this.currentPos++;
      this.emit('cursor:down', currStage.childs[this.currentPos].id, this.currentPos);
      // console.log('cursor:down', currStage.childs[this.currentPos].id, this.currentPos);
    }
  }

  up() {
    const currStage = Stage.getStage(this.lastPath());
    const min = currStage.childs.length;
    const futurePos = this.currentPos-1;
    if (futurePos >= 0) {
      this.currentPos--;
      this.emit('cursor:up', currStage.childs[this.currentPos].id, this.currentPos);
      // console.log('cursor:up', currStage.childs[this.currentPos].id, this.currentPos);
    }
  }

  navigateNext() {
    const currStage = Stage.getStage(this.lastPath());
    const next = currStage.childs[this.currentPos];
    if (next.hasChilds()) {
      this.path.push(next.id);
      this.emit('navigate:next', next.id);
    }
    // console.log('navigate:next');
  }

  navigatePrev() {
    if (this.path.length > 1) {
      this.path.pop();
      this.emit('navigate:previous', this.path[this.path.length-1]);
      // console.log('navigate:previous');
    }
  }
}

export const stageStore = new StageStore();
export const stagePathStore = new StagePathStore();
