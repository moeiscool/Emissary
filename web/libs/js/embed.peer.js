$.CloudChat.Peer=new Peer($.CloudChat.ke+'_'+$.CloudChat.op().bid,{path: '/peerjs',host:'<%=host%>'.split('://')[1],port: location.port || (location.protocol === 'https:' ? 443 : 80)});
$('[mm-videochat="s"]').show();
//$.CloudChat.Peer.on('call',function(call){
//    call.e=$('#mm-VideoBlock')
//    call.e.show();
//    if (window.existingCall) {
//    window.existingCall.close();
//    }
//    call.on('stream', function(s){
//        call.e.find('video.op').prop('src',URL.createObjectURL(s));
//    });
//    window.existingCall = call;
//    call.on('close',function(){
//        call.e.hide();
//    });
//});
$.CloudChat.hangUp=function(e){
    if(!e){e={el:$('#mm-VideoBlock'),bt:$('[mm-videoChat="s"]')}};
    e.el.hide();if($.CloudChat.Call){$.CloudChat.Call.close();delete($.CloudChat.Call)};
    e.bt.css('color','');$.CloudChat.videoChat=0;
}
$.CloudChat.getMedia=function(a,b){
    if(!b){b=function(e){
            $.CloudChat.videoChat=0;$.CloudChat.tm(3,{msg:'Video is not possible. No Camera',time:moment(new Date).format(),c:'bg-danger'},'#mm-chat-messages',1)
        }}
    return navigator.webkitGetUserMedia({video: true, audio: true, toString:function(){return 'video, audio';}},a,b)
}
$('#mm-VideoBlock').drags({handle:'.handle_bar'})
$('body').on('click','#mm-admin-list [hid]',function(e){
        e.x=$('#mm-admin-list [hid]'),e.e=$(this);
        if(e.e.hasClass('selected')){e.e.removeClass('selected');return false;}
        e.x.removeClass('selected'),e.e.addClass('selected');
    });
    $('#mm-VideoBlock [winc="ca"]').click(function(e){
        $.CloudChat.hangUp();
    });
    $.CloudChat.base.mcw.find('[mm-videoChat]').click(function(e){
        e.pno={msg:'<div style="margin-bottom:15px">Video chat cannot be used unless your connection is secure. Would you like to go to a secure page to use video chat?</div><a style="margin:0" class="btn btn-unm" href="https://'+window.location.host+window.location.pathname+window.location.search+'"><i class="chi-thumbs-up-1"></i></a>',time:moment(new Date).format(),c:'bg-danger'}
        if(window.location.protocol!=='https:'){return $.CloudChat.tm(3,e.pno,'#mm-chat-messages',1);}
        e.bt=$('[mm-videoChat="s"]'),e.el=$('#mm-VideoBlock')
        if($.CloudChat.videoChat===1){
            $.CloudChat.hangUp()
        }else{
            $.CloudChat.videoChat=1
            e.ee=$('#mm-admin-list [hid]');
            if(e.ee.length!==0){
                navigator.webkitGetUserMedia({
                    video: true, audio: true, toString:function(){return 'video, audio';}
                },function(d){
                    e.vid=e.el.find('video')[0]
                    e.vid.src = URL.createObjectURL(d);e.vid.volume=0;
                    e.vid.addEventListener('error', function(w) {
                        e.pno.msg=w;$.CloudChat.tm(3,e.pno,'#mm-chat-messages',1);d.stop();$.CloudChat.videoChat=0;
                    });
                        if($.CloudChat.videoChat===1){
                    if(!$.CloudChat.Call){
                            e.ma=$('#mm-admin-list [hid].selected');
                            if(e.ma.length==0){e.ee=e.ee.first().click()}else{e.ee=e.ma}
                            e.pe=e.ee.attr('peer')
                            $.CloudChat.Call=$.CloudChat.Peer.call(e.pe,d,{metadata:$.CloudChat.op()});
                            $.CloudChat.Call.missing=setTimeout(function(){$.CloudChat.Call.close();e.el.hide();},10000);
                            e.el.show();
                            $.CloudChat.Call.on('connection', function(s){clearTimeout($.CloudChat.Call.missing)})
                            $.CloudChat.Call.on('stream', function(s){
                                e.el.find('video.op').prop('src',URL.createObjectURL(s));
                            });
                            $.CloudChat.Call.on('close',function(){
                                $.CloudChat.hangUp();e.bt.css('color','')
                                e.pno.msg='Video Chat Ended';$.CloudChat.tm(3,e.pno,'#mm-chat-messages',1)
                            });
                            e.bt.css('color','#F00')
                    }else{
                        e.pno.msg='A Video Chat is already in Session.<br><b>Want to End it?</b><br><a class="btn btn-unm bg-danger">End</a>';
                        $.CloudChat.tm(3,e.pno,'#mm-chat-messages',1)
                    }
                        }
                },function(e){
                    e.pno.msg='Video is not possible. No Camera';
                    $.CloudChat.videoChat=0;$.CloudChat.tm(3,e.pno,'#mm-chat-messages',1)
                });
            }else{
                e.pno.msg='No Operators Joined to Video Chat';
                $.CloudChat.tm(3,e.pno,'#mm-chat-messages',1);
            }
        }
    })
//    $.CloudChat.base.mcw.find('[mm-attach]').unbind('click').click(function(e){
//        switch($(this).attr('mm-attach')){
//            case'd':
//        $('#mm-attach-upl').click();
//            break;
//            case'c':
//        e.e=$('#mm-attach-bubble');
//        if(e.e.is(':visible')){e.e.hide()}else{e.e.show()}
//            break;
//        }
//    });
//    $('#mm-chat-attach').unbind('submit').submit(function(e){//file upload
//        e.preventDefault();e.files=$('#mm-attach-upl')[0].files;
//        $(this).ajaxSubmit({
//            url:'',
//            beforeSubmit:function(rt){
//                e.i=$('#mm-admin-list'),e.y=e.i.find('[hid]'),e.s=e.i.find('.selected');
//                if(e.y.length>0){
//                    if(e.s.length<1){
//                        $(e.i[0]).addClass('selected');
//                    }
//            rt=rt[0];
//            e.ty=rt.value;
//            if(e.ty.size>10000000){$.CloudChat.tm(3,{msg:'<b>'+e.ty.name+'</b> is too Large.<br><i>Max is 10MB</i>',c:'bg-danger',time:moment().format()},'#mm-chat-messages',1);return false;}
////                if(rt.replace(e.ty.name.replace(/ /g,'+'),'').length<5){$('[mm-attach="c"]').hide();$.CloudChat.tm(3,{msg:'Could not upload <b>'+e.ty.name+'</b>. Uploading may be unavailable at this time.',c:'bg-danger',time:moment().format()},'#mm-chat-messages',1);return false;}
//            e.fi='<b>File Sent : </b>'+e.ty.name;rt.type=e.ty.type;rt.name=e.ty.name;
//            if(rt.type.indexOf('image')>-1){e.fi+='<br><img unmFile="img" src="'+URL.createObjectURL(e.ty)+'">'}
//            $.CloudChat.tm(3,{msg:e.fi,c:'bg-primary',time:moment().format()},'#mm-chat-messages',1);
//            e.reader=new FileReader();
//            e.reader.onload = function(readerEvt) {
//                e.binaryString = readerEvt.target.result;
//                rt.value=btoa(e.binaryString);
//                if(!$.CloudChat.Peers){$.CloudChat.Peers={}}
//                $('#mm-admin-list [hid]').each(function(n,v){
//                    v={e:$(v)};v.p=v.e.attr('peer');
//                    $.CloudChat.Peers[v.p]=$.CloudChat.Peer.connect(v.p,{metadata:{f:'fi',d:rt,uid:$.CloudChat.ke,bid:$.CloudChat.op().bid}});
//                    $.CloudChat.Peers[v.p].close();
//                })
//            };
//           e.reader.readAsBinaryString(e.ty);
//                }else{
//                    $.CloudChat.tm(3,{msg:'No Operators. Please wait until someone is ready to assist you before sharing a file.',c:'bg-danger',time:moment().format()},'#mm-chat-messages',1);;
//                }
//                return false;
//            },
//    })
//        return false;
//    }).change(function(){if($('#mm-attach-upl').val().length>1){$(this).submit()}})
$.CloudChat.Peer.on('error',function(err){$('[mm-videochat="s"]').remove();$.CloudChat.Peer.disconnect();}).on('call',function(call){
    call.tid=gid()
    call.pno={msg:'',time:moment(new Date).format()}
    if(!$.CloudChat.Call){
        $.CloudChat.videoChat=1;
    if($.CloudChat.op().stat!==1){
        if($('#unmName').val().length<2){$('#unmName').val('Guest')}
        if($('#unmMail').val().length<4){$('#unmMail').val('invited@Guest.ca')}
        $.CloudChat.base.ad.find('form').submit()
    }
    if($.CloudChat.op().open!==1){
        $.CloudChat.init('o',{o:1});
    }
    call.el=$('#mm-VideoBlock')
    call.pno.msg='<div style="margin-bottom:10px">You\'re Recieving a call from an Agent. Would you like to answer it?<br><small>Ignore to decline</small></div><a class="btn btn-unm answer"><i class="chi-thumbs-up-1"></i></a>';
        call.pno.id=call.tid
    $.CloudChat.tm(3,call.pno,'#mm-chat-messages',1);
        call.missing=setTimeout(function(){$('#msg_'+call.tid+' .answer').unbind('click');$('#msg_'+call.tid).remove();call.close();delete($.CloudChat.Call)},10000)
        delete(call.pno.id);
    $('#msg_'+call.tid+' .answer').click(function(e){
        clearTimeout(call.missing)
        e.bt=$('[mm-videoChat="s"]')
        $.CloudChat.getMedia(function(d){
            call.vid=call.el.find('video.me')[0]
            call.vid.src = URL.createObjectURL(d);call.vid.volume=0;
            call.vid.addEventListener('error', function(w) {
                d.stop();$.CloudChat.videoChat=0;
            });
            if($.CloudChat.videoChat===1){
                call.answer(d);
                $.CloudChat.Call=call
                call.el.show();
                $.CloudChat.Call.on('stream', function(s){
                    call.el.find('video.op').prop('src',URL.createObjectURL(s));
                });
                $.CloudChat.Call.on('close',function(){
                    $.CloudChat.hangUp();e.bt.css('color','');
                    call.pno.msg='Video Chat Ended';call.pno.c='bg-danger';$.CloudChat.tm(3,call.pno,'#mm-chat-messages',1)
                });
                e.bt.css('color','#F00')
            }else{
                console.log('error')
            }
        })
        $('#msg_'+call.tid).remove()
    })
    }
}).on('connection',function(conn,d){
    d=conn.metadata;
    if(d&&d.f){
        switch(d.f){
            case'fi':
        d.url=URL.createObjectURL($.CloudChat.b64toBlob(d.d.value));
        d.fi='<b>File Received : </b>'+d.d.name;
        if(d.d.type.indexOf('image')>-1){d.fi+='<br><img unmFile="img" src="'+d.url+'">'}
        d.fi+='<div style="margin-top:10px"></div><a class="btn btn-unm" download="'+d.d.name+'" href="'+d.url+'">Download</a>'
        $.CloudChat.tm(3,{msg:d.fi,c:'bg-primary',time:moment().format()},'#mm-chat-messages',1);
                $.CloudChat.files(2,d.d);
                $.CloudChat.files(1,d.url,{n:d.d.name,v:{size:d.d.size}});
            break;
        }
    }
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
})
$(document).ready(function(){
    $.CloudChat.files();
})