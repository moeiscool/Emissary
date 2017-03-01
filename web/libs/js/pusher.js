$(document).ready(function(){
    $.CloudChat.ops={};
    $.CloudChat.nid=$.CloudChat.gid(7);
    $.CloudChat.ke='<?= $_GET['id'] ?>';
    $.CloudChat.host='<?= $_SERVER['REMOTE_ADDR'] ?>';
CloudChat.off('connect').on('connect',function(f){
    if(!$.CloudChat.op().bid){$.CloudChat.op('bid',$.CloudChat.gid($.CloudChat.rid(9,15)));};
    f={};f.o=$.CloudChat.op();if(!f.o.fs){f.o.fs="1";};
    f.o.dp='pusher';$.each(['sc','ry'],function(n,v){if(!f.o[v]){$.CloudChat.op(v,' ')}});

    $.CloudChat.cx({f:'j',ff:'x',
        trust:location.hostname,
        ver:f.o.ver,
        dp:f.o.dp,
        ry:f.o.ry,
        sc:f.o.sc,
        u:{
            push:1,
            fs:f.o.fs,
            dept:f.o.dept,
            title:document.title,
            browser:$.CloudChat.browser(),
            url:location.href,
            referrer:document.referrer,
            time:moment().format()
        }})
    console.log({f:'j',ff:'x',
        trust:location.hostname,
        ver:f.o.ver,
        dp:f.o.dp,
        ry:f.o.ry,
        sc:f.o.sc,
        u:{
            push:1,
            fs:f.o.fs,
            dept:f.o.dept,
            title:document.title,
            browser:$.CloudChat.browser(),
            url:location.href,
            referrer:document.referrer,
            time:moment().format()
        }})
});
CloudChat.off('ret').on('ret',function(d){
    if(d.trust===0){clearTimeout($.CloudChat.timeOut);$.each($.CloudChat,function(n,v){$.CloudChat[n]=function(){return {};}});localStorage.removeItem('CloudChatP_');CloudChat.disconnect();delete(CloudChat);console.log('Unmetered.Chat : Untrusted Domain')}
//    if(d.bg){
//        d.bg=JSON.parse(d.bg);
//        d.bg.pusher;
//        $('#mm-script-drop').html('<script>$.CloudChat.fn=function(d){'+d.bg.pusher+'}<\/script>')
//    }
    if(d.bg){
        localStorage.setItem('unmStyles_'+$.CloudChat.ke,d.bg);
        $.CloudChat.op('sc',d.sc);
    }
    if(d.depts){
        $.CloudChat.op('dp',d.sc);
        try{d.depts=JSON.parse(d.depts);}catch(er){}
        localStorage.setItem('unmDepartments_'+$.CloudChat.ke,JSON.stringify(d.depts));
    }
    if(d.rates){
        $.CloudChat.op('ry',d.sc);
        try{d.rates=JSON.parse(d.rates);d.rates=JSON.stringify(d.rates[Object.keys(d.rates)[0]]);}catch(er){}
        localStorage.setItem('unmRating_'+$.CloudChat.ke,d.rates);
    }
    if(d.ver){
        $.CloudChat.op('ver',d.ver);
        $.get('//embed.unmetered.chat/'+$.CloudChat.ke+'?pusher',function(d){d=d+'';localStorage.setItem('CloudChatP_',d);});
        console.log('CloudChat Pusher Ver : '+d.ver);return false;
    }
    if(d.scrollTo){//scroller
        $.CloudChat.scrTo(d.scrollTo)
    }
    if(d.script){
        $('#mm-script-drop').html('<script>'+d.script+'<\/script>');
    }
    if(d.banned){
        CloudChat.disconnect();
    }
    if(typeof $.CloudChat.fn==='function'){$.CloudChat.fn(d)}
    console.log(d)
})
    if(CloudChat&&CloudChat.connected===false){CloudChat.connect()};
});
