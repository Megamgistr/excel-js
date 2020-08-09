import { Router} from "./Router";
import {Page} from "../../pages/Page";

class DashboardPage extends Page {
   getRoot() {
      const root = document.createElement('div');
      root.innerHTML = "dashboard";
      return root;
   }
}

class EacelPage extends Page {}

describe("Router: ", () => {
   let router;
   let $root;
   beforeEach(()=> {
      $root = document.createElement('div');
      router = new Router($root, {
         dashboard: DashboardPage,
         excel: EacelPage
      });
   });
   test('should be difined', () => {
      expect(router).toBeDefined();
   });

   test('should render dashboard page', () => {
      router.changePageHandler();
      expect($root.innerHTML).toBe('<div>dashboard</div>');
   });
});
