/*
 *  es6-module-loader v0.17.8
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Copyright (c) 2015 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */

!function(a){function b(a,c){if("string"!=typeof a)throw new TypeError("URL must be a string");var d=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(?:\/\/(?:([^:@\/?#]*)(?::([^:@\/?#]*))?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);if(!d)throw new RangeError;var e=d[1]||"",f=d[2]||"",g=d[3]||"",h=d[4]||"",i=d[5]||"",j=d[6]||"",k=d[7]||"",l=d[8]||"",m=d[9]||"";if(void 0!==c){var n=c instanceof b?c:new b(c),o=""===e&&""===h&&""===f;o&&""===k&&""===l&&(l=n.search),o&&"/"!==k.charAt(0)&&(k=""!==k?(""===n.host&&""===n.username||""!==n.pathname?"":"/")+n.pathname.slice(0,n.pathname.lastIndexOf("/")+1)+k:n.pathname);var p=[];k.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?p.pop():p.push(a)}),k=p.join("").replace(/^\//,"/"===k.charAt(0)?"/":""),o&&(j=n.port,i=n.hostname,h=n.host,g=n.password,f=n.username),""===e&&(e=n.protocol)}"file:"==e&&(k=k.replace(/\\/g,"/")),this.origin=e+(""!==e||""!==h?"//":"")+h,this.href=e+(""!==e||""!==h?"//":"")+(""!==f?f+(""!==g?":"+g:"")+"@":"")+h+k+l+m,this.protocol=e,this.username=f,this.password=g,this.host=h,this.hostname=i,this.port=j,this.pathname=k,this.search=l,this.hash=m}a.URLPolyfill=b}("undefined"!=typeof self?self:global),function(a){function b(a,b){var c;if(a instanceof Error){var c=new Error(a.message,a.fileName,a.lineNumber);i?(c.message=a.message+"\n	"+b,c.stack=a.stack):(c.message=a.message,c.stack=a.stack+"\n	"+b)}else c=a+"\n	"+b;return c}function c(a,c,d){try{new Function(a).call(d)}catch(e){throw b(e,"Evaluating "+c)}}function d(){}function e(b){this._loader={loaderObj:this,loads:[],modules:{},importPromises:{},moduleRecords:{}},k(this,"global",{get:function(){return a}})}function f(){e.call(this),this.paths={}}function g(a,b){var c,d="",e=0;for(var f in a){var g=f.split("*");if(g.length>2)throw new TypeError("Only one wildcard in a path is permitted");if(1==g.length){if(b==f){d=f;break}}else{var h=f.split("/").length;h>=e&&b.substr(0,g[0].length)==g[0]&&b.substr(b.length-g[1].length)==g[1]&&(e=h,d=f,c=b.substr(g[0].length,b.length-g[1].length-g[0].length))}}var i=a[d]||b;return"string"==typeof c&&(i=i.replace("*",c)),i}function h(){}var i=("undefined"==typeof window&&"undefined"!=typeof self&&"undefined"!=typeof importScripts,"undefined"!=typeof window&&"undefined"!=typeof document),j="undefined"!=typeof process&&!!process.platform.match(/^win/);a.console||(a.console={assert:function(){}});var k,l=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1};!function(){try{Object.defineProperty({},"a",{})&&(k=Object.defineProperty)}catch(a){k=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}}();var m;if("undefined"!=typeof document&&document.getElementsByTagName){if(m=document.baseURI,!m){var n=document.getElementsByTagName("base");m=n[0]&&n[0].href||window.location.href}m=m.split("#")[0].split("?")[0],m=m.substr(0,m.lastIndexOf("/")+1)}else if("undefined"!=typeof process&&process.cwd)m="file://"+(j?"/":"")+process.cwd()+"/",j&&(m=m.replace(/\\/g,"/"));else{if("undefined"==typeof location)throw new TypeError("No environment baseURI");m=a.location.href}var o=a.URLPolyfill||a.URL;k(d.prototype,"toString",{value:function(){return"Module"}}),function(){function f(a){return{status:"loading",name:a,linkSets:[],dependencies:[],metadata:{}}}function g(a,b,c){return new Promise(n({step:c.address?"fetch":"locate",loader:a,moduleName:b,moduleMetadata:c&&c.metadata||{},moduleSource:c.source,moduleAddress:c.address}))}function h(a,b,c,d){return new Promise(function(e,f){e(a.loaderObj.normalize(b,c,d))}).then(function(b){var c;if(a.modules[b])return c=f(b),c.status="linked",c.module=a.modules[b],c;for(var d=0,e=a.loads.length;e>d;d++)if(c=a.loads[d],c.name==b)return c;return c=f(b),a.loads.push(c),i(a,c),c})}function i(a,b){j(a,b,Promise.resolve().then(function(){return a.loaderObj.locate({name:b.name,metadata:b.metadata})}))}function j(a,b,c){m(a,b,c.then(function(c){return"loading"==b.status?(b.address=c,a.loaderObj.fetch({name:b.name,metadata:b.metadata,address:c})):void 0}))}function m(b,d,e){e.then(function(e){return"loading"==d.status?Promise.resolve(b.loaderObj.translate({name:d.name,metadata:d.metadata,address:d.address,source:e})).then(function(a){return d.source=a,b.loaderObj.instantiate({name:d.name,metadata:d.metadata,address:d.address,source:a})}).then(function(e){if(void 0===e)return d.address=d.address||"<Anonymous Module "+ ++A+">",d.isDeclarative=!0,z.call(b.loaderObj,d).then(function(b){var e=a.System,f=e.register;e.register=function(a,b,c){"string"!=typeof a&&(c=b,b=a),d.declare=c,d.depsList=b},c(b,d.address,{}),e.register=f});if("object"!=typeof e)throw TypeError("Invalid instantiate return value");d.depsList=e.deps||[],d.execute=e.execute,d.isDeclarative=!1}).then(function(){d.dependencies=[];for(var a=d.depsList,c=[],e=0,f=a.length;f>e;e++)(function(a,e){c.push(h(b,a,d.name,d.address).then(function(b){if(d.dependencies[e]={key:a,value:b.name},"linked"!=b.status)for(var c=d.linkSets.concat([]),f=0,g=c.length;g>f;f++)p(c[f],b)}))})(a[e],e);return Promise.all(c)}).then(function(){d.status="loaded";for(var a=d.linkSets.concat([]),b=0,c=a.length;c>b;b++)r(a[b],d)}):void 0})["catch"](function(a){d.status="failed",d.exception=a;for(var b=d.linkSets.concat([]),c=0,e=b.length;e>c;c++)s(b[c],d,a)})}function n(a){return function(b,c){var d=a.loader,e=a.moduleName,g=a.step;if(d.modules[e])throw new TypeError('"'+e+'" already exists in the module table');for(var h,k=0,l=d.loads.length;l>k;k++)if(d.loads[k].name==e&&(h=d.loads[k],"translate"!=g||h.source||(h.address=a.moduleAddress,m(d,h,Promise.resolve(a.moduleSource))),h.linkSets.length))return h.linkSets[0].done.then(function(){b(h)});var n=h||f(e);n.metadata=a.moduleMetadata;var p=o(d,n);d.loads.push(n),b(p.done),"locate"==g?i(d,n):"fetch"==g?j(d,n,Promise.resolve(a.moduleAddress)):(n.address=a.moduleAddress,m(d,n,Promise.resolve(a.moduleSource)))}}function o(a,b){var c={loader:a,loads:[],startingLoad:b,loadingCount:0};return c.done=new Promise(function(a,b){c.resolve=a,c.reject=b}),p(c,b),c}function p(a,b){if("failed"!=b.status){for(var c=0,d=a.loads.length;d>c;c++)if(a.loads[c]==b)return;a.loads.push(b),b.linkSets.push(a),"loaded"!=b.status&&a.loadingCount++;for(var e=a.loader,c=0,d=b.dependencies.length;d>c;c++)if(b.dependencies[c]){var f=b.dependencies[c].value;if(!e.modules[f])for(var g=0,h=e.loads.length;h>g;g++)if(e.loads[g].name==f){p(a,e.loads[g]);break}}}}function q(a){var b=!1;try{w(a,function(c,d){s(a,c,d),b=!0})}catch(c){s(a,null,c),b=!0}return b}function r(a,b){if(a.loadingCount--,!(a.loadingCount>0)){var c=a.startingLoad;if(a.loader.loaderObj.execute===!1){for(var d=[].concat(a.loads),e=0,f=d.length;f>e;e++){var b=d[e];b.module=b.isDeclarative?{name:b.name,module:B({}),evaluated:!0}:{module:B({})},b.status="linked",t(a.loader,b)}return a.resolve(c)}var g=q(a);g||a.resolve(c)}}function s(a,c,d){var e=a.loader;a:if(c)if(a.loads[0].name==c.name)d=b(d,"Error loading "+c.name);else{for(var f=0;f<a.loads.length;f++)for(var g=a.loads[f],h=0;h<g.dependencies.length;h++){var i=g.dependencies[h];if(i.value==c.name){d=b(d,"Error loading "+c.name+' as "'+i.key+'" from '+g.name);break a}}d=b(d,"Error loading "+c.name+" from "+a.loads[0].name)}else d=b(d,"Error linking "+a.loads[0].name);for(var j=a.loads.concat([]),f=0,k=j.length;k>f;f++){var c=j[f];e.loaderObj.failed=e.loaderObj.failed||[],-1==l.call(e.loaderObj.failed,c)&&e.loaderObj.failed.push(c);var m=l.call(c.linkSets,a);if(c.linkSets.splice(m,1),0==c.linkSets.length){var n=l.call(a.loader.loads,c);-1!=n&&a.loader.loads.splice(n,1)}}a.reject(d)}function t(a,b){if(a.loaderObj.trace){a.loaderObj.loads||(a.loaderObj.loads={});var c={};b.dependencies.forEach(function(a){c[a.key]=a.value}),a.loaderObj.loads[b.name]={name:b.name,deps:b.dependencies.map(function(a){return a.key}),depMap:c,address:b.address,metadata:b.metadata,source:b.source,kind:b.isDeclarative?"declarative":"dynamic"}}b.name&&(a.modules[b.name]=b.module);var d=l.call(a.loads,b);-1!=d&&a.loads.splice(d,1);for(var e=0,f=b.linkSets.length;f>e;e++)d=l.call(b.linkSets[e].loads,b),-1!=d&&b.linkSets[e].loads.splice(d,1);b.linkSets.splice(0,b.linkSets.length)}function u(a,b,c){try{var e=b.execute()}catch(f){return void c(b,f)}return e&&e instanceof d?e:void c(b,new TypeError("Execution must define a Module instance"))}function v(a,b,c){var d=a._loader.importPromises;return d[b]=c.then(function(a){return d[b]=void 0,a},function(a){throw d[b]=void 0,a})}function w(a,b){var c=a.loader;if(a.loads.length)for(var d=a.loads.concat([]),e=0;e<d.length;e++){var f=d[e],g=u(a,f,b);if(!g)return;f.module={name:f.name,module:g},f.status="linked",t(c,f)}}function x(a,b){return b.module.module}function y(){}function z(){throw new TypeError("ES6 transpilation is only provided in the dev module loader build.")}var A=0;e.prototype={constructor:e,define:function(a,b,c){if(this._loader.importPromises[a])throw new TypeError("Module is already loading.");return v(this,a,new Promise(n({step:"translate",loader:this._loader,moduleName:a,moduleMetadata:c&&c.metadata||{},moduleSource:b,moduleAddress:c&&c.address})))},"delete":function(a){var b=this._loader;return delete b.importPromises[a],delete b.moduleRecords[a],b.modules[a]?delete b.modules[a]:!1},get:function(a){return this._loader.modules[a]?(y(this._loader.modules[a],[],this),this._loader.modules[a].module):void 0},has:function(a){return!!this._loader.modules[a]},"import":function(a,b,c){"object"==typeof b&&(b=b.name);var d=this;return Promise.resolve(d.normalize(a,b)).then(function(a){var b=d._loader;return b.modules[a]?(y(b.modules[a],[],b._loader),b.modules[a].module):b.importPromises[a]||v(d,a,g(b,a,{}).then(function(c){return delete b.importPromises[a],x(b,c)}))})},load:function(a,b){var c=this._loader;return c.modules[a]?(y(c.modules[a],[],c),Promise.resolve(c.modules[a].module)):c.importPromises[a]||v(this,a,g(c,a,{}).then(function(b){return delete c.importPromises[a],x(c,b)}))},module:function(a,b){var c=f();c.address=b&&b.address;var d=o(this._loader,c),e=Promise.resolve(a),g=this._loader,h=d.done.then(function(){return x(g,c)});return m(g,c,e),h},newModule:function(a){if("object"!=typeof a)throw new TypeError("Expected object");var b,c=new d;if(Object.getOwnPropertyNames&&null!=a)b=Object.getOwnPropertyNames(a);else{b=[];for(var e in a)b.push(e)}for(var f=0;f<b.length;f++)(function(b){k(c,b,{configurable:!1,enumerable:!0,get:function(){return a[b]}})})(b[f]);return Object.preventExtensions&&Object.preventExtensions(c),c},set:function(a,b){if(!(b instanceof d))throw new TypeError("Loader.set("+a+", module) must be a module");this._loader.modules[a]={module:b}},normalize:function(a,b,c){return a},locate:function(a){return a.name},fetch:function(a){},translate:function(a){return a.source},instantiate:function(a){}};var B=e.prototype.newModule}();var p;h.prototype=e.prototype,f.prototype=new h;var q=/^([^\/]+:\/\/|\/)/;f.prototype.normalize=function(a,b,c){return a=a.match(q)||"."==a[0]?new o(a,b||m).href:new o(g(this.paths,a),m).href},f.prototype.locate=function(a){return a.name},f.prototype.instantiate=function(b){var d=this;return Promise.resolve(d.normalize(d.transpiler)).then(function(e){return b.address===e?{deps:[],execute:function(){var e=a.System,f=a.Reflect.Loader;return c("(function(require,exports,module){"+b.source+"})();",b.address,a),a.System=e,a.Reflect.Loader=f,d.newModule({"default":a[d.transpiler],__useDefault:!0})}}:void 0})};var r;if("undefined"!=typeof XMLHttpRequest)r=function(a,b,c,d){function e(){c(g.responseText)}function f(){d(new Error("XHR error"+(g.status?" ("+g.status+(g.statusText?" "+g.statusText:"")+")":"")+" loading "+a))}var g=new XMLHttpRequest,h=!0,i=!1;if(!("withCredentials"in g)){var j=/^(\w+:)?\/\/([^\/]+)/.exec(a);j&&(h=j[2]===window.location.host,j[1]&&(h&=j[1]===window.location.protocol))}h||"undefined"==typeof XDomainRequest||(g=new XDomainRequest,g.onload=e,g.onerror=f,g.ontimeout=f,g.onprogress=function(){},g.timeout=0,i=!0),g.onreadystatechange=function(){4===g.readyState&&(200===g.status||0==g.status&&g.responseText?e():f())},g.open("GET",a,!0),g.setRequestHeader&&(g.setRequestHeader("Accept","application/x-es-module, */*"),b&&("string"==typeof b&&g.setRequestHeader("Authorization",b),g.withCredentials=!0)),i?setTimeout(function(){g.send()},0):g.send(null)};else{if("undefined"==typeof require)throw new TypeError("No environment fetch API available.");var s;r=function(a,b,c,d){if("file:///"!=a.substr(0,8)){if("function"==typeof fetch){var e={accept:"application/x-es-module, */*"};b&&"string"==typeof b&&(e.authorization=b),fetch.__fetchCache=fetch.__fetchCache||{};var f=fetch.__fetchCache[a];return f&&f.lastModified&&(e["if-modified-since"]=f.lastModified),fetch(a,{cache:"default",headers:e,method:"GET"}).then(function(b){return b.status>=200&&b.status<400?304===b.status&&f&&f.responseText?c(f.responseText):b.text().then(function(d){var e=d+"";return"\ufeff"===e[0]&&(e=e.substr(1)),fetch.__fetchCache[a]={lastModified:b.headers.get("last-modified"),responseText:e},c(e)}):d(new Error(b.statusText))})["catch"](function(a){return d(a)})}throw new Error('Unable to fetch "'+a+'". Only file URLs of the form file:/// allowed running in Node.')}return s=s||require("fs"),a=j?a.replace(/\//g,"\\").substr(8):a.substr(7),s.readFile(a,function(a,b){if(a)return d(a);var e=b+"";"\ufeff"===e[0]&&(e=e.substr(1)),c(e)})}}f.prototype.fetch=function(a){return new Promise(function(b,c){r(a.address,void 0,b,c)})},"object"==typeof exports&&(module.exports=e),a.Reflect=a.Reflect||{},a.Reflect.Loader=a.Reflect.Loader||e,a.Reflect.global=a.Reflect.global||a,a.LoaderPolyfill=e,p||(p=new f,p.constructor=f),"object"==typeof exports&&(module.exports=p),a.System=p}("undefined"!=typeof self?self:global);
//# sourceMappingURL=es6-module-loader.js.map