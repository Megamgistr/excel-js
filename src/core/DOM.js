class DOM {
   constructor(selector) {
      this.$el = typeof selector === 'string' ?
         document.querySelector(selector) : selector;
   }

   setText(text) {
      this.$el.textContent = text;
   }

   getText() {
     return this.$el.tagName != "INPUT" ?
         this.$el.textContent.trim() :
         this.$el.value;
   }

   getRootElement() {
      return this.$el;
   }
   append(element) {
      if (element instanceof DOM) {
         element = element.$el;
      }
      this.$el.append(element);
      return this;
   }

   html(html) {
      if (html != undefined) {
         this.$el.innerHTML = html;
         return this;
      }
      return this.$el.outerHTML.trim();
   }

   clear() {
      this.html('');
      return this;
   }

   parent(selector) {
      return $(this.$el.closest(selector));
   }

   setStyle(styles = {}) {
      Object.entries(styles)
         .forEach(([key, value]) => this.$el.style[key] = value);
      return this;
   }

   getStyle(key) {
      return this.$el.style[key];
   }

   getStyles(keys = []) {
      return keys.reduce((acc, key) => {
         acc[key] = this.$el.style[key];
         return acc;
      }, {});
   }

   attr(name, value) {
      if (value) {
         this.$el.setAttribute(name, value);
         return this;
      }
      return this.$el.getAttribute(name);
   }

   on(eventType, callback) {
      this.$el.addEventListener(eventType, callback);
      return this;
   }

   off(eventType, callback) {
      this.$el.removeEventListener(eventType, callback);
      return this;
   }

   getCoords() {
      return this.$el.getBoundingClientRect();
   }

   dataset() {
      return this.$el.dataset;
   }

   contains(className) {
      return this.$el.classList.contains(className);
   }

   removeClass(className) {
      this.$el.classList.remove(className);
   }

   setClass(className) {
      this.$el.classList.add(className);
   }

   find(selector) {
      return $(this.$el.querySelector(selector));
   }

   focus() {
      this.$el.focus();
      return this;
   }
}

export function $(selector) {
   return new DOM(selector);
}

export function $$(selector, $root) {
   if ($root) {
      return [...$root.getRootElement().querySelectorAll(selector)]
         .map(el => new DOM(el));
   }
   return [...document.querySelectorAll(selector)].map(el => new DOM(el));
}


$.create = (tagName, classes = '') => {
   const $el = document.createElement(tagName);
   if (classes) {
      $el.classList.add(classes);
   }
   return $($el);
};
