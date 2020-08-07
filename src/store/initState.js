import {
   storage
} from "../core/utils/storage";
import {
   defaultStyles
} from "../constans";

const defaultState = {
   collState: {},
   dataState: {},
   stylesState: {},
   currentStyles: defaultStyles,
   currentText: '',
   title: '',
};

const normalize = state => ({
   ...state,
   currentStyles: defaultStyles,
   currentText: ''
});

export const initState = storage('excel-state') ?
   normalize(storage('excel-state')) :
   defaultState;
