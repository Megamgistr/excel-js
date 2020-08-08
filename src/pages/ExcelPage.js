import {
   Page
} from "@core/Page";
import {
   Excel
} from "@/components/excel/Excel";
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
} from "@core/Store";
import {
   rootReducer
} from "../store/rootReducer";
import {
   storage
} from "@core/utils/storage";
import {
   normalizeInitState
} from "../store/initState";
import {
   debounce
} from "@core/utils/debounce";
import { ActiveRoute } from "../core/routes/activeRoute";

function storageName(param) {
   return 'excel:' + param;
}

function createParam() {
   const newParam = Date.now().toString();
   ActiveRoute.param = newParam;
   return newParam;
}
export class ExcelPage extends Page {
   getRoot() {
      const params = this.params || createParam();
      const name = storageName(params);
      const state = storage(name);
      const store = new Store(rootReducer, normalizeInitState(state));
      const stateListener = debounce(state => {
         storage(name, state);
      }, 300);

      store.subscribe(stateListener);

      this.excel = new Excel({
         components: [Header, Toolbar, Formula, Table],
         store
      });
      return this.excel.getRoot();
   }

   afterRender() {
      this.excel.init();
   }

   destroy() {
      this.excel.destroy();
   }
}
