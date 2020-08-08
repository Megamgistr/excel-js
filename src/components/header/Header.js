import {
    ExcelComponent
} from "@core/ExcelComponent";
import {
    changeTitle
} from "../../store/actions";
import {
    $
} from "@core/DOM";
import { ActiveRoute } from "../../core/routes/activeRoute";

export class Header extends ExcelComponent {
    constructor($root, options) {
        super($root, {
            name: "Header",
            ...options,
            listeners: ['input', 'click'],
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
        value='${this.store.getState().title.value}'></input>
        <div>
            <div class="button" data-delete>
                <i class="material-icons" data-delete>
                    delete
                </i>
            </div>
            <div class="button" data-exit>
                <i class="material-icons" data-exit>
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

    onClick(e) {
    const target = $(e.target);
    const param = ActiveRoute.param;
    const data = target.dataset();
    if (data.delete != undefined) {
        const conf = confirm("Are you shure ?");
        if (conf) {
            localStorage.removeItem(`excel:${param}`);
            ActiveRoute.path = "";
        }
    }
    if (data.exit != undefined) {
        ActiveRoute.path = "";
    }
    }
}
