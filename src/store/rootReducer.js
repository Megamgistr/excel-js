import {
   TABLE_RESIZE,
   CHANGE_TEXT,
   CHANGE_STYLES,
   APPLAY_STYLE,
   CHANGE_TITLE,
   DATE_UPDATE
} from "./types";

export function rootReducer(state, action) {
   let val;
   switch (action.type) {
      case TABLE_RESIZE:
         return {
            ...state, collState: value(state, "collState", action)
         };
      case CHANGE_TEXT:
         return {
            ...state, currentText: action.data.currentText,
               dataState: value(state, "dataState", action)
         };
      case CHANGE_STYLES:
         return {
            ...state, currentStyles: action.data
         };
      case APPLAY_STYLE:
         val = state.stylesState;
         action.data.ids.forEach(id => {
            val[id] = {...val[id], ...action.data.value};
         });
         return {
            ...state, stylesState: val, currentStyles: {
               ...state.currentStyles,
               ...action.data.value
            }
         };

      case CHANGE_TITLE:
         return {
            ...state, title: action.data
         };
      case DATE_UPDATE:
         return {
            ...state, date: new Date().toJSON()
         };

      default:
         return state;
   }
}

function value(state, field, action) {
   const val = state[field] || {};
   val[action.data.id] = action.data.value;
   return val;
}
