import { EventEmitter } from 'events';
import dispatcher from './dispatcher';

import { leftpad } from './utils';
import { Birthday } from './constants';
import StageFactory from './StageFactory';
import { Stage, Spell, Item, Stat, Schemata, Link} from './classes';


class NavigatorStore extends EventEmitter {

    constructor () {
        super();
        const stages = StageFactory.getStages();
        const firstStage = stages[0];
        this.path = [firstStage.id];
        //to fake startup stage
        // this.path = ['main', 'save'];
        const firstChildAvailable = firstStage.getFirstChildAvailableIndex();
        this.currentIndex = firstChildAvailable;
        this.pathIndex = [0];

        this.timeElapsed = 0;

        this.showDisclaimer = false;
        this.showInstructions = true;
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
     * The info based on elapsed time
     * @return {Object}
     */
    get info () {
        const date = new Date(Date.now());
        const baseHour = 29;
        const baseMinute = 19;
        const steps = Math.floor(Birthday.getTime() / (24 * 60 * 60 * 1000));
        let hour = Math.floor(baseHour + steps / 7 / 100);
        const minutes = trimMin(baseMinute + date.getMinutes());
        const gold = steps * 3;

        function trimMin(min) {
            if (min >= 60) {
                hour++;
                return trimMin(min - 60);
            }
            return leftpad(min, 2, '0')
        }
        return { steps, hour, minutes, gold };
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
     * Hides the instructions window
     */
    hideInstructions () {
        const emit = this.showInstructions;
        this.showInstructions = false;
        if (emit) {
            this.emit('instructions');
        }
    }

    /**
     * Shows the disclaimer window
     */
    changeDisclaimer (show) {
        console.log(show);
        this.showDisclaimer = show;
        this.emit('disclaimer');
    }

    /**
     * Adds time to elapsed time
     */
    addTime (ms) {
        this.timeElapsed += ms;
        this.emit('time');
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
            case 'HIDE_INSTRUCTIONS': {
                this.hideInstructions();
                break;
            }
            case 'SHOW_DISCLAIMER': {
                this.changeDisclaimer(action.show);
                break;
            }
            case 'TIME_ADD': {
                this.addTime(action.milliseconds);
                break;
            }
        }
    }
}

const navigatorStore = new NavigatorStore();
dispatcher.register(navigatorStore.handleActions.bind(navigatorStore));
export default navigatorStore;
