import { Stage, Profile, Spell, Item, Stat, Schemata, Link} from './classes';
import { Birthday, Colors, Elements, Icons } from './constants';

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

////////////////////
///PROFILE STAGES///
////////////////////
const age = _calculateAge(Birthday);
const diego = new Profile('diego', 'Diego', 'Dev', '/images/profile.png', age, age*10, age*10, age*10-120, age*10-120);
const biggs = new Profile('biggs', 'Biggs', 'Mgtk Elite', '/images/soldier.png', null, 706, null, 154, null);
const wedge = new Profile('wedge', 'Wedge', 'Mgtk Elite', '/images/soldier.png', null, 704, null, 154, null);
status.addChilds(diego, biggs, wedge);

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
const google = new Spell('google', 'Google', true, 'Reveals the target\'s LV, HP, MP, and weaknesses', Elements.HOLY);
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
const rhand = new Item('rhand', 'Good Practices', false, 'some rhand help text');
const lhand = new Item('lhand', 'Resourcefulness', false, 'some lhand help text');
const head = new Item('head', 'Eager to Lear', false, 'some head help text');
const body = new Item('body', 'Passion', false, 'some body help text');
equip.addChilds(rhand, lhand, head, body);

const js = new Stat('js', 'JavaScript', false, null, 87, Colors.YELLOW);
const es6 = new Stat('es6', 'ES6', false, null, 72, Colors.ORANGE);
const jquery = new Stat('jquery', 'jQuery', false, null, 87, Colors.SKYBLUE);
const angular = new Stat('angular', 'AngularJS', false, null, 76, Colors.RED);
const react = new Stat('react', 'React', false, null, 62, Colors.LIGHTBLUE);
const node = new Stat('node', 'NodeJS', false, null, 70, Colors.LIGHTGREEN);
const css = new Stat('css', 'CSS', false, null, 62, Colors.BLUE);
const csharp = new Stat('csharp', 'C#', false, null, 79, Colors.PURPLE);
const tridion = new Stat('tridion', 'SDL Tridion', false, null, 60, Colors.GREEN);
const sql = new Stat('sql', 'SQL', false, null, 56, Colors.LIGHTORANGE);
equip.addChilds(js, es6, jquery, angular, react, node, css, csharp, tridion, sql);


/////////////////////
///SCHEMATA STAGES///
/////////////////////
const thisWeb = new Schemata('thisWeb', 'This Website', 'Project Magi', 'A different vision of my current CV to practice some react and flexbox.', 2016, 'magi');
const thisWebLink = new Link('thisGithubLink', 'See on Github', 'https://github.com/RodriBus/ProjectMagi', Icons.GITHUB);
thisWeb.addChilds(thisWebLink);

const canapi = new Schemata('canapi', 'CanaPi', 'CanaPi', 'Know what devices are in your home network on real time... even when you are out!', 2016);
const canapiLink = new Link('canapiGithubLink', 'See on Github', 'https://github.com/RodriBus/CanaPi', Icons.GITHUB);
canapi.addChilds(canapiLink);

const pintamonas = new Schemata('pintamonas', 'Pintamonas', 'Pintamonas', 'A pinturillo revision using AngularJS, Socket.IO and NodeJS.', 2016, 'nobanner');
const pintaLink = new Link('pintamonasGithubLink', 'See on Github', 'https://github.com/Side-Project-Ninjas/pintamonas', Icons.GITHUB);
pintamonas.addChilds(pintaLink);

const itgf = new Schemata('itgf', 'Is This Game Fun?', 'Is This Game Fun?', 'Rate your videogames or see if your desired game is worth it.', 2015);
const itgfSLink = new Link('itgfSiteLink', 'Visit site', 'http://github.com', Icons.LINK);
const itgfDLink = new Link('itgfDocsLink', 'View docs', 'https://rodribus.github.io/IsThisGameFun/', Icons.LINK);
const itgfSlLink = new Link('itgfSlidesLink', 'View Slides', 'https://rodribus.github.io/IsThisGameFun/presentacion/', Icons.LINK);
const itgfGLink = new Link('itgfGithubLink', 'See on Github', 'https://github.com/RodriBus/IsThisGameFun', Icons.GITHUB);
itgf.addChilds(itgfSLink, itgfDLink, itgfSlLink, itgfGLink);

const ecuestria = new Schemata('ecuestria', 'Ecuestria', 'Ecuestria', 'A scholar work to learn abour design, usability and AAA accesbility', 2014);
const ecuestriaSLink = new Link('ecuestriaSiteLink', 'Visit site', 'https://rodribus.github.io/portfolio/hipica', Icons.LINK);
const ecuestriaLink = new Link('ecuestriaGithubLink', 'See on Github', 'https://github.com/RodriBus/Hipica', Icons.GITHUB);
ecuestria.addChilds(ecuestriaSLink, ecuestriaLink);

const christmas = new Schemata('christmas', 'Christmas Greeting', 'Christmas Greeting', 'Christmas CSS animation for a scholar contest', 2014);
const christmasSLink = new Link('christmasSiteLink', 'Visit site', 'https://rodribus.github.io/portfolio/navidad', Icons.LINK);
const christmasLink = new Link('christmasGithubLink', 'See on Github', 'https://github.com/RodriBus/rodribus.github.io/tree/master/portfolio/navidad', Icons.GITHUB);
christmas.addChilds(christmasSLink, christmasLink);

schemata.addChilds(thisWeb, canapi, pintamonas, itgf, ecuestria, christmas);


/////////////////
///SAVE STAGES///
/////////////////
const email = new Link('email', 'diego@rodribus.com', 'mailto:diego@rodribus.com', Icons.NOICON);
const linkedin = new Link('linkedin', '/in/rodribus', 'https://www.linkedin.com/in/rodribus', Icons.NOICON);
const github = new Link('github', 'github.com/RodriBus', 'https://github.com/RodriBus', Icons.NOICON);

save.addChilds(email, linkedin, github);

stages.push(main);

function _calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default {
  getStages: function getStages() {
    return stages;
  }
}
