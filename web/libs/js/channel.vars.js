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
});
$.CloudChat.pm=function(x,v,z,k){
    var tmp='';
    switch(x){
        case 0:
            jQuery.each(v,function(n,b){
                jQuery.each(b,function(t,y){
                    tmp+=$.CloudChat.tm(0,y,z,k)
                })
            })
            jQuery('#mm-admin-list').html(tmp)
            $('#mm-admin-list [hid]').animate({height:'50px',opacity:1});
        break;
        case 1://Load multiple Bubbles
            if(!k){k={}}
            if(!z){z='#mm-chat-messages'}
            jQuery(z).empty();k.bid=$.CloudChat.op().bid;
            if(v.length>0){
            jQuery.each(v,function(n,b){
                if(b.sender!==k.bid){b.fr=1}
                tmp+=$.CloudChat.tm(1,b,z,0)
            })
            }else{
                tmp='<li class="list-group-item text-center bub-h from-them text-center clearfix"><div class="bubble" style="padding-bottom:30px"><small class="text-center"><h1 style="text-align:center;padding:20px 0 10px;margin: 0 0 20px 0"><i class="chi-emo-laugh"></i></h1>Ask your question down below! We\'ll be right with you!</small></div></li>'
            }
            jQuery(z).html(tmp).animate({scrollTop:jQuery(z).prop("scrollHeight")},500)
            $.CloudChat.base.init('ls')
        break;
    }
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
    $.each($.CloudChat.ao,function(n,v){
        if(v.u===g&&v.b===f){z=v.pp}
    });
    return z;
}
$.CloudChat.tm=function(x,v,z,k){//Draw Some Elements
    var tmp='';
    switch(x){
        case 0://Operator Bubble
            if(v.bid){v.b=v.bid};v.i='';
            if(!v.pp||v.pp===''||v.pp==null){v.pp='//dashboard.unmetered.chat/libs/images/logo.png'}
            if(!k){v.n+=' has joined'}else{v.i='for="ch_'+v.u+'_'+v.b+'" c'}
           tmp+='<label '+v.i+'hid="'+v.u+'" bid="'+v.b+'" peer="'+v.peer+'" style="height:0;opacity:0" class="animated thumb avatar" title="'+v.n+'"><div class="my_avatar_shade"></div>';
           tmp+='<div class="img" style="background-image: url('+v.pp+');"></div>';
            if(k){tmp+='<div class="text-center name">'+v.n+'</div><input id="ch_'+v.u+'_'+v.b+'" type="checkbox" name="'+v.u+'" value="'+v.b+'">'}
           tmp+='</label>';
            if(!k){
                if(v.x===0){
                    v.e=$('#mm-admin-list [hid="'+v.u+'"][bid="'+v.b+'"]');
                    v.e.addClass('fadeOut').animate({height:0},200);
                    setTimeout(function(){v.e.remove()},500)
                }else{
                    if($('#mm-admin-list [hid="'+v.u+'"][bid="'+v.b+'"]').length<1){
                        jQuery('#mm-admin-list').append(tmp)
                        $('#mm-admin-list [hid][bid="'+v.b+'"]').animate({height:'50px',opacity:1})
                    }
                }
            }
        break;
        case 1://Load single Chat Bubble
           if(!z||z===''){z='#messages'}
            v.d=$.CloudChat.base.init('ln',v.d)
            v.d=jQuery.emoticons.replace(v.d)
           if(v.fr===1){v.f='them'}else{v.f='me'};v.mm=jQuery(z);v.inv=v.mm.find('li:hidden')
           tmp+='<li class="list-group-item bub-h clearfix from-'+v.f+'" title="'+$.CloudChat.base.init('t',v.time)+'">'
           tmp+='<div>'
           v.pp=$.CloudChat.pp(v.uid,v.sender);
           if(!v.pp){v.pp='//dashboard.unmetered.chat/libs/images/';if(v.fr===1){v.pp+='logo.png';}else{v.pp+='user.png';}}
           tmp+='<div class="thumb my_avatar avatar"><div class="img" style="background-image: url('+v.pp+');"></div></div>'
           tmp+='<span class="bubble clearfix">'
           tmp+='<a class="mm-lang-pop"><i class="chi-language"></i></a>'
           tmp+='<small>'+v.d+'</small>'
           tmp+='<div class="translated"></div>'
           if(v.fr===1){tmp+='<b class="text-right">'+v.name+'</b>'}
           tmp+='</span></div>'
           if(v.fr===1){v.fr='left'}else{v.fr='right'}
           tmp+='<div class="livestamp" style="text-align:'+v.fr+'" title="'+v.time+'"></div>'
           tmp+='</li>'
           if(k&&k===1){
               jQuery(z).append(tmp)
               jQuery(z).animate({scrollTop:jQuery(z).prop("scrollHeight")},500)
               $.CloudChat.base.init('ls')
//               if($.CloudChat.op().ws==0){$.CloudChat.SND(1,1)}
           }
        break;
        case 3://Load Neutral Bubble
           if(!z||z===''){z='#messages'};if(v.id){v.id='id="msg_'+v.id+'"'}else{v.id=''}
            if(!v.c){v.c=''};if(!v.time){v.time=moment(new Date)}
           tmp+='<li '+v.id+' class="list-group-item text-center bub-h clearfix">'
           tmp+='<div><span class="bubble clearfix '+v.c+'">'
           if(v.url){tmp+='<div title="Visited" class="clearfix text-ellipsis"><a href="'+v.url+'">'+v.url+'</a></div>'}
           if(v.referrer){tmp+='<div title="Referrer" class="clearfix text-ellipsis referrer"><a href="'+v.referrer+'">'+v.referrer+'</a></div>'}
           if(v.msg){tmp+='<small class="clearfix">'+v.msg+'</small>'}
           tmp+='</span></div>'
           tmp+='<div class="livestamp" style="text-align:center" title="'+v.time+'"></div>'
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
                        tmp+='<div typing="'+v.$bid+'" uid="'+v.$uid+'"><div><b>'+v.n+'</b></div><span>'+v.kp+'</span></div>';
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
        default:
            console.log('No Controller')
        break;
    }
   return tmp
}