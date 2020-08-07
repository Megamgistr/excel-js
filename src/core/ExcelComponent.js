import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.prepare();
        this.emmiter = options.emmiter;
        this.subscribes = [];
        this.storeSubscribes = options.subscribes || [];
        this.store = options.store;
    }

    prepare() {}
    toHTML() {
        return '';
    }

    $dispatch(action) {
        this.store.dispatch(action);
    }

    isWatching(key) {
        return this.storeSubscribes.includes(key);
    }

    storeChanges() {}

    $emmit(event, ...args) {
        this.emmiter.emmit(event, ...args);
    }

    $on(event, fn) {
        this.subscribes.push(this.emmiter.subscribe(event, fn));
    }

    init() {
        this.addDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
        this.subscribes.forEach(unsub => unsub());
    }
}
