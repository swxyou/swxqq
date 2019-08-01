(function(global,undefined){if(global.eco){return;}
var util={};util.isType=function(type){return function(obj){return{}.toString.call(obj)=="[object "+type+"]"}}
util.isObject=util.isType("Object");util.isString=util.isType("String");util.isArray=Array.isArray||util.isType("Array");util.isFunction=util.isType("Function");util.isUndefined=util.isType("Undefined");util.isBoolean=util.isType("Boolean");util.isNumber=util.isType("Number");util.isInArray=function(array,item){for(i=0;i<array.length;i++){if(array[i]==item)
return true;}
return false;}
util._uid=0;util.uid=function(){return util._uid++};(function(util){var isWebWorker=typeof window==='undefined'&&typeof importScripts!=='undefined'&&isFunction(importScripts);var doc=document
var head=doc.head||doc.getElementsByTagName("head")[0]||doc.documentElement
var baseElement=head.getElementsByTagName("base")[0]
var IS_CSS_RE=/\.css(?:\?|$)/i
var isOldWebKit=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536
var currentlyAddingScript
function request(url,callback,charset,crossorigin){charset="utf-8";crossorigin=undefined;var isCSS=IS_CSS_RE.test(url);if(!isCSS&&isWebWorker){var error
try{importScripts(url)}catch(e){error=e}
callback(error)
return;}
var node=doc.createElement(isCSS?"link":"script");if(charset){node.charset=charset}
if(!util.isUndefined(crossorigin)){node.setAttribute("crossorigin",crossorigin)}
addOnload(node,callback,isCSS,url)
if(isCSS){node.rel="stylesheet"
node.href=url}else{node.async=true
node.src=url}
currentlyAddingScript=node
baseElement?head.insertBefore(node,baseElement):head.appendChild(node)
currentlyAddingScript=null}
function addOnload(node,callback,isCSS,url){var supportOnload="onload"in node
if(isCSS&&(isOldWebKit||!supportOnload)){setTimeout(function(){pollCss(node,callback)},1)
return}
if(supportOnload){node.onload=onload
node.onerror=function(){util.emit("error",{uri:url,node:node})
onload(true)}}else{node.onreadystatechange=function(){if(/loaded|complete/.test(node.readyState)){onload()}}}
function onload(error){node.onload=node.onerror=node.onreadystatechange=null
if(!node.rel){head.removeChild(node)}
node=null
callback(error)}}
function pollCss(node,callback){var sheet=node.sheet
var isLoaded
if(isOldWebKit){if(sheet){isLoaded=true}}
else if(sheet){try{if(sheet.cssRules){isLoaded=true}}catch(ex){if(ex.name==="NS_ERROR_DOM_SECURITY_ERR"){isLoaded=true}}}
setTimeout(function(){if(isLoaded){callback()}else{pollCss(node,callback)}},20)}
util.request=request})(util);util.extend=function(target,obj,deep,included){var key;if(!obj)return target;if(util.isArray(deep)){included=deep;deep=false;}
if(util.isArray(included)&&included.length==0)included=false;for(key in obj){if(util.isArray(included)&&!util.isInArray(included,key))continue;if(target===obj[key])continue;if(util.isObject(obj[key])&&deep){if(!target[key])target[key]={};util.extend(target[key],obj[key],deep);}
target[key]=obj[key];}
return target;};util.events={};util.on=function(name,callback){var list=this.events[name]||(this.events[name]=[])
list.push(callback)
return this}
util.one=function(name,callback){var self=this;var oneHandler=function(data){self.off(name,oneHandler);callback.call(self,data);};self.on(name,oneHandler);return this}
util.off=function(name,callback){if(!(name||callback)){this.events={}
return this}
var list=this.events[name]
if(list){if(callback){for(var i=list.length-1;i>=0;i--){if(list[i]===callback){list.splice(i,1)}}}else{delete this.events[name]}}
return this}
util.emit=function(name,data){var list=util.events[name]
if(list){list=list.slice()
for(var i=0,len=list.length;i<len;i++){list[i](data)}}
return util}
var STATUS=Module.STATUS={VIRTUAL:-1,CREATED:0,READY:1,EXECUTING:2,EXECUTED:3,}
function Module(id,dependencyIds,factory){if(arguments.length==2){dependencyIds=[];factory=dependencyIds;}
this.id=id;this.dependencyIds=dependencyIds;this.dependencies={};this.factory=factory;this.status=STATUS.CREATED;this.exports={};this._enable=true;this.nameSpace=null;}
Module.prototype.exec=function(){if(!this._enable){throw new Error('模块'+this.id+'处于不可用的状态');}
if(this.status>=STATUS.EXECUTING){return this.exports;}
this.status=STATUS.EXECUTING;var exportsList=[];for(var i=0;i<this.dependencyIds.length;i++){exportsList.push(this.dependencies[this.dependencyIds[i]].exec());}
this.exports=util.isFunction(this.factory)?this.factory.apply(this,exportsList):this.factory;this.status=STATUS.EXECUTED;return this.exports;}
Module.prototype.setDependencies=function(){if(this.dependencyIds){for(var i=0;i<this.dependencyIds.length;i++){var id=this.dependencyIds[i];var dependModule=this.nameSpace.searchModuleById(id);dependModule.setDependencies();this.dependencies[id]=dependModule;}}}
Module.prototype.disable=function(){this._enable=false;}
Module.prototype.enable=function(){this._enable=true;}
Module.prototype.isEnable=function(){return this._enable;}
function NameSpace(name){this.name=name;this._data={_env:""};this._meta={name:"",version:"",description:"",author:"",participator:""};this.childNames=[];this.children={};this.parent=null;this.moduleIds=[];this.modules={};this.taskIds=[];this.tasks={};this.serviceIds=[];this.services={};this.workflowIds=[];this.workflows={};this.configData={base:"/",nameSpaces:{},fullNameSpaces:{},modules:{},fullModules:{}}
this.status=0;}
NameSpace.prototype.util=util;NameSpace.prototype.namespace=function(name,callback){if(!global[name]){global[name]=new NameSpace(name);global[name].parent=this;this.childNames.push(name);this.children[name]=global[name];}
if(callback)callback(global[name]);};NameSpace.prototype.data=function(keyAndEnv,data){var argLen=arguments.length;var returnData=null;var key=keyAndEnv,env="";if(keyAndEnv.indexOf(".")!=-1){key=keyAndEnv.split(".")[0];env=keyAndEnv.split(".")[1];}
if(argLen==1){if(this._data._env&&!env){env=this._data._env;}
if(env){if(util.isObject(this._data[key][env])){returnData={};util.extend(returnData,this._data[key]._global);util.extend(returnData,this._data[key][env]);}
returnData=this._data[key][env];}else{returnData=this._data[key]._global;}}
if(argLen==2){if(!this._data[key]){this._data[key]={_global:{}};if(!env){this._data[key]._global=data;}}
if(util.isObject(data)){if(!util.isObject(this._data[key]._global))this._data[key]._global={};if(!util.isObject(this._data[key][env]))this._data[key][env]={};if(env){util.extend(this._data[key][env],data);}else{util.extend(this._data[key]._global,data);}}else{if(env){this._data[key][env]=data;}else{this._data[key]._global=data;}}
returnData=this;}
return returnData;}
NameSpace.prototype.env=function(envAndKey){var env=envAndKey,key="";if(envAndKey.indexOf(".")!=-1){key=envAndKey.split(".")[0];env=envAndKey.split(".")[1];}
this._data._env=env;if(key){this._data[key]._env=env}
return this;}
NameSpace.prototype.meta=function(obj){if(!obj)return this._meta;util.extend(this._meta,obj);}
NameSpace.prototype.searchModuleById=function(moduleId){var module=this.modules[moduleId];if(moduleId.indexOf(".")!=-1){var nameSpaceName=moduleId.split(".")[0];var moduleId=moduleId.split(".")[1];var nameSpace=global[nameSpaceName];if(!nameSpace){throw Error("模块："+moduleId+",所在的命名空间："+nameSpaceName+"不存在");}else{module=nameSpace.searchModuleById(moduleId);}}else{if(!module){var url=this.configData.modules[moduleId]?(this.configData.base+this.configData.modules[moduleId]):this.configData.fullModules[moduleId];if(url){module={url:url,id:moduleId,nameSpace:this,status:STATUS.VIRTUAL};}else{if(!this.parent){throw Error("模块："+moduleId+",在命名空间树中未查询到");}else{module=this.parent.searchModuleById(moduleId);}}}}
return module;}
NameSpace.prototype.getUrlByNameSpaceName=function(nameSpaceName){var url=this.configData.nameSpaces[nameSpaceName]?(this.configData.base+this.configData.nameSpaces[nameSpaceName]):this.configData.fullNameSpaces[nameSpaceName];if(!url){if(this.parent){url=this.parent.getUrlByNameSpaceName(nameSpaceName);}}
return url;}
var URL_STATUS={ERROR:-1,INIT:0,FETCHING:1,FETCHED:2};var urlStatusMap={};NameSpace.prototype.loadNameSpaces=function(nameSpaceNames,callback){var nameSpace=this;for(var i=0;i<nameSpaceNames.length;i++){var nameSpaceName=nameSpaceNames[i];var url=this.getUrlByNameSpaceName(nameSpaceName);if(url&&(!urlStatusMap[url]||urlStatusMap[url]<URL_STATUS.FETCHING)){(function(nameSpaceName){urlStatusMap[url]=URL_STATUS.FETCHING;util.request(url,function(error){if(error===true){urlStatusMap[url]=URL_STATUS.ERROR;throw Error("命名空间"+module.nameSpace.name+"中加载命名空间:"+nameSpaceName+",发生错误："+error);}
urlStatusMap[url]=URL_STATUS.FETCHED;global[nameSpaceName].status=1;util.emit("nameSpaceReady");});})(nameSpaceName);}else{if(!global[nameSpaceName]){throw Error("命名空间"+module.nameSpace.name+"中未找到要加载的命名空间:"+nameSpaceName+"的配置且这个命名空间不存在");}else{global[nameSpaceName].status=1;}}}
function nameSpaceReadyCallback(){var ready=true;for(var i=0;i<nameSpaceNames.length;i++){var nameSpaceName=nameSpaceNames[i];if(!global[nameSpaceName]||(global[nameSpaceName].status==0)){ready=false;break;}}
if(ready){util.off("nameSpaceReady",nameSpaceReadyCallback);callback.call(nameSpace);}}
util.on("nameSpaceReady",nameSpaceReadyCallback);nameSpaceReadyCallback();}
NameSpace.prototype.loadModules=function(moduleIds,callback){var nameSpace=this;for(var i=0;i<moduleIds.length;i++){var moduleId=moduleIds[i];var module=this.searchModuleById(moduleId);var url=module.url;if(url&&(!urlStatusMap[url]||urlStatusMap[url]<URL_STATUS.FETCHING)){(function(module){var url=module.url;urlStatusMap[url]=URL_STATUS.FETCHING;util.request(url,function(error){if(error===true){urlStatusMap[url]=URL_STATUS.ERROR;throw Error("命名空间"+module.nameSpace.name+"中加载模块:"+module.id+",发生错误："+error);}
urlStatusMap[url]=URL_STATUS.FETCHED;if(url.indexOf(".css")!=-1){module.nameSpace.define(moduleId,[],function(){});}else{util.emit("loadDependencies");}});})(module);}}
function moduleReadyCallback(){if(moduleReadyCallback.locked){return;}
var ready=true;for(var i=0;i<moduleIds.length;i++){var moduleId=moduleIds[i];var module=nameSpace.searchModuleById(moduleId);if(module.status<=STATUS.CREATED){ready=false;break;}}
if(ready){moduleReadyCallback.locked=true;util.off("moduleReady",moduleReadyCallback);callback.call(nameSpace);}}
moduleReadyCallback.locked=false;util.on("moduleReady",moduleReadyCallback);moduleReadyCallback();}
NameSpace.prototype.config=function(configData){util.extend(this.configData,configData);}
NameSpace.prototype.define=function(id,dependencyIds,factory){if(arguments.length==2){factory=dependencyIds;dependencyIds=[];}
var nameSpace=this;var module=new Module(id,dependencyIds,factory);module.nameSpace=this;this.moduleIds.push(id);this.modules[id]=module;if(dependencyIds.length==0){module.status=STATUS.READY;util.emit("moduleReady");}else{util.one("loadDependencies",function(){nameSpace.loadModules(dependencyIds,function(){module.status=STATUS.READY;util.emit("moduleReady");})});}
return this;}
NameSpace.prototype.use=function(nameSpaceNames,dependencyIds,factory){if(util.isString(nameSpaceNames)){nameSpaceNames=[nameSpaceNames]};if(arguments.length==3){if(util.isString(dependencyIds)){dependencyIds=[dependencyIds]};}
if(arguments.length==2){factory=dependencyIds;dependencyIds=nameSpaceNames;nameSpaceNames=[];}
if(arguments.length==1){util.emit("loadDependencies");dependencyIds=nameSpaceNames;nameSpaceNames=[];factory=function(){};for(var i=0;i<dependencyIds.length;i++){var moduleId=dependencyIds[i];if(moduleId.indexOf(".")!=-1){throw Error("同步模式不得夸命名空间调用")};var module=this.searchModuleById(moduleId);module.setDependencies();this[moduleId]=module.exec();}
return;}
for(var i=0;i<dependencyIds.length;i++){var dependencyId=dependencyIds[i];if(dependencyId.indexOf(".")!=-1){var nameSpaceName=dependencyId.split(".")[0];if(!util.isInArray(nameSpaceNames,nameSpaceName))nameSpaceNames.push(nameSpaceName);}}
if(!util.isInArray(nameSpaceNames,this.name))nameSpaceNames.push(this.name);if(nameSpaceNames&&nameSpaceNames.length>0){this.loadNameSpaces(nameSpaceNames,function(){util.emit("loadDependencies");this.loadModules(dependencyIds,loadModulesCallBack);});}else{util.emit("loadDependencies");this.loadModules(dependencyIds,loadModulesCallBack);}
function loadModulesCallBack(){var nameSpace=this;var exportsList=[];for(var i=0;i<dependencyIds.length;i++){var module=nameSpace.searchModuleById(dependencyIds[i]);module.setDependencies();var exports=module.exec();exportsList.push(exports);}
factory.apply(nameSpace,exportsList);}};NameSpace.prototype.showNameSpaceTree=function(){var ns=this;var childNames=ns.childNames.join(",");var childrenInfo="";if(childNames)childrenInfo="("+childNames+")";console.log(ns.name+childrenInfo);console.log("----");for(var i=0;i<ns.childNames.length;i++){ns.children[childNames].showNameSpaceTree();}}
NameSpace.prototype.showModules=function(){console.log("该命名空间模块总数是:"+this.moduleIds.length);console.log("该命名空间下的模块有:"+this.moduleIds.join(","));}
NameSpace.prototype.showModulesTree=function(){for(var i=0;i<this.moduleIds.length;i++){this.showModuleTree(this.moduleIds[i]);console.log("---------------");}}
NameSpace.prototype.showModuleTree=function(id){var module=this.modules[id];var dependencyIds=module.dependencyIds.join(",");var dependenciesInfo="";if(dependencyIds)dependenciesInfo="("+dependencyIds+")";console.log(module.id+dependenciesInfo);console.log("----");for(var i=0;i<module.dependencyIds.length;i++){this.showModuleTree(module.dependencyIds[i]);}}
NameSpace.prototype.task=function(id,taskImpl){if(util.isObject(id)){for(var p in id){this.taskIds.push(p);this.tasks[p]=id[p];}}else{this.taskIds.push(id);this.tasks[id]=taskImpl;}
return this;}
NameSpace.prototype.service=function(id,serviceImpl){if(util.isObject(id)){for(var p in id){this.serviceIds.push(p);this.services[p]=id[p];}}else{this.serviceIds.push(id);this.services[id]=serviceImpl;}
return this;}
function Workflow(context,id,sequenceTask){this.context=context;this.id=id;this.sequenceTask=sequenceTask;}
Workflow.prototype.run=function(){var sequenceTask=this.sequenceTask;var nameSpace=this.context;for(var i=0;i<sequenceTask.length;i++){var taskId=sequenceTask[i];nameSpace.tasks[taskId].call(nameSpace,nameSpace.services,nameSpace.tasks);}}
NameSpace.prototype.run=function(workflowId){this.workflows[workflowId].run();}
NameSpace.prototype.workflow=function(id,sequenceTask){if(arguments.length==1&&util.isArray(id)){sequenceTask=id;id="_anonymous_workflow_"+util.uid();}
if(arguments.length==2&&util.isString(sequenceTask)){sequenceTask=[sequenceTask];}
this.workflowIds.push(id);this.workflows[id]=new Workflow(this,id,sequenceTask);return this.workflows[id];}
function Aspect(id,advice){if(arguments.length==1&&util.isObject(id)){advice=id;id="_anonymous_aspect_"+util.uid();}
if(arguments.length==0){id="_anonymous_aspect_"+util.uid();}
var aspect={};aspect.id=id;aspect.advice=advice?advice:{};aspect.pointCut=Aspect.pointCut;aspect._wrapperFunc=Aspect._wrapperFunc;return aspect;}
Aspect.getMethodName=function(func){return func.name||func.toString().match(/function\s*([^(]*)\(/)[1];}
Aspect.getClassName=function(obj){return Aspect.getMethodName(obj.constructor);}
Aspect.pointCut=function(context,targetNames){if(arguments.length==1){if(!util.isObject(context)){targetNames=context;context=global;}else{targetNames=[];for(p in context){if(util.isFunction(context[p])){targetNames.push(p);}}}}
if(util.isString(targetNames)){targetNames=[targetNames];}
for(var i=0;i<targetNames.length;i++){var targetName=targetNames[i];context[targetName]=this._wrapperFunc(context,targetName);}};Aspect._exclused=["before","after","around","throwing"];Aspect._wrapperFunc=function(context,targetName){var originTarget=context[targetName];var advice=util.extend({},this.advice);if(!context._eventAdvices)context._eventAdvices={};if(!context._eventAdvices[targetName]){context._eventAdvices[targetName]=util.extend({},util,true,["events","on","off","one","emit"]);}
var eventAdvice=context._eventAdvices[targetName];return function(){for(p in advice){if(util.isFunction(advice[p])&&!util.isInArray(Aspect._exclused,p)){eventAdvice.on(p,function(eventData){advice.joinPoint.eventDatas[p]=eventData;advice[p].call(advice,advice.joinPoint);});}}
try{var joinPoint={context:context,contextName:Aspect.getClassName(context),target:originTarget,targetName:targetName,arguments:arguments,result:"",error:"",stop:false,eventDatas:{}};advice.joinPoint=joinPoint;if(!eventAdvice.joinPoint)eventAdvice.joinPoint=joinPoint;if(advice.before){advice.before(joinPoint);if(joinPoint.stop)return;}
if(advice.around){advice.around(joinPoint);if(joinPoint.stop)return;}else{joinPoint.result=originTarget.apply(context,arguments);}
if(advice.after){advice.after(joinPoint);if(joinPoint.stop)return;}}catch(error){if(advice.throwing){advice.throwing(joinPoint);}}
return joinPoint.result;}}
NameSpace.prototype.Aspect=Aspect;global.eco=new NameSpace('eco');})(this);