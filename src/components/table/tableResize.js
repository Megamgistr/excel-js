import {
   $,
   $$
} from "@core/DOM";

export function resizeHandler($root) {
   return new Promise(resolve => {
      const $target = $(event.target);
      const type = $target.dataset().resize;
      const $parent =
         $target.parent(`[data-${type}]`);
      const coords = $parent.getCoords();
      const props = type == "col" ? {
         side: "bottom",
         coord: "right",
         axis: "pageX",
         style: "width"
      } : {
         side: "right",
         coord: "bottom",
         axis: "pageY",
         style: "height"
      };
      let value;


      document.onmousemove = (e) => {
         const delta = e[props.axis] - coords[props.coord];
         value = coords[props.style] + delta;
         $target.setStyle({
            opacity: 1,
            [props.side]: "-20000px",
            [props.coord]: -delta + "px"
         });
      };

      document.onmouseup = (e) => {
         document.onmousemove = null;
         document.onmouseup = null;
         $target.setStyle({
            opacity: 0,
            bottom: 0,
            right: 0
         });
         $parent.setStyle({
            [props.style]: value + "px"
         });
         if (type == "col") {
            const later = $parent.dataset()[type];
            $$(`[data-leter='${later}'`, $root)
               .forEach(el => el.setStyle({
                  [props.style]: value + "px"
               }));
               resolve({value, id: later});
         }
         resolve({value, id: $parent.dataset()["info"]});
      };
   });
}
