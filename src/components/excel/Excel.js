import {$} from '@core/DOM';
import { Emmiter } from '@core/Emmiter';
import { StoreSubscriber } from '../../core/StoreSubscriber';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.emmiter = new Emmiter();
        this.store = options.store;
        this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
        const componentOptions = {
            emmiter: this.emmiter,
            store: this.store
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
        this.subscriber.subscribeComponents(this.components);
        this.components.forEach(component => component.init());
    }

    destroy() {
        this.subscriber.unsubscribeComponents();
        this.components.forEach(component => component.destroy());
    }
}
