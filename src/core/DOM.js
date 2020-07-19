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

   on(eventType, callback) {
      this.$el.addEventListener(eventType, callback);
      return this;
   }

   off(eventType, callback) {
      this.$el.removeEventListener(eventType, callback);
      return this;
   }
}

export function $(selector) {
   return new DOM(selector);
}


$.create = (tagName, classes = '') => {
   const $el = document.createElement(tagName);
   if (classes) {
      $el.classList.add(classes);
   }
   return $($el);
};
