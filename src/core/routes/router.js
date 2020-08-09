import {
   $
} from "../DOM";
import {
   ActiveRoute
} from "./activeRoute";
import { loader } from "../../components/loader/loader";

export class Router {
   constructor(selector, rotes) {
      this.$placeholder = $(selector);
      this.rotes = rotes;
      this.page = null;
      this.loader = loader();
      this.changePageHandler = this.changePageHandler.bind(this);
      this.init();
   }


   init() {
      window.addEventListener('hashchange', this.changePageHandler);
      this.changePageHandler();
   }

   async changePageHandler() {
      this.$placeholder.clear().append(this.loader);
      if (this.page) {
         this.page.destroy();
      }
      const Page = ActiveRoute.path.includes('excel') ?
         this.rotes.excel : this.rotes.dashboard;
      this.page = new Page(ActiveRoute.param);
      const root = await this.page.getRoot();
      this.$placeholder.clear().append(root);
      this.page.afterRender();
   }

   destroy() {
      window.removeEventListener('hashchange', this.changePageHandler);
   }
}
