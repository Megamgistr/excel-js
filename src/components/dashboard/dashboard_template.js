import {
   $
} from "@core/DOM";

import {
   storage
} from "@core/utils/storage";

function getAllKeys() {
   const keys = [];
   for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.includes('excel')) {
         continue;
      }
      keys.push(key);
   }
   return keys;
}

function tableToHTML(key) {
   const info = storage(key);
   const id = key.split(":")[1];
   return `
   <li class="record">
      <a href="#excel/${id}">${info.title.value}</a>
      <strong>
      ${new Date(info.date).toLocaleDateString()}
      ${new Date(info.date).toLocaleTimeString()} 
      </strong>
   </li>`;
}

function createList() {
   const keys = getAllKeys();
   if (keys.length == 0) {
      return `No tables were created`;
   }
   return `
   <div class="list-header">
      <span>Name</span>
      <span>Last opened</span>
   </div>

   <ul class="list">
      ${keys.map(tableToHTML).join('')}
   </ul>
   `;
}

export function createDashboard() {
   const now = Date.now().toString();
   return $.create('div', 'db').html(
      `<div class="db__header">
      <h1>Excel JS</h1>
  </div>
  
  <div class="db__new">
       <div class="db__view">
          <a href="#excel/${now}" class="create">New <br> table</a>
      </div>
  </div>

  <div class="db__table db__view">
  ${createList()}
  </div>`
   );
}
