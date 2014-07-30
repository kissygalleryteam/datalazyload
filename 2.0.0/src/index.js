/**
 * @fileoverview
 * @author
 * @module datalazyload
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     *
     * @class Datalazyload
     * @constructor
     * @extends Base
     */
    function Datalazyload(comConfig) {
        var self = this;
        //调用父类构造函数
        Datalazyload.superclass.constructor.call(self, comConfig);
    }
    S.extend(Datalazyload, Base, /** @lends Datalazyload.prototype*/{

    }, {ATTRS : /** @lends Datalazyload*/{

    }});
    return Datalazyload;
}, {requires:['node', 'base']});



