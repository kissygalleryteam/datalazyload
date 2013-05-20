// from yunqian@taobao.com
// https://github.com/sorrycc/webp-support/blob/master/lib/webp.js
KISSY.add(function(S) {

(function() {

  if (this.WebP) return;
  this.WebP = {};
     function isSupportStorage(cb) {
        if ((!window.chrome && !window.opera)){
            cb(false);
            return;
        }
        var val=window.localStorage && window.localStorage.getItem("webpsupport");
        if(val!==null)
        {
            cb(val === "true");
            return;
        }
         isSupportTest(function(isSupport){
            window.localStorage && window.localStorage.setItem("webpsupport", isSupport);
            cb(isSupport);
        });
    }
    function isSupportTest(cb) {
        var img = new Image();
        img.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        img.onload = img.onerror = function() {
            cb(img.width === 2 && img.height === 2);
        };
    }
    WebP.isSupport = function(cb) {
        if (!cb) return;
        if(WebP._isSupport===undefined){
            isSupportStorage(function(isSupport){
                cb(WebP._isSupport=isSupport);
            });
            return;
        }
        cb(WebP._isSupport);
    }
})();

  return window.WebP;
}, {
  attach: false,
  requires: []
});
