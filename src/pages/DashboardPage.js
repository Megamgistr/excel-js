import { Page } from "../core/Page";
import { Dashboard } from "../components/dashboard/Dashboard";

export class DashboardPage extends Page {
   getRoot() {
      this.dashboard = new Dashboard();
      return this.dashboard.getRoot();
   }
}
