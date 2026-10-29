var C="flipside-v1";
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){
  var r=e.request;if(r.method!=="GET")return;
  var u=new URL(r.url);
  var ok=u.origin===location.origin||u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com";
  if(!ok)return;
  e.respondWith(fetch(r).then(function(res){
    if(res&&(res.status===200||res.type==="opaque")){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)})}
    return res;
  }).catch(function(){
    return caches.match(r).then(function(m){return m||(r.mode==="navigate"?caches.match(new Request(new URL("./",location.href).href)):undefined)||caches.match(new URL("./",location.href).href)})
  }));
});
