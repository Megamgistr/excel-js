export function camelToDashCase(str) {
   return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}


export function toInlineStyles(styles = {}) {
   return Object.entries(styles)
      .map(([key, value]) => `${camelToDashCase(key)}:${value}`)
      .join(';');
}
