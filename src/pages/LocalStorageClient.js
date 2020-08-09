import {storage} from "../core/utils/storage";
export class LocalStorageClient {
   constructor(name) {
      this.name = name;
   }

   save(state) {
      storage(this.name, state);
      return Promise.resolve();
   }

   get() {
      return new Promise(resolve => {
         const state = storage(this.name);
         setTimeout(() => {
            resolve(state);
         }, 2000);
      });
   }
}
