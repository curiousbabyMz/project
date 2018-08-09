var __reflect=this&&this.__reflect||function(e,t,r){e.__class__=t,r?r.push(t):r=[t],e.__types__=e.__types__?r.concat(e.__types__):r},__extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a]);r.prototype=t.prototype,e.prototype=new r},__awaiter=this&&this.__awaiter||function(e,t,r,a){return new(r||(r=Promise))(function(i,n){function o(e){try{c(a.next(e))}catch(t){n(t)}}function s(e){try{c(a["throw"](e))}catch(t){n(t)}}function c(e){e.done?i(e.value):new r(function(t){t(e.value)}).then(o,s)}c((a=a.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function r(e){return function(t){return a([e,t])}}function a(r){if(i)throw new TypeError("Generator is already executing.");for(;c;)try{if(i=1,n&&(o=n[2&r[0]?"return":r[0]?"throw":"next"])&&!(o=o.call(n,r[1])).done)return o;switch(n=0,o&&(r=[0,o.value]),r[0]){case 0:case 1:o=r;break;case 4:return c.label++,{value:r[1],done:!1};case 5:c.label++,n=r[1],r=[0];continue;case 7:r=c.ops.pop(),c.trys.pop();continue;default:if(o=c.trys,!(o=o.length>0&&o[o.length-1])&&(6===r[0]||2===r[0])){c=0;continue}if(3===r[0]&&(!o||r[1]>o[0]&&r[1]<o[3])){c.label=r[1];break}if(6===r[0]&&c.label<o[1]){c.label=o[1],o=r;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(r);break}o[2]&&c.ops.pop(),c.trys.pop();continue}r=t.call(e,c)}catch(a){r=[6,a],n=0}finally{i=o=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}var i,n,o,s,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:r(0),"throw":r(1),"return":r(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},controller=function(e){function t(){var t=e.call(this)||this;return t.areaR=100,t.graphics.beginFill(15724527,.3),t.graphics.drawCircle(0,0,t.areaR),t.sctl=new control,t.addChild(t.sctl),t.touchEnabled=!0,t}return __extends(t,e),t}(egret.Sprite);__reflect(controller.prototype,"controller");var control=function(e){function t(){var t=e.call(this)||this;return t.R=50,t.graphics.beginFill(16777215,1),t.graphics.lineStyle(1,11184810,.7),t.graphics.drawCircle(0,0,t.R),t}return __extends(t,e),t}(egret.Sprite);__reflect(control.prototype,"control");var Food=function(e){function t(t){var r=e.call(this)||this;return r.graphics.beginFill(16776960,1),r.graphics.drawCircle(0,0,t),r}return __extends(t,e),t}(egret.Sprite);__reflect(Food.prototype,"Food");var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var magnitude=function(){function e(){}return e.prototype.toMag=function(e,t){var r={arc:0,len:0};return r.arc=Math.atan2(t,e),r.len=Math.sqrt(Math.pow(e,2)+Math.pow(t,2)),r},e.prototype.toVec=function(e,t){var r={x:0,y:0};return r.x=t*Math.sin(e),r.y=t*Math.cos(e),r},e}();__reflect(magnitude.prototype,"magnitude");var Main=function(e){function t(){var t=e.call(this)||this;return t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(t,e),t.prototype.onAddToStage=function(e){egret.lifecycle.addLifecycleListener(function(e){e.onUpdate=function(){}}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()},this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return[4,this.loadResource()];case 1:return r.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=r.sent(),[4,platform.login()];case 3:return r.sent(),[4,platform.getUserInfo()];case 4:return t=r.sent(),console.log(t),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return r.sent(),[4,RES.loadGroup("preload",0,e)];case 2:return r.sent(),this.stage.removeChild(e),[3,4];case 3:return t=r.sent(),console.error(t),[3,4];case 4:return[2]}})})},t.prototype.createGameScene=function(){function e(e){w.visible=!0,w.x=e.stageX,w.y=e.stageY,u.move()}function t(e){var t=e.stageX-w.x,r=e.stageY-w.y,a=l.toMag(r,t);a.len<=w.areaR?(w.sctl.x=t,w.sctl.y=r):(a.len=w.areaR,w.sctl.y=l.toVec(a.arc,a.len).y,w.sctl.x=l.toVec(a.arc,a.len).x),u.move(a.arc,a.len/w.areaR*.5+.5)}function r(e){w.sctl.x=0,w.sctl.y=0,w.visible=!1,u.magSpeed.pec=.5}function a(i){m.visible=!1;for(var n=0;n<u._body.length;n++)g.stage.removeChild(g.stage.getChildByName("body"+n));g.stage.addChild(b),g.stage.addChild(u._head),u._head.x=g.stage.stageWidth/2,u._head.y=g.stage.stageHeight/2,u.reset(),g.stage.addChild(u._body[0]),u._body[0].name="body0",u.magSpeed.pec=.5,u.magSpeed.arc=Math.PI,u.move(),h(),c(0),x=0,b.text="score:"+x,w.x=i.stageX,w.y=i.stageY,g.stage.addEventListener("touchBegin",e,g),g.stage.addEventListener("touchMove",t,g),g.stage.addEventListener("touchEnd",r,g),g.stage.removeEventListener("touchBegin",a,g),egret.startTick(s,g)}function i(){u.stop(),egret.log("out"),m.text="Game over\nTap to restart",m.visible=!0,w.visible=!1,egret.stopTick(s,g),g.stage.removeEventListener("touchBegin",e,g),g.stage.removeEventListener("touchMove",t,g),g.stage.removeEventListener("touchEnd",r,g),g.stage.addEventListener("touchBegin",a,g)}function n(){u.createTail(),g.stage.addChild(u._body[u._body.length-1]),u._body[u._body.length-1].name="body"+(u._body.length-1)}function o(){n(),n()}function s(e){if(u._head.hitTestPoint(v.x,v.y)){"lfood"==v.name?(o(),o(),x+=2,b.text="score:"+x):(o(),x++,b.text="score:"+x),h();var t=Math.round(5*Math.random());c(0==t?1:0)}return(u._head.x<0||u._head.y<0||u._head.x>g.stage.stageWidth||u._head.y>g.stage.stageHeight)&&i(),!1}function c(e){var t=4*p+Math.round(Math.random()*(g.stage.stageWidth-8*p)),r=5*p+Math.round(Math.random()*(g.stage.stageHeight-10*p));switch(e){case 0:g.stage.addChild(y),v=y,y.x=t,y.y=r;break;case 1:g.stage.addChild(f),v=f,f.x=t,f.y=r}}function h(){g.stage.getChildByName("lfood")&&g.stage.removeChild(f),g.stage.getChildByName("sfood")&&g.stage.removeChild(y),v=null}var d=new egret.Shape;d.graphics.beginFill(10066329,1),d.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight),d.graphics.endFill(),this.stage.addChild(d);var l=new magnitude,g=this,u=new Snake(21930,20),_=5,p=10,y=new Food(_);y.name="sfood";var f=new Food(p);f.name="lfood";var v,m=new egret.TextField;m.text="Tap to Start",m.textAlign="center",m.width=this.stage.stageWidth,m.y=50,m.textColor=10027008,m.name="txt",this.stage.addChild(m);var x=0,b=new egret.TextField;b.text="score:"+x,b.textAlign="center",b.width=this.stage.stageWidth,b.textColor=16777215,b.name="scoretxt",this.stage.addChild(b);var w=new controller;w.alpha=.6,this.stage.addChild(w),w.visible=!1,this.stage.addEventListener("touchBegin",a,this)},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,r=RES.getRes(e);return t.texture=r,t},t.prototype.startAnimation=function(e){var t=this,r=new egret.HtmlTextParser,a=e.map(function(e){return r.parse(e)}),i=this.textfield,n=-1,o=function(){n++,n>=a.length&&(n=0);var e=a[n];i.textFlow=e;var r=egret.Tween.get(i);r.to({alpha:1},200),r.wait(2e3),r.to({alpha:0},200),r.call(o,t)};o()},t}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Snake=function(e){function t(t,r){var a=e.call(this)||this;return a._body=[],a._speed=5,a.magSpeed={arc:Math.PI,pec:.5},a.mag=new magnitude,a._size=r,a._color=t,a._TailVec={x:0,y:0},a.exArc=Math.PI,a.createHead(),a}return __extends(t,e),t.prototype.reset=function(){this._body=[],this.createTail()},t.prototype.createHead=function(){this._head=new Head(this._color,this._size),egret.log("createHead")},t.prototype.createTail=function(){this._body.push(new body(this._color,1*this._size/2)),1!=this._body.length&&(this._body[this._body.length-1].x=this._body[this._body.length-2]._TailVec.x,this._body[this._body.length-1].y=this._body[this._body.length-2]._TailVec.y),egret.log("createTail")},t.prototype.move=function(e,t){var r=this;void 0===e&&(e=this.magSpeed.arc),void 0===t&&(t=this.magSpeed.pec),this.magSpeed.arc=e,this.magSpeed.pec=t,this.delay=this._size/(this._speed*this.magSpeed.pec),this._head.rotation=180*(Math.PI-e)/Math.PI,this._head.arc=e,egret.startTick(this.actionH,this),this._body.map(function(e,t){0==t?e.rotation=r._head.rotation+180:e.rotation=r._body[t-1].rotation,e.arc=(180-e.rotation)*Math.PI/180})},t.prototype.stop=function(){egret.stopTick(this.actionH,this)},t.prototype.actionH=function(){var e=this,t=this.mag.toVec(this.magSpeed.arc,this._speed*this.magSpeed.pec).x,r=this.mag.toVec(this.magSpeed.arc,this._speed*this.magSpeed.pec).y;return this._head.x+=t,this._head.y+=r,this._head._TailVec.x=this._head.x+this.mag.toVec(this._head.arc-Math.PI,1.5*this._size).x,this._head._TailVec.y=this._head.y+this.mag.toVec(this._head.arc-Math.PI,1.5*this._size).y,this._body[0].x=this._head._TailVec.x,this._body[0].y=this._head._TailVec.y,this.nwArc=this.magSpeed.arc,this.delay=this._size/(this._speed*this.magSpeed.pec)*(Math.abs(this.nwArc-this.exArc)/Math.PI+1),this.exArc=this.nwArc,this._body.map(function(t,r){t._TailVec.x=t.x+e.mag.toVec(t.arc,e._size/50).x,t._TailVec.y=t.y+e.mag.toVec(t.arc,e._size/50).y;var a=egret.Tween.get(t);0==r?a.to({x:e._head._TailVec.x,y:e._head._TailVec.y},e.delay,egret.Ease.circIn):a.to({x:e._body[r-1]._TailVec.x,y:e._body[r-1]._TailVec.y},e.delay,egret.Ease.circIn)}),!1},t}(egret.Sprite);__reflect(Snake.prototype,"Snake");var Head=function(e){function t(t,r){var a=e.call(this)||this;return a._TailVec={x:0,y:0},a.graphics.beginFill(t,1),a.graphics.moveTo(0,0),a.graphics.lineTo(-r,r),a.graphics.lineTo(r,r),a.graphics.endFill(),a}return __extends(t,e),t}(egret.Sprite);__reflect(Head.prototype,"Head");var body=function(e){function t(t,r){var a=e.call(this)||this;return a._TailVec={x:0,y:0},a.graphics.beginFill(t,1),a.graphics.drawCircle(0,0,r),a}return __extends(t,e),t}(egret.Sprite);__reflect(body.prototype,"body");