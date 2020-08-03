import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.prepare();
        this.emmiter = options.emmiter;
        this.subscribes = [];
    }

    prepare() {}
    toHTML() {
        return '';
    }

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
        this.subscribes.forEach(subscribe => subscribe());
    }
}
