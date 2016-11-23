import Stage from './Stage';
import { Elements } from '../constants';

export default class Spell extends Stage {
    constructor (id, name, pointable = false, help = null, element = Elements.NOELEMENT) {
        super(id, name, true, pointable, help);
        this.element = element;
    }
}
