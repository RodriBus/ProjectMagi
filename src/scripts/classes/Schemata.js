import Stage from './Stage';

export default class Schemata extends Stage {
    constructor (id, name, title, description, year = (new Date().getFullYear()), banner = '') {
        super(id, name, true, true, null);
        this.year = year;
        this.title = title;
        this.description = description;
        this.banner = banner || id;
    }
}
