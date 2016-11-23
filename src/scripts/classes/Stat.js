import Stage from './Stage';
import { Colors } from '../constants';

export default class Stat extends Stage {
    constructor (id, name, pointable = false, help = null, quantity = null, color = Colors.NOCOLOR) {
        super(id, name, true, pointable, help);
        this.quantity = quantity;
        this.color = color;
    }
}
