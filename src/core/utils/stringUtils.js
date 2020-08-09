export function camelToDashCase(str) {
   return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}


export function toInlineStyles(styles = {}) {
   return Object.entries(styles)
      .map(([key, value]) => `${camelToDashCase(key)}:${value}`)
      .join(';');
}

export function parse(value) {
   if ((value+"").startsWith("=")) {
      try {
         if (value.length > 1) {
         const newVal = value.slice(1);
         const evalValue = eval(newVal);
         return evalValue+"" === newVal ? value : evalValue;
         }
         return value;
      } catch (e) {
         return value;
      }
   }
   return value;
}
