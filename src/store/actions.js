import {
   TABLE_RESIZE,
   CHANGE_TEXT,
   CHANGE_STYLES,
   APPLAY_STYLE,
   CHANGE_TITLE
} from "./types";

export function tableResize(data) {
   return {
      type: TABLE_RESIZE,
      data
   };
}

export function changeText(data) {
   return {
      type: CHANGE_TEXT,
      ...data
   };
}

export function changeCurrentStyles(data) {
   return {
      type: CHANGE_STYLES,
      data
   };
}

export function applayStyle(data) {
   return {
      type: APPLAY_STYLE,
      data
   };
}


export function changeTitle(data) {
   return {
      type: CHANGE_TITLE,
      data
   };
}
