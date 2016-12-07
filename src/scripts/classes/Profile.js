import Stage from './Stage';

export default class Profile extends Stage {
    constructor (id, name, job, image, level = null, currHp = null, maxHp = null, currMp = null, maxMp = null) {
        super(id, name, true, false, null);
        this.job = job;
        this.image = image;
        this.level = level;
        this.hp = {
          current: currHp,
          max: maxHp
        };
        this.mp = {
          current: currMp,
          max: maxMp
        };;
    }
}
