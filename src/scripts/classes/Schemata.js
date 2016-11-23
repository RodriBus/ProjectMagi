import Stage from './Stage';

export default class Schemata extends Stage {
    constructor (id, name, year = (new Date().getFullYear())) {
        super(id, name, true, true, null);
        this.year = year;
    }
}
