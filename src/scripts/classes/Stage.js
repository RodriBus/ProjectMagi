export default class Stage {
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

    get hasChilds () {
        return this.childs.length > 0;
    }

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
        return this.childs.findIndex((stg) => stg.pointable && stg.available);
    }
}
