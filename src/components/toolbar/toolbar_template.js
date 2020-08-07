function toButton(button) {
   const meta = `
   data-type="button"
   data-value=${JSON.stringify(button.value)}
   `;
   return `<div 
   class="button ${button.active ? "active" : ""}"
   ${meta}>
      <i class="material-icons" ${meta}>
       ${button.icon}
      </i>
   </div>`;
}

function isActive(state, key, value) {
   return state[key] === value;
}
export function createToolbar(state) {
   const buttons = [{
         icon: "format_align_left",
         active: isActive(state, 'textAlign', 'left') ||
            isActive(state, 'textAlign', ""),
         value: {
            textAlign: "left"
         }
      },
      {
         icon: "format_align_center",
         active: isActive(state, 'textAlign', 'center'),
         value: {
            textAlign: "center"
         }
      },
      {
         icon: "format_align_right",
         active: isActive(state, 'textAlign', 'right'),
         value: {
            textAlign: "right"
         }
      },
      {
         icon: "format_bold",
         active: isActive(state, 'fontWeight', 'bold'),
         value: {
            fontWeight: isActive(state, 'fontWeight', 'bold') ?
               "normal" : "bold"
         }
      },
      {
         icon: "format_italic",
         active: isActive(state, 'fontStyle', 'italic'),
         value: {
            fontStyle: isActive(state, 'fontStyle', 'italic') ?
               "normal" : "italic"
         }
      },
      {
         icon: "format_underlined",
         active: isActive(state, 'textDecoration', 'underline'),
         value: {
            textDecoration: isActive(state, 'textDecoration', 'underline') ?
               "none" : "underline"
         }
      }
   ];
   const buttonsTemplate = buttons.map(toButton).join('');
   return buttonsTemplate;
}
