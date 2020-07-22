class DOM {
   constructor(selector) {
      this.$el = typeof selector === 'string' ?
      document.querySelector(selector) : selector;
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
      if (html) {
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
      .forEach(([key, value]) => this.$el.style[key]=value);
      return this;
   }

   getStyle(key) {
      return this.$el.style[key];
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
