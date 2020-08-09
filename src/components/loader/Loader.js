import {
   $
} from "../../core/DOM";

export function loader() {
   const root = $.create('div', 'loader');
   root.html(`
   <div class="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
   </div>`);
   return root;
}
