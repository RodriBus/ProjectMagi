import Stage from './Stage';
import { Icons } from '../constants';

export default class Item extends Stage {
    constructor (id, name, pointable = false, help = null, color = 'white', icon = Icons.NOICON) {
        super(id, name, true, pointable, help);
        this.color = color;
        this.icon = icon;
    }
}
