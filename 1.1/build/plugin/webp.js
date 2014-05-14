/*
combined files : 

gallery/datalazyload/1.1/plugin/webp

*/
// from yunqian@taobao.com
// https://github.com/sorrycc/webp-support/blob/master/lib/webp.js
KISSY.add('gallery/datalazyload/1.1/plugin/webp',function (S) {
    function isSupportStorage(cb) {
        // webkit内核的浏览器支持webp，如safari，所以下面的判断不正��?
//        if ((!window.chrome && !window.opera)) {
//            cb(false);
//            return;
//        }
        var val = window.localStorage && window.localStorage.getItem('webpsupport');
        if (val !== null) {
            cb(val === 'true');
            return;
        }
        isSupportTest(function (isSupport) {
            window.localStorage && window.localStorage.setItem('webpsupport', isSupport);
            cb(isSupport);
        });
    }

    function isSupportTest(cb) {
        var img = new Image();
        img.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        img.onload = img.onerror = function () {
            S.log('webp is supported!');
            cb(img.width === 2 && img.height === 2);
        };
    }

    var WebP = window.WebP = {};
    WebP.isSupport = function (cb) {
        if (!cb) return;
        if (WebP._isSupport === undefined) {
            isSupportStorage(function (isSupport) {
                cb(WebP._isSupport = isSupport);
            });
            return;
        }
        cb(WebP._isSupport);
    };

    return WebP;
}, {
    attach: false
});

