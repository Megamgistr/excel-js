import { Page } from "./Page";
import { Dashboard } from "../components/dashboard/Dashboard";

export class DashboardPage extends Page {
   getRoot() {
      this.dashboard = new Dashboard();
      return this.dashboard.getRoot();
   }
}
