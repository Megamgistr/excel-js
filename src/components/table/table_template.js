const CODES = {
   A: 65,
   Z: 90
};
function createCell() {
   return `
   <div class="cell" contenteditable></div>
   `;
}
function createCol(content) {
   return `
   <div class="column">
      ${content}
   </div>
   `;
}

function createRow(info, content) {
   return `
   <div class="row">
      <div class="row-info">${info}</div>
      <div class="row-data">${content}</div>
   </div>
   `;
}

export function createTable(rowsCount = 15) {
   const colsCount = CODES.Z - CODES.A+1;
   const rows = [];

   const cols = new Array(colsCount).fill('')
      .map((el, index) => createCol(String.fromCharCode(CODES.A + index)))
      .join('');

   const cells = new Array(colsCount).fill('')
   .map(createCell)
   .join('');

   rows.push(createRow('', cols));

   for (let i = 1; i <= rowsCount; i++) {
      rows.push(createRow(i, cells));
   }

   return rows.join('');
}
