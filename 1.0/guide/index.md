DataLazyload
============

数据延迟加载组件.
很多时候, 用户在第一屏就发生了跳转, 大量”未曾露面”的图片下载对用户来说是无意义的.
`DataLazyload` 可以 “揣测” 用户的行为, 当用户想看某个区域时, 才开始下载这个区域的图片.
除了延迟图片下载, DataLazyload 还可以延迟某个区域的所有 html 的渲染, 这对 Tabs 等 UI 组件很有裨益, 能提高整个页面的性能.

## 组件使用
```js
KISSY.use('gallery/datalazyload/1.0/',function(S,DataLazyload){
    // use DataLazyload
});
```
### [demo](../demo/index.html)

## Class
* DataLazyload

## Configs
* diff
* placeholder
* execScript
* autoDestroy
* onStart

## Methods
* addCallback()
* removeCallback()
* addElements()
* removeElements()
* getElements()
* refresh()
* pause()
* resume()
* destroy()

## Static Methods
* loadCustomLazyData()
* isWebpSupported()

## Class Detail
### DataLazyload (config)
* 继承自 Base
* Parameters:
 * config (Object) – 配置项, 详细见下方 `Configs Detail`.

*Note*
容器内需要懒加载的图片的真实地址需要放在 `data-ks-lazyload 中`。 需要懒加载的 `textarea` 需具备样式类 `ks-datalazyload`

## Configs Detail
* autoDestroy
  * {Boolean} - 默认为 true , 当初始化时检测到的容器内懒加载元素都加载完毕后是否自动调用 destroy 方法
* container
  * {String|HTMLElement} - 默认为 document , 图片所在容器，当懒加载元素在容器中和视窗中同时出现时进行渲染。
* diff
  * {Number|Object} -
  * Number 类型时当前视窗往下, diff px 外的 img/textarea 延迟加载, 适当设置此值, 可以让用户在拖动时感觉数据已经加载好, 默认为当前视窗（容器视窗）高度(两屏以外的才延迟加载).
  * Object 类型可以指定 left/top/right/bottom 数值，表示预加载当前视窗（容器视窗）以外上下左右的距离的元素.
* placeholder
  * {String} - 默认为 http://a.tbcdn.cn/kissy/1.0.0/build/imglazyload/spaceball.gif, 如果懒加载图像没有设置 src 则作为图像的占位图.
* execScript
  * {Boolean} - 默认为 true , 是否执行 textarea 里面的脚本.
* onStart
  * {Function} 默认值为 null, 替换 src 之前调用的函数, 可以对图片地址做处理, 如 webp 的加载
    * {Function}, 推荐
      ```js
      DataLazyload.isWebpSupported(function(isSupported) {
          var conf = {};
          if (isSupported) {
              /**
               * obj {Object}
               *  - type: 'img' || 'textarea'
               *  - elem: HtmlElement
               *  - src 如果 type 是 'img', 存在这个属性, 为图片地址
               *  - value 如果 type 是 'textarea', 存在这个属性, 为 textarea.value
               */
              conf.onStart = function(obj) {
                if (obj.type == 'img') {
                  var src = obj.data.src;
                  if (src.indexOf('taobaocdn.com') !== -1 && (src.indexOf('.jpg') || src.indexOf('.png'))) {
                    src += '_.webp';
                  }

                  S.log(src);

                  return src;
                }
              };
          }
          DataLazyload('#J_webpEnabled', conf);
      });
      ```

## Methods Detail
* addCallback (el, fn)
  * 添加回调函数. 当 el 即将出现在视图中时, 触发 fn
* removeCallback (el, fn)
  * 删除回调函数. 参数同 addCallback
* addElements (els)
  * 添加元素到懒加载列表.
  * Parameters:
     * els (HTMLElement[]) – 新的懒加载元素列表
* removeElements (els)
  * 从懒加载列表中删除元素.
  * Parameters:
     *  els (HTMLElement[]) – 已有的懒加载元素列表
* getElements ()
  * 得到懒加载元素列表
  * ::returns: {Object} eg: {images:[],textareas:[]}
* refresh ()
  * 强制立刻检测懒加载元素
* pause ()
  * 暂停监控懒加载元素
* resume ()
  * 继续监控懒加载元素
* destroy ()
  * 停止监控并销毁组件

## Static Methods Detail
* static loadCustomLazyData (containers, type)
  * 加载自定义延迟数据
  * Parameters:
     * containers (HTMLElement[]) – 包含自定义延迟加载项的容器元素
     * type (String) – 延迟加载方式, 可取:
         - `textarea` 或 `area-data` , 即表示延迟加载使用的是 textarea 方式;
             此时 textarea 需要有样式类 `ks-datalazyload-custom`
         - `img` 或 `img-src`, 即表示延迟加载使用的是 img 方式.
            此时 img 的真实地址须放在属性 `data-ks-lazyload-custom` 中

* static isWebpSupported (callback)
  * 浏览器是否支持 webp
  * Parameters:
    * callback (Function) - 接受一个参数{Boolean}, 表示浏览器是否支持 webp 格式

## Note
当 第一个调用参数为数组时进入兼容模式( 1.2 )，此时懒加载元素是否渲染不判断是否在容器内，只判断是否出现在视窗中。例如
```js
new DataLazyLoad([document.getElementById('x1'),document.getElementById('x2')]);
```
*几点性能注意：*
- autoDestroy 属性默认为 true ，那么当初始化时检测到的容器内懒加载元素都加载完毕后会自动调用 destroy 方法，若容器后面可能有动态添加的懒加载元素，请设置 autoDestroy 属性为false，并在后期手动调用 destroy 方法

- 请注意实例化多个容器互相嵌套的 datalazyload 时重复检测问题，例如

    实例1
    
    ```js
    new DataLazyLoad({
        container: document
    });
    ```
    
    实例2
    
    ```js
    new DataLazyLoad({
        container: '#xx'
    });
    ```
    
    若 `#xx` 的懒加载元素在实例1实例化前就存在，则会导致实例1与实例2重复检测同一元素问题.



- 请注意不显示元素的检测，例如实例
    
    ```js
    var  = new DataLazyLoad({
        container: '#yy'
    });
    ```
    若某种情况下，例如 tab 切换导致 `#yy.display='none'`，之后的所有监控都是性能浪费. 此时可以调用 `pause` 方法来暂停该实例的检测，
    
    ```js
    d.pause();
    ```
    在再次 tab 切换后，`#yy.display=''` ，调用 resume 来重新监控.
    
    ```js
    d.resume();
    ```
