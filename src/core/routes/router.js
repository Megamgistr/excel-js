import {
   $
} from "@core/DOM";
import {
   ActiveRoute
} from "./activeRoute";

export class Router {
   constructor(selector, rotes) {
      this.$placeholder = $(selector);
      this.rotes = rotes;
      this.page = null;
      this.changePageHandler = this.changePageHandler.bind(this);
      this.init();
   }


   init() {
      window.addEventListener('hashchange', this.changePageHandler);
      this.changePageHandler();
   }

   changePageHandler() {
      this.$placeholder.clear();
      if (this.page) {
         this.page.destroy();
      }
      const Page = ActiveRoute.path.includes('excel') ?
         this.rotes.excel : this.rotes.dashboard;
      this.page = new Page(ActiveRoute.param);
      this.$placeholder.append(this.page.getRoot());
      this.page.afterRender();
   }

   destroy() {
      window.removeEventListener('hashchange', this.changePageHandler);
   }
}
