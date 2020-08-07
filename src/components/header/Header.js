import {
    ExcelComponent
} from "@core/ExcelComponent";
import {
    changeTitle
} from "../../store/actions";

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: "Header",
            ...options,
            listeners: ['input'],
            subscribtions: [],
        });
    }

    static className = "excel__header";
    init() {
        super.init();
    }

    toHTML() {
        return `
        <input class="input" type="text" 
        value='${this.store.getState().title.value || "New table"}'></input>
        <div>
            <div class="button">
                <i class="material-icons">
                    delete
                </i>
            </div>
            <div class="button">
                <i class="material-icons">
                    exit_to_app
                </i>
            </div>
        </div>
        `;
    }

    onInput(e) {
        const value = e.target.value;
        this.$dispatch(changeTitle({
            value
        }));
    }
}
