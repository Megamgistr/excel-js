 export function debounce(fn, wait) {
    let timeout;
    return function(...args) {
       const leter = () => {
          clearTimeout(timeout);
          // eslint-disable-next-line
          fn.apply(this, args);
       };
       clearTimeout(timeout);
       timeout = setTimeout(leter, wait);
    };
 }
