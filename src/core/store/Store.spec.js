import {
   Store
} from "./Store";

const initState = {
   count: 0
};

const reducer = (state = initState, action) => {
   if (action.type === "ADD") {
      return {...state, count: state.count+1};
   }
   return state;
};

describe("Store: ", () => {
   let store;
   let handler;
   beforeEach(() => {
      store = new Store(reducer, initState);
      handler = jest.fn();
   });
   test("should return store object", () => {
      expect(store).toBeDefined();
      expect(store.dispatch).toBeDefined();
      expect(store.subscribe).toBeDefined();
      expect(store.getState).toBeDefined();
   });

   test("should return object as state", () => {
      expect(store.getState()).toBeInstanceOf(Object);
   });

   test("should return default state", () => {
      expect(store.getState()).toEqual(initState);
   });

   test("should change state if action exists", () => {
      store.dispatch({type: "ADD"});
      expect(store.getState().count).toBe(1 );
   });

   test("should NOT change state if action don`t exists", () => {
      store.dispatch({type: "NOT EXISTING ACTION"});
      expect(store.getState().count).toBe(0);
   });

   test("should call subscriber function", () => {
      store.subscribe(handler);
      store.dispatch({type: "ADD"});
      expect(handler).toHaveBeenCalled();
      expect(handler).toHaveBeenCalledWith(store.getState());
   });

   test("should NOT call subscriber function if unsubscribe", () => {
      const sub = store.subscribe(handler);
      sub.unsub();
      store.dispatch({type: "ADD"});
      expect(handler).not.toHaveBeenCalled();
   });

   test("should dispatch in async way", () => {
      return new Promise(resolve => {
           setTimeout(() => {
              store.dispatch({type: "ADD"});
           }, 1000);

           setTimeout(() => {
              expect(store.getState().count).toBe(1);
              resolve();
           }, 1500);
      });
   });
});
