    ///////////// FUNCIO MEVA BONA /////////////

Utils = {
  attachEvent: function(ele, type, fn) { // bindEvent
    if(ele.attachEvent) {
      ele.attachEvent && ele.attachEvent('on' + type, fn);
    } else {
      ele.addEventListener(type, fn, false);
    }
  },
  detachEvent: function(ele, type, fn) { // unbindEvent
    if(ele.detachEvent) {
       ele.detachEvent && ele.detachEvent('on' + type, fn);
    } else {
       ele.removeEventListener(type, fn, false);
    }
  },
  each: function (object, fn) {
    if(object && fn) {
      var l = object.length;
      for (var i = 0; i < l && fn(object[i], i) !== false; i++) {}
    }
  },
  getAbsoluteMousePosition: function(evt) {
     return { x: evt.pageX, y: evt.pageY };
  },
  getPositionRelativeToParent: function(element) {
     return {x: element.offsetLeft, y:element.offsetTop};
  },
  getAbsolutePositionElement: function(el) {
    var box = el.getBoundingClientRect(),

        body = document.body,
        docEl = document.documentElement,

        scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,

        clientTop = docEl.clientTop || body.clientTop || 0,
        clientLeft = docEl.clientLeft || body.clientLeft || 0,

        top  = box.top +  scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  },
  getBoxElement: function(element) {

      var boxElement = element.getBoundingClientRect(),
          positionElement = this.getAbsolutePositionElement(element);

      return {
        left: positionElement.left,
        top: positionElement.top,
        right: boxElement.right,
        bottom: boxElement.bottom,
        width: boxElement.right - boxElement.left,
        height: boxElement.bottom - boxElement.top
      };
   },
   getPercentage: function(qty, total) {
     return (qty / total) * 100;
   }
};

// difine alias
Utils.bindEvent = Utils.attachEvent;
Utils.unbindEvent = Utils.detachEvent;

//console.log(Utils)