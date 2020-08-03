import {
   $
} from "../../core/DOM";

export class TableSelection {
   SELECT_CLASS = "selected";

   constructor() {
      this.group = [];
      this.$mainRIndex = null;
      this.$mainCIndex = null;
   }

   getSelectedElements() {
      return this.group;
   }

   select($el) {
      this.clear();
      [this.$mainRIndex, this.$mainCIndex] = this.getIndex($el);
      this.group.push($el);
      $el.setClass(this.SELECT_CLASS);
   }

   clear() {
      this.group.forEach($c => $c.removeClass(this.SELECT_CLASS));
      this.group = [];
   }

   selectGroup($el) {
      if (!$el.contains(this.SELECT_CLASS)) {
         this.clear();
         const [rI, cI] = this.getIndex($el);
         const minRIndex = Math.min(this.$mainRIndex, rI),
            minCIndex = Math.min(this.$mainCIndex, cI);
         const maxRIndex = Math.max(this.$mainRIndex, rI),
            maxCIndex = Math.max(this.$mainCIndex, cI);
         let $newEl;
         for (let i = minRIndex; i <= maxRIndex; i++) {
            for (let j = minCIndex; j <= maxCIndex; j++) {
               $newEl = $(`[data-index='${i}:${j}']`);
               $newEl.setClass(this.SELECT_CLASS);
               this.group.push($newEl);
            }
         }
      }
   }

   getIndex($el) {
      return $el.dataset()["index"].split(':');
   }
}
