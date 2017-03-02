function rid(min,max){return Math.floor(Math.random()*(max-min+1)+min)}
function gid(x){
    if(!x){x=10};var t = "";var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < x; i++ )
        t += p.charAt(Math.floor(Math.random() * p.length));
    return t;
};
//placeholder
!function(t,e){"object"==typeof module&&module.exports?module.exports=e(t):t.placeholder=e(t)}("undefined"!=typeof window?window:this,function(){function t(t){c&&u||(c=document.createElement("canvas"),u=c.getContext("2d"));var e=parseInt(t.a[0]),n=parseInt(t.a[1]);c.width=e,c.height=n,u.clearRect(0,0,e,n),u.fillStyle=t.c,u.fillRect(0,0,e,n),u.fillStyle=t.d,u.font=t.e+" normal "+t.f+" "+(t.g||100)+"px "+t.h;var r=1;if(""===t.g){var o=.7*e,l=.7*n,i=u.measureText(t.b).width,a=100;r=Math.min(o/i,l/a)}return u.translate(e/2,n/2),u.scale(r,r),u.textAlign="center",u.textBaseline="middle",u.fillText(t.b,0,0),c}function e(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)}function n(t){t=t||{};var n=t.size||"128x128",r=t.text||n,o=t.bgcolor||e(),l=t.color||e(),i=t.fstyle||"normal",a=t.fweight||"bold",c=t.fsize||"",u=t.ffamily||"consolas",f={};return n=n.split("x"),2!==n.length&&(n=[128,128]),f.a=n,f.b=r,f.c=o,f.d=l,f.e=i,f.f=a,f.g=c,f.h=u,t=null,f}function r(e){return e=n(e),t(e)}function o(t){return r(t).toDataURL()}function l(t,e,n){return t.getAttribute(e)||n}function i(t){var e,n={},r=t.split("&");for(var o in r){e=r[o].split("=");try{n[e[0]]=decodeURIComponent(e[1])}catch(l){n[e[0]]=e[1]}}return n}function a(t){for(var e,n,r=document.querySelectorAll("img.placeholder"),a=0;a<r.length;a++)e=r[a],!t&&l(e,f,"")||(n=i(l(e,"options","")),e.setAttribute("src",o(n)),e.setAttribute(f,"1"))}var c,u,f="placeholder-rendered";return a(),{getData:o,getCanvas:r,render:a}});
//
HBR={},HBR.u={},HBR.p={},HBR.fl={},HBR.can={};HBR.time={};HBR.a={};HBR.o={};HBR.c={};HBR.missed={};HBR.chats={};
HBR.plcimg=function(k,o){o={size:'100x100',bgcolor:'#0d78bd',color:'#fff',text:'CC',fsize:'40',ffamily:'Segoe UI'};if(k){o.text=k;};return o;};
//
$.CloudChat.opCall={};
PNotify.desktop.permission();navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
    $.fn.editable.defaults.mode = 'inline';
function Cookie(name,value,days,dom) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = ";expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function Op(r,rr,rrr){
    if(!rrr){rrr={};};if(typeof rrr === 'string'){rrr={n:rrr}};if(!rrr.n){rrr.n='HBChatOps_'+$user.ke+'_'+$user.id}
    ii={o:localStorage.getItem(rrr.n)};try{ii.o=JSON.parse(ii.o)}catch(e){ii.o={}}
    if(!ii.o){ii.o={}}
    if(r&&rr&&!rrr.x){
        ii.o[r]=rr;
    }
    switch(rrr.x){
        case 0:
            delete(ii.o[r])
        break;
        case 1:
            delete(ii.o[r][rr])
        break;
    }
    localStorage.setItem(rrr.n,JSON.stringify(ii.o))
    return ii.o
}
function SND(x,y,t){
    t={o:Op(),t:t};if(!$.CloudChat.SNDs){$.CloudChat.SNDs={}};
    switch(x){
        case 2:
            return document.hasFocus()===false
        break;
        case 1:
            t.e='#AUDIO_BEEP'
        break;
        default:
            t.e='#AUDIO_LOOP'
        break;
    }
    if(t.o.audio1==1){
        switch(y){
            case 0:
                if(t.t&&x!==1){
                    delete($.CloudChat.SNDs[t.t]);t.y=0;
                    $.each($.CloudChat.SNDs,function(n,v){if(!v){return};++t.y;});
                    if(t.y===0){$(t.e)[0].pause()}
                }else{
                    $(t.e)[0].pause();$.CloudChat.SNDs={};
                };
            break;
            case 1:
                if(t.o.audio0==0&&x==='#AUDIO_LOOP'){
                    return
                }
                if(t.o.status===1){
                    if(t.t&&x!==1){$.CloudChat.SNDs[t.t]=1;}
                    $(t.e)[0].play()
                }
            break;
        }
    }
}
IsNumber=function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
}
gTk=function(){
    if(typeof device != "undefined" && typeof cordova == "object"){
        var getToken = function(types, success, fail){
			cordova.exec(success, fail, "PushToken", "getToken", types);
		}
		getToken(["getToken"], function(token){
            device.token = token;
			return token;
		 }, function(e){
			 console.log("cannot get device token: "+e);
			 return false;
		 });
    }else{
        // console.log("device not ready, or not a native app");
		return false;
    }
}
function cx(t,x){
    if(!t.bid){t.bid=$user.id}
    if(!t.uid){t.uid=$user.ke}
    return HBChat.emit('f',t)
};
if($.CloudChat.Peer){
    $.CloudChat.Peer.hs=function(){
    $.CloudChat.Peer.p.off('connection').on('connection',function(conn){
        conn.on('data',function(d) {
            switch(d.f){
                case'p':
                    html2canvas(document.body, {letterRendering:true,onrendered: function(canvas) {
                        conn.send({f:'pr',d:canvas.toDataURL()})
                        }
                    })
                break;
            }
        });
    }).off('error').on('error',function(err){console.log(err)}).on('call', function(call,e) {
        e={};SND(1,1);
        if(call.options&&call.options.metadata&&call.options.metadata.type){
            switch(call.options.metadata.type){
                case 2:
                e.answer=function(f){
                    $.CloudChat.opCall[call.peer]=call;call.answer(f);
                }
                navigator.webkitGetUserMedia({
                    video: true, audio: true, toString:function(){return 'video, audio';}
                },function(d){
                    e.answer(d);
                },function(e){
//                    e.answer();
                });
                break;
                case 1:
            (new PNotify({
                title: 'Operator Call Incoming',
                text: '<b>'+call.options.metadata.name+'</b> <i><small>'+call.options.metadata.mail+'</small></i> is Calling. Do you want to answer?',
                icon: 'fa fa-user-secret',
                type: 'warning',
                confirm: {
                    confirm: true,
                    buttons:[{text:'Answer',addClass:'btn-inverse btn'},{text:"Cancel",addClass:"btn-danger btn"}]
                },
                buttons: {
                    closer: false,
                    sticker: false,
                },
            })).get().on('pnotify.confirm', function() {
                tm('vid',call);e.el='[call="'+call.peer+'"] ';$.CloudChat.opCall[call.peer]=call;
                e.answer=function(f){
                    call.answer(f);
                    $.CloudChat.opCall[call.peer].on('stream', function(s){
                        $.CloudChat.audio(0,{e:e.el+'.their-voice',s:s});
                        $(e.el+'.their-stream').attr('src',URL.createObjectURL(s));
                    });
                    $.CloudChat.opCall[call.peer].on('close',function(){
                        $('[call="'+call.peer+'"]').remove();
                    });
                }
                navigator.webkitGetUserMedia({
                    video: true, audio: true, toString:function(){return 'video, audio';}
                },function(d){
                    $(e.el+'.my-stream').attr('src',window.URL.createObjectURL(d))[0].volume=0;
//                  $.CloudChat.audio(0,{e:e.el+'.my-voice'});
                    e.answer(d);
                },function(e){
                    e.answer();
                });
            }).on('pnotify.cancel', function() {
                call.close()
            });
                break;
            }
        }else{
            call.missing=setTimeout(function(){call.close()},10000);
            (new PNotify({
                title: 'Call Incoming',
                text: '<b>'+call.options.metadata.name+'</b> <i><small>'+call.options.metadata.mail+'</small></i> is Calling. Do you want to answer?',
                icon: 'fa fa-phone',
                type: 'success',
                confirm: {
                    confirm: true,buttons:[{text:'Answer',addClass:'btn-inverse btn'},{text:"Cancel",addClass:"btn-danger btn"}]
                },
                buttons: {
                    closer: false,
                    sticker: false
                },
            })).get().on('pnotify.confirm', function() {
                        clearTimeout(call.missing);
                tm('vid',call)
                        navigator.webkitGetUserMedia({
                            video: true, audio: true, toString:function(){return 'video, audio';}
                        },function(d){
                            $('.my-stream').attr('src',window.URL.createObjectURL(d))[0].volume=0
                            HBR.c[call.peer]=call;call.answer(d);
                        },function(e){
            //                call.close()
                            HBR.c[call.peer]=call;call.answer()
                        });
            //      // Hang up on an existing call if present
            //      if (window.existingCall) {
            //        window.existingCall.close();
            //      }
            //      window.existingCall = call;
                  call.on('stream', function(s){
                    $('[call="'+call.peer+'"] .their-stream').attr('src', URL.createObjectURL(s));
                  });
                  call.on('close',function(){
                    $('[call="'+call.peer+'"]').remove();
                  });
            }).on('pnotify.cancel', function() {
                call.close();
            });
        }
    });
    }
}