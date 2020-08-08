import {
   defaultStyles
} from "../constans";

const defaultState = {
   collState: {},
   dataState: {},
   stylesState: {},
   currentStyles: defaultStyles,
   currentText: '',
   title: {value: "New table"},
   date: new Date().toJSON()
};

const normalize = state => ({
   ...state,
   currentStyles: defaultStyles,
   currentText: '',
});
export function normalizeInitState(state) {
   return state ? normalize(state) : defaultState;
}
