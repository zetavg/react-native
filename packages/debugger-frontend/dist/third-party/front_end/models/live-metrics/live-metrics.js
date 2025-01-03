import*as e from"../../core/common/common.js";import*as t from"../../core/sdk/sdk.js";import*as n from"./web-vitals-injected/spec/spec.js";const i="live_metrics_world";let a;class s{static#e;static async get(){if(!this.#e){const e=new URL("./web-vitals-injected/web-vitals-injected.generated.js",import.meta.url),t=await fetch(e);this.#e=await t.text()}return this.#e}}class o extends e.ObjectWrapper.ObjectWrapper{#t;#n;#i;#a;#s;#o;#r=[];#c=new e.Mutex.Mutex;constructor(){super(),t.TargetManager.TargetManager.instance().observeTargets(this)}static instance(e={forceNew:null}){const{forceNew:t}=e;return a&&!t||(a=new o),a}get lcpValue(){return this.#a}get clsValue(){return this.#s}get inpValue(){return this.#o}get interactions(){return this.#r}async#d(e,n){if(!this.#t)return null;const i=this.#t.model(t.RuntimeModel.RuntimeModel);if(!i)return null;const a=this.#t.model(t.DOMModel.DOMModel);if(!a)return null;const{result:s}=await this.#t.runtimeAgent().invoke_evaluate({expression:`window.getNodeForIndex(${e})`,contextId:n});if(!s)return null;const o=i.createRemoteObject(s);return a.pushObjectAsNodeToFrontend(o)}async#l(e,t){const n=t.backendNodeId(),i=await e.pushNodesByBackendIdsToFrontend(new Set([n]));return i?.get(n)||void 0}async#u(e){const t=e.data;this.lcpValue?.node&&(this.lcpValue.node=await this.#l(t,this.lcpValue.node));for(const e of this.interactions)e.node&&(e.node=await this.#l(t,e.node));this.dispatchEventToListeners("status",{lcp:this.#a,cls:this.#s,inp:this.#o,interactions:this.#r})}async#h(e,t){switch(e.name){case"LCP":{const n={value:e.value};if(void 0!==e.nodeIndex){const i=await this.#d(e.nodeIndex,t);i&&(n.node=i)}this.#a=n;break}case"CLS":{const t={value:e.value};this.#s=t;break}case"INP":{const t={value:e.value};this.#o=t;break}case"Interaction":{const n=e;if(void 0!==e.nodeIndex){const i=await this.#d(e.nodeIndex,t);i&&(n.node=i)}this.#r.push(n);break}case"reset":this.#a=void 0,this.#s=void 0,this.#o=void 0,this.#r=[]}this.dispatchEventToListeners("status",{lcp:this.#a,cls:this.#s,inp:this.#o,interactions:this.#r})}async#p(e){const{data:t}=e;if(t.name!==n.EVENT_BINDING_NAME)return;const i=JSON.parse(t.payload);if("reset"===i.name)this.#i=t.executionContextId;else if(this.#i!==t.executionContextId)return;await this.#c.run((async()=>{await this.#h(i,t.executionContextId)}))}targetAdded(e){e===t.TargetManager.TargetManager.instance().primaryPageTarget()&&this.#m(e)}targetRemoved(e){e===t.TargetManager.TargetManager.instance().primaryPageTarget()&&this.#g()}async#m(e){if(this.#t)return;const a=e.model(t.DOMModel.DOMModel);if(!a)return;a.addEventListener(t.DOMModel.Events.DocumentUpdated,this.#u,this);const o=e.model(t.RuntimeModel.RuntimeModel);if(!o)return;o.addEventListener(t.RuntimeModel.Events.BindingCalled,this.#p,this),await o.addBinding({name:n.EVENT_BINDING_NAME,executionContextName:i});const r=await s.get(),{identifier:c}=await e.pageAgent().invoke_addScriptToEvaluateOnNewDocument({source:r,worldName:i,runImmediately:!0});this.#n=c,this.#t=e}async#g(){if(!this.#t)return;const e=this.#t.model(t.RuntimeModel.RuntimeModel);e&&(await e.removeBinding({name:n.EVENT_BINDING_NAME}),e.removeEventListener(t.RuntimeModel.Events.BindingCalled,this.#p,this));const i=this.#t.model(t.DOMModel.DOMModel);i&&i.removeEventListener(t.DOMModel.Events.DocumentUpdated,this.#u,this),this.#n&&await this.#t.pageAgent().invoke_removeScriptToEvaluateOnNewDocument({identifier:this.#n}),this.#t=void 0}}export{o as LiveMetrics};