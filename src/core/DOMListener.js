import {capitalize} from '@core/utils/capitalize';

export class DOMListener {
    constructor($root, listeners = []) {
        this.$root = $root;
        this.listeners = listeners;
    }

    addDOMListeners() {
        this.listeners.forEach(listener => {
            const methodName = getMethodName(listener);
            if (!this[methodName]) {
                throw new Error('Method ' + methodName + " not found");
            }
            this[methodName] = this[methodName].bind(this);
            this.$root.on(listener, this[methodName]);
        });
    }
    removeDOMListeners() {
        this.listeners.forEach(listener => {
            this.$root.off(listener, this[getMethodName(listener)]);
        });
    }
}


function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
