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
import {
    tableResize
} from "@/store/actions";
import {
    changeText,
    changeCurrentStyles,
    applayStyle
} from "../../store/actions";
import {
    defaultStyles
} from "../../constans";
import {
    parse
} from "@core/utils/stringUtils";

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
        return createTable(15, this.store.getState());
    }

    selectCell($el) {
        this.select.select($el);
        const text = $el.dataset().value || $el.getText();
        this.updateText(text);
        this.$dispatch(changeCurrentStyles($el
            .getStyles(Object.keys(defaultStyles))));
    }

    prepare() {
        this.select = new TableSelection();
    }

    updateText(value) {
        this.select.getSelectedElements().forEach($el => {
            this.$dispatch(changeText({
                data: {
                    id: this.select.getIndex($el).join(":"),
                    value: value,
                    currentText: $el.dataset().value || value
                }
            }));
        });
    }

    init() {
        super.init();
        const $startElem = this.$root.find('[data-leter]');
        $startElem.focus();
        this.selectCell($startElem);
        this.$on('formula:input', (data) => {
            this.select.getSelectedElements().forEach($el => {
                $el.setText(parse(data));
                $el.attr('data-value', data);
            });
            this.updateText(data);
        });
        this.$on('formula:done', () => {
            this.select.getSelectedElements()[0].focus();
        });
        this.$on('toolbar:applyStile', (value) => {
            this.select.getSelectedElements()
                .forEach($element => $element.setStyle(value));
            this.$dispatch(applayStyle({
                value,
                ids: this.select.selectedIds
            }));
        });
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable();
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

    async resizeTable() {
        try {
            const data = await resizeHandler(this.$root);
            this.$dispatch(tableResize(data));
        } catch (e) {
            console.warn(e.message);
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
        const text = $(event.target).getText();
        $(event.target).setText(text);
        $(event.target).attr('data-value', text);
        this.updateText(text);
    }
}
