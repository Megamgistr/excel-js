import {
    ExcelComponent
} from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
    static className = "excel__formula";
    constructor($root, options) {
        super($root, {
            name: "Formula",
            listeners: ['input', 'keydown'],
            subscribes: ['currentText'],
            ...options
        });
    }
    storeChanges(changes) {
        this.$input.setText(changes.currentText);
    }
    toHTML() {
        return `<div class="info">fx</div>
        <div class="input" contenteditable spellcheck="false" data-input>
        </div>`;
    }
    init() {
        super.init();
        this.$input = this.$root.find('[data-input]');
    }

    onInput(event) {
        const text = event.target.textContent.trim();
        this.$emmit('formula:input', text);
    }

    onKeydown(event) {
        const keys = ["Enter", "Tab"];
        if (keys.includes(event.key)) {
            event.preventDefault();
            this.$emmit('formula:done');
        }
    }
}
