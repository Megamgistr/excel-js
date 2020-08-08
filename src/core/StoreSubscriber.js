import { isEquals } from "./utils/isEquals";

export class StoreSubscriber {
   constructor(store) {
      this.store = store;
      this.sub = null;
      this.prevState = {};
   }

   subscribeComponents(components) {
      this.prevState = this.store.getState();
      this.sub = this.store.subscribe(state => {
         Object.keys(state).forEach(key => {
            if (!isEquals(this.prevState[key], state[key])) {
               components.forEach(component => {
                  if (component.isWatching(key)) {
                     const change = {[key]: state[key]};
                     component.storeChanges(change);
                  }
               });
            }
         });
         this.prevState = state;
      });
   }
   unsubscribeComponents() {
      this.sub.unsub();
   }
}
