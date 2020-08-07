import {
   CODES,
   COLS_COUNT,
   ROWS_COUNT
} from "./tableConfig";
import { toInlineStyles } from "@core/utils/stringUtils";
import { parse } from "../../core/parse";

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createCell({
   letter,
   index
}, i, state) {
   const id = `${i-1}:${index}`;
   const width = getWidth(state.collState, letter);
   const styles = toInlineStyles(state.stylesState[id]);
   const text = getText(state.dataState, id);
   return `
   <div class="cell" contenteditable data-leter=${letter} 
   data-index=${id} data-value='${text}'
   style="width: ${width}px; ${styles}">${parse(text)}</div>
   `;
}

function createCol(letter, width) {
   return `
   <div class="column" data-col=${letter} style="width: ${width}px">
      ${letter}
      <div class="col-resize" data-resize="col"></div>
   </div>
   `;
}

function createRow(info, content, height) {
   const resize = info ?
      `<div class="row-resize" data-resize="row"></div>` : '';
   return `
   <div class="row" data-row data-info=${info} style="height: ${height}px">
      <div class="row-info">
         ${info}
         ${resize}
      </div>
      <div class="row-data">${content}</div>
   </div>
   `;
}

function getWidth(state, index) {
   return state[index] || DEFAULT_WIDTH;
}

function getHeight(state, index) {
   return state[index] || DEFAULT_HEIGHT;
}

function getText(state, index) {
   return state[index] || "";
}

export function createTable(rowsCount = ROWS_COUNT, state = {}) {
   const collState = state.collState;
   const colsLetters = new Array(COLS_COUNT).fill('')
      .map((el, index) =>
         ({
            letter: String.fromCharCode(CODES.A + index),
            index
         }));
   const rows = [];

   const cols = colsLetters
      .map(({
         letter
      }) => createCol(letter, getWidth(collState, letter)))
      .join('');

   rows.push(createRow('', cols));

   for (let i = 1; i <= rowsCount; i++) {
      rows.push(createRow(i, colsLetters
         .map(el => createCell(el, i, state,
            getText(state.dataState, `${i-1}:${el.index}`)))
         .join(''), getHeight(collState, i)));
   }

   return rows.join('');
}
