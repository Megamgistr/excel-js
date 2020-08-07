import "./scss/index.scss";
import {
    Excel
} from "./components/excel/Excel";
import {
    Header
} from "@/components/header/Header";
import {
    Toolbar
} from "@/components/toolbar/Toolbar";
import {
    Formula
} from "@/components/formula/Formula";
import {
    Table
} from "@/components/table/Table";
import {
    Store
} from "./core/Store";
import {
    rootReducer
} from "./store/rootReducer";
import {
    storage
} from "./core/utils/storage";
import { initState } from "./store/initState";
import { debounce } from "./core/utils/debounce";

const store = new Store(rootReducer, initState);

const stateListener = debounce( state => {
    storage("excel-state", state);
}, 300);

store.subscribe(stateListener);

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
});

console.log('Excel', excel.render());
