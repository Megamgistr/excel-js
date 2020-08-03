import {
    ExcelComponent
} from "@core/ExcelComponent";
import {
    createTable
} from "./table_template";
import {
    resizeHandler
} from "./tableResize";
import {
    shouldResize,
    shouldCell,
    getNextSelector
} from "./tableFunctions";
import {
    TableSelection
} from "./TableSelection";
import {
    $
} from "@core/DOM";

export class Table extends ExcelComponent {
    static className = "excel__table";
    constructor($root, options) {
        super($root, {
            name: "Table",
            listeners: ['mousedown', 'click', 'keydown', 'input'],
            ...options
        });
    }
    toHTML() {
        return createTable();
    }

    selectCell($el) {
        this.select.select($el);
        console.log($el);
        const text = $el.getText();
        console.log(text);
        this.$emmit('table:input', text);
    }

    prepare() {
        this.select = new TableSelection();
    }

    init() {
        super.init();
        const $startElem = this.$root.find('[data-leter]');
        $startElem.focus();
        this.selectCell($startElem);
        this.$on('formula:input', (data) => {
            this.select.getSelectedElements()[0].setText(data);
        });
        this.$on('formula:done', () => {
            this.select.getSelectedElements()[0].focus();
        });
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root);
        }
    }

    onClick(event) {
        if (!shouldCell(event)) {
            return;
        }
        if (!event.shiftKey) {
            this.selectCell($(event.target));
        } else {
            this.select.selectGroup($(event.target));
        }
    }

    onKeydown(event) {
        const keys = [
            "ArrowRight",
            "ArrowLeft",
            "ArrowDown",
            "ArrowUp",
            "Tab",
            "Enter"
        ];
        const {
            key
        } = event;
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault();
            const id = this.select
                .getIndex(this.select.getSelectedElements()[0]);
            const $next = this.$root.find(getNextSelector(key, id));
            $next.focus();
            this.selectCell($next);
        }
    }

    onInput(event) {
        const text = event.target.textContent.trim();
        this.$emmit('table:input', text);
    }
}
