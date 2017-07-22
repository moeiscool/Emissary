(function($,tmp){
if(!$.CloudChat.op().bid){$.CloudChat.op('bid',$.CloudChat.gid($.CloudChat.rid(9,15)));};
$.CloudChat.base.loc=location.href.match( /^(http.+\/)[^\/]+$/ ),$.CloudChat.base.p={}
if(!($.CloudChat.base.loc&&$.CloudChat.base.loc[1])){$.CloudChat.base.loc=location.href}else{$.CloudChat.base.loc=$.CloudChat.base.loc[1]}
$.CloudChat.base.un=$('#unmName'),$.CloudChat.base.um=$('#unmMail'),$.CloudChat.base.cl=$('.mm-chat-toggle'),$.CloudChat.base.clf=$.CloudChat.base.cl.find('.faces'),$.CloudChat.base.cls=$.CloudChat.base.cl.find('.status'),$.CloudChat.base.gre=$('#mm-chat-greet'),$.CloudChat.base.clb=$('#mm-chat-launch .unm-bubble span'),$.CloudChat.base.wl=$('#mm-chat-window,#mm-chat-launch'),$.CloudChat.base.mcw=$('#mm-chat-window'),$.CloudChat.base.lm=$('.mm_leave_msg'),$.CloudChat.base.ia=$.CloudChat.base.mcw.find('.unm-ia'),$.CloudChat.base.clo=$.CloudChat.base.mcw.find('[close]'),$.CloudChat.base.pop=$.CloudChat.base.mcw.find('.popout'),$.CloudChat.base.chs=$.CloudChat.base.mcw.find('.chat_section'),$.CloudChat.base.ca=$('#mm-chat-away'),$.CloudChat.base.ra=$('#mm-chat-rating'),$.CloudChat.base.cs=$('#mm-chat-send'),$.CloudChat.base.ad=$('#mm-chat-init');
$.CloudChat.op('ca',0);
$(function(){
$.CloudChat.init=function(e,f){
    if(!f){f={}}
    switch(e){
        case 1:
            f.oo=$.CloudChat.op();
        clearInterval($.CloudChat.base.swf);
            if(!f.oo.fs){f.oo.fs="1";};
            $.each(['dp','sc','ry'],function(n,v){if(!f.oo[v]){$.CloudChat.op(v,' ')}});
        $.CloudChat.cx({f:'j',ff:'x',trust:location.hostname,ver:f.oo.ver,dp:f.oo.dp,ry:f.oo.ry,sc:f.oo.sc,u:{fs:f.oo.fs,dept:f.oo.dept,title:document.title,browser:$.CloudChat.browser(),url:location.href,referrer:document.referrer,time:moment().format()}})
        clearInterval($.CloudChat.base.swg);
        $.CloudChat.timeOut=setTimeout(function(){if(!$.CloudChat.ao){$.CloudChat.ao={}};if(f.oo.open!==1&&Object.keys($.CloudChat.ao).length>0&&f.oo.greet!==1){$.CloudChat.init(3)}},2000)
        break;
        case 0:
        if($.CloudChat.op().stat==1){
            $.CloudChat.base.ad.click()
        }
        if($.CloudChat.op().open==1){
            $.CloudChat.init('o',1)
        }
        break;
        case 3:
            $.CloudChat.base.gre.addClass('open'),$.CloudChat.op('greet',"0");
        break;
        case 4:
            $.CloudChat.base.gre.removeClass('open'),$.CloudChat.op('greet',1);
        break;
        case'o':
            switch(f.o){
                case"0":
                    $.CloudChat.base.wl.removeClass('open')
                break;
                case 1:
                    $.CloudChat.base.wl.addClass('open'),$.CloudChat.init(4);
                break;
                default:
                    $.CloudChat.base.wl.toggleClass('open')
                break;
            }
        if($.CloudChat.base.wl.hasClass('open')){$.CloudChat.op('open',1);$.CloudChat.base.mcw.removeClass('rate_us')}else{$.CloudChat.op('open','0')}
            if(!f.c){$.CloudChat.cx({f:'j',ff:'o',o:$.CloudChat.op().open})}
        break;
        case'ao':
            f.ar={};
            $.each(Object.keys($.CloudChat.ao).slice(0,3),function(n,v){
                if($.CloudChat.ao[v].status===1){f.ar[v]=$.CloudChat.ao[v]};
            });
            return f.ar;
        break;
    }
}
$.CloudChat.fc=function(e){
    switch(e){
        case 0:
            $.CloudChat.base.cl.removeClass('online')
            $.CloudChat.base.cls.html('Leave a <b>Message</b>')
        break;
        case 1:
            $.CloudChat.base.cl.addClass('online')
            $.CloudChat.base.cls.html('Chat with us!')
        break;
        case 2:
            $.CloudChat.base.wl.removeClass('rate_us')
            if(!$.CloudChat.base.puu){
                $.CloudChat.base.clb.text('Thank You! We really appreciate it!');
                $.CloudChat.init('o',{o:0});
                $('#mm-chat-launch').addClass('rating_face');
                setTimeout(function(){
                    $('#mm-chat-launch').removeClass('rating_face');
                    $.CloudChat.base.clb.text('')
                },4000)
            }
        break;
    }
}
});
//Recorder Functions
//$.CloudChat.nid=$.CloudChat.gid(7);
//$.CloudChat.omni = new cimice.Recorder({
//    target: document.documentElement,events: ['mousemove', 'click', 'scroll', 'resize', 'contextmenu']
//});
//$.CloudChat.omni.startRecording();
//$.CloudChat.omni.on('recording', function() {
//    clearTimeout($.CloudChat.savedRecording);
//    $.CloudChat.savedRecording=setTimeout(function(){
//        console.log('save')
//        $.post('/p/rec',{u:$.CloudChat.ke,b:$.CloudChat.op().bid,d:JSON.stringify($.CloudChat.omni.getMovie()),i:$.CloudChat.nid,t:$.CloudChat.base.init('t',new Date),ts:$.CloudChat.nit,data:JSON.stringify({ua:navigator.userAgent,url:location.href,ip:$.CloudChat.host})},function(d){
//            console.log(d)
//        })
//       //$.CloudChat.cx({f:'re',ff:'s',d:JSON.stringify($.CloudChat.omni.getMovie())})
//    },10000);
//});
//
  CloudChat.off('connect').on('connect',function(data){
      $.CloudChat.init(1);$.CloudChat.init(0)
  });
  CloudChat.off('ret').on('ret',function(d){
      if(d.trust===0){clearTimeout($.CloudChat.timeOut);$.each($.CloudChat,function(n,v){$.CloudChat[n]=function(){return {};}});$('.CloudChat,.CloudChat-launcher').remove();CloudChat.disconnect();delete(CloudChat);console.log('Unmetered.Chat : Untrusted Domain')}
    if(d.ver){
        $.CloudChat.op('ver',d.ver);
        $.get('<%- data.url%>/embed/'+$.CloudChat.ke,function(d){d=d+'';$('.CloudChat').remove();$('body').append(d);});
        console.log('Unmetered.Chat : '+d.ver);return false;
    }
    if(d.firebase){
        if(typeof window.firebase=='object'){
            if(!$.FireBs){$.FireBs={f:function(){return firebase}()}}
            $.FireBs.f.initializeApp(d.firebase);$.FireBs.f.initializeApp=function(){};
            $.FireBs.a=$.FireBs.f.storage();$.FireBs.buck='CloudChat.Online/'+$.CloudChat.ke+'/';
            $.FireBs.ref=$.FireBs.a.ref();
        }else{
            $('[mm-attach="c"]').remove();
        }
    }
    if(d.fs){
        $.CloudChat.op('fs',d.fs)
    }
    if(d.at){
        $.CloudChat.ao[d.at.c]=d.at;
        $.CloudChat.tm(0,d.at,'.unm-chat-collage','3');
        $.CloudChat.tm(0,d.at,'',1);$.CloudChat.nops();
    }
    if(d.ao){
        $.CloudChat.ao=d.ao;$.each(d.ao,function(t,y){if(y.status==1){$.CloudChat.tm(0,y,'',1)}});$.CloudChat.nops();
//        if(){
            $.CloudChat.pm(12,'.unm-chat-collage')
//        }
    }
    if(d.ad){
        $.each(d.ad,function(m,b){
            $.each(b,function(y,x){
                $.each($.CloudChat.ao,function(n,v){
                    if(y===v.bid){
                        d.ad[m][y].pp=v.pp;
                        d.ad[m][y].peer=v.peer;
                    }
                })
            })
        })
        $.CloudChat.pm(0,d.ad)
    }
    if(d.adm){
        $.CloudChat.tm(0,d.adm)
    }
    if(d.cj){
        d.cj={time:moment().format(),msg:'<b>'+d.cj+'</b> has ',c:'bg-'}
        if(d.x===0){d.cj.msg+='left';d.cj.c+='danger'}else{d.cj.msg+='joined';d.cj.c+='success'}
        $.CloudChat.tm(3,d.cj,'#mm-chat-messages',1)
    }
    if(d.kp||(typeof d.kp)==="string"||(typeof d.kp)==="number"){
        $.CloudChat.tm(10,d)
    }
    if(d.bg){
        localStorage.setItem('unmStyles_'+$.CloudChat.ke,d.bg);
        $.CloudChat.op('sc',d.sc);
        $.CloudChat.bg(JSON.parse(d.bg));
    }
    if(d.depts){
        $.CloudChat.op('dp',d.sc);
        try{d.depts=JSON.parse(d.depts);}catch(er){}
        localStorage.setItem('unmDepartments_'+$.CloudChat.ke,JSON.stringify(d.depts));
        $.CloudChat.pm(2,{d:d.depts});
    }
    if(d.rates){
        $.CloudChat.op('ry',d.sc);
        try{d.rates=JSON.parse(d.rates);d.rates=JSON.stringify(d.rates[Object.keys(d.rates)[0]]);}catch(er){}
        localStorage.setItem('unmRating_'+$.CloudChat.ke,d.rates);
        $.CloudChat.tm(11,{a:d.rates});
    }
    if(d.goTo){//redirecter
        if(d.goTo.charAt(0)!=='/'&&(d.goTo.indexOf('http')!==0)){d.goTo=$.CloudChat.base.loc+d.goTo}
        window.location.href=d.goTo;
    }
    if(d.history){//load chat history
        $.CloudChat.pm(1,d.history,'#mm-chat-messages')
    }
    if(d.msg){//message controller
        d.op=$.CloudChat.op()
        $('[typing="'+d.msg.sender+'"]').remove();
        $('#mm-admin-list [bid="'+d.msg.sender+'"]').removeClass('fI_bo')
        if(d.op.open==="0"){
            $.CloudChat.base.clb.text(d.msg.d);
            d.e=$('#mm-chat-launch');
            $(window).unbind('click').click(function() {
                $.CloudChat.base.clb.empty();
                $(window).unbind('click');
                d.e.css('background-image','').find('.faces').show()
            });
            $.each($.CloudChat.ao,function(n,v){
                if(d.msg.sender===v.bid){
                    d.e.css('background-image','url('+v.pp+')').find('.faces').hide()
                }
            })
        }
        if(d.op.stat !== 1){
            if($.CloudChat.base.un.val().length===0&&(!d.op.name||d.op.name.trim()==='')){
                $.CloudChat.op('name','Guest')
            }
            if($.CloudChat.base.un.val().length===0&&(!d.op.name||d.op.name.trim()==='')){
                $.CloudChat.op('mail','Invited@Guest.ca')
            }
            $.CloudChat.base.ad.click()
        }
        if($.CloudChat.base.wl.hasClass('open')===false){
            //$.CloudChat.base.wl.addClass('open')//Open Client Window
            $.CloudChat.base.cl.addClass('fI_bo')
        }
        //read status
        if($.CloudChat.base.cs.is(":focus")){
            $.CloudChat.cx({f:'s',ff:'r'});
        }else{
            $.CloudChat.SND(1)
        }
        //draw
        d.msg.fr=1;
        $.CloudChat.tm(1,d.msg,'#mm-chat-messages',1)
    }
    if(d.scrollTo){//scroller
        $.CloudChat.scrTo(d.scrollTo)
    }
    if(d.script){
        $('#mm-script-drop').html('<script>'+d.script+'<\/script>');
    }
    if(d.banned){
        CloudChat.disconnect();$(".CloudChat").remove();$('body').removeClass('.CloudChat-Translator');
    }
      if(typeof $.CloudChat.fn==='function'){$.CloudChat.fn(d)}
    switch(d.f){
        case'a':
            switch(d.ff){
                case'e':
                    if(d.form.name){$.CloudChat.op('name',d.form.name);$('#unmName').val(d.form.name)}
                    if(d.form.mail){$.CloudChat.op('mail',d.form.mail);$('#unmMail').val(d.form.mail)}
                break;
            }
        break;
        case'e':
            $.CloudChat.base.clo.click();
        break;
        case'j':
            switch(d.ff){
                case'lv':
                    
                break;
                case'p':
                    d.w={scrollX:window.scrollX,scrollY:window.scrollY,height:window.innerHeight,width:window.innerWidth,mouseX:$.CloudChat.mouseX,mouseY:$.CloudChat.mouseY}
                    html2canvas($('body'),{height:window.innerHeight,letterRendering:true,onrendered: function(canvas) {
                        $.CloudChat.cx({f:'j',ff:'pr',cn:d.cn,d:canvas.toDataURL(),w:d.w,allowTaint:true,timeout:5000});
                    }})
                break;
                case'o':
                    $.CloudChat.init('o',{o:d.o,c:1})
                break;
            }
        break;
        case'x':
            d.e=$.CloudChat.base.mcw;d.c=$.CloudChat.base.clo;
            switch(d.ff){
                case 0:
                    $.CloudChat.op('usrd',"0");d.e.removeClass('insession');
                break;
                case 1:
                    d.e.addClass('insession');
                    if($.CloudChat.op().usrd===1){$('#mm-user-details').hide()}
                    if($.CloudChat.quickie){d.e=$('#mm-chat-quickmsg');$.CloudChat.base.mcw.find('.form-server').remove();
                        $('#mm-chat-send').val(d.e.val());$.CloudChat.base.ia.submit();
                        d.e.val('');delete($.CloudChat.quickie);
                    }
                break;
            }
        break;
        case's':
            switch(d.ff){
                case'r':
                    $.CloudChat.base.mcw.find('.from-me .bottom_row_text .status').empty().last().html('<i class="chi-thumbs-up-1"></i> Read');
                break;
                case 0:
                    $('#mm-chat-send').val(d.m);
                break;
                case'l':
                    $.CloudChat.base.lm.find('input,textarea').val('')
                break;
            }
        break;
    }
  });
    tmp='';
    if(localStorage.getItem('unmStyles_'+$.CloudChat.ke)){
        $.CloudChat.bg(JSON.parse(localStorage.getItem('unmStyles_'+$.CloudChat.ke)));
    }
    if(!$.CloudChat.op().dept){$.CloudChat.op('dept','General')}
    if(localStorage.getItem('unmDepartments_'+$.CloudChat.ke)){
        $.CloudChat.pm(2,{d:JSON.parse(localStorage.getItem('unmDepartments_'+$.CloudChat.ke))})
    }
    $.CloudChat.tm(11)
$.each(CCiso.langs,function(n,v){
    tmp+='<option value="'+n+'">'+v+'</option>'
});$('#mm-translator [name="fr"],#mm-translator [name="to"]').append(tmp);tmp='';
    $('#mm-translator').unbind('submit').submit(function(e){
        e.preventDefault();e.e=$.CloudChat.base.selected_translate;e.t=e.e.find('.unm-bubble small').text();e.f=$(this);e.fr=e.f.find('[name="fr"]').val(),e.to=e.f.find('[name="to"]').val()
        $.post('<%- data.url%>/get/translation',{t:e.t,fr:e.fr,to:e.to},function(d){
            e.e.find('.translated').html('<i>'+d+'</i>');
        });
        e.f.hide();
        return false;
    })
$('body').addClass('CloudChat-Translator')
    .off('click','.mm-lang-pop')
    .on('click','.mm-lang-pop',function(e){
        e.e=$(this),e.x=e.e.offset(),e.t=$('#mm-translator'),e.p=e.e.parents('li');
        $.CloudChat.base.selected_translate=e.p;e.x.left-=e.t.width()+50;
        e.t.show().animate(e.x);
        $.CloudChat.base.mcw.find('.dialogue_cont').click(function(f){$(this).unbind('click');e.t.hide()})
    })
    .off('change','.mm-admin-choose input')
    .on('change','.mm-admin-choose input',function(e){
        e.e=$(this),e.id=e.e.attr('id'),e.c=$('[for="'+e.e.attr('id')+'"]');e.p=$('.mm-admin-choose')
        e.p.find('input:not([id="'+e.id+'"])').prop('checked',false)
        e.p.find('label').removeClass('selected')
        if(e.e.is(':checked')){
            e.c.addClass('selected')
        }else{
            e.c.removeClass('selected')
        }
    })
    $.each([['mail',$.CloudChat.base.um],['name',$.CloudChat.base.un],['msg',$.CloudChat.base.cs]],function(n,v){
        if($.CloudChat.op()[v[0]]){
            v[1].val($.CloudChat.op()[v[0]])
        }
    })
    $('#unmMail,#unmName,#unmDept').off('change keyup input').on('change keyup input',function(){//Set Name and eMail as it is typed.
        $.CloudChat.op($(this).attr('name'),$(this).val())
    })
    $.CloudChat.base.cs
    .unbind('focus').focus(function(e){
        $.CloudChat.cx({f:'s',ff:'r'});
    }).unbind('focusout').focusout(function(e){
        $.CloudChat.cx({f:'s',ff:'r',r:0});
    })
    .unbind('change keyup input').bind('change keyup input',function(e){//User is Typing
        if(!$.CloudChat.userTyping){
            e={v:$(this).val().trim()};
            $.CloudChat.op('msg',e.v)
            $.CloudChat.cx({f:'s',ff:0,m:e.v})
            $.CloudChat.userTyping=setTimeout(function(){delete($.CloudChat.userTyping)},100)
        }
    })
    .unbind('keydown').keydown(function(e){
        if (e.keyCode == 13 && !e.shiftKey)
        {
            $.CloudChat.base.ia.submit()
            e.preventDefault();
        }
    })
    $.CloudChat.base.gre.on('click','[fn]',function(e){//click function for greet
        e.stopPropagation();e.e=$(this);e.a=e.e.attr('fn');
        switch(e.a){case'o':$.CloudChat.init('o',{o:1});break;}
        $.CloudChat.init(4);
    })
    $.CloudChat.op('ws',"1")
    $(window).focusin(function(){$.CloudChat.op('ws',"1")}).focusout(function(){$.CloudChat.op('ws',"0")})
    $(document).off('click','.mm-chat-toggle').on('click','.mm-chat-toggle',function(){//toggle for window
        $.CloudChat.base.cl.removeClass('fI_bo')
        $.CloudChat.base.clb.empty()
        $.CloudChat.init('o',{o:0})
    });
    $('#mm-user-details').unbind('submit').submit(function(e){
        e.preventDefault();e.e=$(this);e.s=e.e.serializeObject();$.CloudChat.op('usrd',1);
        e.fn=function(f){e.x=1}
        if(e.s.name.trim()===''){e.e.find('[name="name"]').attr('placeholder','Name is Required').css('border-color','#f00');return false;}
        $.CloudChat.cx({f:'j',ff:'n',form:e.s});e.e.hide();
        return false;
    });
    $.CloudChat.base.mcw.find('.unm_lang_details_btn_2').unbind('click').click(function(e){//no save user details
        $('#mm-user-details').hide();$.CloudChat.op('usrd',1);
    });
    $.CloudChat.base.ad.unbind('click').click(function(e){//init chat session
        e.preventDefault();e.o=$.CloudChat.op();
        if($.CloudChat.di()){return}
        $.CloudChat.op('stat',1),$.CloudChat.base.cs.change();
        if(!e.o.name){e.o.name='Guest';$.CloudChat.op('name',e.o.name);};if(!e.o.mail){e.o.mail='';$.CloudChat.op('mail',e.o.mail);};
        $.CloudChat.cx({f:'j',u:{url:location.href,time:moment().format(),name:e.o.name,mail:e.o.mail,dept:e.o.dept},ch:$('#mm-admin-choose').serializeObject()});$('#mm-chat-messages').show();
        $('#mm-admin-choose input').prop('checked',false).change();
        $('#mm-chat-send').focus();$('#mm-chat-window').addClass('insession');
        if(e.o.name!=='Guest'&&e.o.name.trim()!==''){$('#mm-user-details').hide()}else{$('#mm-user-details').show()}
    })
    $.CloudChat.base.clo.unbind('click').click(function(){//end chat and show rating thingy
        $('#mm-chat-messages').hide();
        $.CloudChat.op('stat','0');$('#mm-chat-window').removeClass('insession');
        $.CloudChat.base.mcw.addClass('rate_us');
        $.CloudChat.cx({f:'j',ff:'b'})
    })
   $.CloudChat.base.lm.unbind('submit').submit(function(e){//send offline operator message
       e.preventDefault();
       e.arr=$(this).serializeObject();e.arr.ke=$.CloudChat.ke,e.arr.id=$.CloudChat.op().bid;
       $.post("<%- data.url%>/contact/"+$.CloudChat.ke,e.arr,function(da){
           $.CloudChat.fc(2)
       })
       $(this).find('input,textarea').val('')
       return
    })
   $.CloudChat.base.ra.find('.mm_send_rating').unbind('submit').submit(function(e){//send offline operator message
       e.preventDefault();e={o:$.CloudChat.op()};$.CloudChat.base.mcw.removeClass('rate_us');
       e.json=$(this).serializeObject();
       if(e.json.wylac&&e.json.wylac===''){delete(e.json.wylac);}
       e.arr={ke:$.CloudChat.ke,rate:JSON.stringify(e.json),id:e.o.bid,page:location.href,time:$.CloudChat.base.init('t',new Date),chat:[],user:{}};
       $('#mm-chat-messages li').each(function(n,v){
           v={e:$(v)};v.time=v.e.attr('title'),v.text=v.e.find('small:first').text(),v.name=v.e.find('b.text-right');
           if(!v.time){return false}
           if(v.name&&v.name.length==0){v.name=e.o.name}else{v.name=v.name.text()}
           delete(v.e);
           e.arr.chat.push(v)
       });
       e.arr.chat=JSON.stringify(e.arr.chat)
       e.arr.user=JSON.stringify(e.arr.user)
       $.post("<%- data.url%>/rating/"+$.CloudChat.ke,e.arr,function(da){
           try{da=JSON.parse(da);if(da.success!==false){$.CloudChat.fc(1)}else{$.CloudChat.fc(1)}}catch(e){$('body').append(da)}
       })
       return
    });
    tmp='';
    $.each($.CloudChat.base.emoji,function(n,v){
        tmp+='<a class="emoji" emoji="'+n+'" title="'+v.title+'"><span class="emoticon emoticon-'+n+'"></span></a>';
    })
    $.CloudChat.base.ia.find('.mm-emojis').append(tmp);tmp='';
    $('#mm-emojis').unbind('click').click(function(e){
        e.e=$.CloudChat.base.ia.find('.mm-emojis');
        if(e.e.is(':visible')){e.e.hide()}else{e.e.show()}
    })
    $.CloudChat.base.ia.find('[emoji]').unbind('click').click(function(e){
       $.CloudChat.base.ia.find('.mm-emojis').hide();e.v=$.CloudChat.base.cs.val();e.e=$(this).attr('emoji');$.CloudChat.base.cs.val(e.v+$.CloudChat.base.emoji[e.e].codes[0])
    })
    $.CloudChat.base.ia.unbind('submit').submit(function(e){//send message in chat session
        e.preventDefault();e.o=$.CloudChat.op('msg','')
        f={};f.e=$(this).find('[name="words"]'),f.v=f.e.val()
        if(f.v===''){return}
        f.m={d:f.v,time:moment().format(),name:e.o.name,mail:e.o.mail,bid:e.o.bid,uid:e.o.ke}
        if($.CloudChat.FILE.length>0){f.m.file=$.CloudChat.FILE;delete($.CloudChat.FILE);$.CloudChat.op('FILES',[]);}
        f.m.sender=f.m.bid;$.CloudChat.cx({f:'s',m:f.m});f.m.st=0;
        $.CloudChat.tm(1,f.m,'#mm-chat-messages',1)
        f.e.val('');
        return
    }).autoResize({fn:function(sz){
        $('#mm-chat-window .diah_shade .dialogue_cont').css('height','calc(100% - '+(30+24*sz)+'px)')
    }});
    $('#mm-chat-quickmsg').unbind('keydown').keydown(function(e){
        e.e=$(this);
        if (e.keyCode == 13 && !e.shiftKey){
            if($.CloudChat.op().stat!==1){
                $.CloudChat.quickie=e.e.val();$('#mm-chat-init').click();
            }
            e.preventDefault();
        }
    }).autoResize({fn:function(sz){
        $('#mm-chat-window .diah_shade .dialogue_cont').css('height','calc(100% - '+(30+24*sz)+'px)')
    }});
    $.CloudChat.base.mcw.find('[mm-attach]').unbind('click').click(function(e){
        $('#mm-attach-upl').click();
    });
    
    $.CloudChat.checkFiles=function(e){e={};
        if(!$.CloudChat.op().FILES){$.CloudChat.op('FILES',[]);};if(!$.CloudChat.FILE){$.CloudChat.FILE=$.CloudChat.op().FILES;}
        e.e=$.CloudChat.base.mcw.find('.unm-file-attachments').empty();
        $.each($.CloudChat.FILE,function(n,v){
            e.e.append('<div class="unm-file-attached-element" title="Attached : '+v.name+'"><i class="chi-attach"></i></div>')
        })
    }
    $.CloudChat.checkFiles();
    $('#mm-chat-attach').unbind('submit').submit(function(e){//file upload
        e.preventDefault();e.files=$('#mm-attach-upl')[0].files;
        e.file=e.files[0]
        if(e.file){
            $.FireBs.ref.child($.FireBs.buck+e.file.name).put(e.file).then(function(d) {
                delete(d.a.get);delete(d.a.ref);
                $.CloudChat.FILE.push(d.a);$.CloudChat.op('FILES',$.CloudChat.FILE);
                $.CloudChat.checkFiles();
            });
        }
        return false;
    }).change(function(){if($('#mm-attach-upl')[0].files.length>0){$(this).submit()}})
    $.CloudChat.base.swf=setInterval(function(){//Make sure visitor status is set
        if(CloudChat.connected){
            $.CloudChat.init(1),$.CloudChat.init(0)
        }
    },500)
    $.CloudChat.base.swg=setInterval(function(){
        clearInterval($.CloudChat.base.swg)
        if($.CloudChat.op().stat==1){
            $.CloudChat.base.ad.click()
        }
        if($.CloudChat.op().open==1){
            $.CloudChat.init('o',{o:1})
        }
    },1000)
    /*****/
})(jQuery)