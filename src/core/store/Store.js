export class Store {
   constructor(rootReducer, initialState = {}) {
      this.state = rootReducer({
         ...initialState
      }, {
         type: "__INIT__"
      });
      this.listeners = [];
      this.rootReducer = rootReducer;
   }

   subscribe(fn) {
      this.listeners.push(fn);
      return {
         unsub: () => this.listeners.splice(this.listeners.indexOf(fn), 1)
      };
   }

   dispatch(action) {
      this.state = this.rootReducer(this.state, action);
      this.listeners.forEach(listener => listener(this.state));
   }
   getState() {
      return JSON.parse(JSON.stringify(this.state));
   }
}
