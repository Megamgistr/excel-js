import {$} from '@core/DOM';
import { Emmiter } from '@core/Emmiter';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.emmiter = new Emmiter();
    }

    getRoot() {
        const componentOptions = {
            emmiter: this.emmiter
        };
        const $root = $.create('div', 'excel');
        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className);
            const component = new Component($el, componentOptions);
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }
    render() {
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.components.forEach(component => component.destroy());
    }
}
