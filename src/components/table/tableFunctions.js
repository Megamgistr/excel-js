import {COLS_COUNT, ROWS_COUNT} from "./tableConfig";

export function shouldResize(event) {
   return event.target.dataset.resize;
}

export function shouldCell(event) {
   return event.target.dataset.leter;
}

export function getNextSelector(key, [row, coll]) {
   switch (key) {
       case "Enter":
       case "ArrowDown":
           row ++;
           break;
       case "Tab":
       case "ArrowRight":
           coll++;
           break;
       case "ArrowLeft":
           coll--;
           break;
       case "ArrowUp":
           row--;
           break;
   }
   row = Math.min(row, ROWS_COUNT-1);
   coll = Math.min(coll, COLS_COUNT-1);
   return `[data-index="${row < 0 ? 0 : row}:${coll < 0 ? 0: coll}"`;
}
