(function(){"use strict";angular.module("ilyazub.dragndrop-object",[])}).call(this),function(){"use strict";angular.module("ilyazub.dragndrop-object").directive("draggable",function(){return{require:"?ngModel",restrict:"EA",scope:{jsonData:"=?",ngModel:"=?"},link:function(a,b){var c;return c=function(b){var c,d;return c=b.dataTransfer||b.originalEvent.dataTransfer,c.effectAllowed="copy",null!=a.jsonData?(c.setData("dataType","json"),c.setData("json",a.jsonData)):null!=a.ngModel?(c.setData("dataType","object"),d=JSON.stringify(a.ngModel),c.setData("object",d)):void 0},b.on("dragstart",c)}}})}.call(this),function(){"use strict";angular.module("ilyazub.dragndrop-object").directive("droparea",function(){return{restrict:"EA",scope:{handleDrop:"&?drop",highlightClass:"@?"},link:function(a,b){var c,d,e,f;return f=function(c){return b.removeClass("highlight"),a.$apply(function(a){var b,d,e;return"function"==typeof a.handleDrop?(f=a.handleDrop(),b=c.dataTransfer||c.originalEvent.dataTransfer,d=b.getData("dataType"),e=JSON.parse(b.getData(d)),f(e)):void 0}),c.preventDefault()},c=function(c){return b.addClass(a.highlightClass),c.preventDefault()},d=function(c){return b.removeClass(a.highlightClass),c.preventDefault()},e=function(a){var b;return b=a.dataTransfer||a.originalEvent.dataTransfer,b.dropEffect="copy",a.preventDefault()},b.on("drop",f),b.on("dragenter",c),b.on("dragleave",d),b.on("dragover",e)}}})}.call(this);