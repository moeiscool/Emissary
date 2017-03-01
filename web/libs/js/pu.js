svr.u={}
$(window).focus(function(e){
    init('cf');svr.ws=1;
}).blur(function(){svr.ws=0;})
window.addEventListener("beforeunload", function (e) {
    delete(opener.window.svr.p['CHAT_'+$user.pke+'_'+$user.pbid])
});
function cx(t,x){
    if(!t.bid){t.bid='ADMIN_'+$user.id}
    if(!t.uid){t.uid=$user.ke}
    return CloudChat.emit('f',t)
}
function SND(x,y,t){
    t={o:Op()}
    switch(x){
        case 2:
            return document.hasFocus()===false
        break;
        case 1:
            x='#AUDIO_BEEP'
        break;
        default:
            x='#AUDIO_LOOP'
        break;
    }
    if(t.o.audio1==1){
        switch(y){
            case 0:
                $(x)[0].pause()
            break;
            case 1:
                if(t.o.audio0==0&&x==='#AUDIO_LOOP'){
                    return
                }
                $(x)[0].play()
            break;
        }
    }
}
function init(e,g){
    if(!g){g={}}
    switch(e){
        case 0:
            clearInterval(svr.SNI);delete(svr.SNI)
            g.ar={f:'a',ff:'p',uid:$user.ke,uuid:$user.pke,n:$user.name}
            cx(g.ar)
        break;
        case'cf':
    e={};e.WTC=$('#WIN_WTC',opener.document);
    e.WTC.find('[bid="'+$user.pbid+'"][uid="'+$user.pke+'"],[ctb="'+$user.pbid+'"][uid="'+$user.pke+'"]').removeClass('fI_bg typing')
        break;
    }
}
$user.ee='[CHAT="'+$user.pbid+'"][uid="'+$user.pke+'"]';
$($user.ee+' .send_').unbind('submit').submit(function(e){
    e.preventDefault();
    f={};f.e=$(this).find('input'),f.v=f.e.val()
    if(f.v.length===0){return}
    f.m={d:f.v,time:moment().format(),name:$user.name,uid:$user.pke}
    cx({f:'s',s:$user.pbid,u:$user.pke,m:f.m})
    tm(1,f.m,$user.ee+' .msg_',1)
    f.e.val('')
    return
})
cx({f:'a',ff:'g',fff:'c',tbid:$user.pbid,uid:$user.pke})
CloudChat.on('ret',function(d){
        if(d.bg){
            svr.init('ops',JSON.parse(d.bg))
        }
        if(d.geo){
            svr.u[d.bid].geo=d.geo
            if($('[chat="PRCKdHTVdG1"][focus="1"]')){init('geo',d)}
        }
        if(d.al){
            init('fl',{bid:d.bid,uid:d.uid,c:d.al})
        }
        if(d.msg){
            d.msg.fr=1;
            d.CHAT='[CHAT="'+d.msg.rid+'"][uid="'+d.msg.uid+'"]'
            console.log(d.CHAT)
            if($(d.CHAT).length===0){

            }else{
                tm(1,d.msg,d.CHAT+' .msg_',1)
            }
            if(svr.ws===1){init('cf')}
        }
        if(d.history){
            pm(1,d.history,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .msg_',{k:1})
        }
        if(d.vid){
            pm(7,d.vid,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] [name="vid"]',{cid:d.cid})
        }
        if(d.brd){
            pm(6,d.brd,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .brd_')
        }
        switch(d.f){
            case's':
                switch(d.ff){
                    case 0:
                        d.ee=$('[CHAT="'+d.bid+'"][uid="'+d.uid+'"]'),d.a=d.ee.attr('focus')
                        if(d.a!=="1"){
                            if(d.m.length>0){
                                $('[bid="'+d.bid+'"][uid="'+d.uid+'"]').addClass('typing')
                            }
                        }
                        if(d.ee.length===1){
                            d.ee.find('.msgp').text(d.m)
                        }else{
                            //add a notify when typing?
                        }
                    break;
                }
            break;
            case'j':
                switch(d.ff){
                    case'b':
                        d.time=moment().format(),d.msg='Visitor Ended Chat',d.c='bg-danger'
                        tm(3,d,'#MSG_'+d.bid,1)
                        $('#live_users [bid="'+d.bid+'"][uid="'+d.uid+'"]').prependTo('#live_visitors')
                    break;
                }
            break;
            case'v':
                svr.u[d.u.bid]=d.u,d.ee='[CHAT="'+d.u.bid+'"][uid="'+d.u.uid+'"]';
                if($(d.ee).attr('focus')==1){
                    $('[chat] .geo .footprints').text(d.u.ft)
                    $('[chat] .geo .last_visit').text(d.u.last_visit)
                }
                if($(d.ee+' .msg_').length===1){
                    pm(7,d.u.vid,d.ee+' [name="vid"]',{cid:d.cid})
                }
            break;
            case'ii':
                d.ee='[CHAT="'+d.u.bid+'"][uid="'+d.u.uid+'"]';
                if($(d.ee+' .msg_').length===1){
                    tm(3,d.u,d.ee+' .msg_',1)
                    tm(6,d.u,d.ee+' .brd_')
                    pm(7,d.u.vid,d.ee+' [name="vid"]',{cid:d.cid})
                }
                svr.init('ls')
            break;
            case'i':
                $('.bid').text(d.bid)
                $('.cid').text(d.cid)
            break;
            case'dii':
                delete(svr.u[d.d].vid[d.cn]),d.ee='[CHAT="'+d.d+'"][uid="'+d.uid+'"]';
                if($(d.ee+' .msg_').length===1){
                    init(3,{e:d.ee+' [name="vid"]',v:d.cn,f:0})
                }
            break;
            case'li':
                if(Object.keys(svr.u[d.bid].vid).length===0){
                    delete(svr.u[d.bid])
                    $('#all_visitors [bid="'+d.bid+'"][uid="'+d.uid+'"]').remove()
                }
                d.ee='[CHAT="'+d.bid+'"][uid="'+d.uid+'"]';
                if($(d.ee+' .msg_').length===1){
                    d.time=moment().format(),d.msg='Visitor has Left',d.c='bg-danger'
                    tm(3,d,d.ee+' .msg_',1)
                    init(3,{e:d.ee+' [name="vid"]',v:d.vid,f:0})
                }
                delete(svr.u[d.bid])
                $('[vid="'+d.vid+'"]').remove()
            break;
        }
        if(d.remove){
            $(d.remove.join(',')).remove()
        }
    console.log(d)
    });
    svr.SNI=setInterval(function(){
        if(CloudChat.connected){init(0)}
    },500)
    $('body').on('click','[winc]',function(){
    e={w:$(this).attr('winc'),e:$(this).parents('.winb')};
        switch(e.w){
            case't':
                e.e=$(this).parents('[CHAT]')
                e.i=e.e.find('.tools')
                if(e.i.hasClass('open')){
                    e.i.slideDown().removeClass('open')
                }else{
                    e.i.slideUp().addClass('open')
                }
            break;
            case'e':
                e.e.toggleClass('col-md-6 col-md-12')
            break;
            case'm':
                e.e.hide()
            break;
            case'v':case'f':
                e={e:$(this),f:e.w};e.w=e.e.parents('[CHAT]'),e.i=e.e.find('i')
                switch(e.f){
                    case'v':
                        e.ar=['sound','fa-volume-up','fa-volume-off']
                    break;
                    case'f':
                        e.ar=['flash','fa-star','fa-star-half-o']
                    break;
                }
                if(e.i.hasClass(e.ar[1])){
                    e.w.attr(e.ar[0],0)
                }else{
                    e.w.attr(e.ar[0],1)
                }
                e.i.toggleClass(e.ar[1]+' '+e.ar[2])
            break;
        }
    })
    .on('submit','.toolPop',function(e){
        ee={e:$(this)};ee.f=ee.e.serializeObject()
        ee.e.find('input').val('')
        cx({f:'s',ff:'t',vid:ee.f.vid,form:ee.f});
        e.preventDefault();return;
    })
    .on('change input','[SEND]',function(e){
        if(Op().tnote===1){
            e={e:$(this)};e.a=e.e.attr('SEND'),e.v=e.e.val().length;
            cx({f:'a',ff:'b',bid:e.a,kp:e.v+1,n:$user.name});
        }
    })