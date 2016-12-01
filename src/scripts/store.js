import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

import StageFactory from './StageFactory';
import { Stage, Spell, Item, Stat, Schemata, Link} from './classes';


class NavigatorStore extends EventEmitter {

    constructor () {
        super();
        const stages = StageFactory.getStages();
        const firstStage = stages[0];
        // this.path = [firstStage.id];
        //to fake startup stage
        this.path = ['main', 'equip'];
        const firstChildAvailable = firstStage.getFirstChildAvailableIndex();
        this.currentIndex = firstChildAvailable;
        this.pathIndex = [0];
    }

    /**
     * The current stage pointed by the cursor
     * @return {Stage}
     */
    get currentCursor () {
        const stage = this.getLastStage();
        return stage.getChildByIndex(this.currentIndex);
    }

    /**
     * The current stage's id
     * @return {string}
     */
    get currentPath () {
        if (this.path.length > 1) {
            return this.path[this.path.length - 1];
        }
        return this.path[0];
    }

    /**
     * Returns current stage
     */
    getLastStage () {
        return Stage.getStage(this.currentPath);
    }

    /**
     * Moves the cursor down if possible
     */
    down () {
        const currStage = this.getLastStage();
        const max = currStage.childs.length;
        let futureIndex = this.currentIndex + 1;
        while (futureIndex < max) {
            const futureStage = currStage.getChildByIndex(futureIndex);
            if (futureStage.pointable) {
                this.currentIndex = futureIndex;
                this.emit('cursor');
                break;
            }
            futureIndex++;
        }
    }

    /**
     * Moves the cursor up if possible
     */
    up () {
        const currStage = this.getLastStage();
        let futureIndex = this.currentIndex - 1;
        while (futureIndex >= 0) {
            const futureStage = currStage.getChildByIndex(futureIndex);
            if (futureStage.pointable) {
                this.currentIndex = futureIndex;
                this.emit('cursor');
                break;
            }
            futureIndex--;
        }
    }

    /**
     * Changes the current stage based on the current cursor if possible
     */
    next () {
        const currStage = Stage.getStage(this.currentPath);
        const next = currStage.childs[this.currentIndex];
        //if stage is link, open link
        //links has no childs
        this.handleLink(next);
        if (next && next.hasChilds) {
            this.path.push(next.id);
            this.pathIndex.push(this.currentIndex);
            this.currentIndex = next.getFirstChildAvailableIndex();
            this.emit('navigate');
        }
    }

    /**
     * Returns to the previous stage if possible
     */
    prev () {
        if (this.path.length > 1) {
            this.path.pop();
            this.currentIndex = this.pathIndex.pop();
            this.emit('navigate');
        }
    }

    /**
     * Open a Link's instance url in a new window
     */
    handleLink (link) {
        if (link instanceof Link) {
            return window.open(link.url, '_blank');
        }
    }

    /**
     * Handles actions from the dispatcher
     */
    handleActions (action) {
        console.log(action);
        switch (action.type) {
            case 'CURSOR_UP': {
                this.up();
                break;
            }
            case 'CURSOR_DOWN': {
                this.down();
                break;
            }
            case 'STAGE_NEXT': {
                this.next();
                break;
            }
            case 'STAGE_PREV': {
                this.prev();
                break;
            }
        }
    }
}

const navigatorStore = new NavigatorStore();
dispatcher.register(navigatorStore.handleActions.bind(navigatorStore));
export default navigatorStore;
