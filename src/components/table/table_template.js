import {
   CODES,
   COLS_COUNT,
   ROWS_COUNT
} from "./tableConfig";

function createCell({
   letter,
   index
}, i) {
   return `
   <div class="cell" contenteditable data-leter=${letter} 
   data-index=${i-1}:${index}></div>
   `;
}

function createCol({
   letter
}) {
   return `
   <div class="column" data-col=${letter}>
      ${letter}
      <div class="col-resize" data-resize="col"></div>
   </div>
   `;
}

function createRow(info, content) {
   const resize = info ?
      `<div class="row-resize" data-resize="row"></div>` : '';
   return `
   <div class="row" data-row>
      <div class="row-info">
         ${info}
         ${resize}
      </div>
      <div class="row-data">${content}</div>
   </div>
   `;
}

export function createTable(rowsCount = ROWS_COUNT) {
   const colsLetters = new Array(COLS_COUNT).fill('')
      .map((el, index) =>
         ({
            letter: String.fromCharCode(CODES.A + index),
            index
         }));
   const rows = [];

   const cols = colsLetters
      .map(createCol)
      .join('');

   rows.push(createRow('', cols));

   for (let i = 1; i <= rowsCount; i++) {
      rows.push(createRow(i, colsLetters
         .map(el => createCell(el, i))
         .join('')));
   }

   return rows.join('');
}
