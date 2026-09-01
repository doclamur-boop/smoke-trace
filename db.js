'use strict';
const DB={db:null,
  open(){return new Promise((res,rej)=>{const r=indexedDB.open('smoke-trace',1);r.onupgradeneeded=e=>{const d=e.target.result;if(!d.objectStoreNames.contains('events')){const s=d.createObjectStore('events',{keyPath:'id'});s.createIndex('t','t');}if(!d.objectStoreNames.contains('prefs'))d.createObjectStore('prefs');};r.onsuccess=()=>{DB.db=r.result;res();};r.onerror=()=>rej(r.error);});},
  req(r){return new Promise((res,rej)=>{r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});},
  st(n,m){return DB.db.transaction(n,m).objectStore(n);},
  getEvents(){return DB.req(DB.st('events','readonly').getAll());},putEvent(e){return DB.req(DB.st('events','readwrite').put(e));},delEvent(id){return DB.req(DB.st('events','readwrite').delete(id));},clearEvents(){return DB.req(DB.st('events','readwrite').clear());},getPref(k){return DB.req(DB.st('prefs','readonly').get(k));},setPref(k,v){return DB.req(DB.st('prefs','readwrite').put(v,k));}
};
