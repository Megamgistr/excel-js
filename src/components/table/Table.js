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
    shouldResize
} from "./tableFunctions";

export class Table extends ExcelComponent {
    static className = "excel__table";
    constructor($root) {
        super($root, {
            name: "Table",
            listeners: ['mousedown']
        });
    }
    toHTML() {
        return createTable();
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root);
        }
    }
}
