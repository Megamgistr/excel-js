export class ActiveRoute {
   static get path() {
      return window.location.hash.slice(1);
   }
   static get param() {
      return ActiveRoute.path.split('/')[1];
   }

   static set param(param) {
      window.location.hash += `/${param}`;
   }

   static set path(hash) {
      window.location.hash = hash;
   }
}
