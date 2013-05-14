// from yunqian@taobao.com
// https://github.com/sorrycc/webp-support/blob/master/lib/webp.js
KISSY.add(function(S) {

(function() {

  if (this.WebP) return;
  this.WebP = {};

  WebP._cb = function(isSupport, _cb) {
    this.isSupport = function(cb) {
      cb(isSupport);
    };
    _cb(isSupport);
    if (window.chrome || window.opera && window.localStorage) {
      window.localStorage.setItem("webpsupport", isSupport);
    }
  };

  WebP.isSupport = function(cb) {
    if (!cb) return;
    if (!window.chrome && !window.opera) return WebP._cb(false, cb);
    if (window.localStorage && window.localStorage.getItem("webpsupport") !== null) {
      var val = window.localStorage.getItem("webpsupport");
      WebP._cb(val === "true", cb);
      return;
    }
    var img = new Image();
    img.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    img.onload = img.onerror = function() {
      WebP._cb(img.width === 2 && img.height === 2, cb);
    };
  };

  WebP.run = function(cb) {
    this.isSupport(function(isSupport) {
      if (isSupport) cb();
    });
  };

})();

  return window.WebP;
}, {
  attach: false,
  requires: []
});
