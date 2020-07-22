const CODES = {
   A: 65,
   Z: 90
};
function createCell(letter) {
   return `
   <div class="cell" contenteditable data-leter=${letter}></div>
   `;
}
function createCol(content) {
   return `
   <div class="column" data-col=${content}>
      ${content}
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

export function createTable(rowsCount = 15) {
   const colsCount = CODES.Z - CODES.A+1;
   const colsLetters = new Array(colsCount).fill('')
      .map((el, index) => String.fromCharCode(CODES.A + index));
   const rows = [];

   const cols = colsLetters
      .map(createCol)
      .join('');

   const cells = colsLetters
   .map(createCell)
   .join('');

   rows.push(createRow('', cols));

   for (let i = 1; i <= rowsCount; i++) {
      rows.push(createRow(i, cells));
   }

   return rows.join('');
}
