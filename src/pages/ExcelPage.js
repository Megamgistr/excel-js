import {
   Page
} from "./Page";
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
} from "@core/store/Store";
import {
   rootReducer
} from "../store/rootReducer";
import {
   normalizeInitState
} from "../store/initState";
import {
   ActiveRoute
} from "../core/routes/activeRoute";
import { StateProcessor } from "./StateProcessor";
import { LocalStorageClient } from "./LocalStorageClient";

function storageName(param) {
   return 'excel:' + (param || createParam());
}

function createParam() {
   const newParam = Date.now().toString();
   ActiveRoute.param = newParam;
   return newParam;
}

export class ExcelPage extends Page {
   constructor(param) {
      super(param);
      this.processor = new StateProcessor(
         new LocalStorageClient(storageName(this.params))
         );
   }
   async getRoot() {
      const state = await this.processor.get();
      const store = new Store(rootReducer, normalizeInitState(state));
      store.subscribe(this.processor.listen);


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
