!function(t,e){"object"==typeof module&&module.exports?module.exports=e(t):t.placeholder=e(t)}("undefined"!=typeof window?window:this,function(){function t(t){c&&u||(c=document.createElement("canvas"),u=c.getContext("2d"));var e=parseInt(t.a[0]),n=parseInt(t.a[1]);c.width=e,c.height=n,u.clearRect(0,0,e,n),u.fillStyle=t.c,u.fillRect(0,0,e,n),u.fillStyle=t.d,u.font=t.e+" normal "+t.f+" "+(t.g||100)+"px "+t.h;var r=1;if(""===t.g){var o=.7*e,l=.7*n,i=u.measureText(t.b).width,a=100;r=Math.min(o/i,l/a)}return u.translate(e/2,n/2),u.scale(r,r),u.textAlign="center",u.textBaseline="middle",u.fillText(t.b,0,0),c}function e(){return"#"+("00000"+(16777216*Math.random()<<0).toString(16)).slice(-6)}function n(t){t=t||{};var n=t.size||"128x128",r=t.text||n,o=t.bgcolor||e(),l=t.color||e(),i=t.fstyle||"normal",a=t.fweight||"bold",c=t.fsize||"",u=t.ffamily||"consolas",f={};return n=n.split("x"),2!==n.length&&(n=[128,128]),f.a=n,f.b=r,f.c=o,f.d=l,f.e=i,f.f=a,f.g=c,f.h=u,t=null,f}function r(e){return e=n(e),t(e)}function o(t){return r(t).toDataURL()}function l(t,e,n){return t.getAttribute(e)||n}function i(t){var e,n={},r=t.split("&");for(var o in r){e=r[o].split("=");try{n[e[0]]=decodeURIComponent(e[1])}catch(l){n[e[0]]=e[1]}}return n}function a(t){for(var e,n,r=document.querySelectorAll("img.placeholder"),a=0;a<r.length;a++)e=r[a],!t&&l(e,f,"")||(n=i(l(e,"options","")),e.setAttribute("src",o(n)),e.setAttribute(f,"1"))}var c,u,f="placeholder-rendered";return a(),{getData:o,getCanvas:r,render:a}});
// 
(function() {
    "use strict";

    function e() {
        if ("oninput" in document.body) return !0;
        document.body.setAttribute("oninput", "return");
        var e = "function" == typeof document.body.oninput;
        return delete document.body.oninput, e
    }

    function o() {
        return "onpropertychange" in document.body
    }
    var n = this.$,
        t = {
            resize: n.noop,
            minRows: 1,
            maxRows: 0
        };
    n.fn.autoResize = function(r,f) {
        var s = n.extend({}, t, r);f=r;
        return this.filter("textarea").each(function() {
            var t = n(this).css({
                    "overflow-y": "hidden",
                    height: "auto",
                    resize: "none"
                }),
                r = t.get(0),
                i = function() {
                    var e = r.value,
                        o = r.rows;
                    r.value = "", r.rows = 1, r.baseScrollHeight = r.scrollHeight, r.value = e, r.rows = o
                },
                u = function() {
                    return !!r.scrollHeight && (!!r.baseScrollHeight || (i(), !0))
                },
                c = function() {
                    if (!u()) return !1;
                    var e = parseInt(t.css("line-height"));
                    r.rows = s.minRows;
                    var o = Math.ceil((r.scrollHeight - r.baseScrollHeight) / e) + 1;
                    s.maxRows > s.minRows && o > s.maxRows ? (r.rows = s.maxRows, t.css({
                        "overflow-y": "auto"
                    })) : (r.rows = Math.max(o, s.minRows), t.css({
                        "overflow-y": "hidden"
                    }))
                    if(f.fn){f.fn(r.rows)}
                };
            (!r.rows || r.rows < s.minRows) && (r.rows = s.minRows), t.off(".resize"), e() ? t.on("input.resize", c) : o() ? t.on("propertychange.resize", c) : t.on("keypress.resize", c), t.one("focus", c), c()
        }), this
    }
}).call(this);
//
$(function(){
$.fn.drags = function(opt) {
    opt = $.extend({handle:"",cursor:"drag"}, opt);
    if(opt.handle === "") {
        var $el = this;
    } else {
        var $el = this.find(opt.handle);
    }
    return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
        if(opt.handle === "") {
            var $drag = $(this).addClass('draggable');
        } else {
            var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
        }
        var drg_h = $drag.outerHeight(),
            drg_w = $drag.outerWidth(),
            pos_y = $drag.offset().top + drg_h - e.pageY,
            pos_x = $drag.offset().left + drg_w - e.pageX;
        $drag.parents().on("mousemove", function(e) {
            $('.draggable').offset({
                top:e.pageY + pos_y - drg_h,
                left:e.pageX + pos_x - drg_w
            }).on("mouseup", function(e) {
                $(this).removeClass('draggable')
            });
        });
        e.preventDefault(); // disable selection
    }).on("mouseup", function(e) {
        if(opt.handle === "") {
            $(this).removeClass('draggable');
        } else {
            $(this).removeClass('active-handle').parent().removeClass('draggable');
            e.e=$(this).parent(),e.drg_h=$(window).height(),e.drg_w=$(window).width(),e.pos=e.e.offset(),e.h=e.e.height();e.w=e.e.width();
            console.log(e)
            console.log(e.w)
                if((e.w+e.pos.left)>e.drg_w){e.pos.left=e.drg_w-e.w}
            console.log(e.pos)
//                if((e.h+e.pos.top)>e.drg_h){e.pos.top=e.drg_h-e.h}
//                if((e.pos.top)<e.drg_h){e.pos.top=0}
                if((e.pos.left)<e.drg_w){e.pos.left=0}
                e.e.animate(e.pos)
        }
    });

}
$.CloudChat.browser=function(u){u={};
    u.ua=navigator.userAgent,u.tem,u.M=u.ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(u.M[1])){
        u.tem=/\brv[ :]+(\d+)/g.exec(u.ua)||[]; 
        return {name:'IE',version:(u.tem[1]||'')};
        }
    if(u.M[1]==='Chrome'){
        u.tem=u.ua.match(/\bOPR\/(\d+)/)
        if(u.tem!=null)   {return {name:'Opera', version:u.tem[1]};}
        }   
    u.M=u.M[2]? [u.M[1], u.M[2]]: [navigator.appName, navigator.appVersion, '-?'];if((u.tem=u.ua.match(/version\/(\d+)/i))!=null) {u.M.splice(1,1,u.tem[1]);};u.s=navigator.userAgent;u.os='ukn';u.f=function(e){return u.s.indexOf(e)>-1};switch(true){case u.f("CloudFlare"): u.os="CloudFlare";break; case u.f("iPad"): case u.f("iPhone"): case u.f("iPod"): case u.f("iTouch"): case u.f("iOS"): u.os="iOS";break; case u.f("Mac"): u.os="Macintosh";break; case u.f("Win"): u.os="Windows";break; case u.f("Android"): u.os="Android";break; case u.f("X11"): u.os="Unix";break; case u.f("Linux"): u.os="Linux";break; case u.f("SunOS"): u.os="Solaris";break;};if(/Mobi/.test(navigator.userAgent)){u.mob=true}
    return {
        mobi:u.mob,
      device:(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(u.s)),
      os:u.os,
      userAgent:navigator.userAgent,
      host:$.CloudChat.host,
      name: u.M[0],
      version: u.M[1]
    };
 }
$.CloudChat.base.init=function(e,g){
    if(!g){g={}}
    switch(e){
        case'ln':g={g:g}
        var replacedText,replacePattern1,replacePattern2,replacePattern3;
        replacePattern1=/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?![^<]+>)/gim;
        replacedText=g.g.replace(replacePattern1,'<a href="$1" target="_blank">$1</a>');
        replacePattern2=/(^|[^\/])(www\.[\S]+(\b|$))(?![^<]+>)/gim;
        replacedText=replacedText.replace(replacePattern2,'$1<a href="http://$2" target="_blank">$2</a>');
        replacePattern3=/(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)(?![^<]+>)/gim;replacedText=replacedText.replace(replacePattern3,'<a href="mailto:$1">$1</a>');
        return replacedText;
        break;
        case 'ls':
            g={e:jQuery('.livestamp')};
            g.e.each(function(){g.v=jQuery(this),g.t=g.v.attr('title');if(!g.t){return};g.v.toggleClass('livestamp livestamped').attr('title',$.CloudChat.base.init('t',g.t)).livestamp(g.t);})
            return g.e
        break;
        case't':
            if(!g){g=new Date();}
            return moment(g).format('YYYY-MM-DD HH:mm:ss')
        break;
    }
}
$.CloudChat.rid=function(min,max){return Math.floor(Math.random()*(max-min+1)+min)}
$.CloudChat.gid=function(x){
    if(!x){x=10};var t = "";var p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < x; i++ )
        t += p.charAt(Math.floor(Math.random() * p.length));
    return t;
}
$.CloudChat.SND=function(x,y,t){
    if(x===2){return document.hasFocus()===false};
    t=$('#AUDIO_BEEP')[0];if(x===1){t.play()}else{t.pause()}
}
$.CloudChat.scrTo=function(g){
    g=jQuery(g);if(g.length===0){return}
    jQuery('html,body').animate({scrollTop:g.offset().top},1000);
}
$.CloudChat.pp=function(g,f,z){
    if(!$.CloudChat.ao){return z}
    $.each($.CloudChat.ao,function(n,v){
        if(v.bid)v.b=v.bid;if(v.u===g&&v.b===f){z=v.pp}
    });
    return z;
}
$.CloudChat.bg=function(g){
    $.each(g,function(n,v){
        if(v==='initial'){g[n]=''}
    })
    g.purl=$.CloudChat.op().purl;
    if(isNaN(parseInt(g.gr_c))===false){g.gr_c='//app.unmetered.chat/libs/images/default/greet'+g.gr_c+'.png'}
    $.each(['abg','rabg','cbg','sibg','grbg'],function(n,v){
        if(isNaN(parseInt(g[v]))===false){g[v]='//app.unmetered.chat/libs/images/default/bg'+g[v]+'.jpg'}
    })
    if(g.logoi&&g.logoi!==''){
        g.ulogoi=$.CloudChat.base.mcw.find('.unm_logo_img');
        if(g.logoi.indexOf('//')>-1){
            g.ulogoi.css('background-image','url('+g.logoi+')').text('');
        }else{
            g.ulogoi.html('<i class="'+g.logoi+'"></i>').css('background-image','');
        }
        g.ulogoi.show()
    }else{$.CloudChat.base.mcw.find('.unm_logo_img').hide()}
    g.greet=$('#mm-chat-greet');
    switch(g.gre_mo){
        case'1':
            g.greet.html('<div class="unm-quickie"><i fn="c" cancel class="chi-cancel-circle"></i><div class="unm-quickie-body"><div class="char"></div><table><tr><td class="body_text"><div><b class="unm_lang_greet_1" style="font-size:1.5em">Questions?</b><div class="unm_lang_greet_2">Operators are online and ready to chat!<i class="chi-emo-laugh"></i></div></div></td><td><div class="unm-chat-collage mm-admin-choose mm-operator-poke"></div></td></tr></table></div><input class="unm-quickie-input" placeholder="Enter Message"></div>').find('.unm-quickie-input').focus(function(e){
                $.CloudChat.init('o',{o:1}),$.CloudChat.init(4);if($.CloudChat.op().stat!==1){$.CloudChat.base.mcw.find('.unm_lang_btn_1').click()};$.CloudChat.base.cs.focus();
            });
        break;
        default:
            g.greet.html('<div fn="o" class="unm-bubble"><i fn="c" cancel class="chi-cancel-circle"></i><b class="unm_lang_greet_1" style="font-size:1.5em">Questions?</b><div class="unm_lang_greet_2">Operators are online and ready to chat!<i class="chi-emo-laugh"></i></div></div><div fn="o" class="char"></div>');
        break;
    }
    if(g.lang_1&&g.lang_1!==''){$.CloudChat.base.mcw.find('.unm_lang_1').html(g.lang_1)}
    if(g.lang_2&&g.lang_2!==''){$.CloudChat.base.mcw.find('.unm_lang_2').html(g.lang_2)}
    if(g.lang_3&&g.lang_3!==''){$.CloudChat.base.mcw.find('.unm_lang_3').html(g.lang_3)}
    if(g.lang_btn_1){$.CloudChat.base.mcw.find('.unm_lang_btn_1').html(g.lang_btn_1)}
    if(g.lang_greet_1){$.CloudChat.base.gre.find('.unm_lang_greet_1').html(g.lang_greet_1)}
    if(g.lang_greet_2){$.CloudChat.base.gre.find('.unm_lang_greet_2').html($.emoticons.replace(g.lang_greet_2))}
    if(g.wig_st){$.CloudChat.base.mcw.removeClass('style_d style_mini style_floater style_clear').addClass(g.wig_st)}
    if(!g.poweredby_||g.poweredby_==''){g.poweredby_='Powered By <i class="chi-magnet"></i> <b>UNMETERED.Chat </b><i>Beta</i>';}
    $.CloudChat.base.mcw.find('.poweredby_').html(g.poweredby_);
    g.tmp='<style class="unmStyles">';
    if(g.grbg&&g.grbg!=='')g.tmp+='#mm-chat-greet .unm-quickie-body{background-image:url('+encodeURI(g.grbg)+')!important;background-size:'+g.grbg_aze+'!important;background-position:'+g.grbg_pos+'}';
    if(g.abg&&g.abg!=='')g.tmp+='#mm-chat-away{background-image:url('+encodeURI(g.abg)+')!important;background-size:'+g.abg_aze+'!important;background-position:'+g.abg_pos+'}';
    if(g.rabg&&g.rabg!=='')g.tmp+='#mm-chat-rating{background-image:url('+encodeURI(g.rabg)+')!important;background-size:'+g.rabg_rze+'!important;background-position:'+g.rabg_pos+'}';
    if(g.cbg&&g.cbg!=='')g.tmp+='#mm-chat-window .diah{background-image:url('+encodeURI(g.cbg)+')!important;background-size:'+g.cbg_cze+'!important;background-position:'+g.cbg_pos+'}';
    if(g.sibg&&g.sibg!=='')g.tmp+='#mm-chat-window .add_details{background-image:url('+encodeURI(g.sibg)+')!important;background-size:'+g.sibg_size+'!important;background-position:'+g.sibg_pos+'}';
    g.tmp+='#mm-chat-window .diah_shade{background-color:'+g.cbg_shade+'!important;}';
    g.tmp+='#mm-chat-rating .mm_shade{background-color:'+g.rabg_shade+'!important;}';
    g.tmp+='#mm-chat-away .mm_shade{background-color:'+g.abg_shade+'!important;}';
    g.tmp+='#mm-chat-window .add_details .mm_shade{background-color:'+g.sibg_shade+'!important;}';
    g.tmp+='#mm-chat-greet .unm-bubble{color:'+g.greet_ft_text+'!important;}';
    g.tmp+='#mm-chat-greet .unm-bubble{background-color:'+g.greet_bg_text+'!important;}';
    g.tmp+='#mm-chat-window .add_details{background-position:'+g.sibg_pos+'!important;}';
    g.tmp+='#mm-chat-away{background-position:'+g.abg_pos+'!important;}';
    g.tmp+='#mm-chat-window{background-position:'+g.cbg_pos+'!important;}';
    g.tmp+='#mm-chat-greet .char{background-image:url("'+g.gr_c+'")}';
    g.tmp+='#mm-chat-rating,#mm-chat-rating *:not(input):not(select):not(option):not(.btn-unm){color:'+g.rabg_text+'!important}';
    g.tmp+='#mm-chat-away,#mm-chat-away *:not(input):not(select):not(option){color:'+g.abg_text+'}';
    g.tmp+='#mm-chat-window .diah_shade,#mm-chat-window .diah_shade *:not(input):not(select):not(option):not(small){color:'+g.cbg_text+'}';
    g.tmp+='#mm-chat-window .add_details,#mm-chat-window .add_details h1,#mm-chat-window .add_details p{color:'+g.sibg_text+'}';
    g.tmp+='.bmsg .from-them .unm-bubble{background-color:'+g.fbbg_shade+'}';
    g.tmp+='.bmsg .from-them .unm-bubble:before{border-left-color:'+g.fbbg_shade+'}';
    g.tmp+='.bmsg .from-them .unm-bubble small{color:'+g.fb_text+'}';
    g.tmp+='.bmsg .from-me .unm-bubble{background-color:'+g.tbbg_shade+'}';
    g.tmp+='.bmsg .from-me .unm-bubble:before{border-right-color:'+g.tbbg_shade+'}';
    g.tmp+='.bmsg .from-me .unm-bubble small{color:'+g.tb_text+'}';
    g.tmp+='.bmsg .from-server .unm-bubble{background-color:'+g.svm_shade+'}';
    g.tmp+='.bmsg .from-server .unm-bubble *{color:'+g.svm_text+'}';
    g.tmp+='.bmsg .unm-bub-h .livestamp{color:'+g.ts_text+'}';
    g.tmp+='#mm-chat-launch.open:not(.online),#mm-chat-launch:not(.online){background-color:'+g.loff_text+'!important;border-color:'+g.loffb_text+'!important;}';
    g.tmp+='#mm-chat-launch.online.open,#mm-chat-launch.online{background-color:'+g.lon_text+'!important;border-color:'+g.lonb_text+'!important;}';
    g.tmp+='#mm-chat-window .add_details .beauty-hold{background-color:'+g.sibh_shade+'!important;}';
    g.tmp+='#mm-chat-away .beauty-hold{background-color:'+g.abh_shade+'!important;}';
    g.tmp+='#mm-chat-rating .beauty-hold{background-color:'+g.rabh_shade+'!important;}';
    g.tmp+='#mm-chat-window .unm_topbar{background-color:'+g.top_bar_shade+'!important;}';
    g.tmp+='#mm-chat-window .unm_topbar i{color:'+g.top_bar_text+'!important;}';
    g.tmp+='#mm-chat-launch .faces i:before {'+g.icon_offline+'}';
    g.tmp+='#mm-chat-launch .faces.online i:before {'+g.icon_online+'}';
    if(g.op_po){g.tmp+='#mm-chat-window .mm-operator-poke{display:'+g.op_po+'!important}#mm-chat-window .mm-operator-poke+div{width:100%!important}'};
    if(!g.pg_1){g.pg_1='1'};$.CloudChat.base.mcw.find('.unm-pg-1[pgfc]').hide(),$.CloudChat.base.mcw.find('.unm-pg-1[pgfc="'+g.pg_1+'"]').show();
    if((g.icon_offline_img&&g.icon_offline_img.trim()!=='')||(g.icon_online_img&&g.icon_online_img.trim()!=='')){g.tmp+='#mm-chat-launch .faces i{display:none}';}
    if(g.icon_online_img&&g.icon_online_img.trim()!==''){
        g.tmp+='#mm-chat-launch .faces.online{background-image:url("'+g.icon_online_img+'")!important;background-size:'+g.icon_online_img_size+'!important;}';
    }
    if(g.icon_offline_img&&g.icon_offline_img.trim()!==''){
        g.tmp+='#mm-chat-launch .faces{background-image:url("'+g.icon_offline_img+'")!important;background-size:'+g.icon_offline_img_size+'!important;}';
    }
    g.tmp+=g.css;
    g.tmp+='</style>';
    jQuery('#mm-style-drop').html(g.tmp);
}
$.CloudChat.depts={}
$.CloudChat.placimg=function(k,o){o={size:'100x100',bgcolor:'#0d78bd',color:'#fff',text:'CC',fsize:'40',ffamily:'Segoe UI'};if(k){o.text=k;};return o;};
$.CloudChat.pm=function(x,v,z,k){
    var tmp='';
    switch(x){
        case 2://draw deptarments
            v.unmD=$('#unmDept').parent();
            if(v.d.length==0){v.unmD.hide();}else{v.unmD.show()};
            v.e=$('#unmDept');v.e.find('option:not([value="General"])').remove();
            $.each(v.d,function(n,b){
                $.CloudChat.depts[b.Name]=b;
                v.e.append('<option value="'+b.Name+'">'+b.Name+'</option>');
            });
            if($.CloudChat.op().dept){$('#unmDept').val($.CloudChat.op().dept)}
            $('#unmDept').val("General");
        break;
        case 0:
            jQuery.each(v,function(n,b){
                jQuery.each(b,function(t,y){
                    tmp+=$.CloudChat.tm(0,y,z,k)
                })
            })
            jQuery('#mm-admin-list').html(tmp)
            $('#mm-admin-list [hid]').animate({height:'50px',opacity:1});
        break;
        case 1://Load multiple unm-bubbles
            if(!k){k={}}
            if(!z){z='#mm-chat-messages'}
            k.o=$.CloudChat.op();
            jQuery(z).empty();k.bid=k.o.bid;
            if(v.length>0){
            jQuery.each(v,function(n,b){
                if(b===null){return}
                if(b.sender!==k.bid){b.fr=1}
                tmp+=$.CloudChat.tm(1,b,z,0)
            })
            }else{
               if(k.o.dept&&k.o.dept!=='General'&&$.CloudChat.depts[k.o.dept].Message!==''){k.m=$.CloudChat.depts[k.o.dept].Message;}else{k.m='Ask your question down below! We\'ll be right with you!';}
               if($(z).parents('[chann]').length==0){tmp='<li class="from-server unm-list-group-item text-center unm-bub-h from-them text-center clearfix"><div class="unm-bubble"><small class="text-center"><h1 style="text-align:center;padding:20px 0 10px;margin: 0 0 20px 0"><i class="chi-emo-laugh"></i></h1>'+k.m+'</small></div></li>'}
            }
            jQuery(z).html(tmp).animate({scrollTop:jQuery(z).prop("scrollHeight")},500)
            $.CloudChat.base.init('ls')
        break;
        case 12:
            if(!k){k={}};k.a=$.CloudChat.init('ao');$(v).html('').attr('count',Object.keys(k.a).length);
            $.each(k.a,function(n,b){
                tmp+=$.CloudChat.tm(0,b,v,'3');
            });
        break;
    }
}
$.CloudChat.tm=function(x,v,z,k){//Draw Some Elements
    var tmp='';
    switch(x){
        case 0://Operator unm-bubble
            if(v.bid){v.b=v.bid};v.i='';if(!v.n){v.n='A'}
            if(!v.pp||v.pp===''||v.pp==null){v.pp=placeholder.getData($.CloudChat.placimg(v.n.charAt(0)));delete(v.tmp);}
            if(!k){v.n+=' has joined';v.ii='[';}else{v.i='for="ch_'+v.u+'_'+v.b+'" c';v.ii='[for="ch_'+v.u+'_'+v.b+'"][c';}
           tmp+='<label '+v.i+'hid="'+v.u+'" bid="'+v.b+'" peer="'+v.peer+'" style="height:0;width:0;opacity:0" class="animated thumb avatar" title="'+v.n+'"><div class="my_avatar_shade"></div>';
           tmp+='<div class="img" style="background-image: url('+v.pp+');"></div>';
            switch(k){
                case 1:
                    tmp+='<div class="text-center name">'+v.n+'</div><input id="ch_'+v.u+'_'+v.b+'" type="checkbox" name="'+v.u+'" value="'+v.b+'">'
                break;
                case'3':
                    tmp+='<input id="ch_'+v.u+'_'+v.b+'" type="checkbox" name="'+v.u+'" value="'+v.b+'">'
                break;
            }
           tmp+='</label>';
            v.iii=v.ii+'hid="'+v.u+'"][bid="'+v.b+'"]';
            switch(k){
                case undefined:case null:
                if(v.status!==1){
                    v.e=$('#mm-admin-list [hid="'+v.u+'"][bid="'+v.b+'"]');
                    v.e.addClass('fadeOut').animate({height:0,width:0},200);
                    setTimeout(function(){v.e.remove()},500)
                }else{
                    if($('#mm-admin-list [hid="'+v.u+'"][bid="'+v.b+'"]').length===0){
                        jQuery('#mm-admin-list').append(tmp)
                        $('#mm-admin-list [hid="'+v.u+'"][bid="'+v.b+'"]').animate({height:'50px',width:'50px',opacity:1})
                    }
                }
                break;
                case 1:
                    v.iii='#mm-admin-choose '+v.iii;
                    if(v.status!==1){
                        v.e=$(v.iii);
                        v.e.animate({height:0,width:0},200);
                        setTimeout(function(){v.e.remove()},500)
                    }else{
                        if($(v.iii).length===0){
                            $('#mm-admin-choose').append(tmp)
                            $(v.iii).animate({height:'50px',width:'50px',opacity:1})
                        }
                    }
                break;
                case'3':
                    if(v.status==1){
                        $(z).append(tmp);$(z+' '+v.iii).css({height:'',width:'',opacity:1})
                    }else{
                        $(z+' '+v.iii).remove();
                    }
                    z=$(z);z.attr('count',Object.keys($.CloudChat.init('ao')).length)
                break;
            }
        break;
        case 1://Load single Chat unm-bubble
//           if(!v.d){v.d='';}
           if(!z||z===''){z='#messages'}
            v.d=$.CloudChat.base.init('ln',v.d)
            v.d=jQuery.emoticons.replace(v.d)
           if(v.fr===1){v.f='them'}else{v.f='me'};v.mm=jQuery(z);v.inv=v.mm.find('li:hidden')
           tmp+='<li class="unm-list-group-item unm-bub-h clearfix from-'+v.f+'" title="'+$.CloudChat.base.init('t',v.time)+'">'
           tmp+='<div>'
           if(v.file&&v.file.length>0){
               $.each(v.file,function(m,b){
                   if(b.name){
                   tmp+='<table class="unm-file-attached"><tr>'
                   tmp+='<td><i class="chi-attach"></i></td>'
                   tmp+='<td><a href="'+b.downloadURLs[0]+'">'+b.name+'</a>';
                   tmp+='<div class="text-right contentType">'+b.contentType+'</div></td>';
                   tmp+='</tr></table>'
                   }
               })
           }
           v.pp=$.CloudChat.pp(v.uid,v.sender);
           if(!v.pp){v.pp=placeholder.getData($.CloudChat.placimg(v.name.charAt(0)))}
           if(v.fr===1){tmp+='<div class="thumb my_avatar avatar"><div class="img" style="background-image: url('+v.pp+');"></div></div>'}
           tmp+='<span class="unm-bubble clearfix">'
           tmp+='<span class="icon_options"><a class="mm-lang-pop"><i class="chi-language"></i></a></span>'
           tmp+='<small>'+v.d+'</small>'
           tmp+='<div class="translated"></div>'
           if(v.fr===1){tmp+='<b class="text-right">'+v.name+'</b>'}
           tmp+='</span></div>'
            if(v.fr===1){v.fr='left';}else{v.fr='right';}
            switch(v.st){case 0:v.st='Delivered';$('#mm-chat-messages .from-me .status').empty();break;default:v.st='';break;}
            tmp+='<div class="bottom_row_text" style="text-align:'+v.fr+'"><span class="status">'+v.st+'</span> &nbsp; <span class="livestamp" title="'+v.time+'"></span></div>';
           tmp+='</li>';
           if(k&&k===1){
               jQuery(z).append(tmp)
               jQuery(z).animate({scrollTop:jQuery(z).prop("scrollHeight")},500)
               $.CloudChat.base.init('ls')
//               if($.CloudChat.op().ws==0){$.CloudChat.SND(1,1)}
           }
        break;
        case 2://load single admin
            if(!v.pp||v.pp===''||v.pp==null){v.pp=placeholder.getData($.CloudChat.placimg(v.n.charAt(0)))}
           tmp+='<div opj="'+v.bid+'" uid="'+v.u+'" peer="'+v.peer+'" title="'+v.n+'" class="my_avatar"><div class="img" style="background-image: url('+v.pp+');"></div><div typing><span></span></div></div>';
        break;
        case 3://Load Neutral unm-bubble
           if(!z||z===''){z='#messages'};if(v.id){v.id='id="msg_'+v.id+'"'}else{v.id=''}
            if(!v.c){v.c=''};if(!v.time){v.time=moment(new Date)}
           tmp+='<li '+v.id+' class="unm-list-group-item text-center unm-bub-h clearfix">'
           tmp+='<div><span class="unm-bubble clearfix '+v.c+'">'
           if(v.url){tmp+='<div title="Visited" class="clearfix text-ellipsis"><a href="'+v.url+'">'+v.url+'</a></div>'}
           if(v.referrer){tmp+='<div title="Referrer" class="clearfix text-ellipsis referrer"><a href="'+v.referrer+'">'+v.referrer+'</a></div>'}
           if(v.msg){tmp+='<small class="clearfix">'+v.msg+'</small>'}
           tmp+='</span></div>'
           tmp+='<div class="livestamp bottom_row_text" style="text-align:center" title="'+v.time+'"></div>'
           tmp+='</li>'
           switch(k){
               case 1:
                   jQuery(z).append(tmp)
                   jQuery(z).animate({scrollTop:jQuery(z).prop("scrollHeight")},500)
                   $.CloudChat.base.init('ls');
//                   if($.CloudChat.op().ws==0){$.CloudChat.SND(1,1)}
               break;
           }
        break;
        case 10:
            v.e=jQuery('[typing="'+v.$bid+'"][uid="'+v.$uid+'"]');
            if((typeof v.kp)==="string"){v.kpl=v.kp.length}else{v.kpl=v.kp;}
            if(v.kpl<1||v.kp===''){
                $('#mm-admin-list [hid="'+v.$uid+'"][bid="'+v.$bid+'"]').removeClass('fI_bo').attr('title',v.n+' has joined..')
                v.e.remove()
            }else{
                if(v.e.length===0){
                    if((typeof v.kp)==="string"){
                        v.kp=$.emoticons.replace(v.kp);
                        tmp+='<div typing="'+v.$bid+'" uid="'+v.$uid+'"><div><b><strong>'+v.n+'</strong> is typing...</b></div><span>'+v.kp+'</span></div>';
                        $.CloudChat.base.mcw.find('.typing_operators').prepend(tmp);
                    }else{
                        $('#mm-admin-list [hid="'+v.$uid+'"][bid="'+v.$bid+'"]').addClass('fI_bo').attr('title',v.n+' is typing..');
                    }
                }else{
                    if((typeof v.kp)==="string"){
                        v.kp=$.emoticons.replace(v.kp);
                        jQuery('[typing="'+v.$bid+'"][uid="'+v.$uid+'"] span').html(v.kp);
                    }
                } 
            }
        break;
        case 11://rating options
            if(!v)v={};v.t='';
            v.default={"hpwoo":{"t":"1","d":"Promptness of Operators?"},"hwyqa":{"t":"1","d":"Thoughtful responses recieved?"},"all_qs":{"t":"3","d":"First time you've asked about this?","o":[{"t":"Yes","v":"5"},{"t":"No","v":"0"}]},"wylac":{"t":"5","d":"Would you like a copy of this chat?<br><small>If so  please enter Email Address</small>"}};
            if(localStorage.getItem('unmRating_'+$.CloudChat.ke)){
              v.a=localStorage.getItem('unmRating_'+$.CloudChat.ke);
            }
            if(typeof v.a==='string'){try{v.a=JSON.parse(v.a)}catch(er){v.a=v.default}}
            if(!v.a||$.CloudChat.op().ry==='d'){v.a=v.default}
            $.each(v.a,function(m,b){
                v.t+='<div class="rateable_block">';
                v.t+='<label>'+b.d+'</label>';
                switch(b.t){
                    case'1':
                        v.t+='<section class="star_rating">';
                        $.each([1,2,3,4,5],function(j,f){
                            v.t+='<input type="radio" name="'+m+'" class="rating" value="'+f+'"/>';
                        });
                        v.t+='</section>';
                    break;
                    case'2':case'5':
                        v.t+='<input type="text" name="'+m+'" placeholder="Leave blank for no answer." class="unm-form-control">';
                    break;
                    case'3':case '4':
                        v.t+='<select class="unm-form-control" name="'+m+'"';if(b.t==="4"){v.t+=' multiple'};v.t+='>';
                        $.each(b.o,function(j,f){
                            v.t+='<option value="'+f.v+'">'+f.t+'</option>';
                        });
                        v.t+='</select>';
                    break;
                }
                v.t+='</div>';
            })
            $.CloudChat.base.mcw.find('.rateables').html(v.t)
            $.CloudChat.base.mcw.find('.star_rating').rating();
        break;
        default:
            console.log('No Controller')
        break;
    }
   return tmp
}

    $.CloudChat.nops=function(){
        d={ao:$.CloudChat.ao};d.ca=0;
        $.each(d.ao,function(t,y){if(y.status==1){++d.ca;}});
        if(d.ca>0){$.CloudChat.fc(1);$.CloudChat.base.mcw.removeClass('nops')}else{$.CloudChat.fc(0);$.CloudChat.base.mcw.addClass('nops')}
    }
    $.CloudChat.di=function(){
        if(CloudChat.disconnected===true){return true}
        return false
    }
    $.CloudChat.op=function(r,rr,rrr){
        if(!rrr){rrr={};};if(!rrr.n){rrr.n='unmOptions_'+$.CloudChat.ke}
        ii={o:localStorage.getItem(rrr.n)}
        try{ii.o=JSON.parse(ii.o)}catch(e){}
        if(!ii.o){
            switch(rrr.n){
                case'unmOptions':
                    ii.o={audio0:1,audio1:1}
                break;
                default:
                    ii.o={p:{}}
                break;
            }
        }
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
    $.CloudChat.cx=function (t,x) {
        if(!t.bid){t.bid=$.CloudChat.op().bid;};if(!t.uid){t.uid=$.CloudChat.ke;};
         return CloudChat.emit('f',t)
    }
    $.CloudChat.data=function(t){
         return $.CloudChat.cx({f:'data',data:t});
    }
})