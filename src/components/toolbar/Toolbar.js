import {
    createToolbar
} from "./toolbar_template";
import {
    $
} from "@core/DOM";
import {
    ExcelStateComponent
} from "@core/ExcelStateComponent";
import {
    defaultStyles
} from "../../constans";

export class Toolbar extends ExcelStateComponent {
    static className = "excel__toolbar";

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribes: ['currentStyles'],
            ...options
        });
    }
    storeChanges(value) {
        this.setState(value.currentStyles);
    }

    init() {
        super.init();
    }

    prepare() {
        this.initState(defaultStyles);
    }

    get template() {
        return createToolbar(this.state);
    }

    onClick(e) {
        const target = $(e.target);
        if (target.dataset().type === "button") {
            this.$emmit("toolbar:applyStile",
                JSON.parse(target.dataset().value));
        }
    }
    toHTML() {
        return this.template;
    }
}
