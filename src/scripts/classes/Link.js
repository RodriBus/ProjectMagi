import Stage from './Stage';

export default class Link extends Stage {
    constructor (id, name, url = '#', icon = Icons.LINK) {
        super(id, name, true, true, null);
        this.url = url;
        this.icon = icon;
    }

    get childs () {
      return [];
    }

    set childs (childs) { }

    addChilds () {
      throw new Error('Links cannot have childs.');
    }
}
