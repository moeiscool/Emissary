///******************************************************************************//
//CUSTOM.VARS.JS
///******************************************************************************//
function pm(x,v,z,k){
    var tmp='';if(v==null){v=[];}
    switch(x){
        case 2://load multiple admins
            $(z).empty();
            $.each(v,function(n,b){
                $.each(b,function(h,j){
                    tmp+=tm(2,HBR.a[n][h])
                })
            })
            $(z).append(tmp)
        break;
        case 0://load multiple users
            if(!z){z='#live_users'}
            k={n:0,t:0};
            $.each(v,function(n,b){
                tmp+=tm(0,b,0,1)
                if(v.chat===1){++k.n}else{++k.t}
            });
            HBR.init('iz');
            $(z).append(tmp)
            $.CloudChat.base.init('ls')
        break;
        case 1://Load multiple unm-bubbles
            if(v.length>0){
            if(!z){z='#mm-chat-messages'}
            if(!k){$(z).empty()}
            $.each(v,function(n,b){
                if(b===null){return}
                if(b.sender!=='ADMIN_'+$user.id&&b.sender!==$user.id&&b.sender!==$user.ke){b.fr=1}
                tmp+=tm(1,b,z,0)
            })
            v=v[v.length-1];
            v.e=$('[ctb="'+v.rid+'"][uid="'+v.uid+'"]');
            v.e.find('.pmsg_').text(v.d);v.t=v.e.find('.time_');
            if(v.t.livstamp){v.t.livstamp('destroy')};
            v.t.attr('title',v.time).livestamp(v.time);}
           if(k){$(z).prepend(tmp)}else{ $(z).append(tmp).animate({scrollTop:$(z).prop("scrollHeight")},500)
            }
            $.CloudChat.base.init('ls')
        break;
        case 6://load multipl breadcrumbs
            if(!z){return}
            $.each(v.sort(function(obj1, obj2) {return new Date(obj2.time) - new Date(obj1.time);}),function(n,b){
                tmp+=tm(6,b)
            })
            if(k){$(z).append(tmp)}else{
            $(z).prepend(tmp)
            }
            $.CloudChat.base.init('ls')
        break;
        case 7:
            if(!z){return}
            $.each(v,function(n,b){
                tmp+=tm(7,{v:n,u:b})
            })
            $(z).html(tmp)
            if(k&&k.cid){$(z).find('[value="'+k.cid+'"]').prop('selected','selected');}
            $(z).change();
        break;
        case 8:
            k={tmp1:'',tmp2:'',tmp3:'',e:$('[win="m"]'),n:0};
            if(!HBR.m){HBR.m={}}
            $.each(v,function(n,b){
                if(b.status==1){k.tmp1+=tm(8,b);++k.n}
                if(b.status==0){k.tmp1+=tm(8,b)}
                if(b.status==8){k.tmp2+=tm(8,b)}
                if(b.status==9){k.tmp3+=tm(8,b)}
            });
            if(k.n===0){k.n=''}
           $('[mail="sw"][sw="i"] .badge').text(k.n),k.e.find('[box="i"]').append(k.tmp1),k.e.find('[box="a"]').append(k.tmp2),k.e.find('[box="t"]').append(k.tmp3)
            $.CloudChat.base.init('ls')
        break;
        case 11:
            $.each(v.ao,function(n,b){
                tmp+=tm(11,b,z,v.uid);
            })
        break;
        case 'otb':v.arr={};
            $.each(v.ao,function(n,b){
                v.arr[b.bid]=b
            })
           HBR.a[v.uid]=v.arr;
           v.e=$('.live_operators')
           if(v.e.find('.live_operators_'+v.uid).length==0){v.e.append('<table class="vis-group live_operators_'+v.uid+'" uid="'+v.uid+'"></table>')}
           v.e.find('.live_operators_'+v.uid).empty();
            $.each(v.ao,function(n,b){
                if(b.c.indexOf(HBChat.json.id)>-1){return}
                tmp+=tm('otb',b,z,v.uid);
            })
            $('#live_operator_chats [chat][uid="'+v.uid+'"]').each(function(n,b){
                if(!HBR.a[v.uid][$(b).attr('CHAT')]){$(this).remove()}
            })
            HBR.init('iz');
        break;
         case 12:
             $.each(v,function(n,b){
                 tmp+=tm(12,b);
             })
             $('#settings_shared_to').html(tmp)
         break;
        case 13:
            $.each(HBR.can,function(m,b){
                if(!b||m==='default'){return}
                $.each(b,function(t,f){
                    tmp+=tm(13,{v:f,k:t});
                })
            })
            $('#modal_canned_tb tbody').append(tmp);
        break;
        case 14:
            $.each($user.det.depts,function(m,b){
                tmp+=tm(14,b);
            })
            $('#modal_departments_tb tbody').append(tmp);
        break;
        case'api':
            if(!$user.api){$user.api=[];}
            $.each($user.api,function(m,b){
                tmp+=tm('api',b);
            })
            $('#modal_api_tb tbody').append(tmp);
        break;
        case'missed':
            $.each(v,function(m,b){
                tmp+=tm('missed',b);
            })
            $(z).append(tmp);
        break;
        case'can':
            $.each(v,function(m,b){
                tmp+='<div class="rec_group_'+m+' list-block"><ul>';
                $.each(b,function(j,l){
                    l=$('<span>'+l+'</div>').text()
                    tmp+='<input class="hidden" id="pre_'+m+'_'+j+'" value="'+j+'" type="radio" name="msgs"><label for="pre_'+m+'_'+j+'">'+tm('ib',{ic:'',a:'',n:l+'',c:'',s:''})+'</label>';
                })
                tmp+='</ul></div>';
            })
            $('#chats_pre_recs').html(tmp).find('label').first().click();
        break;
        case'slacks'://init all slacks
            if($.Slack){
            $.each($.Slack.get(),function(n,v){//init slacks
                $.Slack.init(0,n.replace('slack',''))
            })
            $.Slack.ping=setInterval(function(){$.Slack.cx({"id":1,"type": "ping"})},1000*60*10)//ping every 10 mins
            }
            if(!v.n){v.n=0;};if(v.n===0){v.nn=''}else{v.nn=v.n};v.st=0;//draw plugin buttons
            v.ff=$('#modal_account_apps .slackz');
            v.fn=function(){
                v.ch=(!$user.ids['slack'+v.nn]||(typeof $user.ids['slack'+v.nn] ==='object')==false);
                if(v.ch){v.st=1;v.t1='Open Slot',v.t2='005480',v.t3='Add Slack',v.t4='slack',v.t5='success';}else{v.t1='Connected',v.t2='00b060',v.t3='Change',v.t4='wrench',v.t5='primary';}
                v.tmp='<div class="form-group" id="slack_attach'+v.nn+'">';
                if($user.ids['slack'+v.nn]){v.vin=$user.ids['slack'+v.nn].team_name+' '+$user.ids['slack'+v.nn].team_id<?php if($_SESSION['lv']==0&&isset($_SESSION['ids']['slack'])){ ?>+' <i title="Until a higher tier account is set this feature will not function.">Husky Account Required</i>'<?php } ?>;}else{v.vin='Real Time Messaging.';}
                v.tmp+='<label>Slack <b class="plugin_status" style="font-size:80%;color:#'+v.t2+'">'+v.t1+'</b> <small>'+v.vin+'</small></label>';
                v.tmp+='<div><a class="btn btn-'+v.t5+' btn-ghost" slack_link="'+v.nn+'"><i class="fa fa-'+v.t4+'"></i> &nbsp;'+v.t3+'</a>'
                if(!v.ch){v.ff.find('.plugin_detach').remove();v.tmp+=' <a class="btn btn-danger btn-ghost plugin_detach" slack_link="'+v.nn+'" slack_link_type="detach"><i class="fa fa-trash-o"></i> &nbsp; Remove Token</a></div>';}
                v.tmp+='</div>';
                v.ff.append(v.tmp);
                ++v.n;v.nn=v.n;if(v.st===0){v.fn();}
            }
            v.fn();
        break;
<?php if(sudo('su')===true){ ?>
        case'suba':
            if(!$user.det.subs){$user.det.subs={}};
            $.each($user.det.subs,function(m,b){
                tmp+=tm('suba',b);
            })
            $('#modal_subaccounts_tb tbody').html(tmp)
        break;
<?php }?>
<?php if(sudo()===true){ ?>
        case'sett':
            $.each([{v:'si',n:'Sign-In'},{v:'a',n:'Away'},{v:'c',n:'Chat'},{v:'ra',n:'Rating'}],function(m,b){
                tmp+=tm('sett',b);
            })
            $('#files_usr .main_colors').html(tmp);tmp='';
            $.each([{n:1,t:'Default'},{n:0,t:'Sarah'},{n:2,t:'Kristen'},{n:3,t:'Sarah 2'},{n:4,t:'Michael'},{n:5,t:'Megan'},{n:6,t:'Moe'},{n:7,t:'Ninja'},{n:8,t:'Jim'},{n:9,t:'Mike'},{n:10,t:'Sam'},{n:11,t:'Ricky'}],function(m,b){
                tmp+='<div class="option"><input '
                if(b.n==1){tmp+='checked="checked"'}
                tmp+=' class="fi-radio" type="radio" name="gr_c" id="gr_c_'+b.n+'" value="'+b.n+'"><label for="gr_c_'+b.n+'"><img src="/libs/images/default/greet'+b.n+'.png"></label></div>';
            })
            $('#files_usr .greet_styles').html(tmp);tmp='';
            $.each([{n:'style_d',t:'Default'},{n:'style_mini',t:'Mini'},{n:'style_floater',t:'Floater'},{n:'style_clear',t:'Clear'}],function(m,b){
                tmp+='<div class="option"><input '
                if(m==0){tmp+='checked="checked"';}
                tmp+=' class="fi-radio" type="radio" name="wig_st" id="sty_'+b.n+'" value="'+b.n+'"><label for="sty_'+b.n+'"><img src="/libs/images/default/sty_'+b.t+'.png"></label></div>';
            })
            $('#files_usr .widget_styles').html(tmp)
        break;
<?php }?>
        case'weat':
            if(!z){z='#stat_weather'}
            $(z).empty();
            $.each(v.forecast,function(m,b){
                b.units=v.units;
                $(z).append(tm('weat',b));
            })
        break;
        case'weat':
            if(!z){z='#stat_weather'}
            $(z).empty();
            $.each(v.forecast,function(m,b){
                b.units=v.units;
                $(z).append(tm('weat',b));
            })
        break;
        case 16:
            if(k){$(z).empty();}
            $.each(v,function(m,b){
                tmp+=tm(16,b,z)
            });
        break;
    }
}
function tm(x,v,z,k,a){//Draw Some Elements - This is Different in User (app.js)
    var tmp='';if(!a){a={}}
    switch(x){
        case 2://load single admin
            if(!v.pp||v.pp===''||v.pp==null){v.pp=placeholder.getData(HBR.plcimg(v.n.charAt(0)))}
           tmp+='<div opj="'+v.bid+'" uid="'+v.u+'" peer="'+v.peer+'" title="'+v.n+'" class="my_avatar"><div class="img" style="background-image: url('+v.pp+');"></div><div typing><span></span></div></div>';
        break;
        case 0://load single user
           if(!HBR.u[v.uid]){HBR.u[v.uid]={}}
           HBR.u[v.uid][v.bid]=v;v.tm=$('#WIN_WTC [bid="'+v.bid+'"][uid="'+v.uid+'"]'),v.classes='';v.cc=0;
            $.each(HBR.u[v.uid][v.bid].joined,function(n,b){$.each(b,function(m,h){v.cc+=1})})
           if(v.cc>0){v.classes+='taken '}
           if(!v.name){v.name=''}
           if(!v.title||v.title===''){v.title=v.url}
           if(v.tm.length===0){
           if(v.chat===0){z='#live_visitors tbody'}
           if(!z||z===''){z='#live_users'}
           tmp+='<tr class="'+v.classes+'" uid="'+v.uid+'" bid="'+v.bid+'">'
           tmp+='<td><span class="icos">'
           if(v.geo){tmp+='<i class="flag flag-'+v.geo.flag+'"></i>'}
           if(v.browser&&v.browser.os){tmp+='<i class="fa fa-'+v.browser.os+'" title="'+v.browser.os+'"></i>'}
            tmp+='<i class="fa fa-'+v.browser.name.toLowerCase()+'" title="'+v.browser.name+' '+v.browser.version+'"></i></span></td>'
           tmp+='<td><span class="ip">'+v.ip+'</span></td><td><span class="name">'+v.name+'</span></td>'
           tmp+='<td title="'+v.url
           if(v.referrer!==''){tmp+='\n Referrer : '+v.referrer}
           tmp+='"><span class="url text-ellipsis">'+v.title+'</span></td>'
           tmp+='<td><span class="livestamp" title="'+v.time+'"></span></td>'
           tmp+='<td class="fa-fl"><span title="Footprints"><span class="ft">'+v.ft+'</span></span></td>'
           tmp+='<td class="livestamp" title="'+v.fs+'"></td>'
           a.o=Op(null,null,'Liked_'+$user.ke)[v.uid+'_'+v.bid];
           if(!a.o){a.t='-o'}else{a.t=' text-danger faa-pulse animated'}
           tmp+='<td><i class="fa fa-heart'+a.t+' likeme"></i></td>';
           tmp+='</tr>'
            if(k===1){
                $(z).prepend(tmp);
                $('[uid="'+v.uid+'"][bid="'+v.bid+'"]').tooltipster({
                    interactive: true,theme: 'tooltipster-unm',//trigger: 'click',
                    content: $(tm('geo',{uid:v.uid,bid:v.bid}))
                });
                return '';
            }
           }else{
               v.turl=v.url
               if(v.referrer!==''){v.turl+='\n Referrer : '+v.referrer}
               v.tm.find('.url').text(v.title).attr('title',v.turl)
               v.tm.find('.livestamp').livestamp('destroy').attr('title',v.time).livestamp()
               v.tm.find('.ft').text(v.ft)
           }
        break;
        case 1://Load single unm-bubble
            if(!z||z===''){z='#messages'}
            if(!v.time){v.time=moment().format()}
            if(!v.x){v.d=$.CloudChat.base.init('ln',v.d)
            v.d=$.emoticons.replace(v.d),v.ts='';}else{
                v.d=v.d.replace(/&/g, "&amp;").replace(/</g, "&lt; ").replace(/>/g, " &gt;");
                v.d=$.CloudChat.base.init('ln',v.d);v.ts='ts="'+v.ts+'"';
            }
            if(v.fr===1){v.f='them'}else{v.f='me'};v.mm=$(z);v.inv=v.mm.find('li:hidden');Error(v.time)
            tmp+='<li class="list-group-item unm-bub-h clearfix from-'+v.f+'" title="'+$.CloudChat.base.init('t',v.time)+'" '+v.ts+'>';
            tmp+='<div>';
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
            if(!v.sender){v.sender=$user.id}
            if(!v.slack){
                if(HBR.a[v.uid]&&HBR.a[v.uid][v.sender]&&HBR.a[v.uid][v.sender].pp){v.pp=HBR.a[v.uid][v.sender].pp}else{v.pp=placeholder.getData(HBR.plcimg(v.name.charAt(0)));}
            }else{
                if(v.slack.user){
                    v.slack=$.Slack['u'+v.slack_selected][v.slack.user];
                    v.pp=v.slack.profile.image_48;
                    if(!v.name){v.name=v.slack.name;if(v.name===''){v.name=v.slack.profile.email;}}
                }else{
                    if(v.slack.icons){v.pp=v.slack.icons.image_48;}v.name=v.slack.username;
                }
            }
            tmp+='<div class="my_avatar"><div class="img" style="background-image: url('+v.pp+');"></div></div>'
            tmp+='<span class="unm-bubble clearfix">'
            tmp+='<span class="icon_options"><a class="mm-lang-pop"><i class="fa fa-language"></i></a> <a class="delete"><i class="fa fa-times"></i></a></span>'
            tmp+='<small>'+v.d.replace(/(?:\r\n|\r|\n)/g, '<br/>')+'</small>'
            tmp+='<div class="translated"></div>'
            if(v.fr===1){tmp+='<b class="text-right">'+v.name+'</b>'}
            tmp+='</span></div>'
            if(v.fr===1){v.fr='left';}else{v.fr='right';}
            switch(v.st){case 0:v.st='Delivered';$('[CHAT="'+v.rid+'"][uid="'+v.uid+'"] .from-me .status').empty();break;default:v.st='';break;}
            tmp+='<div class="bottom_row_text" style="text-align:'+v.fr+'"><div class="status">'+v.st+'</div> &nbsp; <span class="livestamp" title="'+v.time+'"></span></div>';
            tmp+='</li>'
            switch(k){
               case 1:
                   $(z).append(tmp);
                   v.e=$('[ctb="'+v.rid+'"][uid="'+v.uid+'"]');
                   v.e.find('.pmsg_').text(v.d)
                   if(v.e.find('.time_').livstamp){v.e.find('.time_').livstamp('destroy')}
                   v.e.find('.time_').attr('title',v.time).livestamp()
                   $(z).animate({scrollTop:$(z).prop("scrollHeight")},500)
                   $.CloudChat.base.init('ls');
               break;
            }
        break;
        case 3://Load Neutral unm-bubble
           if(!z||z===''){z='#messages'}
            if(!v.c){v.c=''};
           tmp+='<li class="list-group-item text-center unm-bub-h clearfix">'
           tmp+='<div><span class="unm-bubble clearfix '+v.c+'">'
           if(v.url){tmp+='<div title="Visited" class="clearfix text-ellipsis"><a target="_blank" href="'+v.url+'">'+v.url+'</a></div>'}
           if(v.referrer){tmp+='<div title="Referrer" class="clearfix text-ellipsis referrer"><a target="_blank" href="'+v.referrer+'">'+v.referrer+'</a></div>'}
           if(v.msg){tmp+='<small class="clearfix">'+v.msg+'</small>'}
           tmp+='</span></div>'
           tmp+='<div class="livestamp" style="text-align:center" title="'+v.time+'"></div>'
           tmp+='</li>'
           switch(k){
               case 1:
                   $(z).append(tmp)
                   $(z).animate({scrollTop:$(z).prop("scrollHeight")},500)
                   $.CloudChat.base.init('ls')
               break;
           }
        break;
        case 4://Load Window list Helper
           if(!z||z===''){z='#winlist'}
           tmp+='<li id="W_'+v.a+'">'
           tmp+='<a locus="'+v.a+'">'
           tmp+='<i class="i i-circle-sm-o text-primary-lt"></i>'
           tmp+='<span>'+v.n+'</span>'
           //tmp+='<div reset>&nbsp;<i class="fa fa-retweet"></i>&nbsp;</div>'
           tmp+='</a>'
           tmp+='</li>'
           switch(k){
               case 1:
                   $(z).append(tmp)
               break;
           }
        break;
        case 5://Load/Update Event Dropdown Item
           if(!z||z===''){z='#recent_events'}
            v.e=$('.event[bid="'+v.bid+'"]')
            var $el=$(z),$n=$('.count:first',$el),$v=parseInt($n.text());
            if(isNaN($v)){$v=0}
            $('.count',$el).text($v+1);
            if(v.e.length===0){
           tmp+='<a bid="'+v.bid+'" uid="'+v.uid+'" class="media event list-group-item" style="display: block;"><span class="pull-left thumb-sm text-center"><i class="fa fa-envelope-o fa-2x text-success"></i></span><span class="media-body block m-b-none"><div class="msg">'+v.d+'</div><small class="text-muted"><span class="name">'+v.name+'</span> - <span class="livestamp" title="'+v.time+'"></span></small></span></a>';
               switch(k){
                   case 1:
                        $(tmp).hide().prependTo($el.find('.list-group')).slideDown().css('display','block');
                   break;
               }
            }else{
                v.e.find('.msg').text(v.d)
                v.e.find('.name').text(v.name)
                v.e.find('.livestamp').text(v.time)
            }
            $.CloudChat.base.init('ls')
        break;
        case 6://Breadcrumb
            if(!v.href){v.href=v.url}
           tmp+='<li class="list-group-item"><div><a class="clear text-ellipsis" target="_blank" href="'+v.href+'" title="'+v.href+'">'+v.href+'</a></div><div class="display-table text-right">'
           if(v.referrer){tmp+='<small class="pull-left ref" title="Referrer"><a class="text-ellipsis" target="_blank" href="'+v.referrer+'" title="'+v.referrer+'">'+v.referrer+'</a></small>'}
           tmp+='<small class="livestamp" title="'+v.time+'"></small></div></li>'
           if(z&&z!==''){$(z).prepend(tmp);$.CloudChat.base.init('ls')}
        break;
        case 7:
            if(!v.k){v.k=v.v};
            tmp+='<option value="'+v.v+'">'+v.u.u+'</option>'
            if(z&&z!==''){$(z).prepend(tmp);$.CloudChat.base.init('ls')}
        break;
        case 8://Message Item
            if(!v.k){v.k=v.v};v.kk=gid(),HBR.m[v.kk]=v;if(v.status===undefined){v.status='1'}
            tmp+='<li mail="'+v.kk+'" class="list-group-item" status="'+v.status+'" uid="'+v.ke+'">'
            tmp+='<a class="clear text-ellipsis"><small title="'+v.time+'" class="livestamp pull-right"></small>  <strong class="block">'+v.name+'</strong>  <small>'+v.msg+'</small>' 
            tmp+='</a>'
            tmp+='</li>'
            if(z&&z!==''){$(z).prepend(tmp)}
        break;
        case 9:
            tmp+='<span uid="'+v.uid+'" title="'+v.uid+'"><i class="fa fa-user-secret"></i> &nbsp; <span class="online_admins_'+v.uid+'"></span></span>'
            if(k===1){$('#online_admins').prepend(tmp)}
        break;
        case 10:
            v.e=$('[typing="'+v.bid+'"]')
            if(v.kp!==1){
                if(v.e.length===0){
                    tmp+='<span class="btn btn-ghost btn-xs btn-unm" title="is typing..." typing="'+v.bid+'"><i class="chi-emo-happy"></i> <span class="">'+v.n+'</span></span>'
                    HBR.mcw.find('.typing_operators').prepend(tmp)
                }
            }else{
                v.e.remove()
            }
        break;
        case 11://tab for open chat
            v.e=$('[ctb="'+v.bid+'"]');if(v.b){v.bid=v.b};if(v.u){v.uid=v.u};
            if(v.n){v.name=v.n}else{v.name=v.ip};
            if(v.e.length===0){
                if(v.y){v.y='h'}else{v.y=''}
                if(v.x){v.x='pagr chrome-tab-current'}else{v.x=''}
                tmp+='<div class="chrome-tab '+v.x+'" title="'+v.name+'" uid="'+v.uid+'" ctb="'+v.bid+'"><div class="chrome-tab-favicon"><i class="fa fa-user"></i></div><div class="chrome-tab-title">'+v.name+'</div>';
                if(v.x===''){tmp+='<div class="chrome-tab-close" data-click="[CHAT=\''+v.bid+'\'] [winc=\'c'+v.y+'c\']"></div>';}
                tmp+='<div class="chrome-tab-curves"><div class="chrome-tab-curves-left-shadow"></div><div class="chrome-tab-curves-left-highlight"></div><div class="chrome-tab-curves-left"></div><div class="chrome-tab-curves-right-shadow"></div><div class="chrome-tab-curves-right-highlight"></div><div class="chrome-tab-curves-right"></div></div></div>';
                if(!k){
                    $('#open_chats .chrome-tabs').prepend(tmp),$('[uid="'+v.uid+'"][ctb="'+v.bid+'"]').click().addClass('fadeIn'),chromeTabs.init({$shell:$('#open_chats'),minWidth: 45,maxWidth: 160,closeTab:function(){return false}});
                }
            }else{
                $('[ctb="'+v.bid+'"][uid="'+v.uid+'"] .nom').text(v.name)
            }
        break;
        case'otb'://tab for operator chat
            if(v.n){v.name=v.n};
            v.e=$('[otb="'+v.bid+'"][uid="'+v.u+'"]');
            if(z===1){
            if(v.e.length===0){
                if(!k){k=v.u;}
                v.ch=Op(null,null,'OperatorChats_'+$user.ke)[HBR.a[k][v.bid].name+'_'+k];
                if(v.ch){
                    v.ch=v.ch[v.ch.length-1];
                }else{v.ch={time:'',d:''}}
                if(!v.pp||v.pp===''||v.pp==null){v.pp=placeholder.getData(HBR.plcimg(v.name.charAt(0)))}
                tmp+='<tr class="tab_item animated" status="'+v.status+'" uid="'+k+'" otb="'+v.bid+'" cid="'+v.c+'"><i class="fa fa-moon-o shader" title="This agent may not respond"></i><td><span class="nom text-ellipsis" title="'+v.bid+'">'+v.name+'</span><span class="time_ livestamp" title="'+v.ch.time+'"></span><b class="badge bg-danger pull-left"></b></td><td><div class="my_avatar"><div class="img" style="background-image: url('+v.pp+');"></div></div></td></tr>'
                $('.live_operators_'+k).prepend(tmp);
                $.CloudChat.base.init('ls');
                $('[uid="'+v.uid+'"][otb="'+v.bid+'"]').addClass('fadeIn')
                $('[uid="'+v.uid+'"][otb="'+v.bid+'"]').addClass('fadeIn')
                HBR.a[k][v.bid].pp=v.pp;
                HBR.a[k][v.bid].peer=v.peer;
            }else{
                v.e.attr('status',v.status);
            }
            }else{v.e.remove();}
        break;
        case 12:
            tmp+='<li rshto='+v.ke+' rshto_m="'+v.mail+'" class="list-group-item"><b>'+v.name+' - '+v.mail+'</b><span class="pull-right"><a class="unshare btn btn-danger btn-xs"><i class="fa fa-times"></i></a></span></li>'
            if(z&&z===1){
             $('#settings_shared_to').append(tmp);
             $('#settings_shared_to').html(tmp).find('.unshare').unbind('click').click(function(e){
                 e={e:$(this).parents('[rshto]'),s:$('#ssettings')}
                 e.s.find('[name="m"]').val(e.e.attr('rshto_m'));e.s.submit();e.e.remove();
             })
            }
        break;
        case 13://canned option
            //tmp+='<div class="row m-b field"><div class="col-md-12"><div class="input-group"><input class="form-control" name="'+v.k+'" value="'+v.v+'"><div class="input-group-btn"><a class="btn btn-ghost btn-danger delete_one">&nbsp;<i class="fa fa-times"></i>&nbsp;</a></div></div></div>';
            if(!v){v={}};if(!v.k){v.k=gid(10)};if(!v.v){v.v='Hello World'};
            tmp+='<tr><td><a class="txt key">'+v.k+'</a></td><td><a class="txt value">'+v.v+'</a></td><td class="del"><a class="btn btn-ghost btn-danger btn-xs" tbfn="rmr"><i class="fa fa-trash-o"></i></a></td></tr>';
        break;
        case 14://department
            if(!v){v={}};if(!v.Name){v.Name=gid()};if(!v.Level){v.Level='Agent'};if(!v.Ids){v.Ids=''};if(!v.Message){v.Message=''};
            tmp+='<tr><td><a class="txt">'+v.Name+'</a></td><td><a data-type="select" class="sel1">'+v.Level+'</a></td><td><a class="txt">'+v.Ids+'</a></td><td><a class="txt">'+v.Message+'</a></td><td class="del"><a class="btn btn-ghost btn-danger btn-xs" tbfn="rmr"><i class="fa fa-trash-o"></i></a></td></tr>';
        break;
        case 'api'://api
            if(!v){v={}};if(!v.code){v.code=gid(20)};if(!v.date){v.date=moment().format('YYYY-MM-DD HH:mm:ss')+' <b>(just now)</b>'};if(!v.detail){v.detail={bid:$user.id,name:$user.name,ip:''};}else{v.detail=JSON.parse(v.detail)};if(!v.detail.notes){v.detail.notes=''};if(!v.detail.origins){v.detail.origins=''};
            tmp+='<tr key="'+v.code+'"><td class="key">'+v.code+'</td><td>'+v.date+'</td><td>'+v.detail.name+' <small><b>('+v.detail.bid+')</b> '+v.detail.ip+'</small></td><td><textarea class="form-control notes savingonchange" name="notes">'+v.detail.notes+'</textarea></td><td><textarea class="form-control origins savingonchange" name="origins">'+v.detail.origins+'</textarea></td><td class="del"><a class="btn btn-ghost btn-danger btn-xs" tbfn="rmr"><i class="fa fa-trash-o"></i></a></td></tr>';
        break;
        case 'missed'://missed
            if(v.id){v.bid=v.id};if(v.ke){v.uid=v.ke};if(v.start){v.time=v.start};if(HBR.missed[v.uid]&&HBR.missed[v.uid][v.bid]){v.u=HBR.missed[v.uid][v.bid]}else{v.u=JSON.parse(v.user);};
            tmp+='<li class="list-group-item" type="missed" preview="'+v.bid+'" uid="'+v.uid+'" time="'+v.time+'">'+v.u.name+'<small>'+v.u.mail+'</small></li>';
        break;
        case'ib':
            if(v.f){v.ic='<div class="item-media"><i class="icon fa fa-'+v.f+'" style="color: rgb(255, 255, 255);'+v.s+'"></i></div>'}
            tmp+='<li><a class="item-content item-link '+v.c+'" '+v.a+'>'+v.ic+'<div class="item-inner"><div class="item-title">'+v.n+'</div></div></a></li>'
        break;
        case 15://window for visitor chat/channel chat
            if(v.y){v.y='chann=1';}else{v.y='';};if(v.yy){v.y='slack_chan=1 slack_selected="'+z+'"';};
            tmp='<div class="bmsg animated fadeIn" '+v.y+' chat="'+v.b+'" uid="'+v.u+'" flash=1 sound=1 focus=0 id="CHAT_'+v.b+'"><section class="hbox stretch"><aside class="rell messages-content"><ul class="list-group messages list-group-lg no-bg auto msg_"></ul>'
            if(v.y===''){tmp+='<div class=msgp style="display:none"><div><span class="name">'+HBR.u[v.u][v.b].name+'</span></div><div class="text"></div></div>'}
            tmp+='<div class=joined_ops></div><div class="toolbar messagebar" style=""><div class="toolbar-inner"><textarea placeholder="Message" class=""></textarea><a class="link" mm-attach=c><i class="fa fa-paperclip"></i></a><a class="link mm-emoji"><span class="emoticon emoticon-smile"></span></a><a class="link" send=s>Send</a></div></div></aside>';
            if(v.y===''){if(HBR.u[v.u][v.b].chat!==1){v.chat=' style="display:none"'}else{v.chat=''}
            tmp+='<aside class="data_pane unmTabs"><section class="vbox"><header class="dker bg-default header clearfix"><div class="btn-group btn-group-sm btn-group-justified"> <a class="btn btn-ghost btn-primary unmTab" unmTab="1" title="Breadcrumbs">Footprints <span class="label label-default footprints"></span></a><a class="btn active btn-ghost btn-primary unmTab" unmTab="2">Info</a><a class="btn btn-ghost btn-primary unmTab" unmTab="3">Controls</a><a class="unmTab btn btn-ghost btn-primary" unmTab=4>Screenshots</a></div></header><section class="scrollable w-f"><div unmTab="1" style="display:none" class="unmFrame lter popper">';
            //tmp+='<a class="btn btn-ghost btn-xs btn-primary" winc=x title="End Chat"><i class="fa fa-sign-out"></i></a>'
            tmp+='<ul class="list-group brd_"></ul><div class="timeline animated fadeInUp"></div></div><div class="unmFrame" unmTab="2"><div class="geo">'+tm('geo',HBR.u[v.u][v.b])+'</div><ul class="logs_"><div class="getmore hidden text-mute">Load Previous</div></ul></div>';
            tmp+='<div class="unmFrame" unmTab="3" style="display:none"><form class="toolPop"><div class="ios-blocks content-block"><div class="list-block"><ul>'+tm('ib',{a:'winc="cc"',n:'Close Window',f:'times',c:'',s:''})+'</ul></div><div class="list-block win_t" wt="cd" cd="$(\'#mm-chat-window .unm_topbar [close]\').click()" '+v.chat+'><ul>'+tm('ib',{a:'',n:'End Chat',f:'sign-out '+v.fa,c:'',s:''})+'</ul></div><div class="form-group row"> <label for="vid_'+v.b+'">Target Window</label> <div class="col-md-12"><select class="form-control" id="vid_'+v.b+'" name=vid></select></div></div><div class="list-block" ><ul>'+tm('ib',{a:'caller="s"',n:'Video Call',f:'video-camera',c:'',s:''})+tm('ib',{a:'wt="t"',n:'Chat Window <small><span>Open</span></small>',f:'sign-out '+v.fa,c:'win_t',s:''})+tm('ib',{a:'wt="g"',n:'Greet <small>Open</small>',f:'sign-out fa-rotate-180',c:'win_t',s:''})+tm('ib',{a:'wt="g0"',n:'Greet <small>Close</small>',f:'sign-out',c:'win_t',s:''})+'</ul></div><div class="list-block" ><ul>'+tm('ib',{a:'winc="v"',n:'Sound <small class="it"></small>',f:'volume-up',c:'',s:''})+tm('ib',{a:'winc="f"',n:'Flashing <small class="it"></small>',f:'star',c:'',s:''})+'</ul></div></div><div class="form-group row"> <label for="scr_'+v.b+'">Scroll User to Element</label> <div class="col-md-12"><input class="form-control" id="scr_'+v.b+'" name=scr placeholder=#block3></div></div><div class="form-group row"> <label for="pgr_'+v.b+'">Page Redirect</label> <div class="col-md-12"><input class="form-control" id="pgr_'+v.b+'" name=pgr placeholder=//unmetered.ca></div></div><div class="form-group row"> <label for="script_'+v.b+'">Run Javascript</label> <div class="col-md-12"><input class="form-control" id="script_'+v.b+'" name=script placeholder=location.reload()></div></div><div style="padding:0 15px" class="text-center"> <button type=submit class="btn btn-ghost btn-primary btn-block"><i class="fa fa-paper-plane"></i> &nbsp; Send </button><div style="color:#9C9C9C;font-size:85%;padding:10px 0">Leave fields blank to do nothing.</div></div></form></div>'
            tmp+='<div class="unmFrame" unmTab=4 style="display:none"><section class="hbox stretch"><section class="vbox unmTabs"><section class="scrollable"><div class="loading">'+tm('prg',{c:'',s:1,cl:'screen_loading'})+'</div><div class="screenshots"></div></section><footer class="footer hidden bg-default"><div class="btn-group btn-group-sm btn-group-justified" style="display:inline-block"></div></footer></section></section></div>'
            tmp+='</section><footer class="footer bg-default"><div class="btn-group btn-group-sm btn-group-justified"><a winc="lm" class="btn btn-ghost btn-default"><i class="fa fa-wechat"></i> &nbsp; Load Previous</a><a winc="tscr" class="btn btn-ghost btn-default"><i class="fa fa-photo"></i> &nbsp; Screenshot</a></div></footer></section></aside>';}else{
                tmp+='<div class="hidden"><a winc="chc"></a></div>'
                switch(v.yy){
                    case 1:
                    break;
                    default:
                        tmp+='<aside class="aside-lg"><div class="content-block ios-blocks"><div class="list-block"><ul>'+tm('ib',{a:'winc="ach"',n:'Clear History',f:'trash-o',c:'',s:''})+'</ul></div><div class="list-block"><ul class="list-ousers"></ul></div></div></aside>'
                    break;
                }
            }
            tmp+='</section></div>'
        break;
        case'prg':
            if(!v.v){v.v=0};
            if(v.s===1){v.s='striped'}
            tmp+='<div class="progress"><div class="'+v.cl+' progress-bar progress-bar-'+v.c+' progress-bar-'+v.s+'" role="progressbar" aria-valuenow="'+v.v+'" aria-valuemin="0" aria-valuemax="100" style="width:'+v.v+'%"></div></div>';
        break;
        case'otc'://window for operator chat
            v.ee='[CHAT="'+v.b+'"][uid="'+v.u+'"]';
            if($(v.ee).length===0){
                if(!v.y){
                v.us=HBR.a[v.u][v.b];
                    v.sk='';
                }else{
                    v.su=$.Slack['u'+v.slack][v.ims];
                    v.us={n:v.su.real_name,name:v.su.real_name,peer:'slack'};
                    v.sk='slack_selected="'+v.slack+'"';
                }
                tmp+='<div class="op_win bmsg animated fadeInUp" chat="'+v.b+'" uid="'+v.u+'" peer="'+v.us.peer+'" '+v.sk+' flash=1 sound=1 focus=0><div title="'+v.us.n+'" class="op_win_head"><span winc="t" class="btn btn-ghost btn-xs btn-success">'+v.us.n+'</span><div class="btn-group btn-group-xs pull-right"><a class="btn btn-ghost btn-inverse" mm-attach="c" title="Send File">&nbsp;<i class="fa fa-paperclip"></i>&nbsp;</a>'
                if(!v.y){
                tmp+='<a class="btn btn-ghost btn-inverse" caller="o">&nbsp;<i class="fa fa-video-camera"></i>&nbsp;</a><?php if(sudo()===true){ ?><a class="btn btn-ghost btn-inverse" winc="t" title="User Controls">&nbsp;<i class="fa fa-wrench"></i>&nbsp;</a><?php } ?>'
                }
                tmp+='<a class="btn btn-ghost btn-inverse" winc="f" title="Toggle Flash">&nbsp;<i class="fa fa-star"></i>&nbsp;</a> <a class="btn btn-ghost btn-primary" winc="v" title="Toggle Mute">&nbsp;<i class="fa fa-volume-up"></i>&nbsp;</a> <a class="btn btn-ghost btn-inverse" winc="cc" title="Close Chat Window">&nbsp;<i class="fa fa-times"></i>&nbsp;</a></div></div><div class="op_win_bod"><video></video><ul class="list-group list-group-lg no-bg auto msg_"></ul>';
                if(!v.y){
                    <?php if(sudo()===true){ ?>
                tmp+='<div class="tools open" style="display:none"><div class="ios-blocks content-block"><div class="content-title">Toggles</div><div class="list-block"><ul>'+tm('ib',{a:'button="status" wt="cd" cd=$(\'[toggle="status"]:first\').click()',n:'Status &nbsp; <small>Online or Offline</small>',f:'user',c:'win_t',s:''})+tm('ib',{a:'wt="cd" cd=$(\'[toggle="knote"]\').click()',n:'Key Preview',f:'keyboard-o',c:'win_t',s:''})+'</ul></div><form class="toolPop"><div class="content-title">Run Javascript</div><div class="form-group row"><div class="input-group input-group-sm"><input class="form-control" name="script" placeholder="location.reload()"><div class="input-group-btn"><button type="submit" class="btn btn-ghost btn-success">&nbsp;<i class="fa fa-paper-plane"></i>&nbsp;&nbsp;</button></div></div></div></form></div><div class="ios-blocks content-block" style="margin-top:10px"><div class="list-block"><ul>'+tm('ib',{a:'wt="cd" cd=location.reload()',n:'Refresh &nbsp; <small>Chat sessions will close.</small>',f:'retweet',c:'win_t',s:''})+'</ul></div></div></div>';<?php } ?>
                }
                tmp+='</div><div class="op_win_text"><form class="send_"><div class="input-group input-group-sm"><input send="'+v.b+'" class="form-control" style="height:auto"><div class="input-group-btn"><button type="submit" class="btn btn-ghost btn-success">Send</button></div></div></form></div></div>';
            $('#live_operator_chats').append(tmp);
                if(!v.y){
                    v.l=Op(null,null,'OperatorChats_'+$user.ke)[v.us.name+'_'+v.u];if(v.l){pm(1,v.l,'[chat="'+v.b+'"][uid="'+v.u+'"] .msg_')}
                }else{
                    $.post($.Slack.api+'im.history',$.Slack.obj({channel:v.b}),function(d){
                        $.Slack.pm(0,$(d.messages).get().reverse(),'[CHAT="'+v.b+'"] .msg_',v.slack);
                    })
                }
            }
            if(v.md!==0){$(v.ee).trigger('mousedown')}
            return $(v.ee);
        break;
<?php if(sudo('su')===true){ ?>
        case'suba':
            if(!v){v={}};if(!v.Id){v.Id=gid()};if(!v.Name){v.Name='Barry'};if(!v.Password){v.Password=''};if(!v.Username){v.Username=gid()+'@unmetered.io'};if(!v.Title){v.Title='Agent'};if(!v.PP){v.PP=''};
            tmp+='<tr><td><a class="txt">'+v.Id+'</a></td><td><a class="txt">'+v.Name+'</a></td><td><a class="txt">'+v.Username+'</a></td><td><a class="txt">'+v.Password+'</a></td><td><a class="txt">'+v.PP+'</a></td><td><a data-type="select" class="sel1">'+v.Title+'</a></td><td class="del"><a class="btn btn-ghost btn-danger btn-xs" tbfn="rmr"><i class="fa fa-trash-o"></i></a></td></tr>';
        break;
<?php }?>
<?php if(sudo()===true){ ?>
        case'sett':
            v.fn=function(w,q){return'<div class="form-group"><label>'+w+'</label><div>'+q+'</div></div>';}
            tmp+='<div class="col-md-3"><div class="sett-block"><div class="shade_"><h4 class="modal-title no-margin m-b">'+v.n+'</h4>'
            tmp+=v.fn('BG Image','<input placeholder="BG Image" id="'+v.v+'bgc" type="text" class="form-control pic" name="'+v.v+'bg">')
            tmp+=v.fn('Background Size','<select title="Background Size" name="'+v.v+'bg_'+v.v+'ze" class="form-control siz"><option value="auto auto" selected>Default</option><option value="cover">Fully Cover</option><option value="100%">100%</option><option value="100% auto">100% auto</option><option value="auto 100%">auto 100%</option></select>')
            tmp+=v.fn('Background Position','<input title="Background Position" placeholder="Position" name="'+v.v+'bg_pos" type="text" class="form-control pos">')
            tmp+=v.fn('Shade Color','<input placeholder="Shade Color" name="'+v.v+'bg_shade" type="text" class="form-control shad">')
            if(v.v!=='c'){tmp+=v.fn('Holder Color','<input placeholder="Holder Color" name="'+v.v+'bh_shade" type="text" class="form-control hold_">')}
            tmp+=v.fn('Text Color','<input placeholder="Text Color" name="'+v.v+'bg_text" type="text" class="form-control colo">')
            tmp+='</div></div></div>'
        break;
<?php }?>
        case'vid':
            if(v.peer){v.c=v.peer}
        v.e=$('#videoChats')
        if(v.e.find('[call="'+v.c+'"]').length===0){
            v.e.append('<div full="0" call="'+v.c+'"><div class="handle_bar"><canvas class="their-voice"></canvas><i class="fa fa-video-camera"></i><div class="pull-right"></div></div><video class="my-stream" autoplay></video><video class="their-stream" autoplay></video><p class="text hidden"></p><div class="phone_icons"><a winc="fs" class="btn btn-ghost btn-primary"><i class="fa fa-expand"></i></a><a winc="ca" class="btn btn-ghost btn-danger"><i class="fa fa-phone"></i></a></div></div>');v.e.find('[call="'+v.c+'"]').draggable({scroll:false,handle:".handle_bar",containment: 'window'})
            tmp=true;
        }else{tmp=false}
        break;
        case'geo':
        if(HBR.u[v.uid]&&HBR.u[v.uid][v.bid]){
            if(!HBR.u[v.uid][v.bid].mail||HBR.u[v.uid][v.bid].mail==='undefined'){HBR.u[v.uid][v.bid].mail=''}
            if(!HBR.u[v.uid][v.bid].browser.os){HBR.u[v.uid][v.bid].browser.os='unkn'}
            tmp+='<table><tr><td>Name</td><td class="name" edit="name">'+HBR.u[v.uid][v.bid].name+'</td></tr><tr><td>Email</td><td class="email" edit="mail">'+HBR.u[v.uid][v.bid].mail+'</td></tr><tr><td>OS</td><td class="os"><i class="fa fa-'+HBR.u[v.uid][v.bid].browser.os.toLowerCase()+'"></i>&nbsp; '+HBR.u[v.uid][v.bid].browser.os+'</a></td></tr><tr><tr><td>Browser</td><td class="browser"><i class="fa fa-'+HBR.u[v.uid][v.bid].browser.name.toLowerCase()+'"></i>&nbsp; '+HBR.u[v.uid][v.bid].browser.name+' '+HBR.u[v.uid][v.bid].browser.version+'</td></tr><td>Page</td><td class="page">'+HBR.u[v.uid][v.bid].title+'</td></tr><tr><td>Link</td><td><a class="link" href="'+HBR.u[v.uid][v.bid].url+'" target="_blank">'+HBR.u[v.uid][v.bid].url+'</a></td></tr><tr><td>Referrer</td><td><a class="referrer" href="'+HBR.u[v.uid][v.bid].referrer+'" target="_blank">'+HBR.u[v.uid][v.bid].url+'</a></td></tr><tr><td>IP</td><td class="ip">'+HBR.u[v.uid][v.bid].ip+'</td></tr><tr><td>Host</td><td class="host"></td></tr><tr><td>Footprints</td><td class="footprints">'+HBR.u[v.uid][v.bid].ft+'</td></tr><tr><td>Last Visit</td><td class="last_visit">'+moment(HBR.u[v.uid][v.bid].time).format()+'</td></tr>'
            if(HBR.u[v.uid][v.bid].geo){
//            tmp+='<tr><td>City / Zip</td><td><span class="city"></span><span class="zip_code"></span></td></tr><tr><td>Region</td><td><span class="region_name"></span><span class="country_name"></span></td></tr><tr><td>Timezone</td><td class="time_zone"></td></tr><tr><td>Coordinates</td><td><a class="map_link" target="_blank"><span class="latitude"></span><span class="longitude"></span></a></td></tr>'
                tmp+='<tr><td>Location</td><td><a target="blank_" href="http://www.google.com/maps/place/'+HBR.u[HBR.u[v.uid][v.bid].uid][v.bid].geo.latitude+','+HBR.u[v.uid][v.bid].geo.longitude+'"><i class="flag flag-'+HBR.u[v.uid][v.bid].geo.flag+'"></a></i></td></tr>'
                $.each(HBR.u[v.uid][v.bid].geo,function(n,b){
                    tmp+='<tr><td>'+n.replace(/_/g,' ')+'</td><td>'+b+'</td></tr>'
                })
            }//else{cx({f:'a',ff:'g',fff:'g',ip:v.ip,bid:v.bid,uid:v.uid})}
            tmp+='<tr><td>User Agent</td><td class="userAgent">'+HBR.u[v.uid][v.bid].browser.userAgent+'</td></tr></table>'
        }
        break;
        case'weat':
            tmp+='<div class="weather-block"><img src="'+v.thumbnail+'"><h1 class="font2">'+v.day+'</h1><div class="temp">'+v.high+' '+v.units.temp+'</div><div class="date font2">'+v.date+'</div></div>';
        break;
        case 16://log row
                if(v.d){v.d.time=v.t;v=v.d;}
                if(v.note){v.text=v.note.text;v.title=v.note.title;
                    switch(v.type){
                        case'success':
                            v.icon='check-circle-o';
                        break;
                        case'error':case'danger':
                            v.icon='exclamation-triangle';
                        break;
                        default:
                            v.icon=v.note.icon;
                        break;
                    }
                          }else{
                    switch(v.c){
                        case 1://general
                            v.text='Interaction Log, No other data',v.icon='exclamation-triangle';
                        break;
                        case 2://joined a chat
                            v.title='Initiated Chat',v.text='Visitor has started a chat session.',v.icon='commenting';
                        break;
                        case 3://chat ended
                            v.title='Chat Ended',v.text='Visitor has ended a chat session.',v.icon='ellipsis-h';
                        break;
                        case 18:
                            v.text='Invalid API',v.icon='exclamation-triangle';
                        break;
                    }
                }
                if(!v.icon){v.icon='comment-o';}
                if(!v.title){v.title='';}
                tmp+='<li class="log-item" ts="'+v.time+'"><div><a class="delete"><i class="fa fa-times"></i></a>';
                tmp+='<div><i class="icon fa fa-'+v.icon+'"></i><b class="title">'+v.title+'</b><span class="text">'+v.text+'</span></div>';
                tmp+='<div><span>&nbsp;</span><small class="pull-right livestamp" title="'+v.time+'"></small></div>';
                tmp+='</div></li>';
                if(z){$(z).prepend(tmp);$.CloudChat.base.init('ls')}
        break;
    }
   return tmp
}
if($.CloudChat.Peer.p&&$.CloudChat.Peer.p.disconnected===true){
    $.CloudChat.audioContext = new AudioContext();
    $.CloudChat.audio=function(f,e){
        if(!e)e={};
        switch(f){
            case 0:
                e.e=$(e.e);
                e.max_level_L = 0;
                e.old_level_L = 0;
                e.cnvs = e.e[0];
                e.cnvs_cntxt = e.cnvs.getContext("2d");

                e.microphone = $.CloudChat.audioContext.createMediaStreamSource(e.s);
                e.javascriptNode = $.CloudChat.audioContext.createScriptProcessor(1024, 1, 1);

                e.microphone.connect(e.javascriptNode);
                e.javascriptNode.connect($.CloudChat.audioContext.destination);
                e.javascriptNode.onaudioprocess = function(event){

                    e.inpt_L = event.inputBuffer.getChannelData(0);
                    e.instant_L = 0.0;

                    e.sum_L = 0.0;
                    for(i = 0; i < e.inpt_L.length; ++i) {
                        e.sum_L += e.inpt_L[i] * e.inpt_L[i];
                    }
                    e.instant_L = Math.sqrt(e.sum_L / e.inpt_L.length);
                    e.max_level_L = Math.max(e.max_level_L, e.instant_L);				
                    e.instant_L = Math.max( e.instant_L, e.old_level_L -0.008 );
                    e.old_level_L = e.instant_L;

                    e.cnvs_cntxt.clearRect(0, 0, e.cnvs.width, e.cnvs.height);
                    e.cnvs_cntxt.fillStyle = '#337ab7';
                    e.cnvs_cntxt.fillRect(0,0,(e.cnvs.width)*(e.instant_L/e.max_level_L),(e.cnvs.height)); // x,y,w,h

                }
            break;
        }
    }
}
HBR.init=function(e,g,d){
    if(!g){g={}}
    switch(e){
        case'depd'://Department Draw from Operators
            g.e=$('.live_departments');
           if(g.e.find('.live_departments_'+g.uid).length==0){g.e.append('<table class="live_departments_'+g.uid+' display-table" uid="'+g.uid+'"></table>')}
            g.l=g.e.find('.live_departments_'+g.uid).empty();
            $.each($user.det.depts,function(n,r){
                r.nn=0;
                $.each(HBR.ao,function(n,b){
                    if(b.status!==1){return}
                    $.each(r.Ids.split(','),function(m,h){
                        if(h==='me'){h=$user.id}
                        if(b.bid===h){++r.nn}
                    })
                })
                if($('[dept="'+r.Name+'"]').length===0){g.l.append('<tr dept="'+r.Name+'"><td>'+r.Name+'</td><td class="text-right"><span class="label label-xs label-default">'+r.nn+'</span></td></tr>')}
            });
        break;
        case'read'://send read receipt
            g.e=$('[CHAT="'+g.bid+'"][uid="'+g.uid+'"]');
            if(g.e.length===1&&g.e.attr('focus')==1){
                cx({})
            }
        break;
        case'cdp'://Check if user is in Department and which one.
            g.r=false,g.n=0;
            $.each($user.det.depts,function(n,v){
                $.each(v.Ids.split(','),function(m,b){
                    if($user.id===b){g.r=v.Name;}
                })
            });
            $.each(HBR.u[g.uid][g.bid].joined,function(n,v){g+=Object.keys(v).length;});
            if(HBR.u[g.uid]&&HBR.u[g.uid][g.bid]&&!g.x&&g.r===HBR.u[g.uid][g.bid].dept&&HBR.u[g.uid][g.bid].deptr!==1&&g.n===0){
                HBR.init('pn',{title:'Department Call',text:'<b>'+HBR.u[g.uid][g.bid].dept+'</b> personnel please respond.',hide:false,c:{uid:g.uid,bid:g.bid,rid:g.bid,sender:g.bid}});
                SND(1,1);
            }
            return g.r
        break;
        case 'edit':
            if(g.e instanceof Array === false){g.e=$(g.e)}
            g.e.each(function(n,v){
                g.p=$(v).parents('[CHAT]');g.b=g.p.attr('CHAT'),g.u=g.p.attr('uid'),g.cx={f:'a',ff:'e',uid:g.u,bid:g.b,form:{}};
                $(v).editable('destroy').editable({
                    type: 'text',validate: function(vv) {
                    g.cx.form[$(v).attr('edit')]=vv;
                    cx(g.cx)
                }
                })
            })
        break;
        case 0:
            if($user&&$user.id){
                HBR.u={},HBR.a={},HBR.c={};
            $.CloudChat.Peer.id=$user.ke+'_'+$user.id+'_'+gid(5);//$.CloudChat.files();
            $.CloudChat.Peer.p=new Peer($.CloudChat.Peer.id,{host:'<?=$config['peer']?>',port:9002});
            $.CloudChat.Peer.hs();
            HBR.loggedInn=true;$('#live_visitors tbody,#live_users').empty();
            g={f:'a',bid:$user.id,uid:$user.ke,auth:$user.auth,t:gTk(),peer:$.CloudChat.Peer.id};if(IsNumber($user.id)===false){g.ff='su'};cx(g);
            try{g.ar.shto=JSON.parse($user.shto)}catch(e){};
            try{g.ar.shfr=JSON.parse($user.shfr)}catch(e){};
            try{$user.ops=JSON.parse($user.ops)}catch(e){};
            try{$user.det.rates=JSON.parse($user.det.rates)}catch(e){$user.det.rates={}};
            if($user.det.rates instanceof Object ===false){$user.det.rates={}}
            $('.username').text($user.name),$('.usermail').text($user.mail),HBR.init('pp');
                //temp cosmetic fix
            $('[toggle="status"]').removeClass('btn-danger').addClass('btn-success').find('.it').text('On');
            }else{location.reload()}
        break;
        case 1://submit text in message window
            cx({f:'a',ff:'g',fff:'c',tbid:g.bid,uid:g.uid})
        break;
        case 2:
            g.e=$(g.e);
            if(!g.t){
                g.t=parseInt(g.e.text());if(isNaN(g.t)){g.t=0};
                if(!g.n||!isNaN(g.n)){g.n=1};
                switch(g.x){default:g.t=g.t+g.n;break;case 0:g.t=g.t-g.n;break;};
            }
            if(g.t<=0){g.t=''};g.e.text(g.t);
        break;
        case 3:
            e={e:$(g.e)}
            switch(g.f){
                case 0:
                    e.e.find('[value="'+g.v+'"]').remove()
                    e.e.val(e.e.find("option:first").val());
                break;
                case 1:
                    if(!g.k){g.k=g.v}
                    g.t='<option value="'+g.v+'">'+g.k+'</option>'
                    e.e.append(g.t)
                break;
                case 2:
                    $.each(g.v,function(n,v){
                        HBR.init(3,{e:g.e,v:n,f:1})
                    })
                break;
            }
        break;
        case 4:
            if(!g.e){g.e='.nav .count'}
            g.f=parseInt($(e).first().text())
            if(isNaN(g.f)){g.f=0}
            if(!g.n){g.n=0}
            g.f+=g.n
            if(g.f==0){return $(g.e).empty()}
            $(g.e).text(g.f)
        break;
        case'iz':
            g={nu:0,nv:0,vn:$('.live_operators li').length};
            $.each(HBR.u,function(n,v){
                $.each(v,function(m,b){
                    g.nv+=1;
                    if(b.chat==1){g.nu+=1}
                })
            });
            g.nv=g.nv-g.nu;
            $.each([['.count_users','nu'],['.count_visitors','nv'],['.count_operators','vn']],function(n,v){
                v[0]=$(v[0]);if(v[0].hasClass('sz')==false){if(g[v[1]]<1){g[v[1]]=''}};v[0].text(g[v[1]]);
            })
        break;
<?php if(sudo('su')===true){ ?>
        case'st':
$('#stat_dates .datepicker.start').datepicker({format:'yyyy-mm-dd'})
.datepicker("setDate",moment().subtract(7,'day').format('YYYY-MM-DD'))
.change(function(e){
e.v=$('#stat_dates .datepicker.end').val();
if(moment($(this).val()).isAfter(e.v)===true){
    $(this).datepicker("setDate",moment(e.v).subtract(1,'day').format('YYYY-MM-DD'))
}
});
$('#stat_dates .datepicker.end').datepicker({format:'yyyy-mm-dd'})
.datepicker("setDate",moment().format('YYYY-MM-DD'))
.change(function(e){
e.v=$('#stat_dates .datepicker.start').val();
if(moment($(this).val()).isAfter(e.v)===false){
    $(this).datepicker("setDate",moment(e.v).add(1,'day').format('YYYY-MM-DD'))
}
});
                //$.CloudChat.base.stat_range=$('#state_date_range').rangeCalendar()
$('#stat_dates').unbind('submit').submit(function(e){
   e.preventDefault();
     cx({f:'a',ff:'g',fff:'s',d:$('#stat_dates').serializeObject()})
   return false;
})
$('.morris_chart').trigger('resize')
        break;
        case'geo':
                g.ee=$('[bid="'+g.bid+'"][uid="'+g.uid+'"] .icos')
               g.ef=$('[CHAT="'+g.bid+'"][uid="'+g.uid+'"] .geo');
            if(HBR.u[g.uid][g.bid]&&g.ef.length!==0){
                $.each([['ip'],['name'],['email','mail'],['page'],['footprints','ft']],function(n,v){
                    if(!v[1]){v[1]=v[0]};if(!HBR.u[g.uid][g.bid][v[1]]){HBR.u[g.uid][g.bid][v[1]]=''};g.ef.find('.'+v[0]).text(HBR.u[g.uid][g.bid][v[1]]);
                })
                g.ef.find('.link').attr('href',HBR.u[g.uid][g.bid].url).text(HBR.u[g.uid][g.bid].url);
                g.ef.find('.host').text(HBR.u[g.uid][g.bid].browser.host);
                g.ef.find('.last_visit').text($.CloudChat.base.init('t',HBR.u[g.uid][g.bid].time));
                if(g.geo){
                    if(g.ee.find('.flag').length===0){g.ee.append('<div><i class="flag flag-'+g.geo.flag+'"></i></div>')}
                    g.src='http://www.google.com/maps/place/'+g.geo.latitude+','+g.geo.longitude;
                    g.ef.find('.map_link').attr('href',g.src);
                    $.each(g.geo,function(n,v){
                        g.ee=g.ef.find('.'+n)
                        if(g.ee.length===1){g.ee.text(v)}
                    })
                }else{
//                    cx({f:'a',ff:'g',fff:'g',ip:HBR.u[g.uid][g.bid].ip,bid:g.bid,uid:g.uid})
                }
            }
        break;
<?php } ?>
<?php if($_SESSION['lv']!=="0"&&sudo()===true){ ?>
        case'stats':
    g.std=$('#stat_dates'),g.stds=moment(g.std.find('.start').val(),'YYYY-MM-DD'),g.stde=moment(g.std.find('.end').val(),'YYYY-MM-DD'),g.rt={rank_A:0,rank_F:0,rc:[]},g.visitors={datu:{},dat:0,data:{},d:[],chc:{},chco:[],chatu:{}},g.rt.crumbs={nodes:[],links:[],pre:[]};
    $.each(g.chats,function(n,v){
        v.user=JSON.parse(v.user);
        v.tim=moment(v.end).format('YYYY-MM-DD');
        if(!g.visitors.chc[v.tim]){g.visitors.chc[v.tim]={a:0,b:0}}
        ++g.visitors.chc[v.tim].a;
        if(!g.visitors.chatu[v.id]){g.visitors.chatu[v.id]={};++g.visitors.chc[v.tim].b}
    })
    g.rate_default={rule:{"hpwoo":{"t":"1"},"aor":{"t":"1"},"hwyqa":{"t":"1"},"all_qs":{"t":"3","o":[{"t":"Yes","v":"5"},{"t":"No","v":"0"},{"t":"Sometimes","v":"3"}]}}};
    $.each(g.rates,function(n,v){
        v.tim=moment(v.time).format('YYYY-MM-DD');v.arr={a:0,b:0,c:0,y:v.tim};
        v.rate=JSON.parse(v.rate);
        if(v.user){try{v.user=JSON.parse(v.user);}catch(er){v.user=d.rate_default}}else{v.user=d.rate_default};
        $.each(v.rate,function(m,b){
            if(!v.user.rule[m]){return}
            ++v.arr.b;
            switch(v.user.rule[m].t){
                case "1":
                    v.arr.a+=parseInt(b);v.arr.c+=5;
                break;
                case "2":
                    if(b!==''){v.arr.a=parseInt(v.user.rule[m].v)}else{v.arr.a+=0};v.arr.c+=parseInt(v.user.rule[m].v);
                break;
                case "3":case "4":
                    v.user.rule[m].o=v.user.rule[m].o.sort(function(obj1,obj2){return obj1.v - obj2.v;});
                    if(v.user.rule[m].t==='3'){
                        v.arr.c+=parseInt(v.user.rule[m].o[v.user.rule[m].o.length-1].v);v.arr.a+=parseInt(b);
                    }else{
                        $.each(b,function(y,h){h=parseInt(h);v.arr.a+=h;});
                        $.each(v.user.rule[m].o,function(y,h){v.arr.c+=parseInt(h.v)})
                    }
                break;
            }
        });
        g.rt.rc.push(v.arr);
        if(v.arr.a>(v.arr.c*0.85)){++g.rt.rank_A}
        if(v.arr.a<(v.arr.c*0.5)){++g.rt.rank_F}
    });
//regular crumb vars
g.crumbs_visits=0;
g.crumbs_numof_visits={};
g.crumbs_numof_visits_ondate={};
g.crumbs_unique_visitors={};
g.crumbs_visitor_frequency=[];
//count crumbs
g.footprints={};

$.each(g.crumbs,function(n,v){
    //
    
    //
    v.brd=JSON.parse(v.brd);g.crumbs_unique_visitors[v.id]=0;
    $.each(v.brd,function(m,b){
        b.date=moment(b.time).format('YYYY-MM-DD');
        if(!g.crumbs_numof_visits[b.date]){g.crumbs_numof_visits[b.date]=0};
        if(!g.crumbs_numof_visits_ondate[b.date]){g.crumbs_numof_visits_ondate[b.date]={}};
        if(!g.crumbs_numof_visits_ondate[b.date][v.id]){g.crumbs_numof_visits_ondate[b.date][v.id]=0};
        ++g.crumbs_unique_visitors[v.id];
        ++g.crumbs_numof_visits[b.date];
        ++g.crumbs_numof_visits_ondate[b.date][v.id];
        ++g.crumbs_visits;
        //footprint
        if(!g.footprints[b.date]){g.footprints[b.date]={}}
        if(!g.footprints[b.date][b.href]){g.footprints[b.date][b.href]={count:1,from:{}}}
        if(b.referrer&&b.referrer!==''&&!g.footprints[b.date][b.href].from[b.referrer]){g.footprints[b.date][b.href].from[b.referrer]={count:1}}
        ++g.footprints[b.date][b.href].count;
        if(g.footprints[b.date][b.href].from[b.referrer]){++g.footprints[b.date][b.href].from[b.referrer].count;}
        
//        if(){}
    });
});
g.crumbs_unique_visitors=Object.keys(g.crumbs_unique_visitors).length;
$.each(g.crumbs_numof_visits_ondate,function(n,v){//process crumbs for chart
    g.crumbs_visitor_frequency.push({y:n,a:g.crumbs_numof_visits[n],b:Object.keys(v).length});
});
$.each(g.visitors.chc,function(n,v){
    g.visitors.chco.push({b:v.b,a:v.a,y:n})
})
//missed chats
g.missed_chats={};
g.missed_chat=0;
g.missed_chats_chart=[];
$.each(g.miss,function(n,v){
    v.date=moment(v.start).format('YYYY-MM-DD');
    if(!g.missed_chats[v.date]){g.missed_chats[v.date]=0}
    ++g.missed_chats[v.date];
    ++g.missed_chat;
});
$.each(g.missed_chats,function(n,v){
    g.missed_chats_chart.push({y:n,a:v});
});
    g.empty='<span class="super-center">No data to display</span>';
    $('.morris_chart').empty();g.o=Op().stat_draw;
    if(!g.o){g.o=Op('stat_draw',{chat:'Bar',rate:'Donut',visitor:'Bar'}).stat_draw}
if(g.crumbs_visitor_frequency.length>0){Morris.Bar({element:'stat_visitor_line',data:g.crumbs_visitor_frequency,resize:true,xkey:'y',ykeys:['a','b'],labels:['Footprints','Visitors']});}else{$('#stat_visitor_line').html(g.empty)}
if(g.visitors.chco.length>0){Morris[g.o.chat]({element:'stat_chat_line',data:g.visitors.chco,resize:true,xkey:'y',ykeys:['a','b'],labels:['Chats','Visitors']});}else{$('#stat_chat_line').html(g.empty)}
if(g.rt.rc.length>0){Morris.Bar({element:'stat_rate_line',data:g.rt.rc,resize:true,xkey:'y',ykeys:['a','c','b'],labels:['Score','Out of','Ratings']});}else{$('#stat_rate_line').html(g.empty)}
if(g.missed_chats_chart.length>0){Morris.Line({element:'stat_missed_line',data:g.missed_chats_chart,resize:true,xkey:'y',ykeys:['a'],labels:['Missed']});}else{$('#stat_missed_line').html(g.empty)}
    $('.morris_chart').trigger('resize');
    
    $('.count_stat_ratings').text(Object.keys(g.rates).length)
    $('.count_stat_A_rank').text(g.rt.rank_A)
    $('.count_stat_F_rank').text(g.rt.rank_F)
    $('.count_missed_chats').text(g.missed_chat)
    //$('.count_stat_messages').text(g.co_mesg)
    $('.count_stat_chats').text(Object.keys(g.chats).length)
    $('.count_stat_unique_visitors').text(g.crumbs_unique_visitors);
    $('.count_stat_visits').text(g.crumbs_visits);
        break;
<?php } ?>
        case'snd_':
            g.e=$('#WIN_WTC [chat]:visible .messagebar');
            g.i=g.e.find('textarea');g.t=g.i.val();g.i.val(g.t+' '+g.d);
            if(g.a=='s'){g.e.find('[send]').click();g.i.val(g.t)}
        break;
        case'settings':
            switch(g.sw){
                case's':
                    g.ws=g.ws.toString();
                    if(!g.ws||HBR.time['unmtab_'+g.ws]){return}
                    g.btn=$('#AccountModal .confirmaction').prop('disabled',true);
                    setTimeout(function(){g.btn.prop('disabled',false)},2500)
                    switch(g.ws){
                        case"10":
                            g.s=[];
                            $('#chatbot_responses tbody tr').each(function(n,v){
                                n=$(this);v={};v.keys=n.find('.keys').val().split(','),v.responses=n.find('.responses').val().split(','),g.s.push(v);
                            })
                            $.ChatBot.resp.mine=g.s;localStorage.setItem('ChatBot_resp_mine',JSON.stringify(g.s));g.url=$('#chatbot_url').val(),g.po=$('#chatbot_post').val();
                            if(g.url.trim()!==''&&g.po.trim()!==''){$.ChatBot.search={url:g.url,post:g.po};localStorage.setItem('ChatBot_search',JSON.stringify($.ChatBot.search))}else{localStorage.removeItem('ChatBot_search')};return;
                        break;
                        case"9":
                            g.a={};
                            g.a.firebase=$('#firebase_storage').serializeObject();
                            cx({f:'a',ff:'s',fff:'f',ws:'app',s:g.a})
                            console.log(g.a)
                            return;
                        break;
                        case"0":
                            $.ProfileEdit.e.submit();return;
                        break;
                        case"8":
                            $.ChaMa.f.submit();return;
                        break;
                        case"7":
                            $.AutTa.f.submit();return;
                        break;
                        case"6":
                            $.RateC.f.submit();return;
                        break;
                        case"5":
                            g.t=$('#trusted_domains').val().replace(/ /g,'');
                            cx({f:'a',ff:'s',fff:'f',ws:5,idx:'trusted',s:g.t});return;
                        break;
                        case"2":
                            g.s=$('#files_usr').serializeObject();$user.ops=g.s;
                            cx({f:'a',ff:'s',fff:'f',ws:2,s:JSON.stringify(g.s),gid:gid(5)});return;
                        break;
                        case"3":
                            g.t={};
                            $('#AccountModal [unmtab="3"] [tb] tr .key').each(function(n,v,e){
                                e={e:$(this)};e.p=e.e.parents('tr'),e.k=e.e.text(),e.v=e.p.find('.value').text();
                                if(e.k.length===0||e.v.length===0){return;};g.t[e.k]=e.v;
                            });
                            cx({f:'a',ff:'s',fff:'f',sc:gid(5),ws:g.ws,s:JSON.stringify(g.t)});
                        break;
                        case"1":
                            g.t=$('#modal_subaccounts_tb').tableToJSON();
                            $.each(g.t,function(n,v){$.each(v,function(m,b){if(b==='Empty'){g.t[n][m]=''}})})
                            if(!$user.det.subs||!(typeof $user.det.subs=='object')){$user.det.subs={}}
                            $.each(g.t,function(n,v){
                                if(g.st===1){return false;}
                                if(isNaN(v.Id)===false){g.st=1;};if(v.Password===''){g.st=1;};
                                if(!$user.det.subs[v.Id]){$user.det.subs[v.Id]={};}
                                $.each(v,function(m,b){
                                    if(m===''){return false;}
                                    if(v==='Empty'){v='';}
                                    $user.det.subs[v.Id][m]=b;
                                });
                            });
                            g.ar={};$.each($user.det.subs,function(n,v){if(v){g.ar[n]=v;}});$user.det.subs=g.ar;//clean out nulls
                            if(g.st===1){
                                console.log('ID CANNOT BE REGULAR NUMBER, OR VALUES INVALID')
                                return false;
                            }
                            cx({f:'a',ff:'s',fff:'f',sc:gid(5),ws:g.ws,s:JSON.stringify($user.det.subs)});
                        break;
                        default:
                            g.t=$('#AccountModal [unmtab="'+g.ws+'"] [tb]').tableToJSON();
                            if(g.ws=="4"){$user.det.depts=g.t;HBR.init('depd');pm('otb',{ao:HBR.ao,uid:$user.ke},1)}
                            $.each(g.t,function(n,v){$.each(v,function(m,b){if(m.length<1||b==='Empty'){delete(g.t[n][m])}})})
                            cx({f:'a',ff:'s',fff:'f',sc:gid(5),ws:g.ws,s:JSON.stringify(g.t)});
                        break;
                    }
                break;
                case't':
                    switch(g.ws){
                            case 1:case 4:
                                g={e:$('[unmtab="'+g.ws+'"] [tb]')};
                                g.e.find('.txt').editable();
                                g.e.find('.sel1').editable({
                                    source:[
                                          {value: 1, text: 'Agent'},
                                          {value: 2, text: 'Operator'},
                                          {value: 3, text: 'Superuser'}
                                       ]
                                });
                            break;
                            case 3:case 'api':
                                $('#modal_canned_tb').find('.txt').editable();
                            break;
                        }
                 break;
            }
        break;
        case'win_t':
            HBR.u[g.uid][g.bid].open=g.o
            g.ee=$('[CHAT="'+g.bid+'"][uid="'+g.uid+'"] .win_t[wt="'+g.tw+'"]')
            if(g.ee.length>0){g.x=['Close','Open']
                switch(g.o){
                    case 1:
                        g.c=g.x[0],g.r='removeClass'
                    break;
                    case"0":
                        g.c=g.x[1],g.r='addClass'
                    break;
                }
                if(g.c===g.x[0]){g.x=g.x[1]+'e'}else{g.x=g.x[0]}
                g.ee.attr('title','User Window is '+g.x+'d')
                g.ee.find('.fa')[g.r]('fa-rotate-180')
                g.ee.find('span').text(g.c);delete(g.c)
            }
        break;
        case'c_f':
        g.e=$('[CHAT="'+g.b+'"][uid="'+g.u+'"]');
        $('.wtc-content [CHAT]:not(.panel):visible').attr('focus','0').addClass('fadeOut').removeClass('fadeIn');
        $('[ctb="'+g.b+'"][uid="'+g.u+'"] .badge').empty();
        return g.e.not('.panel').attr('focus','1').addClass('fadeIn').removeClass('fadeOut');
        break;
        case'pn':
            if(g.uid){g.u=g.uid}
            if(g.bid){g.b=g.bid}
            if(Op().pnotify===1){
            if((g instanceof Object)===false){
                switch(g){
                    case'nmu':
                        g={title:'Operator Limit',text:'Sorry, due to account limits on <b>'+g.pnotm+'</b> this session will not be allowed to chat for them. You can hide this notice in your settings.',type:'error'}
                        if(g.pnotm===$user.name){g.text='Sorry, due to account limits this session will not be allowed to chat for <b>Your Account</b>. Do you want to see a list of connected users and boot someone?<br><button class=\'btn btn-ghost btn-primary pull-right\'>Yes</button>';g.after_init= function(notice){notice.elem.on('click','button',function(){$('[lwin="s"]').first().click()})}}
                    break;
                    case'lg':
                        switch(g.pnotm){
                            case 1:
                                tm(12,d,1);g.pnotm="Shared with Operator";
                            break;
                            case 0:
                                $('[rshto="'+d.u+'"]').remove();g.pnotm="Unsared with Operator";
                            break;
                        }
                        g={title:'Looks Good',text:g.pnotm,type:'success'}
                    break;
                    case'ncm':
                        g={title:'No Changes Made',text:g.pnotm,type:'notice'}
                    break;
                    case'wgp':
                        switch(g.pnotm){
                            case 0:
                                g.type='error';
                                g.pnotm='This user is <b>no longer</b> online. Your message was not recorded.';d.e=$('[CHAT="'+d.b+'"][uid="'+d.u+'"] .msg_').children().last();d.e.find('.unm-bubble').addClass('bg-danger');d.e.find('.livestamp').livestamp('destroy').text('Not Delivered');
                            break;
                        }
                        g={title:'We\'ve got a problem',text:g.pnotm,type:'notice'}
                    break;
                    case'ust':$user.submit=0;
                        g={title:'Settings Saved',text: '<b>'+$user.name+'</b> your settings have been saved.',type: 'success'}
                    break;
                    case'onf':
                        g={title:"Operator Not Found",text:"This user does not exist. Email address may be invalid or not registered.",type: 'error'}
                    break;
                    case'css':
                        g={title:"Not with yourself",text:"You can't share with yourself. Sorry.",type: 'error'}
                    break;
                    case'usf':
                        g={title: 'Settings Not Saved',text: g.pnotm,type: 'error'}
                    break;
                }
            }
            if(Op().pnoted===1){g.desktop={desktop: true}}else{g.desktop={desktop: false}}
            if(g.type==='danger'){g.animate={animate: true,in_class: animate_in,out_class: animate_out}}
            g.go=new PNotify(g);
                if(!g.c){
                    return g.go;
                }else{
                    if((g.c.sender.indexOf('ADMIN')>-1)==false){
                        return g.go.get().attr('pno',g.c.rid).attr('uid',g.c.uid).click(function(){this.remove();HBR.init('cw',g.c)});
                    }
                }
            }
        break;
        case'chs':
            $('[chs]').removeClass('active')
            g.e='[chsi="'+g.b+'"][uid="'+g.u+'"][time="'+g.t+'"]';$('[chsi]').attr('focus',"0")
            if($(g.e).length===0){
                $('#ChatHistory .history_chats').append('<div chsi="'+g.b+'" chsw="'+g.b+'" uid="'+g.u+'" time="'+g.t+'" focus="1"><div class="ldr_"></div><ul class="list-group list-group-lg no-bg msg_"></ul></div>')
                $('#ChatHistory .history_crumbs').append('<div chsi="'+g.b+'" chsb="'+g.b+'" uid="'+g.u+'" time="'+g.t+'" focus="1"><div class="ldr_"></div><ul class="list-group list-group-lg no-bg brd_"></ul></div>')
                $.get('/g/c/'+g.u+'/'+g.b+'/'+g.t+'?l',function(d){
                    try{d=JSON.parse(d);
                    console.log(d)
                    $.each(d.chat,function(n,v){try{pm(1,JSON.parse(v.history),g.e+' .msg_')}catch(er){console.log(er)}})
                    $.each(d.crumbs,function(n,v){try{pm(6,JSON.parse(v.brd),g.e+' .brd_')}catch(er){console.log(er)}})
                    }catch(er){console.log(er)}
                    $(g.e+' .ldr_').fadeOut()
                })
            }else{
                $(g.e).attr('focus',"1")
                $('[chsb="'+g.b+'"][uid="'+g.u+'"][time="'+g.t+'"]').attr('focus',"1")
            }
            $('[chs="'+g.b+'"][uid="'+g.u+'"][time="'+g.t+'"]').addClass('active')
        break;
        case 'cw':
            if(!g.u){g.u=g.uid}
            if(!g.b){g.b=g.bid}
            HBR.u[g.uid][g.bid].deptr=1;
            $('[pno="'+g.b+'"][uid="'+g.u+'"]').remove()
            g.ee=$('[CHAT="'+g.b+'"][uid="'+g.u+'"]');
            g.ar={bid:g.b,uid:g.u};
            if(HBR.u[g.u][g.b]){g.na=HBR.u[g.u][g.b].name}
            if(!g.na){g.na=HBR.u[g.u][g.b].ip};g.ar.n=g.na
            g.ff=$('[uid="'+g.u+'"][ctb="'+g.b+'"]')
            if(g.ee.length===0){
                tm(11,g.ar);$('[uid="'+g.u+'"][bid="'+g.b+'"]').addClass('tab_open')
                $('#WIN_WTC .wtc-content').append(tm(15,g));
                if($.FireBs){$.FireBs.drawFiles(['',g.u,g.b]);}
                $('[uid="'+g.u+'"][ctb="'+g.b+'"]').click();
                HBR.init(1,g.ar);
                if(Op().anote===1&&Op().status===1){
                    cx({f:'a',ff:'cj',cj:$user.name,bid:g.b,uid:g.u})
                }
                g.ar=[];
                $.each($.extend({},HBR.can.a,HBR.can.default),function(n,v){g.ar.push(v)})
          HBR.init('edit',{e:$('[CHAT="'+g.b+'"][uid="'+g.u+'"] .messagebar textarea').autocomplete({
                  source:g.ar,position: { my : "left bottom", at: "left top", collision: "none"},
                  select: function(value, data){
                      var s = ""
                      if (typeof data == "undefined") {
                        s = value;
                      }else {
                        s = data.item.value;
                      }
                      if (s.length > 30) { s = s.substring(0,30) + "..."; }
                  }
            }).autoResize({fn:function(sz,ss){
              ss='[CHAT="'+g.b+'"][uid="'+g.u+'"]';
              $(ss+' .messagebar').css('height',26+24*sz)
              $(ss+' .msg_').css('height','calc(100% - '+(26+24*sz)+'px)')
          }}).parents('[CHAT]').find('.geo .name,.geo .email')})
            }else{
                g.ff.click()
            }
        break;
        case'ed':
            g={g:g,d:undefined};if (g.g.indexOf("://") > -1) {
                g.d = g.g.split('/')[2];
            }
            else {
                g.d = g.g.split('/')[0];
            }
            g.d = g.d.split(':')[0];
            return g.d;
        break;
        case'pp':
            if($user.pp){
                g.e=$('#operator_ul .my_avatar');g.e.find('.img').css('background-image','url('+$user.pp+')')
            }
        break;
        case'rt':
            f={score:0};
            $.each(g,function(n,v){if(isNaN(parseInt(v))===false){
                f.score+=parseInt(v)
            }})
            return f;
        break;
        case'mt':
            g.ee=$('[TOGGLE="'+g.e+'"]'),g.a=g.ee.find('.fa')
            if(g.t){g.t=g.t.split(' ')};
            if(Op()[g.e]!=1){
                g.c='addClass';g.n=1;
            }else{
                g.c='removeClass';g.n=0;
            }
            if(g.t){g.a.attr('class','fa '+g.t[g.n])}
            if(g.e=='fulls'){
                g.z=$('#page');
                if(Op()[g.e]==1){g.z.addClass('full_screen')}else{g.z.removeClass('full_screen')}
            }else{
                g.a[g.c]('active');
            }
            if(g.ee.hasClass('btn')){g.ee[g.c]('btn-danger active')}
        break;
        case'fi':
            g.s=$('#files_usr').serializeObject();
            $.each(g.s,function(n,v){
                if($user.ops[n]){g.n=$user.ops[n]}else{g.n='';};g.e=$('#files_usr [name="'+n+'"]');g.ar={};
                switch(true){
                    case(n.indexOf('_shade')>-1):
                        g.e.minicolors({format:'rgb',opacity:true});
                    break;
                    case(n.indexOf('_text')>-1):
                        g.e.minicolors(g.ar);
                    break;
                }
                    if(g.n){
                        v=g.n;
                        switch(true){
                            case(n.indexOf('_text')>-1):case(n.indexOf('_shade')>-1):
                                if(!g.n){g.n=''}
                                g.e.minicolors('value',g.n);
                            break;
                            case(g.e.is('[type="text"]')):
                                g.e.val(v)
                            break;
                            case(g.e.is('textarea')):
                                g.e.text(v)
                            break;
                            case(g.e.is('[type="radio"]')):
                                g.e=$('#files_usr [name="'+n+'"][value="'+v+'"]');
                                g.e.prop('checked',true);
                            break;
                            case(g.e.is('select')):
                                g.e.find('[value="'+v+'"]').prop('selected',true)
                            break;
                        }
                    }
            })
            setTimeout(function(){$('#files_usr .sett-block .pic,#files_usr .unm-bubble_colors input:first,#files_usr .launcher_colors input:first').change()},2000);
        break;
        case'fl':
g.WTC=$('#WIN_WTC'),g.WTCm=$('[bid="'+g.bid+'"][uid="'+g.uid+'"],[ctb="'+g.bid+'"][uid="'+g.uid+'"]'),g.CHAT=$('[CHAT="'+g.bid+'"][uid="'+g.uid+'"]'),g.CF=g.CHAT.attr('focus');
            g.p=HBR.p['CHAT_'+g.uid+'_'+g.bid]
            if(!g.p||(g.p&&g.p.HBR.ws===0)){
                if(g.CHAT.length===0){
                    SND(1,1)
                    if(Op().audio0===1&&g.c!==1){
                        if(SND(2)){
                            SND('',1,'[CHAT="'+g.bid+'"][uid="'+g.uid+'"]')
                        }
                    }
                }else{
                    if(g.CHAT.attr('sound')==1){
                    SND(1,1)
                        if(g.CF==0 &&g.c!==1){
                            if(SND(2)){
                                SND('',1,'[CHAT="'+g.bid+'"][uid="'+g.uid+'"]')
                            }
                        }
                    }
                }
                if(Op().flash===1&&g.CHAT.attr('flash')!==0){
                    if(g.CF!==1){
                        g.WTCm.addClass('fI_bg fI_bg_a');
                    }
                }
            }
        break;
    }
}
///**********************************Chat Bot********************************//
    $.ChatBot={resp:{mine:JSON.parse(localStorage.getItem('ChatBot_resp_mine'))},search:JSON.parse(localStorage.getItem('ChatBot_search')),i:$('#chatbot-input'),bot:{slack:0,main:0}};
    $.ChatBot.chs=function(g){
        return g[Math.floor(Math.random() * g.length)];
    };
    if(!$.ChatBot.resp.mine){
        $.ChatBot.resp.mine=[// 'keys' and 'responses' must be an array of value(s).
            {keys:['hello','hi','sup'],responses:['Hello! I am not here right now. My computer will do their best to help in my place :)','Greetings!']},
            {keys:['address','availability','get service','internet'],responses:['You can search your address here : https://unmetered.review :)']},
            {keys:['knowledgebase','support pages'],responses:['Maybe this can help https://unmetered.io/knowledgebase .']},
            {keys:['thanks'],responses:['You\'re Welcome!','No problem :)']},
            {keys:['bye','take care','cheerio'],responses:['Good bye!']},
        ];
    }
    $.ChatBot.resp.blank=[
        'Sorry. This bot doesn\'t understand. Try typing "help" to see available search options.',
    ];
    $.ChatBot.proc=function(m,e) {
        if(!e){e={}};//an array for variables so i dont have to use ugly 'var'
        e.in=function(f){return m.toLowerCase().indexOf(f)>-1;};e.tmp=[];//search function and init text array
        $.each($.ChatBot.resp.mine,function(n,v){v.st=0;//for each check 'resp.mine'
            $.each(v.keys,function(m,b){
                if(e.in(b)){v.st=1;}//found a key in string, set switch
            })
            if(v.st===1){e.tmp.push($.ChatBot.chs(v.responses));}//switch is set, input some text
        })
        e.tmp=e.tmp.join(' ');//join the array into a paragraph
        if(e.tmp===''){
            if($.ChatBot.search){
                $.post($.ChatBot.search.url,{[$.ChatBot.search.post]:m},function(d){
                    try{d=JSON.parse(d);if(Object.keys(d).length>0){e.tmp+='Sorry I didn\'t understand. I did a quick search and found these articles. <ul class="unm-kb-list">'
                    $.each(d,function(n,v){e.tmp+='<li>'+v.text+'<br>'+v.href+'</li>';})
                    e.tmp+='</ul>';}else{e.tmp+=$.ChatBot.chs($.ChatBot.resp.blank);}}catch(er){console.log(er)}
                    if(e.fn){e.fn(e.tmp)}
                })
            }else{
                e.tmp+=$.ChatBot.chs($.ChatBot.resp.blank);
                if(e.fn){e.fn(e.tmp)}
            }
        }
        return e.tmp;
    }
    $.ChatBot.init=function(x,v,z,k){
        if(!v){v={}};var tmp='';
        switch(x){
            case 1:
                $.ChatBot.pm(1);
                if($.ChatBot.search){
                    $('#chatbot_url').val($.ChatBot.search.url)
                    $('#chatbot_post').val($.ChatBot.search.post)
                }
            break;
        }
    }
    $.ChatBot.pm=function(x,v,z,k){
        if(!v){v={}};var tmp='';
        switch(x){
            case 1:
                $.each($.ChatBot.resp.mine,function(m,b){
                    tmp+=$.ChatBot.tm(1,b)
                })
                $('#chatbot_responses tbody').html(tmp)
            break;
        }
    }
    $.ChatBot.tm=function(x,v,z,k){
        if(!v){v={}};var tmp='';
        switch(x){
            case 1:
                if(!v.keys){v.keys=''};if(!v.responses){v.responses=''}
                 tmp+='<tr><td style="width:50px;" class="text-center"><a class="btn btn-ghost btn-primary btn-xs" tbfn="mvup"><i class="fa fa-angle-double-up"></i></a><a class="btn btn-ghost btn-primary btn-xs" tbfn="mvdn"><i class="fa fa-angle-double-down"></i></a></td><td><textarea style="font-size:1.5em;" class="keys form-control">'+v.keys+'</textarea></td><td><textarea style="font-size:1.5em;" class="responses form-control">'+v.responses+'</textarea></td><td style="width:50px;" class="del"><a class="btn btn-ghost btn-danger btn-xs" tbfn="rmr"><i class="fa fa-trash-o"></i></a></td></tr>';
            break;
        }
        return tmp;
    }
<?php if(intval($_SESSION['lv'])>0&&isset($_SESSION['ids']['slack'])){ ?>
///**********************************Slack***********************************//
    //slack start
    $.Slack={selected:'',api:'https://slack.com/api/'};
    $.Slack.get=function(r){r={};$.each($user.ids,function(n,v){if(n.indexOf('slack')>-1){n=n.replace('slack','');r[n]=v;}});return r;};
    $.Slack.obj=function(o,oo){if(!oo){oo={}};if(oo.slack){oo.token=oo.slack;}else{oo.token=$.Slack.selected;};o.token=$user.ids['slack'+oo.token].access_token;return o;};
    $.Slack.init=function(x,v,z,k){
        if(!v&&v!==''){v={}}
        switch(x){
            case'status'://start slack socket
                v.a={};
                switch(v.f){
                    case 0:
                        v.t='away';v.a.presence=v.t;
                    break;
                    default:
                        v.t='active';v.a.presence='auto';if(Op().status!==1){return false;}
                    break;
                }
                if($.Slack){
                $.each($.Slack.get(),function(n,b){
                    if(n===0){n='';}
                    if($.Slack['self'+n]&&$.Slack['self'+n].manual_presence!==v.t){
                        $.post($.Slack.api+'users.setPresence',$.Slack.obj(v.a,{slack:n}),function(d){
                            $.Slack['self'+n].manual_presence=v.t;
                            //console.log('Slack Presence: '+v.a.presence)
                        })
                    }
                })
                }
            break;
            case 0://start slack socket
            $.each(['ims','ch','save'],function(n,b){
                $.Slack[b+v]={};
                switch(b){
                case'save':case'save'+v:
                        $.Slack[b+v].new_uncap=0;
                    break;
                }
            })
            $.post($.Slack.api+'rtm.start',$.Slack.obj({},{slack:v}),function(d){
                console.log('Slack RTM :',d);
                if(d.ok===true){
                    $.Slack['self'+v]=d.self,$.Slack['team'+v]=d.team.id;
                    $.Slack.pm(1,d.users,1,v)
                    $.each(d.ims,function(n,b){
                        $.Slack['ims'+v][b.user]=b.id;
                    });
                    $.Slack.select_channel=$.Slack['ims'+v][$.Slack['self'+v].id];
                    $.Slack['ws'+v]=new WebSocket(d.url);
                    $.Slack['ws'+v].onmessage = function(d){
                       d=JSON.parse(d.data);
                        switch(d.type){
                            case"presence_change":case"manual_presence_change":
                                if(d.type==='manual_presence_change'){d.user=$.Slack['self'+v].id;}
                                if(d.user===$.Slack['self'+v].id){$.Slack['self'+v].manual_presence=d.presence;}
                                switch(d.presence){
                                    case'active':
                                        d.otb=1;
                                    break;
                                    default:
                                        d.otb=0;
                                    break;
                                }
                                $.Slack['u'+v][d.user].presence=d.presence;
                                d.e=$('[slack_otb="'+d.user+'"]').attr('status',d.otb)
                            break;
                            case"channel_joined":
                                $.Slack['ch'+v][d.channel.id]=d.channel;
                                $.Slack.tm(3,d.channel,d.team.id,v);
                            break;
                            case"team_join":
                                $.Slack['u'+v][d.user.id]=d.user;
                                $.Slack.tm(1,d.user,1,v)
                            break;
                            case"message":
                                if(d.subtype){
                                    switch(d.subtype){
                                        case'message_changed':
                                            $('[CHAT="'+d.channel+'"] [ts="'+d.message.ts+'"]').addClass('edited').find('.unm-bubble>small').text(d.message.text);
                                        break;
                                        case'message_deleted':
                                            $('[CHAT="'+d.channel+'"] [ts="'+d.deleted_ts+'"]').remove();
                                        break;
                                    }
                                }
                                if(d.text){
                                    d.ee='[CHAT="'+d.channel+'"][uid="'+d.team+'"]';
                                    if($(d.ee).length===1){
                                        d.m={x:1,d:d.text,uid:d.team,slack:d,ts:d.ts,time:moment(d.ts.split('.')[0]*1000).format('YYYY-MM-DD HH:mm:ss'),name:v.username,slack_selected:$(d.ee).attr('slack_selected')};
                                        if($.Slack['self'+v].id!==d.user){d.m.fr=1}
                                        tm(1,d.m,d.ee+' .msg_',1);
                                    }else{
                                        $('[slack_gch="'+d.channel+'"][uid="'+d.team+'"],[slack_otb="'+d.user+'"][uid="'+d.team+'"]').addClass('fI_bg')
                                    }
                                }
        //                                else{
        //                                    new PNotify({});
        //                                }
                            break;
                            case"hello":case"reconnect_url":return;break;
                        }
                        console.log('Slack :',d);
                    }
                    $.Slack.pm(3,d.channels,d.team.id,v);
                }
            }).done(function(){
                $.Slack.init('status');
            })
            break;
            case 1://contructive message
                v.icon_url=placeholder.getData(HBR.plcimg($user.name.charAt(0)));v.channel=$.Slack.select_channel;
                if($.Slack['save'+z.slack].new_uncap){
                    $.post($.Slack.api+'chat.postMessage',$.Slack.obj(v,{slack:z.slack}),function(d){
                        console.log('Slack.postMessage :',d)
                    })
//                $.Slack.cx(v,{slack:z.slack});
                }
            break;
        }
    }
    $.Slack.pm=function(x,v,z,k){
        var tmp='';if(!v){v={}}
        switch(x){
            case 0://Load multiple unm-bubbles
                if(v.length>0){
                $.each(v,function(n,b){
                    b.u=$.Slack['u'+k][b.user];b.m={x:1,d:b.text,uid:b.team,slack:b,name:b.username,ts:b.ts,slack_selected:k};
                    if($.Slack['self'+k].id!==b.user){b.m.fr=1};
                    tmp+=tm(1,b.m,z,0)
                })
                }
                $(z).append(tmp).animate({scrollTop:$(z).prop("scrollHeight")},500)
                $.CloudChat.base.init('ls')
            break;
            case 1://users
                $.Slack['u'+k]={};
                if(z){$('#live_slackers table [slack_selected="'+k+'"]').remove()}
                $.each(v,function(n,b){
                    if(b.real_name===''){b.real_name=b.profile.email;}
                    $.Slack['u'+k][b.id]=b;
                    tmp+=$.Slack.tm(1,b,z,k);
                });
            break;
            case 2://draw joined
                $.each(v.members,function(n,b){
                    b=$.Slack['u'+z][b];
                    tmp+=tm(2,{pp:b.profile.image_72,bid:b.id,u:b.team_id,n:b.real_name,peer:'slack'});
                });
                $('[CHAT="'+v.id+'"] .joined_ops').html(tmp);
            break;
            case 3:
                $('.slack_channels_ [slack_selected="'+k+'"]').remove()
                $.each(v,function(n,b){
                    $.Slack.tm(3,b,z,k);
                });
            break;
        }
    }
    $.Slack.cx=function(q,qq){
        try{q=JSON.stringify(q);}catch(er){}
        if(!qq&&qq!==''){
            $.each($.Slack.get(),function(l,u){
                $.Slack['ws'+l].send(q);
            })
        }else{
            $.Slack['ws'+qq].send(q);
        }
    }
    $.Slack.tm=function(x,v,z,k){
        if(!v){v={}};var tmp='';
        switch(x){
            case 1://users
                if(v.presence==='active'){v.otb=1}else{v.otb=0};
                tmp+='<tr class="tab_item animated" status="'+v.otb+'" slack_otb="'+v.id+'" uid="'+v.team_id+'" slack_selected="'+k+'"><td><span class="nom text-ellipsis" title="'+v.id+'">'+v.name+'</span><span class="time_ livestamp" title=""></span><b class="badge bg-danger pull-left"></b></td><td><div class="my_avatar"><div class="img" style="background-image: url('+v.profile.image_32+');"></div></div></td></tr>';
                if(z){$('#live_slackers table').append(tmp);}
            break;
            case 3:
                $.Slack['ch'+k][v.id]=v;
                if(v.is_member===true){
                    $('.slack_channels_').append(tm('ib',{a:'title="#'+v.name+'" slack_gch="'+v.id+'" uid="'+z+'" slack_selected="'+k+'"',n:'#'+v.name,f:' hidden',c:'',s:''}));
                }
            break;
        }
        return tmp;
    }
    //slack end
<?php } ?>
///******************************************************************************//
var HBChat=io.connect('<?=$config['socket']?>'),HBCd=function(){
    if(HBR.loggedIn===true){
    HBR.init(0)
    HBCc()
    }
},HBCc=function(){
    if(HBR.loggedIn===true){
window.addEventListener("beforeunload",function(e) {
    if(Op().aclose===1){
        $.each(HBR.p,function(n,v){
            v.close()
        })
    }
});
    $.CloudChat.Peer.p.on('connection',function(c,d){
        d=c.metadata;
        if(d&&d.f){
            switch(d.f){
                case'fi':
                    if(d.o&&$('[CHAT="'+d.bid+'"][uid="'+d.uid+'"][focus=1]').length===0){$('[otb="'+d.bid+'"][uid="'+d.uid+'"]').click()}
                    d.url=URL.createObjectURL($.CloudChat.b64toBlob(d.d.value));
                    d.fi='<b>File Received : </b>'+d.d.name;
                    if(d.d.type.indexOf('image')>-1){d.fi+='<br><img unmFile="img" src="'+d.url+'">'}
                    d.fi+='<div style="margin-top:10px"></div><a class="btn btn-ghost btn-success" download="'+d.d.name+'" href="'+d.url+'">Download</a>';
                    console.log(d)
                    //tm(1)
                    tm(3,{msg:d.fi,c:'bg-primary',time:moment().format(),bid:d.bid,uid:d.uid},'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .msg_',1);
                $.CloudChat.files(2,d.d);
                $.CloudChat.files(1,d.url,{n:d.d.name,v:{size:d.d.size}});
                break;
            }
        }
    })
    HBChat.on('connect',function(d){
        if(HBR.loggedIn===true&&HBR.loggedInn===false){
            HBR.init(0)
        }
    })
    HBChat.on('disconnect',function(d){
        HBR.loggedInn=false
    })
    HBChat.on('ret',function(d){
        if(d.new){
            new PNotify({addclass:"stack-bar-bottom",cornerclass:"",stack:{"dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0},width:"70%",hide:false,type:'success',title:'New Update',text:'A new version of the dashboard has come out! Reload to update.',confirm:{confirm: true,buttons: [{text: 'Reload',addClass: 'btn btn-white btn-ghost',click: function(notice) {location.reload();}},{text: "Later", addClass: "btn btn-white btn-ghost", click: function(notice){ notice.remove(); notice.get().trigger("pnotify.cancel", notice); }}]},buttons: {closer: false,sticker: false},history: {history: false}})
        }
        if(d.chan){
            $.CloudChat.Channels.c[d.bid]=d.chan;d.tmp='';
            if($('[CHAT="'+d.bid+'"][uid="'+d.uid+'"]').length===0){
                $('.wtc-content').append(tm(15,{u:d.uid,b:d.bid,y:1}));tm(11,{uid:d.uid,bid:d.bid,n:d.bid,y:1});
            }
            $.each(d.chan.j,function(h,j){
                d.tmp+=tm(2,j);
            });
            $('[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .joined_ops').html(d.tmp);
        }
        if(d.chxn){
            $.CloudChat.Channels.chxn(2,d);
        }
        if(d.chxa){
            $.each(d.chxa,function(n,v){
                v.chxn=1;v.$bid=d.bid;v.bid=n;v.uid=d.uid;
                $.CloudChat.Channels.chxn(2,v);
            })
        }
        if(d.chad){
            pm(1,d.chad,'[chat="'+d.bid+'"][uid="'+d.uid+'"] .msg_')
        }
        if(d.kp||(typeof d.kp)==="string"||(typeof d.kp)==="number"){
            d.e=jQuery('[CHAT="'+d.bid+'"][uid="'+d.uid+'"] [opj="'+d.$bid+'"][uid="'+d.$uid+'"]');d.bu=d.e.find('[typing] span')
            if((typeof d.kp)==="string"){d.kpl=d.kp.length}else{d.kpl=d.kp;}
            if(d.kpl<1||d.kp===''){
                d.e.find('.img').removeClass('fI_bo')
                d.bu.empty()
            }else{
                d.bu.text(d.kp)
                d.e.find('.img').addClass('fI_bo')
            }
        }
        if(d.joined){
            if(HBR.u[d.uid]&&HBR.u[d.uid][d.bid]){HBR.u[d.uid][''+d.bid].joined=d.joined;}
            pm(2,d.joined,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .joined_ops');
            d.ee=$('[bid="'+d.bid+'"][uid="'+d.uid+'"]');
            if(Object.keys(d.joined).length>0){d.ee.addClass('taken');SND('',0,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"]');}else{d.ee.removeClass('taken')}
        }
        if(d.pj){
            HBR.u[d.uid][d.bid].cap=d.cap;HBR.u[d.uid][d.bid].pj=d.pj;delete(HBR.u[d.uid][d.bid].timeline);
            d.timeline=$('[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .timeline').empty()[0];
            d.arr=[];
            $.each(d.pj,function(n,v){
                $.each(v,function(m,b){
                    $.each(b.t,function(x,y){
                        d.arr.push({id:gid(5),content:HBR.a[n][m].n+' has joined',start:y,end:b.te[x]})
                    })
                })
            })
            d.items = new vis.DataSet(d.arr);
            d.options = {};
            HBR.u[d.uid][d.bid].timeline = new vis.Timeline(d.timeline,d.items,d.options);
        }
        if(d.poke){
            d=d.poke;
            SND(0,1,'[chat="'+d.bid+'"][uid="'+d.uid+'"]')
            new PNotify({hide:false,icon:'fa fa-hand-o-right',title:'You have been Poked!',text:'A visitor wants to talk to you.'}).get().attr('pno',d.bid).attr('uid',d.uid).click(function(){this.remove();HBR.init('cw',d)});
        }
        if(d.stats){
            HBR.init('stats',d.stats)
        }
        if(d.cj){
            d.u=d.uid,d.b=d.bid;
            d.cj={time:moment().format(),msg:'<b>'+d.cj+'</b> has ',c:'bg-'}
            if(d.x===0){d.cj.msg+='left';d.cj.c+='danger'}else{
                d.cj.msg+='joined';d.cj.c+='success';
            }
            tm(3,d.cj,'[CHAT="'+d.b+'"][uid="'+d.u+'"] .msg_',1)
        }
        if(d.count){
            $.each(d.count,function(n,v){if(v==0){d.count[n]=''}})
            if(d.count.msg){
                $('[lwin="m"] .badge').text(d.count.msg)
            }
        }
        if(d.ao){
            HBR.ao=d.ao;
            pm('otb',d,1),HBR.init('depd');
        }
        if(d.at){
            HBR.ao[d.at.c]=d.at;
            if(d.at.bid!==$user.id){
                if(d.x===1){
                    delete(HBR.ao[d.at.c]);tm('otb',d.at,0);
                }else{
                    tm('otb',d.at,1);
                }
            }
            HBR.init('depd');
        }
        if(d.ca){
            d.e=$('.online_admins_'+d.uid)
            if(d.e.length===0){tm(9,d,'',1)}
            $('.online_admins_'+d.uid).text(d.ca-1)
        }
        if(d.shto){
            pm(12,d.shto)
        }
        if(d.users){
            pm(0,d.users,'',1)
        }
        if(d.pnote){
            HBR.init('pn',d.pnote)
        }
        if(d.geo){
            HBR.u[d.uid][d.bid].geo=d.geo;
            d.geot=tm('geo',{uid:d.uid,bid:d.bid});
            $('[bid="'+d.bid+'"][uid="'+d.uid+'"]').tooltipster('destroy').tooltipster({
                interactive: true,theme: 'tooltipster-unm',
                content: $(d.geot)
            });
            $('[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .geo').html(d.geot);
            d.e=$('[bid="'+d.bid+'"][uid="'+d.uid+'"]')
            if(d.e.find('.icos .flag').length===0){d.e.find('.icos').prepend('<i class="flag flag-'+d.geo.flag+'"></i>')}
        }
        if(d.al){
            HBR.init('fl',{bid:d.bid,uid:d.uid,c:d.al})
        }
        if(d.omsg){
            if($('[win="m"]').length>0){tm(8,d.omsg,'[win="m"] [box="i"]')}
            HBR.init('pn',{title:'New Offline Message',text:d.omsg.msg})
        }
        if(d.msgs){
            HBR.m={};pm(8,d.msgs);
            $('[win="m"] [box="i"] li').first().click()
        }
        if(d.amsg){
            d.amsg.fr=1;d.CHAT='[CHAT="'+d.amsg.bid+'"][uid="'+d.amsg.uid+'"]';d.otb='[otb="'+d.amsg.bid+'"][uid="'+d.amsg.uid+'"]';
            tm('otc',{md:0,b:d.amsg.bid,u:d.amsg.uid});
            d.l=Op(null,null,'OperatorChats_'+$user.ke)[HBR.a[''+d.amsg.uid][''+d.amsg.bid].name+'_'+d.amsg.uid];
            if(!d.l){d.l=[]};d.l.push(d.amsg);
            Op(HBR.a[''+d.amsg.uid][d.amsg.bid].name+'_'+d.amsg.uid,d.l,'OperatorChats_'+$user.ke);
            tm(1,d.amsg,d.CHAT+' .msg_',1);$(d.otb+' .pmsg_').text(d.amsg.d);d.CHAT=$(d.CHAT);
            if(d.CHAT.attr('flash')==1){$('[otb="'+d.amsg.bid+'"]').addClass('fI_bg')}
            if(d.CHAT.attr('focus')!==1&&d.CHAT.attr('sound')==1){SND(1,1)}
        }
        if(d.msg){
            d.msg.fr=1;
            d.CHAT='[CHAT="'+d.msg.rid+'"][uid="'+d.msg.uid+'"]',d.focus=$(d.CHAT).attr('focus'),d.hso=$(d.CHAT).attr('sound'),d.exist=$(d.CHAT).length,d.sl=$(d.CHAT).attr('slack_selected');
            if(d.exist===0){
                switch($.ChatBot.bot.main){
                    case 1:
                        $('[bid="'+d.msg.rid+'"][uid="'+d.msg.uid+'"]').click();
                        tm(1,d.msg,d.CHAT+' .msg_',1);
                    break;
                    default:
                    if(Object.keys(HBR.u[d.msg.uid][d.msg.rid].joined).length===0){
                        d.sound=true;
                        HBR.init('pn',{title:'New Message',type:'notice',text:d.msg.name+' : '+d.msg.d,c:d.msg});
                    }
                    break;
                }
            }else{
                if(d.focus==0){d.sound=true}else{if(d.hso){SND(1,1)}}
                tm(1,d.msg,d.CHAT+' .msg_',1)
            }
            if(d.focus==0){HBR.init(2,{e:'[ctb="'+d.msg.rid+'"][uid="'+d.msg.uid+'"] .badge'})}
            if($.ChatBot.bot.main==1){
                setTimeout(function(){$.ChatBot.proc(d.msg.d,{fn:function(tt){$(d.CHAT).find('textarea').val(tt).parent().find('[send="s"]').click();}});},1000)
            }else{
                if(d.sound===true){HBR.init('fl',d.msg)}
            }
            if($.Slack&&$.Slack['save']&&$.Slack['save'].new_uncap===1){
                $.Slack.init(1,{text:d.msg.name+' *'+d.msg.mail+'* : '+d.msg.d},{slack:''});
            }
        }
        if(d.mhistory){
            if(!HBR.missed[d.uid]){HBR.missed[d.uid]={}}
            if(!HBR.missed[d.uid][d.bid]){HBR.missed[d.uid][d.bid]=HBR.u[d.uid][d.bid];}
            HBR.missed[d.uid][d.bid].history=d.mhistory,HBR.missed[d.uid][d.bid].mtime=d.d[0];d.time=d.d[0];
            $('#manager-missed ul').append(tm('missed',d));
            if(HBR.u[d.uid][d.bid].cap==0&&HBR.u[d.uid][d.bid].chat==1){
                d.cm=$('.count_chat_missed').first();
                d.cm.text(parseInt(d.cm.text())+1);
            }
        }
        if(d.history){
            pm(1,d.history,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .msg_')
        }
        if(d.ulogs){
            pm(16,d.ulogs,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .logs_')
        }
        if(d.ulog){
            tm(16,d.ulog,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .logs_')
        }
        if(d.vid){
            pm(7,d.vid,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] [name="vid"]',{cid:d.cid})
        }
        if(d.brd){
            pm(6,d.brd,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .brd_')
        }
        if(d.script){
            $('#mm-script-drop').html('<script>'+d.script+'<\/script>');
        }
        if(d.settings){
            try{d.s=JSON.parse(d.settings.s);}catch(er){}
            switch(d.settings.ws){
                case 8:
                    $user.det.chans=d.s;$.ChaMa.pm(01);
                break;
                case 6:
                    $user.det.rates=d.s;$.RateC.init();$user.ids.ry=d.settings.sc;
                break;
                case 5:
                    switch(d.s.idx){
                        case'trusted':
                            $user.ids.trusted=d.s;$('#trusted_domains').val(d.s)
                        break;
                    }
                break;
                case 4:
                    $user.det.depts=d.s;$('#modal_departments_tb tbody').empty();pm(14);$user.ids.dp=d.settings.sc;
                break;
                case 3:
                    HBR.can.a=d.s;$('#modal_canned_tb tbody').empty();pm(13);
                break;
                case 1:
                    $user.det.subs=d.s;$('#modal_subaccounts_tb tbody').empty();pm('suba');
                break;
                case 2:
                    $user.ids.sc=d.settings.sc;
                    $.each(d.s,function(n,v){
                        d.e=$('[name="'+n+'"]');d.v=d.e.val();d.e.val(v);
                        if(d.v!==v){d.e.change();}
                    })
                break;
            }
        }
        if(d.hook){//incoming webhook
            if(d.hook.log){}
            if(d.hook.note){HBR.init('pn',d.hook.note)}
        }
        switch(d.f){
            case'cjx':
                $('[CHAT="'+d.bid+'"][uid="'+d.uid+'"],[ctb="'+d.bid+'"][uid="'+d.uid+'"]').remove();
                $('[bid="'+d.bid+'"][uid="'+d.uid+'"]').removeClass('tab_open');$('[ctb]:first').click();
                new PNotify({title:'Limit Reached',text:'Visitor chat session limit Reached. You must close atleast one other session first. Your visitors will still be able to chat.',type:'error'});
            break;
            case'a':
                switch(d.ff){
                    case'e':
                        $('[bid="'+d.bid+'"][uid="'+d.uid+'"]').tooltipster('destroy').tooltipster({interactive: true,theme: 'tooltipster-unm',content: $(tm('geo',{uid:d.uid,bid:d.bid}))})
                        d.e=$('[CHAT="'+d.bid+'"][uid="'+d.uid+'"]');
                        if(d.e.length>0){
                            if(d.form.name){
                                d.e.find('.geo .name,.msgp .name').text(d.form.name)
                                $('[ctb="'+d.bid+'"][uid="'+d.uid+'"] .chrome-tab-title').text(d.form.name)
                                HBR.init('edit',{e:d.e.find('.geo .name')});
                            }
                            if(d.form.mail){
                                d.e.find('.geo .email').text(d.form.mail);
                                HBR.init('edit',{e:d.e.find('.geo .email')})
                            }
                        }
                        if(HBR.u[d.uid]&&HBR.u[d.uid][d.bid]){
                            if(d.form.name){HBR.u[d.uid][d.bid].name=d.form.name}
                            if(d.form.mail){HBR.u[d.uid][d.bid].mail=d.form.mail}
                        }
                    break;
                }
            break;
            case's':
                switch(d.ff){
                    case'r':
                        if(!d.$uid){d.$uid=d.uid;};if(!d.$bid){d.$bid=d.bid;};
                        if(HBR.a[d.$uid]&&HBR.a[d.$uid][d.$bid]){d.pp=HBR.a[d.$uid][d.$bid].pp;}else{d.pp=placeholder.getData(HBR.plcimg('U'));}
                        d.e=$('[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .from-me .bottom_row_text .status');
                        if(d.e.find('[read="'+d.$uid+'_'+d.$bid+'"]').length===0){d.e.append('<div read="'+d.$uid+'_'+d.$bid+'" class="my_avatar avatar-sm"><div class="img" style="background-image: url('+d.pp+');"></div></div>').attr('title','Read at : '+moment().format('DD-MM-YYYY HH:mm:ss'));}
                    break;
                    case 1:
                        if(d.m.length>30){d.mm=d.m.slice(d.m.length-30,d.m.length);}else{d.mm=d.m}
                        $('[CHAT="'+d.bid+'"][uid="'+d.uid+'"] [yid="'+d.$bid+'"] span').attr('title',d.m).text(d.mm+'...');
                    break;
                    case 0:
                        d.ee=$('[CHAT="'+d.bid+'"][uid="'+d.uid+'"]'),d.a=d.ee.attr('focus')
                        if(d.a!=="1"){
                            if(d.m.length>0){
                                $('[bid="'+d.bid+'"][uid="'+d.uid+'"]').addClass('typing')
                            }
                        }
                        if(d.ee.length===1){
                            d.ee=d.ee.find('.msgp');
                            if(d.m.trim()===''){d.ee.hide()}else{d.ee.show()}
                            d.ee.find('.text').text(d.m)
                        }else{
                            //add a notify when typing?
                        }
                    break;
                }
            break;
            case'j':
                switch(d.ff){
                    case'pr':
                        $('[chat="'+d.bid+'"][uid="'+d.uid+'"] .screenshots').prepend('<a winc="scr" class="col-md-6 screenie"><img src="'+d.d+'"></a>').parent().find('.screen_loading').css('width','100%').attr('aria-valuenow','0').parents('[chat]').find('[winc="tscr"]').removeClass('disabled');
                        clearInterval(HBR.u[d.uid][d.bid].Int)
                    break;
                    case'o':d.tw='t';
                        HBR.init('win_t',d)
                    break;
                    case'b':
                        d.time=moment().format(),d.msg='Chat Ended',d.c='bg-danger'
                        tm(3,d,'[CHAT="'+d.bid+'"][uid="'+d.uid+'"] .msg_',1);
                        $('[CHAT="'+d.bid+'"][uid="'+d.uid+'"] [wt="cd"]').hide();
                        $('#live_users [bid="'+d.bid+'"][uid="'+d.uid+'"]').prependTo('#live_visitors tbody');
                        HBR.u[d.uid][d.bid].chat=0;HBR.init('iz');
                    break;
                }
            break;
            case'v'://visit init
                if(!HBR.u[d.u.uid]){HBR.u[d.u.uid]={}}
                HBR.u[d.u.uid][d.u.bid]=d.u,d.ee='[CHAT="'+d.u.bid+'"][uid="'+d.u.uid+'"]';
                tm(0,d.u,'#live_visitors tbody',1)
                HBR.init('iz')
                $(d.ee).find('.footprints').text(d.u.ft)
                $(d.ee).find('.last_visit').text(d.u.last_visit)
                if($(d.ee+' .msg_').length===1){
                    $(d.ee).find('.geo .name').text(d.u.name),$(d.ee).find('.geo .email').text(d.u.mail),tm(3,d.u,d.ee+' .msg_',1)
                    tm(6,d.u,d.ee+' .brd_'),pm(7,d.u.vid,d.ee+' [name="vid"]',{cid:d.cid}),$('[bid="'+d.u.bid+'"][uid="'+d.u.uid+'"]').addClass('tab_open');
                    if(!d.u.joined[$user.ke]||!d.u.joined[$user.ke][$user.id]){cx({f:'a',ff:'cj',cj:$user.name,uid:d.u.uid,bid:d.u.bid})}
                }
                $('[bid="'+d.bid+'"][uid="'+d.uid+'"]').tooltipster('destroy').tooltipster({interactive: true,theme: 'tooltipster-unm',content: $(tm('geo',{uid:d.uid,bid:d.bid}))})
                $.CloudChat.base.init('ls')
            break;
            case'ii'://init chat
                d.e='#WIN_WTC [bid="'+d.u.bid+'"][uid="'+d.u.uid+'"]',d.ee='[CHAT="'+d.u.bid+'"][uid="'+d.u.uid+'"]';HBR.u[d.u.uid][d.u.bid]=d.u;
                $(d.ee).find('[wt="cd"]').show();
                if($(d.e).length===0){tm(0,d.u,'#live_users',1)}else{$(d.e).appendTo('#live_users');}
                $(d.e).find('.name').text(d.u.name)
                if($(d.ee+' .msg_').length===1){
                    pm(7,d.u.vid,d.ee+' [name="vid"]',{cid:d.cid})
                }
                $.CloudChat.base.init('ls')
                HBR.init('iz');
                HBR.init('cdp',{bid:d.u.bid,uid:d.u.uid})
            break;
            case'i':
                $('.wtc-content [chat]').each(function(n,v){
                    v=$(v);d.u=v.attr('uid');d.b=v.attr('chat')
                    $('[bid="'+d.b+'"][uid="'+d.u+'"]').addClass('tab_open');
                        if(v.attr('chann')){
                            cx({f:'a',ff:'ccj',x:1,uid:d.u,bid:d.b});
                        }else{
                            if(Op().status===1){
                                cx({f:'a',ff:'cj',cj:$user.name,uid:d.u,bid:d.b})
                            }
                        }
                });
                $.AutTa.init();
            break;
            case'dii':
                HBR.init('iz')
                delete(HBR.u[d.uid][d.d].vid[d.cn]),d.ee='[CHAT="'+d.d+'"][uid="'+d.uid+'"]';
                if($(d.ee+' .msg_').length===1){
                    HBR.init(3,{e:d.ee+' [name="vid"]',v:d.cn,f:0})
                }
            break;
            case'li'://visitor has left
                HBR.init('iz');
                if(HBR.u[d.uid][d.bid]){
                    if(Object.keys(HBR.u[d.uid][d.bid].vid).length===0){
                        $('#WIN_WTC [bid="'+d.bid+'"][uid="'+d.uid+'"]').remove();
                    }
                    d.ee='[CHAT="'+d.bid+'"][uid="'+d.uid+'"]';
                    if($(d.ee+' .msg_').length===1){
                        d.time=moment().format(),d.msg='Visitor has Left',d.c='bg-danger'
                        tm(3,d,d.ee+' .msg_',1)
                        HBR.init(3,{e:d.ee+' [name="vid"]',v:d.vid,f:0})
                    }
                    $('[vid="'+d.vid+'"]').remove();
                    delete(HBR.u[d.uid][d.bid]);
                }
            break;
        }
        if(d.remove){
            $(d.remove.join(',')).remove()
        }
        <?php if(strpos($_SERVER['HTTP_HOST'],'m03.ca')!==false){ ?>console.log(d)<?php } ?>
    });
$.RateC={r:$('#RateCustomizer')};$.RateC.f=$.RateC.r.find('form');
$.ScrView={e:$('#viewer-pane'),m:$('#ViewerModal')};$.ScrView.i=$('#wtc_sidemenu .recordings'),$.ScrView.v=$.ScrView.e.find('.viewer')
$(document).ready(function(tmp,t){
//$.simpleWeather({
//woeid: '9807',
//location: '',
//unit: 'c',
//success: function(w) {
//    pm('weat',w);
//},
//error: function(w) {
//    console.log(w)
//}
//});
    tm(11,{n:'Dashboard',uid:$user.ke,bid:'Dashboard',x:1});
t={};tmp={w:$(window)};
$(window).focus(function(){
    SND('',0);if($.Slack){$.Slack.init('status');}
})
$.each(['depts'],function(n,v){try{$user.det[v]=JSON.parse($user.det[v])}catch(e){$user.det[v]=[]}});
$.each(['resp','rates','chan','roles','subs'],function(n,v){if(typeof $user.det[v]!=='object'){try{$user.det[v]=JSON.parse($user.det[v])}catch(e){$user.det[v]={}}}});
HBR.can.a=$user.det.resp;delete($user.det.resp);
HBR.can.default={"d0":"hello :) did you have any questions?",
                 "d1":"Could I get your address please? :)",
                 "d2":"Could I get your phone number please? :)",
                 "d3":"Thanks! :)",
                 "d4":"you're welcome! :)",
                 "d5":"you're welcome! Take care :)",
                 "d6":"Thank you, take care :)",
                 "d6":"No contracts :) just a <a href='https://unmetered.io/page/terms-of-service/'>Terms of Service</a>",
                 "d6":"Date will be confirmed about 2-3 days after order placed in \"Notes to ISP\" in ClientArea but >80% of orders are processed for the day they are requested.",
                }
tmp.o=Op('status',1).elem;if(!tmp.o)tmp.o={};tmp.ex=$('#ext_details');
if(!tmp.o.ext_details){tmp.o.ext_details={top:'calc(100% - '+tmp.ex.height()+'px)',left:0}}
//if(tmp.ex.position().top+tmp.ex.height()>=tmp.w.height()){tmp.o.ext_details.top='calc(100% - '+tmp.ex.height()+'px)'}else{console.log('elses')}
tmp.ex.css(tmp.o.ext_details);
Op('elem',tmp.o);


        $.each([{e:'pnoted'},{e:'audio0',t:'fa-bell fa-bell-slash'},{e:'fulls',t:'fa-expand fa-compress'},{e:'audio1',t:'fa-volume-up fa-volume-off'},{e:'flash',t:'fa-star fa-star-half-o'},{e:'anote',t:'fa-eye fa-eye-slash',v:0},{e:'knote'},{e:'pnotify'},{e:'aclose'},{e:'chead'}],function(n,v){
            if(!v.v){v.v=1};if(!Op()[v.e]){Op(v.e,v.v)}
            HBR.init('mt',v)
        })
        if(Op().night===1){$('#MAIN_FRAME').addClass('dark_theme')}
        if(Op().o){
            $.each(Op().o,function(n,v){
                if(v===1){$('[href="'+n+'"]:visible').first().click()}
            })
        }
    
    //
    if(!$user.pp||$user.pp==''){$user.pp=placeholder.getData(HBR.plcimg($user.name.charAt(0)))}
    $('.propic .img').css('background-image','url('+$user.pp+')')
//slack init
pm('slacks');
    //
    $.each(Op(null,null,'Togs_'+$user.ke),function(n,v,e){
        switch(n){
            case'snu':
                $.Slack['save'].new_uncap=v;
            break;
        }
        if(v===1){v=true}else{v=false}
        $('[swTOGGLE="'+n+'"]').prop('checked',v)
    })
$('.bootswitch').each(function(n,v){
    v.e=$(this);
    n={onSwitchChange:function(e){
        e.e=$(this);e.i=e.e.prop('checked'),e.a=e.e.attr('swTOGGLE');
        switch(e.a){
            case'cbt':case'snu':
                if(e.i===true){e.i=1;}else{e.i="0";};
                switch(e.a){
                    case'snu':
//                        $.each($.Slack.get(),function(n,v){
                            $.Slack['save'].new_uncap=e.i;
//                        })
                    break;
                    case'cbt':
                        $.ChatBot.bot.main=e.i;
                    break;
                }
            break;
        }
        Op(e.a,e.i,'Togs_'+$user.ke)
    }};
    v.i=function(rr){return'&nbsp;<i class="fa fa-'+rr+'"></i>&nbsp;'};
    switch(v.e.attr('swTOGGLE')){
        case'snu':
            n.onText=v.i('slack'),n.offText=n.onText;
        break;
        case'cbt':
            n.onText=v.i('android'),n.offText=n.onText;
        break;
    }
    v.e.bootstrapSwitch(n);
})
$.contextMenu({
    selector: '[otb]',
    items: {
        status: {
            name: "Status",
            icon:function($o,$i,itemKey,item){
                $i.html('<i class="fa fa-user"></i> Toggle Status');return 'context-menu-icon-updated';
            },
            callback: function(k,e){
                e.o=$('#operator_pane'),e.oo=e.o.hasClass('nav-xs'),e.u=e.$trigger.attr('uid'),e.b=e.$trigger.attr('otb');
                e.e=$('#live_operator_chats [CHAT="'+e.b+'"][uid="'+e.u+'"]');
                if(e.e.length===0){e.$trigger.click();e.ee=true}
                setTimeout(function(){e.e.find('[button="status"]').click();},2000)
                if(e.oo){e.o.addClass('nav-xs')};//if(e.ee===true){e.e.remove()}
            }
        }
    }
});
<?php if(sudo()===true){ ?>
//Stat init
HBR.init('st');
$('#Statistics').on('show.bs.modal',function(){
    if($('#Statistics .morris_chart:first').is(':empty')){
        $('#stat_dates').submit()
    }
})
//Settings init
pm('sett');HBR.init('fi')
//canned init
pm(13);
//Screen Recorder and Viewer
    $('body').on('click','[viewer]',function(e){
        e.e=$(this);e.sw=e.e.attr('viewer')
        switch(e.sw){
            case'g':
                e.t='';
                if($.ScrView.checking!==1){
                    $.ScrView.checking=1;
                $.get('/g/recs',function(d){
                    delete($.ScrView.checking);
                    try{d=JSON.parse(d)}catch(er){d=[]}
                    $.each(d,function(n,v){
                        v.data=JSON.parse(v.data);
                        e.t+='<li title="'+v.data.ua+'" class="list-group-item clearfix" viewer="s" uid="'+v.ke+'" key="'+v.id+'" file="'+v.file+'"><div class="cell">'+v.data.ip+'</div><div class="cell url">'+v.data.url+'</div><div class="cell"><span class="livestamp" title="'+v.start+'">4h</span></div><div class="cell text-right fa-fl"></div></li>';
                    });
                    $.ScrView.i.html(e.t);
                })
                }
            break;
            case's':
                if($('#ViewerModal:visible').length===0){$('#ViewerModal').modal('show')}
                e.b=e.e.attr('key'),e.a=e.e.attr('file');
                $.get('/g/recs/'+e.b+'/'+e.a,function(d){
                    try{d=JSON.parse(d)}catch(e){d={success:false}}
                    if(d.success!==false){
                      $.ScrView.player = new cimice.Player({
                        target: $.ScrView.v[0]
                      });
                      $.ScrView.player.setMovie(new cimice.Movie(d));
                      $.ScrView.player.play();
                    }else{
                        console.log(d)
                    }
                })
            break;
        }
    })
<?php }?>
<?php if(sudo('su')===true){ ?>
pm('api');pm('suba');$.ChatBot.init(1);pm(14);$.each([1,3,4],function(n,v){HBR.init('settings',{sw:'t',ws:v})})
$('#AccountModal .confirmaction').click(function(e){
    e.a=$('#AccountModal .unmFrame:visible').attr('unmtab');
    HBR.init('settings',{sw:'s',ws:e.a});
})
//RATINGS START
    t.tmp='';try{$user.rates=JSON.parse($user.rates)}catch(e){$user.rates={}}
    if(!$user.rates||$user.rates.length===0){$user.rates={
        Default:[{t:1,d:"How prompt we're our operators?"},{t:2,d:'Attitude of operators?'},{t:3,d:'How well we\'re your questions answered?'},{t:3,d:"First time you've asked about this?",o:[{t:'Yes',v:5},{t:'No',v:0}]},{t:5,d:'Would you like a copy of this chat?'}]
}}
    $.RateC.f.find("[name='use_default']").bootstrapSwitch({size:"mini",onColor:'success',onText:'Live',offText:'Off',offColor:'danger'});
    $.each($user.rates,function(n,v){
        t.tmp+='<option value="'+n+'">'+n+'</option>';
    })
    $.RateC.f.find('[name="mode_edit"]').append(t.tmp);t.tmp='';
  	$.RateC.e=$('#rate_profile_add')
    $.RateC.f.find('.image_radio input').change(function(e){
        e.e=$(this),e.v=e.e.val(),e.a=e.e.attr('name');
        $.RateC.f.find('.'+e.a+'_options').hide(),$.RateC.f.find('.'+e.a+'_'+e.v).show()
    })
    $.RateC.f.find('.type_3 [add]').click(function(e){
        e.e=$(this),e.p=e.e.parents('.add_remove'),e.m=e.p.find('.image_radio input:checked').val();
        $.RateC.tm('add',e);
    })
    $.RateC.f.find('.type_3 [remove]').click(function(e){
        e.m=$(this).parents('.add_remove').find('.image_radio input:checked').val();
        e.l=$.RateC.f.find('.type_3 .lines .line');
        if(e.l.length>2){
            e.l.last().remove();
        }
    })
    $.RateC.tm=function(x,e){
        if(!e){e={}};e.tmp='';
        switch(x){
            case'add':
            e.e=$.RateC.f.find('.type_3 .lines'),e.l=e.e.find('.line').length;
            if(!e.v){e.v=''};if(!e.t){e.t=''};
            e.tmp='<div class="line"><div class="col-md-8"><input class="form-control" name="type_select_name['+e.l+']">'+e.t+'</div><div class="col-md-4"><input class="form-control" name="type_select_val['+e.l+']">'+e.v+'</div></div>';
            e.e.append(e.tmp);
            break;
        }
        return e.tmp;
    }
    $.RateC.init=function(f,e){
        if(!e)e={};e.t='';
        switch(f){
            case 0:
                e.f=$.RateC.e.find('[name="mode_edit"]').selectpicker('destroy');
                $.each($user.det.rates,function(n,v){
                    e.t+='<option value="'+n+'">'+n+'</option>';
                });e.f.html(e.t);
                if(e.s){e.f.val(e.s)}
                e.f.change().selectpicker().prev().find('ul').sortable({change:function(e){
                    e.sw=2;setTimeout(function(){$.RateC.init(1,e);},1000)
                }});
            break;
            case 1:
                e.f=$.RateC.f;e.e=$(e.target);e.m=e.f.find('[name="mode_edit"]').val();
                switch(e.sw){
                    case 0:
                        e.a=e.e.attr('key');if(!e.a){return};e.u=$user.det.rates[e.m][e.a];
                        e.f.find('[name="key_name"]').val(e.a),e.f.find('[name="type_star_text"]').val(e.u.d);
                        $('[for="'+e.f.find('[name="type"][value="'+e.u.t+'"]').attr('id')+'"]').click();
                        switch(e.u.t){
                            case'2':
                                e.f.find('[name="type_star_text_val"]').val(e.u.v)
                            break;
                            case'3':case'4':
                                e.te=e.f.find('.type_selectables .line');$(e.te.splice(2,e.te.length)).remove();
                                $.each(e.u.o,function(n,v){
                                    if(n!==0&&n!==1){$.RateC.tm('add')}
                                    $('[name="type_select_name['+n+']"]').val(v.t),$('[name="type_select_val['+n+']"]').val(v.v);
                                })
                            break;
                        }
                    break;
                    case 1:
                        e.u=$user.det.rates[e.m];
                        e.al=e.f.find('.mode_edit_options li');e.arr={};
                        e.al.each(function(n,v){
                            v=$(v).attr('key');if(!v){return}
                            e.arr[v]=e.u[v];
                        });
                        $user.det.rates[e.m]=e.arr;
                    break;
                    case 2:
                        e.u=$user.det.rates;
                        e.arr={};
                        e.e.find('li .text').each(function(n,v){
                            v=$(v).text();if(v.length<1){return}
                            e.arr[v]=e.u[v];
                        });
                        $user.det.rates=e.arr;
                    break;
                }
            break;
        }
    }
    $.RateC.f.find('[name="mode_edit"]').change(function(e){
        e.f=$.RateC.f;e.t='';e.v=$(this).val();if(!e.v){return}
        $.each($user.det.rates[e.v],function(n,v){
            switch(v.t){
                case"1":
                    v.fa='star';
                break;
                case"2":
                    v.fa='terminal';
                break;
                case"3":
                    v.fa='bars';
                break;
                case"4":
                    v.fa='check-circle-o';
                break;
                case"5":
                    v.fa='envelope';
                break;
            }
            e.t+='<li class="list-group-item" key="'+n+'"><i class="fa fa-'+v.fa+'"></i> &nbsp; <b>'+n+'</b> : '+$('<div>'+v.d+'</div>').text()+'<a class="btn btn-ghost btn-xs btn-danger delete pull-right"><i class="fa fa-times"></i></a></li>';
        });e.f.find('.mode_edit_options').html(e.t);
    });
    $.RateC.f.on('click','.delete',function(e){
        e.e=$(this);e.p=e.e.parents('li'),e.k=e.p.attr('key');e.p.remove();e.t=$.RateC.f.find('[name="mode_edit"]').val();
        delete($user.det.rates[e.t][e.k]);
    })
    $.RateC.init(0);
    $.RateC.f.find('.mode_edit_options').sortable({change: function(e,ui) {
        setTimeout(function(){$.RateC.init(1,{sw:1});},1000)
    }});
    $.RateC.f.on('click','.mode_edit_options li',function(e){
        e.sw=0;$.RateC.init(1,e);
    })
    $.RateC.f.submit(function(e){
        e.preventDefault();e={};e.j=$(this).serializeJSON();e.ar={t:e.j.type};
        if(e.j.type===5){e.j.key_name='wylac';}
        e.note={title:'We\'ve got a problem',text:'Please Check Details',type:'notice'};
        switch(e.j.mode){
            case"1":
                if(e.j.mode_new.length==0){e.note.text='New Set must have a Name.';return new PNotify(e.note)}
                if($user.det.rates[e.j.mode_new]){e.j.mode="2";e.j.mode_edit=e.j.mode_new}
                e.t=e.j.mode_new;
            break;
            case"2":
                if(!$(this).find('[name="mode_edit"]').val()){e.note.text='Select a set first.';return new PNotify(e.note)}
                e.t=e.j.mode_edit;
            break;
        }
        if(e.j.key_name.length>1){
            if(!$user.det.rates[e.t]){$user.det.rates[e.t]={}}
            switch(e.j.type){
                case"1":case"5":
                    e.ar.d=e.j.type_star_text;
                break;
                case"2":
                    e.ar.d=e.j.type_star_text;
                    e.ar.v=e.j.type_star_text_val;
                break;
                case"3":case"4":
                    e.ar.d=e.j.type_star_text;
                    e.ar.o=[];
                    $.each(e.j.type_select_name,function(n,v){
                        e.ar.o.push({t:v,v:e.j.type_select_val[n]})
                    });
                break;
            }
            $user.det.rates[e.t][e.j.key_name]=e.ar;
        }
        e.cx={f:'a',ff:'s',fff:'f',ws:6,s:JSON.stringify($user.det.rates)};
        if(!e.j.use_default){e.cx.sc='d'}else{e.cx.sc=gid(5)}
        cx(e.cx);$.RateC.init(0,{s:e.t});
    })
    if($user.ids&&$user.ids.ry&&$user.ids.ry!=='d'){$.RateC.f.find('[name="use_default"]').prop('checked',true).change()}
//RATINGS END
//Share Controller Start
$('#ssettings').on('click','[share]',function(e){
    e.m=$('#ssettings').find('[name="m"]');
    e.v=e.m.val();if(e.v===''){new PNotify({title:'Invalid Email',type:'error',text:'Please type an email address.'});e.m.focus();return};cx({f:'a',ff:'sh',fff:$(this).attr('share'),m:e.v})
}).on('click','.unshare',function(e){
    e={e:$(this).parents('[rshto]'),s:$('#ssettings')}
    e.s.find('[name="m"]').val(e.e.attr('rshto_m'));e.s.find('[value="r"]').click();
})
//Share Controller End
//Channel Manager
    try{$user.det.chans=JSON.parse($user.det.chans);}catch(er){$user.det.chans={}}
    if($user.det.chans instanceof Object===false){$user.det.chans={};}
    $.ChaMa={e:$('#ChanMan')};$.ChaMa.f=$.ChaMa.e.find('form');
    $.ChaMa.pm=function(e,v,n){//multi drawing function
        if(!v){v={};};v.tmp='';
        switch(e){
            case 01:
                $.each($user.det.chans,function(n,v){//draw saved values
                    $.ChaMa.tm(0,v,n);$.ChaMa.tm(1,v,n);
                })
            break;
        }
        return v.tmp;
    }
    $.ChaMa.tm=function(e,v,n){//drawing function
        v.tmp='';
        switch(e){
            case 0:if(n==='General'||n==='Summit'){return false};v.e=$.ChaMa.e.find('[key="'+n+'"]');
                if(v.e.length===0){
                v.tmp+='<tr key="'+n+'"><td><span>'+n+'</span></td><td>'+v.f+'</td><td>'+v.i+'</td><td><a class="btn btn-ghost btn-xs btn-danger delete pull-right"><i class="fa fa-times"></i></a></td></tr>';
                $.ChaMa.e.find('.saved_list').append(v.tmp);
                }else{
                    v.e.find('span').text(n+' : '+v.f+' : '+v.i);
                }
            break;
            case 1:
                if($('[gch="#'+n+'"]').length===0){
                    v.tmp+=tm('ib',{a:'title="#'+n+'" gch="#'+n+'"',n:'#'+n,f:' hidden',c:'',s:''})
//                        '<a gch="#'+n+'" pub="'+v.f+'" title="#'+n+'" class="btn btn-ghost btn-primary" gch="#'+n+'"><b>Channel :</b> #'+n+'</a>';
                    $('.channels_').append(v.tmp);
                }
            break;
        }
        return v.tmp;
    }
    $user.det.chans=$.extend({General:{f:"1",i:''},Summit:{f:"1",i:'Operator Private Chat'}},$user.det.chans);
    $.ChaMa.pm(01);
    $.ChaMa.e.on('click','.delete',function(e){//remove a saved value
        e.e=$(this);e.p=e.e.parents('tr'),e.k=e.p.attr('key');e.p.remove();delete($user.det.chans[e.k]);$('[gch="#'+e.k+'"]').remove();
    })
    $.ChaMa.e.on('click','.saved_list tr',function(e){//load saved value
        e.e=$(this);e.k=e.e.attr('key');e.o=$user.det.chans[e.k];
        $('#chaman_name').val(e.k),$('#chaman_msg').val(e.o.i),$('#chaman_type').val(e.o.f);
    })
    $.ChaMa.f.submit(function(e){
        e.preventDefault();e.e=$(this),e.s=e.e.serializeObject();
        e.tm={f:e.s.type,i:e.s.msg};$user.det.chans[e.s.name]=e.tm;delete(e.tm.e);
        cx({f:'a',ff:'s',fff:'f',ws:8,s:JSON.stringify($user.det.chans)});
        $.ChaMa.tm(0,e.tm,e.s.name);$.ChaMa.tm(1,e.tm,e.s.name);
        return false;
    })
<?php } ?>
//Auto Tasks
    $.AutTa={e:$('#AutoTasker'),to:{}};$.AutTa.f=$.AutTa.e.find('form');
    $.AutTa.jj=function(tmp){
        tmp=false;
        $.each(HBR.u,function(n,v){
            $.each(v,function(m,b){
                $.each(b.joined,function(x,y){
                    $.each(y,function(t,u){
                        if(t===$user.id){tmp=true}
                    })
                })
            })
        })
        return tmp;
    }
    $.AutTa.tm=function(e,v,n){
        v.tmp='';
        switch(e){
            case 0:v.e=$.AutTa.e.find('[key="'+n+'"]');
                if(v.e.length===0){
                v.tmp+='<li class="list-group-item" key="'+n+'"><span>'+n+' : '+v.f+' : '+v.i+'</span><a class="btn btn-ghost btn-xs btn-danger delete pull-right"><i class="fa fa-times"></i></a></li>';
                $.AutTa.e.find('.saved_list').append(v.tmp);
                }else{
                    v.e.find('span').text(n+' : '+v.f+' : '+v.i);
                }
            break;
        }
        return v.tmp;
    }
    $.AutTa.init=function(e){
        if(Op().time instanceof Object){
            $.each(Op().time,function(n,v){
                $.AutTa.tm(0,v,n);
                $.AutTa.sT(v,n);
            });
        }
    }
    $.AutTa.e.on('click','.delete',function(e){
        e.e=$(this);e.p=e.e.parents('li'),e.k=e.p.attr('key');e.p.remove();
        e.o=Op().time;delete(e.o[e.k]);Op('time',e.o);
        clearTimeout($.AutTa.to[e.k]);delete($.AutTa.to[e.k]);
    })
    $.AutTa.f.submit(function(e){
        e.preventDefault();e.e=$(this);e.o=Op().time;e.s=e.e.serializeObject();if(e.o instanceof Object===false){e.o={}};
        e.a={f:e.s.afunc_select,i:e.s.afunc_time};e.o[e.s.afunc_name]=e.a;Op('time',e.o);$.AutTa.sT(e.a,e.s.afunc_name);
        $.AutTa.tm(0,e.a,e.s.afunc_name);
        return false;
    })
    $.AutTa.sT=function(e,n){
        if(!e)e={};
        if(!e.t)e.t = new Date();else e.t=new Date(e.t);
        e.i=e.i.split(':');if(!e.i[1]){e.i[1]=0};if(!e.i[2]){e.i[2]=0};if(!e.i[3]){e.i[3]=0};
        e.g=new Date(e.t.getFullYear(),e.t.getMonth(),e.t.getDate(),e.i[0],e.i[1],e.i[2],e.i[3])-e.t;
        if (e.g < 0) {e.g += 86400000;}
        clearTimeout($.AutTa.to[n]);
        $.AutTa.to[n]=setTimeout(function(){
            switch(e.f){
                case'ss_on':case'ss_off':case'so_on':case'so_off':
                    e.e=$('[toggle="status"]');
                    if(e.f.indexOf('on')>-1){e.c="0";}else{e.c=1;}
                    switch(e.f){case'ss_on':case'ss_off':e.y='status';break;case'so_on':case'so_off':e.y='audio1';break;}
                    if(e.f==='ss_off'||e.f==='so_off'){if($.AutTa.jj()===true)return;}
                    if(Op()[e.y]==e.c){e.e.first().click()}
                break;
            }
        },e.g);
    }
//TOOLS START
t.tmp='';
$.each($.CloudChat.base.emoji,function(n,v){
        t.tmp+='<a class="emoji" title="'+v.title+' '+v.codes.join(', ')+'" emoji="'+n+'"><span class="emoticon emoticon-'+n+'"></span></a>';
    })
    $('#mm-emojis').append(t.tmp);t.tmp={};
    $('[emoji]').unbind('click').click(function(e){
       e.e=$('.wtc-content textarea:visible');e.v=$('.wtc-content .messagebar textarea:visible').val();e.e.val(e.v+' '+$.CloudChat.base.emoji[$(this).attr('emoji')].codes[0]);//$('#mm-emojis').hide();
        $('#mm-emojis').hide()
    })
    $('[psfn]').unbind('click').click(function(e){
        e.preventDefault();if($('#WIN_WTC [chat]').length===0){new PNotify({title:'Sorry, No can do.',text:'Please open a chat window first.'});return}
        e.e=$(this);e.a=e.e.attr('psfn');
        e.s=$('#chats_pre_recs').serializeObject();
        $.each(HBR.can,function(n,v){
            if(v[e.s.msgs]){e.s.msgs=v[e.s.msgs]}
        });e.d=e.s.msgs;
        HBR.init('snd_',e)
    });
    $('#mm-chat-attach').unbind('submit').submit(function(e){//file upload
        e.preventDefault();e.key=JSON.parse(localStorage.getItem('unmAttach'));e.f=$(this);e.ff=$('#mm-attach-upl');
        if(e.key[0]=='slack'){
            e.url=$.Slack.api+'files.upload',
            e.fd = new FormData;
            e.fd.file=e.ff[0].files[0],e.fd.name=e.ff.val(),e.fd.channels=e.key[2];
            $.ajax({
                   url :e.url,
                   type : 'POST',
                   data : $.Slack.obj(e.fd),
                   processData: false,
                   contentType: false,
                   success : function(d) {
                       console.log(d);
                   }
            });
        }else{
            e.file=e.ff[0].files[0];
            $.FireBs.ref.child($.FireBs.buck+e.file.name).put(e.file).then(function(d){
                delete(d.a.get);delete(d.a.ref);
                $.FireBs.FILES[e.key[2]].push(d.a);Op('FILES_'+e.key[2],$.FireBs.FILES[e.key[2]]);
                $.FireBs.drawFiles(e.key);
            });
//            e.ar=$.Filer.gather(e.key);
//        e.f.ajaxSubmit({
//            url:'',beforeSubmit:function(rt){
//            rt=rt[0];e.ty=rt.value;
//            rt.type=e.ty.type;rt.name=e.ty.name;rt.size=e.ty.size;
//            e.reader=new FileReader();
//            e.reader.onload = function(readerEvt) {
//                e.binaryString = readerEvt.target.result;
//                rt.value=btoa(e.binaryString);
//                if(e.key[0]!=='slack'){
//                    $.Filer.send(e,rt);
//                }
//            };
//           e.reader.readAsBinaryString(e.ty);
//            return false;
//            }
//        })
        }
        return false;
    }).change(function(){if($('#mm-attach-upl').val().length>1){$(this).submit()}})

//TOOLS END
    tmp='';
$.each(CCiso.langs,function(n,v){
    tmp+='<option value="'+n+'">'+v+'</option>'
});$('#mm-translator [name="fr"],#mm-translator [name="to"]').append(tmp);tmp='';
    $('#mm-translator').submit(function(e){
        e.preventDefault();e.e=$.CloudChat.base.selected_translate;e.t=e.e.find('.unm-bubble small').text();e.f=$(this);e.fr=e.f.find('[name="fr"]').val(),e.to=e.f.find('[name="to"]').val()
        $.post('/g/t',{t:e.t,fr:e.fr,to:e.to},function(d){
            e.e.find('.translated').html('<i>'+d+'</i>');
        });
        e.f.hide();
        return false;
    })
    $('.logout').click(function(e){
        Op('login',{},'unmLogin_'+location.hostname+location.pathname).login;
        $.get('/pg/lib/Logout.php');
        location.reload();
    })
var isDragging = false,prevX;$.CloudChat.stc=$('#st-container');
$('body')
//.on('mousedown touchdown','.st-container',function() {
//    isDragging = true;
//})
//.on('mousemove touchmove','.st-container',function(e) {
//    e.wD=isDragging;
//    if(e.wD){
//        if(!prevX) {
//            prevX = e.pageX;    
//            return false;
//        }
//        switch(true){
//            case(prevX+50 > e.pageX):
//                e.done=1;if($.CloudChat.stc.hasClass('st-menu-open')===false){$.CloudChat.stc.addClass('st-menu-open')}
//            break;
//            case(prevX-50 < e.pageX):
//                e.done=1;if($.CloudChat.stc.hasClass('st-menu-open')===true){$.CloudChat.stc.removeClass('st-menu-open')}
//            break;
//        }
//        if(e.done===1){isDragging=false;e.stopPropagation();e.preventDefault();}
//        prevX = e.pageX;
//    }
// })
//.on('mouseup touchup','.st-container',function() {
//    isDragging = false;
//})
    .on('click','.st-menu-open .st-pusher',function(e){
        $('.st-container').removeClass('st-menu-open')
    })
    .on('change','.savingonchange',function(e){
        e.e=$(this);
        switch(e.e.attr('func')){
            case'api_notes':
                
            break;
            case'api_origins':
            break;
        }
    })
    .on('focus','.wtc-content [CHAT] .messagebar textarea',function(e){
    e.e=$(this).parents('[CHAT]');
        cx({f:'s',ff:'r',uid:e.e.attr('uid'),bid:e.e.attr('CHAT'),$uid:$user.ke,$bid:$user.id})
    })
    .on('focusout','.wtc-content [CHAT] .messagebar textarea',function(e){
        e.e=$(this).parents('[CHAT]');
        cx({f:'s',ff:'r',r:0,uid:e.e.attr('uid'),bid:e.e.attr('CHAT'),$uid:$user.ke,$bid:$user.id})
    })
    .on('change','.select-toggle',function(e){
        e.e=$(this),e.a=e.e.attr('select-toggle');
        
    })
    .on('change','#files_usr input,#files_usr select',function(e){
        if($.CloudChat.PrevCust){$.CloudChat.PrevCust.$.CloudChat.bg($('#files_usr').serializeObject())}else{
            e.e=$('[tbfn="demo"]').addClass('fI_bo');
            clearTimeout($.CloudChat.PrevCustFl);
            $.CloudChat.PrevCustFl=setTimeout(function(){e.e.removeClass('fI_bo')},3000)
        }
    e.e=$(this);
    e.fn=function(f){if(e.e.parents(f).length==1){f=true}else{f=false};return f;}
        switch(true){
            case(e.fn('.sett-block')):
                e.p=e.e.parents('.sett-block');
                e.p.css({backgroundImage:'url('+e.p.find('.pic').val()+')',backgroundPosition:e.p.find('.pos').val(),backgroundSize:e.p.find('.siz').val()})
                e.p.find('.shade_').css('background-color',e.p.find('.shad').val());
                e.p.find('.modal-title,label').css({color:e.p.find('.colo').val(),backgroundColor:e.p.find('.hold_').val()})
            break;
            case(e.fn('.launcher_colors')):
        e.e=$('#files_usr .launcher_colors');
        e.e.find('.mm-chat-launch:not(.online)').css({backgroundColor:$('#loff_text').val(),borderColor:$('#loffb_text').val()}),e.e.find('.mm-chat-launch.online').css({backgroundColor:$('#lon_text').val(),borderColor:$('#lonb_text').val()});
            break;
            case(e.fn('.unm-bubble_colors')):
                e.e=$('#files_usr .unm-bubble_colors');
                e.e.find('.livestamped').css('color',$('#ts_text').val());
                e.e.find('.from-me .unm-bubble').css({backgroundColor:$('#fbbg_shade').val()}).find('small').css({color:$('#fb_text').val()+'!important'});
                e.e.find('.from-them .unm-bubble').css({backgroundColor:$('#tbbg_shade').val()}).find('small').css({color:$('#tb_text').val()+'!important'});
            break;
        }
    })
    .on('click','.joined_ops',function(e){
        $(this).toggleClass('clicked');
    })
    .on('dblclick','.bmsg .msgp',function(e){
        e.e=$(this);if(e.e.attr('clicked')){e.e.removeAttr('clicked')}else{e.e.attr('clicked',1)}
    })
    .on('dblclick','.msg_ li .unm-bubble>small',function(e){
        e.e=$(this),e.l=e.e.parents('li'),e.p=e.e.parents('[chat]');e.b=e.p.attr('chat'),e.u=e.p.attr('uid');e.ts=e.l.attr('ts'),e.v=e.e.text();
        if(e.ts){
            e.e.hide(),e.l.find('.unm-bubble').prepend('<textarea class="form-control">'+e.v+'</textarea>');
            e.l.find('textarea').keydown(function(ee){
                if (ee.keyCode == 13 && !ee.shiftKey){
                    ee.preventDefault(),ee.e=$(this);
                    $.post($.Slack.api+'chat.update',$.Slack.obj({ts:e.ts,channel:e.b,text:ee.e.val()},{slack:e.p.attr('slack_selected')}),function(d){if(!d.ok)new PNotify({type:'error',title:'Cannot Edit',text:'You are not the sender of this message.'})});
                    e.e.show();ee.e.remove();
                }
            }).focus().focusout(function(ee){e.e.show();$(this).remove();})
        }else{
            //edit on regular chat server
        }
    })
    .on('click','.logs_ .delete',function(e){
        e.l=$(this).parents('li'),e.p=$(this).parents('[chat]');e.b=e.p.attr('chat'),e.u=e.p.attr('uid');e.ts=e.l.attr('ts');
        cx({f:'a',ff:'l',fff:'d',ts:e.ts,bid:e.b,uid:e.u});e.l.remove();
    })
    .on('click','.msg_ li .delete',function(e){
        e.l=$(this).parents('li'),e.p=$(this).parents('[chat]');e.b=e.p.attr('chat'),e.u=e.p.attr('uid');e.ts=e.l.attr('ts');
        if(e.ts){
            $.post($.Slack.api+'chat.delete',$.Slack.obj({ts:e.ts,channel:e.b},{slack:e.p.attr('slack_selected')}));
        }else{
            if(e.p.hasClass('op_win')){
                //HBR.a[''+d.amsg.uid][d.amsg.bid].name+'_'+d.amsg.uid
                e.o=Op(null,null,'OperatorChats_'+$user.ke);e.ar=[];
                $.each(e.o,function(n,v){
                    if(v.time===e.l.attr('title')){return};
                    e.ar.push(v)
                });
                Op(HBR.a[''+e.u][e.b].name+'_'+e.u,e.ar,'OperatorChats_'+$user.ke)
                e.l.remove();//add more function//ATTENTION
            }else{
                e.a=e.l.find('div small').text().trim();e.l.remove();cx({f:'s',ff:'c',fff:0,t:e.a,uid:e.u,bid:e.b});
            }
        }
    })
    .on('click','[gch]',function(e){
        e.e=$(this);e.a=e.e.attr('gch');e.u=e.e.attr('uid');if(!e.u){e.u=$user.ke};
        if(!$.CloudChat.Channels.c[e.a]){cx({f:'a',ff:'ccj',x:1,uid:e.u,bid:e.a});}else{$('[ctb="'+e.a+'"][uid="'+e.u+'"]').click()};
    })
    .on('click','.mm-emoji',function(e){
        e.e=$('#mm-emojis');
        if(e.e.is(':visible')){e.e.hide()}else{e.e.show()}
        e.o=$(this).offset();
    e.o.top=e.o.top-e.e.height()-20
    e.o.left=e.o.left-e.e.width()+16
        e.e.css(e.o)
    })
    .on('click','[mm-attach="c"]',function(e){
        e.e=$(this).parents('[chat]');
        if(!e.e.attr('slack_chan')){
            e.y=e.e.attr('peer')
        }else{
            e.y='slack';
        }
        e.u=e.e.attr('uid'),e.b=e.e.attr('chat');
        if(!e.y){e.y=e.u+'_'+e.b};localStorage.setItem('unmAttach',JSON.stringify([e.y,e.u,e.b]));
        $('#mm-attach-upl').click();
    })
    .on('mouseup','.Op_elem',function(e){
        e.e=$(this),e.x=e.e.data('target'),e.p=$(e.x),e.a=e.e.data('toggle').replace('class:',''),e.o=Op().elem;
            if(e.p.hasClass(e.a)){e.o[e.x]=1}else{e.o[e.x]=0}
            Op('elem',e.o)
    })
    .on('click','.list-toggle',function(e){
        e.e=$(this).toggleClass('active');e.e.next().slideToggle();
    })
    .on('click','[peer]',function(e){
        e.e=$(this);e.a=e.e.attr('peer'),e.p=e.e.parents('[CHAT]'),e.u=e.p.attr('uid'),e.b=e.p.attr('CHAT');
        switch(e.a){
            case"screen_view":
                if(e.p.hasClass('op_win')){e.uu='a'}else{e.uu='u'}
    if(!HBR[e.uu][e.u][e.b].peer){
        HBR[e.uu][e.u][e.b].peer=$.CloudChat.Peer.p.connect(e.u+'_'+e.b)
        HBR[e.uu][e.u][e.b].peer.on('open', function() {
            HBR[e.uu][e.u][e.b].peer.on('data', function(d) {
                switch(d.f){
                    case'pr':
                        $('#uniModal').modal('show').find('.modal-body').html('<img style="max-width:100%;" src="'+d.d+'">');
                        e.p.find('[download]').attr('href',d.d).click()
                    break;
                }
            });
            HBR[e.uu][e.u][e.b].peer.send({f:'p'})
        });
    }else{
        HBR[e.uu][e.u][e.b].peer.send({f:'p'})
    }
            break;
        }
    })
    .on('click','[tbfn]',function(e){
        e.e=$(this),e.a=e.e.attr('tbfn'),e.p=e.e.parents('[tbp]'),e.t=e.p.find('[tb]')
        switch(e.a){
            case'demo':
                switch(e.e.attr('tbfn2')){
                    case'win':
                        if($.CloudChat.PrevCust){
                            $.CloudChat.PrevCust.$('.mm-chat-toggle')[0].click()
                        }
                    break;
                    case'greet':
                        if($.CloudChat.PrevCust){
                        if($.CloudChat.PrevCust.$.CloudChat.op().greet===1){
                            $.CloudChat.PrevCust.$.CloudChat.init(3)
                        }else{$.CloudChat.PrevCust.$.CloudChat.init(4)}
                        }
                    break;
                    default:
                if((/Mobi/.test(navigator.userAgent))===false){
                    $.CloudChat.PrevCust=window.open('/e/e/'+$user.ke+'?jquery','Preview Customizer','height=700,width=1000');
                }else{
                    console.log('Can\'t on Mobile')
                }
                    break;
                }
            break;
            case'rmr':
                e.f=function(f){e.e.toggleClass(e.cl[0]).attr('tbfn',f).find('i').toggleClass(e.cl[1])}
                e.cl=['btn-warning btn-danger','fa-trash-o fa-check'],e.f('rmrc'),setTimeout(function(){e.f('rmr')},5000)
            break;
            case'mvup':case'mvdn':
                e.tr=e.e.parents('tr');
                if(e.e.attr('tbfn')==='mvup') {
                    e.tr.insertBefore(e.tr.prev());
                } else {
                    e.tr.insertAfter(e.tr.next());
                }
            break;
            case'rmrc':
                e.v=e.p.attr('unmtab');e.tr=e.e.parents('tr');
                switch(e.v){
                    case'api':
                        cx({f:'a',ff:'s',fff:'f',ffff:'d',s:e.tr.find('.txt').text(),ws:'api'});
                    break;
                }
                e.tr.remove();
            break;
            case'adr':e.v=e.p.attr('unmtab');
                switch(e.v){
                    case"10":
                        $('#chatbot_responses tbody').append($.ChatBot.tm(1));
                    break;
                    case"1":
                        e.t.append(tm('suba'));HBR.init('settings',{sw:'t',ws:1})
                    break;
                    case"4":
                        e.t.append(tm(14));HBR.init('settings',{sw:'t',ws:4})
                    break;
                    case"3":
                        e.t.append(tm(13));HBR.init('settings',{sw:'t',ws:3})
                    break;
                    case'api':
                        e.gid=gid(20);e.t.append(tm('api',{code:e.gid}));cx({f:'a',ff:'s',fff:'f',ffff:'i',s:e.gid,ws:e.v});
                    break;
                }
            break;
        }
    })
    //.on('resize',function(){$('#page').css('height',$(window).height()-72+'px')}).resize()
    .on('click','.mm-lang-pop',function(e){
        e.e=$(this),e.x=e.e.offset(),e.t=$('#mm-translator'),e.p=e.e.parents('li');
        $.CloudChat.base.selected_translate=e.p;e.x.left+=50;
        e.t.show().animate(e.x);
        $('#WIN_WTC').click(function(f){$(this).unbind('click');e.t.hide()})
    })
    .on('click','[caller]',function(e){
    e.e=$(this),e.p=e.e.parents('[chat]'),e.a=e.p.attr('chat'),e.u=e.p.attr('uid');
    switch(e.e.attr('caller')){
        case's'://Call Regular Noobs
            e.c=e.u+'_'+e.a
            if(tm('vid',e)===true){
            navigator.webkitGetUserMedia({video: true, audio: true, toString:function(){return 'video, audio';}},function(d){
              $('[call="'+e.c+'"] .my-stream').attr('src',window.URL.createObjectURL(d))[0].volume=0
//              if(HBR.c[e.c]){
//                HBR.c[e.c].close();delete(HBR.c[e.c])
//              }
                HBR.c[e.c]=$.CloudChat.Peer.p.call(e.c,d,{metadata:$user});
                if(HBR.c[e.c]){
//                  e.missing=setTimeout(function(){HBR.c[e.c].close();$('[call="'+e.c+'"]').remove()},10000)
//                  HBR.c[e.c].on('connection', function(s){clearTimeout(e.missing)})
                  HBR.c[e.c].on('stream', function(s){
                    $('[call="'+e.c+'"] .their-stream').prop('src', URL.createObjectURL(s));
                  });
                  HBR.c[e.c].on('close',function(){
                    $('[call="'+e.c+'"]').remove();
                  });
                }else{
                    console.log('No user with that ID')
                }
            },function(e){
                console.log('Video is not possible. No Camera');return false;
            })
            }else{
                console.log('Video Chat already Open')
            }
        break;
        case'o'://Call Operator Noobs
            e.c=e.p.attr('peer');
            if(tm('vid',e)===true){
                navigator.webkitGetUserMedia({video: true, audio: true, toString:function(){return'video, audio';}},function(d){
                  $('[call="'+e.c+'"] .my-stream').attr('src',window.URL.createObjectURL(d))[0].volume=0;
                    e.arr=$user;e.arr.type=1;e.el='[call="'+e.c+'"] ';
                    $.CloudChat.opCall[e.c]=$.CloudChat.Peer.p.call(e.c,d,{metadata:e.arr});
                    if($.CloudChat.opCall[e.c]){
//                      e.missing=setTimeout(function(){$.CloudChat.opCall[e.c].close();$('[call="'+e.c+'"]').remove()},10000)
//                      $.CloudChat.opCall[e.c].on('connection', function(s){clearTimeout(e.missing)})
                      $.CloudChat.opCall[e.c].on('stream', function(s){
                        $.CloudChat.audio(0,{e:e.el+'.their-voice',s:s});
                        $(e.el+'.their-stream').prop('src', URL.createObjectURL(s));
                      });
                      $.CloudChat.opCall[e.c].on('close',function(){
                        $(e.el).remove();
                      });
                      $.CloudChat.opCall[e.c].on('error',function(e){
                      });
                    }else{
                        console.log('No user with that ID')
                    }
                },function(e){
                    console.log('Video is not possible. No Camera');return false;
                })
            }else{
                console.log('Video Chat already Open')
            }
        break;
    }
    
    })
    .on('click','.unmTabs .unmTab',function(e){
        e.e=$(this),e.p=$(e.e.parents('.unmTabs')[0]),
        e.a=e.e.attr('unmTab'),e.t=e.p.find('.unmFrame[unmTab='+e.a+']');
        if(e.t.is(':visible')){return;}
        e.z=e.p.find('.unmTab'),
        e.x=e.p.find('.unmFrame');
        e.z.removeClass('active'),e.e.addClass('active')
        e.x.slideUp();e.t.slideDown();
        if(e.p.hasClass('modal-body')){
            $('#customizer_buttons').hide()
            e.p.find('.confirmaction').show()
            switch(e.a){
                case"2":$('#customizer_buttons').show();break;
            }
        }
    })
    .on('click mousedown','.op_win',function(e){
        e.e=$(this);e.b=e.e.attr('CHAT');$('.op_win:not([CHAT="'+e.b+'"])').attr('focus',0);
        e.e.attr('focus',1).find('.op_win_head,.op_win_text').removeClass('fI_bg');
        $('[otb] a').removeClass('active')
        $('[uid="'+e.e.attr('uid')+'"][otb="'+e.b+'"] a').addClass('active').removeClass('fI_bg fI_bg_a')
    })
    .on('click','[data-click]',function(e){
        $($(this).attr('data-click')).click()
    })
    .on('keyup','[CHAT] textarea',function(e){
    e.e=$(this).parents('[CHAT]');
        if(e.which == 13) {
            e.e.find('[send]').click()
        }else{
            if(Op().anote==1){
                e.v=$(this).val();
                if(Op().knote!==1){e.v=e.v.length}
                if(!e.e.attr('slack_chan')){
                    cx({f:'a',ff:'b',uid:e.e.attr('uid'),bid:e.e.attr('CHAT'),kp:e.v,n:$user.name,$uid:$user.ke,$bid:$user.id});
                }else{
                    $.Slack.cx({"id": 1,"type": "typing","channel":e.e.attr('CHAT')},e.e.attr('slack_selected'))
                }
            }
        }
    })
    .on('click','[preview]',function(e){
        e.e=$(this);e.b=e.e.attr('preview'),e.t=e.e.attr('type'),e.p=$('#manager-preview');
        switch(e.t){
            case'get_missed':
                $.get('/g/m/',function(d){
                    try{d=JSON.parse(d);console.log(d)
                    d.missed=JSON.parse(d.missed);
                    }catch(e){}
                    if(d.missed){
                        pm('missed',d.missed,'#manager-missed ul',1);
                    }
                })
            break;
            case'missed':
                e.u=e.e.attr('uid'),e.ti=e.e.attr('time');
                e.p.html('<ul class="list-group messages list-group-lg no-bg auto msg_"></ul>');
                if(HBR.missed[e.u]&&HBR.missed[e.u][e.b]&&HBR.missed[e.u][e.b].history){
                    pm(1,HBR.missed[e.u][e.b].history,'#manager-preview ul',1);
                }else{
                    $.get('/g/c/'+e.u+'/'+e.b+'/'+encodeURIComponent(e.ti)+'?l',function(d){
                        try{d=JSON.parse(d);
//                           d.brd=JSON.parse(d[0].crumbs.brd);
                           d.history=JSON.parse(d.chat[0].history);
                            }catch(e){}
                        console.log(d)
//                      if(d.brd){pm(6,d.brd,'',1);}
                        pm(1,d.history,'#manager-preview ul',1);
                    })
                }
                $('#manager-main .unmTab[unmTab=2]').click()
            break;
        }
    })
    .on('submit','[CHAT] .send_',function(e){
        e.preventDefault();e.e=$(this);
        e.p=e.e.parents('.op_win'),e.bid=e.p.attr('chat'),e.uid=e.p.attr('uid'),e.ee='[CHAT="'+e.bid+'"][uid="'+e.uid+'"]',e.i=e.e.find('input'),e.v=e.i.val();
        if(e.v.length===0){return}
        e.m={d:e.v,name:$user.name,uid:$user.ke,bid:$user.id}
        if($(e.ee).attr('peer')!=='slack'){
            if(HBR.a[e.uid]&&HBR.a[e.uid][e.bid]){
                if($.FireBs.FILES[e.bid].length>0){e.m.file=$.FireBs.FILES[e.bid];delete($.FireBs.FILES[e.bid]);Op('FILES_'+e.bid,[]);}
                e.m.rid='/#'+HBChat.json.id;
                e.l=Op(null,null,'OperatorChats_'+$user.ke)[HBR.a[e.uid][e.bid].name+'_'+e.uid];
                if(!e.l){e.l=[]};e.m.sender=$user.id;e.l.push(e.m);
                Op(HBR.a[e.uid][e.bid].name+'_'+e.uid,e.l,'OperatorChats_'+$user.ke);
                e.cx={f:'s',ff:'a',s:HBR.a[e.uid][e.bid].c,u:e.uid,m:e.m};
                cx(e.cx);e.m.xx=0;
            }else{
                HBR.init('pn',{title:'Cannot Send Message',type:'error'})
            }
        }else{
            e.sl=e.p.attr('slack_selected');e.m.slack_selected=e.sl;e.m.x=1,e.m.slack={user:$.Slack['self'+e.sl].id};
            $.Slack.cx({"id":1,"type":"message","channel":e.bid,"text":e.v},e.sl)
        }
        tm(1,e.m,e.ee+' .msg_',1);
        return e.i.val('');
    })
    .on('click','[CHAT] [send="s"]',function(e){
        e={p:$(this).parents('[CHAT]')};e.e=e.p.find('.messagebar textarea'),e.v=e.e.val();
        if(e.v.replace(/(\r\n|\n|\r)/gm,"")===''){e.e.val('');return false}
        e.u=e.p.attr('uid'),e.b=e.p.attr('CHAT')
        if(e.v.length===0){return}
        e.m={d:e.v,name:$user.name,uid:e.u};e.ee='[CHAT="'+e.b+'"][uid="'+e.u+'"]';
        if(!e.p.attr('slack_chan')){
            if($.FireBs.FILES[e.b].length>0){e.m.file=$.FireBs.FILES[e.b];delete($.FireBs.FILES[e.b]);Op('FILES_'+e.b,[]);}
            e.cx={f:'s',s:e.b,u:e.u,m:e.m};
            if(e.p.attr('chann'))e.cx.y=1;
            cx(e.cx);e.m.rid=e.b;e.m.xx=0;e.m.st=0;
        }else{
            e.sl=e.p.attr('slack_selected');e.m.slack_selected=e.sl;e.m.x=1,e.m.slack={user:$.Slack['self'+e.sl].id};
            $.Slack.cx({"id":1,"type":"message","channel":e.b,"text":e.v,"icon_url":$user.pp,"username":$user.name},e.sl)
        }
            tm(1,e.m,e.ee+' .msg_',1)
            setTimeout(function(){e.e.val('').trigger('keyup')},100)
    })
    .on('click','[CHAT] .win_t',function(e,ee){
        ee={e:$(this),ar:{}};ee.p=ee.e.parents('[CHAT]'),ee.ar.bid=ee.p.attr('CHAT'),ee.ar.uid=ee.p.attr('uid'),ee.ar.tw=ee.e.attr('wt')
        switch(ee.ar.tw){
            case'g':case'g0':
                ee.g='jQuery.CloudChat.init(';
                switch(ee.ar.tw){
                    case'g':ee.g+='3)';break;case'g0':ee.g+='4)';break;
                }
                $('#script_'+ee.ar.bid).val(ee.g)
                $('[CHAT="'+ee.ar.bid+'"][uid="'+ee.ar.uid+'"] .toolPop').submit();
            break;
            case'cd':
                e.x=ee.p.find('[name="script"]');
                e.cd=e.x.val();e.x.val(ee.e.attr('cd')),ee.p.find('.toolPop').submit(),e.x.val(e.cd);
            break;
            case't':
                ee.ar.f='j',ee.ar.ff='o',ee.ar.c=1
                if(HBR.u[ee.ar.uid][ee.ar.bid].open==1){ee.ar.o="0"}else{ee.ar.o=1};
                HBR.init('win_t',ee.ar);
                cx(ee.ar)
            break;
        }
    })
    .on('submit','.toolPop',function(e,ee){
        ee={e:$(this)};ee.f=ee.e.serializeObject()
        if(!ee.f.vid){ee.p=ee.e.parents('[CHAT]'),ee.b=ee.p.attr('chat'),ee.u=ee.p.attr('uid');ee.f.vid=HBR.a[''+ee.u][''+ee.b].c}
        ee.e.find('input').val('')
        cx({f:'s',ff:'t',vid:ee.f.vid,form:ee.f});
        e.preventDefault();return;
    })
    .on('click','[winc]',function(e){
e.th=$(this),e.w=e.th.attr('winc'),e.e=e.th.parents('[CHAT]');e.b=e.e.attr('CHAT');e.u=e.e.attr('uid');
    if(e.th.hasClass('disabled')){return false;}
        switch(e.w){
            case'ach':
                e.e.find('.msg_ li').remove();
                cx({f:'s',ff:'c',fff:'r',r:['[CHAT="'+e.b+'"][uid="'+e.u+'"] .msg_ li'],uid:e.u,bid:e.b});
            break;
            case'tscr':
                e.th.addClass('disabled')
                e.e.find('[unmtab="4"]').click();
                e.f=e.e.find('.toolPop').serializeObject();e.sl=e.e.find('.screen_loading');
                HBR.u[e.u][e.b].Int=setInterval(function(){e.pp=parseInt(e.sl.attr('aria-valuenow'));if(e.pp>98){e.pp=94};e.slv=e.pp+1;e.sl.css('width',e.slv+'%').attr('aria-valuenow',e.slv)},200);
                cx({f:'s',ff:'t',vid:e.f.vid,fn:{f:'j',ff:'p'}});
            break;
            case'scr':
                e.d=e.th.find('img').attr('src')
                $('#uniModal').modal('show').find('.modal-body').html('<img style="max-width:100%;" src="'+e.d+'">');
            break;
            case'lm':
                e.t=[e.e.find('.brd_ li:last .livestamp').attr('title'),e.e.find('.msg_ li:first').attr('title')];e.th.removeAttr('winc').addClass('disabled')
                $.get('/g/c/'+e.u+'/'+e.b+'/'+e.t[1]+'/'+e.t[0]+'?n',function(d){
                    try{d=JSON.parse(d);
                        try{d.brd=JSON.parse(d[0].crumbs.brd);}catch(e){d.brd=[]}
                        try{d.history=JSON.parse(d[0].chat.history);}catch(e){}
                        pm(6,d.brd,'[CHAT="'+e.b+'"][uid="'+e.u+'"] .brd_',1);
                        }catch(e){}
                        if(d.history){
                            setTimeout(function(){e.th.attr('winc','lm').removeClass('disabled')},3000)
                            pm(1,d.history,'[CHAT="'+e.b+'"][uid="'+e.u+'"] .msg_',1);
                        }
                    e.e.find('.unmTab[unmTab="1"]').click();
                })
            break;
            case'p':
e.p=e.e,e.n="CHAT_"+e.u+'_'+e.b;
                    HBR.p[e.n]= window.open($user.loc+'chat/'+e.u+'/'+e.b,e.n,"width=900,height=600,scrollbars=no");
            break;
            case't':
                e.e=$(this).parents('[CHAT]')
                e.i=e.e.find('.tools')
                if(e.i.hasClass('open')){
                    e.i.slideDown().removeClass('open')
                }else{
                    e.i.slideUp().addClass('open')
                }
            break;
            case'fs':
                e.e=$(this).parents('[full]');
                if(e.e.attr('full')==0){e.e.attr('full',1)}else{e.e.attr('full',0)}
            break;
            case'ca':
                e.p=e.th.parents('[call]'),e.a=e.p.attr('call')
                if(HBR.c[e.a]&&HBR.c[e.a].close){HBR.c[e.a].close()};
                if($.CloudChat.opCall[e.a]&&$.CloudChat.opCall[e.a].close){$.CloudChat.opCall[e.a].close()};
                e.p.remove();
            break;
            case'cc':case'chc':
e.a=e.b;e.ctb=$('[ctb="'+e.a+'"][uid="'+e.u+'"]');e.n=e.ctb.next();$('[CHAT="'+e.a+'"][uid="'+e.u+'"] .send_').unbind('submit');if(e.n.length===0){e.n=e.ctb.prev()};e.ctb.remove();$('[uid="'+e.u+'"][bid="'+e.a+'"]').removeClass('tab_open');if(e.n.length!==0){setTimeout(function(){e.n.click()},100);}else{
    //no more chats open
}
                if(HBR.u[e.u]&&HBR.u[e.u][e.a]){HBR.u[e.u][e.a].deptr=0;
                if(e.w==='cc'){
                    if(Op().status==1){e.ar={f:'a',ff:'cj',cj:$user.name,bid:e.a,uid:e.u,x:0};if(Op().anote==0){e.ar.xx=1};cx(e.ar)}
                }
                }else{
                    if(e.w==='chc'){
                        cx({f:'a',ff:'ccj',x:0,uid:e.u,bid:e.a});delete($.CloudChat.Channels.c[e.a]);
                    }
                }
                e.e.remove()
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
    .on('click mousedown','[ctb]',function(j){
        j={};j.e=$(this),j.u=j.e.attr('uid'),j.b=j.e.attr('ctb'),j.x=$('#WIN_WTC'),j.ee=$('[CHAT="'+j.b+'"][uid="'+j.u+'"]');
            HBR.init('c_f',{b:j.b,u:j.u})
            j.ac='chrome-tab-current'
            $('[ctb].'+j.ac).removeClass(j.ac);j.x.find('[bid].'+j.ac).removeClass(j.ac);$('[uid="'+j.u+'"][ctb="'+j.b+'"]').addClass(j.ac);$('[bid="'+j.b+'"]').removeClass('fI_bg fI_bg_a typing').addClass(j.ac);
            $(this).removeClass('fI_bg fI_bg_a typing');SND('',0,'[chat="'+j.b+'"][uid="'+j.u+'"]');$('[uid="'+j.u+'"][ctb="'+j.b+'"] .badge').empty();
    })
    .on('click','[bid]',function(j){j=$(this);HBR.init('cw',{bid:j.attr('bid'),uid:j.attr('uid')})})
    .on('click','[bid] .likeme',function(e){e.stopPropagation();
        e.e=$(this).toggleClass('fa-heart fa-heart-o text-danger faa-pulse animated');e.p=e.e.parents('[bid]');e.u=e.p.attr('uid'),e.b=e.p.attr('bid');e.o=Op(null,null,'Liked_'+$user.ke)[e.u+'_'+e.b];
        if(e.o===1){e.o=null}else{e.o=1}
        Op(e.u+'_'+e.b,e.o,'Liked_'+$user.ke);
    })
    .on('click','[chs]',function(e){
    e.sw=$(this).attr('chs');
    switch(e.sw){
        case'd':
e.stopPropagation();e.e=$('#ChatHistory_helper'),e.p=$(this).parents('[time]'),e.b=e.p.attr('chs'),e.u=e.p.attr('uid'),e.t=e.p.attr('time');e.e.find('.confirmaction').removeClass('btn-success btn-primary btn-danger btn-warning');
        break;
    }
    switch(e.sw){
        case'd':
            e.n=e.p.find('small:last').text()
            e.e.find('.confirmaction').text('Delete').addClass('btn-danger').click(function(){
                $.post('/d/c/',{u:e.u,b:e.b,t:e.t},function(d){
                    if(d==1){
                        e.p.remove();
                    }else{
                        console.log(d)
                    }
                    $(this).unbind('click');e.e.modal('hide');
                })
            });
            e.e.find('.modal-title i').attr('class','fa fa-trash-o');
            e.e.find('.modal-title span').html('Delete Thread?');
            e.e.find('.modal-body').html('<p>Delete this chat thread? You cannot undo this action. Maybe <a class="btn btn-ghost btn-xs btn-success">Make a Backup</a> before doing this? This <b>does not</b> delete Breadcrumb data.</p><table><tr><td>Email</td><td>&nbsp;:&nbsp;</td><td>'+e.n+'</td></tr><tr><td>User ID</td><td>&nbsp;:&nbsp;</td><td>'+e.b+'</td></tr><tr><td>Time Start</td><td>&nbsp;:&nbsp;</td><td>'+e.t+'</td></tr><tr><td>Chat Owner ID</td><td>&nbsp;:&nbsp;</td><td>'+e.u+'</td></tr></table>');
            e.e.modal('show');
        break;
        default:
        e=$(this);HBR.init('chs',{b:e.attr('chs'),u:e.attr('uid'),t:e.attr('time')})
        break;
    }
})
    .on('click','[slack_link]',function(e){
    e.e=$(this);Cookie('slack_select',e.e.attr('slack_link'),30);
        switch(e.e.attr('slack_link_type')){
            case'detach':
                location.href=location.protocol+'//'+location.host+'/p/slack/detach';
            break;
            default:
                location.href='https://slack.com/oauth/authorize?scope=client&client_id=<?=$config['slack']['client_id']?>';
            break;
        }
    })
    .on('click','[slack_otb]',function(e){
        e.e=$(this).removeClass('fI_bg'),e.b=e.e.attr('slack_otb');e.u=e.e.attr('uid');e.sk=e.e.attr('slack_selected');e.ims=$.Slack['ims'+e.sk][e.b];$.Slack.selected=e.sk;e.p=$('#operator_pane');
        if(e.p.hasClass('nav-xs')){e.p.removeClass('nav-xs')}else{
        if($('[CHAT="'+e.ims+'"][uid="'+e.u+'"]').attr('focus')==1){e.p.addClass('nav-xs')}}
        tm('otc',{ims:e.b,b:e.ims,u:$.Slack['team'+e.sk],slack:e.sk,y:1});
    })
    .on('click','[slack_gch]',function(e){
        e.e=$(this);e.b=e.e.attr('slack_gch'),e.sk=$(this).attr('slack_selected');e.u=e.e.attr('uid');if(!e.u){e.u=$user.ke};
        if($('[slack_chan][CHAT="'+e.b+'"][uid="'+e.u+'"]').length===0){
            e.sk=e.e.attr('slack_selected');$.Slack.selected=e.sk;
            $('.wtc-content').append(tm(15,{u:e.u,b:e.b,y:1,yy:1},e.sk));tm(11,{uid:e.u,bid:e.b,n:'#'+$.Slack['ch'+e.sk][e.b].name,y:1});
            $.Slack.pm(2,$.Slack['ch'+e.sk][e.b],e.sk);
            $.post($.Slack.api+'channels.history',$.Slack.obj({channel:e.b},{slack:e.sk}),function(d){
            d.tmp='';
                d.ee='[CHAT="'+e.b+'"][uid="'+e.u+'"]';
                $.Slack.pm(0,$(d.messages).get().reverse(),d.ee+' .msg_',e.sk);
                
            })
        }
        $('[ctb="'+e.b+'"]').click();
    })
    .on('click','[otb]',function(j){
    j.e=$(this),j.u=j.e.attr('uid'),j.b=j.e.attr('otb'),j.x=$('.live_operators'),j.ee=$('[CHAT="'+j.b+'"][uid="'+j.u+'"]');
    j.p=$('#operator_pane');
    if(j.p.hasClass('nav-xs')){j.p.removeClass('nav-xs')}else{
    if($('[CHAT="'+j.b+'"][uid="'+j.u+'"]').attr('focus')==1){j.p.addClass('nav-xs')}}
    j.e.removeClass('fI_bg');
            j.ar={bid:j.b,uid:j.u};
            j.ar.a=$('[pt="'+j.b+'"]').attr('otb')
            j.ff=$('[uid="'+j.u+'"][otb="'+j.b+'"]')
            tm('otc',j);
    if($.FireBs){$.FireBs.drawFiles(['',j.u,j.b]);}
    $(this).removeClass('fI_bg typing')
        SND('',0,'[uid="'+j.u+'"][chat="'+j.b+'"]');$('[uid="'+j.u+'"][otb="'+j.b+'"] .badge').empty()
    })
    .on('mousedown touchdown','.winb',function(e){
        e={e:$(this),a:$('.winb')};
        e.a.attr('focus',0),e.e.attr('focus',1),e.i=e.e.attr('win'),e.w=$('#winlist'),e.x=$('#W_'+e.i)
        e.w.find('li .i').removeClass('i-circle-sm').addClass('i-circle-sm-o')
        e.x.find('.i').addClass('i-circle-sm').removeClass('i-circle-sm-o')
    })
    .on('mousedown touchdown','[CHAT]',function(e){
        e.e=$(this);e.WTC=$('#WIN_WTC'),e.c=e.e.attr('CHAT'),e.u=e.e.attr('uid');
        SND('',0,'[chat="'+e.c+'"][uid="'+e.u+'"]')
        e.ct='[ctb="'+e.c+'"][uid="'+e.u+'"]';$(e.ct).find('.badge').empty();
        e.WTC.find('[bid="'+e.c+'"][uid="'+e.u+'"],'+e.ct).removeClass('fI_bg fI_bg_a')
    })
    .on('change','[name="vid"]',function(e){
        e.e=$(this),e.v=e.e.find('option:selected').text(),e.cal=e.e.parents('[CHAT]').find('[caller="s"]').parent();
        if(e.v.indexOf('https://')>-1){e.cal.show()}else{e.cal.hide()}
    })
    .on('change','[swTOGGLE]',function(e){//switch toggle controller
        
    })
    .on('click','[TOGGLE]',function(e){//toggle controller, like status,bell loop, etc.
        e={e:$(this),op:Op()};e.i=e.e.find('i'),e.a=e.e.attr('TOGGLE')
        //first step functions
        switch(e.a){
            case'night':
                e.e=$('#MAIN_FRAME');
                e.e.toggleClass('dark_theme');
                e.cs=$('.chrome-tabs-shell');
                if(e.e.hasClass('dark_theme')){
                    e.cs.addClass('chrome-tabs-dark-theme')
                }else{
                    e.cs.removeClass('chrome-tabs-dark-theme')
                }
            break;
            case'fulls':
                e.ar='fa-expand fa-compress'
            break;
            case'anote':
                e.ar='fa-eye fa-eye-slash'
            break;
            case'status':
                e.ar='fa-user fa-user-times'
            break;
            case'audio0':
                e.ar='fa-bell fa-bell-slash'
            break;
            case'audio1':
                e.ar='fa-volume-up fa-volume-off'
            break;
            case'flash':
                e.ar='fa-star fa-star-half-o'
            break;
        }
        //second step functions
        switch(e.a){
            default:
                if(e.op[e.a]===1){
                    e.v='0'
                }else{
                    e.v=1
                }
                Op(e.a,e.v)
           break;
        }
        //third step functions
        switch(e.a){
            case'status':case'audio0':case'audio1':
                switch(e.v){
                    case 1:
                        e.nn='On';
                    break;
                    default:
                        e.nn='Off';
                    break;
                }
                e.e.find('.it').text(e.nn)
            break;
        }
    //fourth step
        if(e.a=='status'){
            cx({f:'a',ff:'s',fff:'o',o:e.v});
            e.cx={f:'a',ff:'cj',cj:$user.name};
            $('[ctb]').each(function(n,v){
                v=$(v);e.cx.bid=v.attr('ctb'),e.cx.uid=v.attr('uid');
                if(e.v==0){
                    e.cx.x=0;
                };<?php if(isset($_SESSION['ids']['slack1'])){?>if(e.v==0){$.Slack.init('status',{f:0})}else{$.Slack.init('status')};<?php } ?>
                cx(e.cx);
            })                 
        }
        HBR.init('mt',{e:e.a,t:e.ar});
//        $('.operator_toggle').removeClass('open')
    })
    .on('keyup','.unmSearch',function(e){
        e.t = $(this);e.p=e.t.parents('.unmSearchParent'),e.b=e.p.find('.unmSearchBody')
        $.each(e.b.find("li"), function(n) {
            n=$(this);if(n.text().toLowerCase().indexOf(e.t.val().toLowerCase()) == -1)n.hide();else n.show();
        });
    })
    $('#history_search').submit(function(e){
        e.preventDefault();
        e.e=$(this);e.ch=$('#ChatHistory .block_tabs tbody');
        e.a={};e.v=e.e.find('input').val();if(e.v.trim()!==''){e.a.s=e.v;}
        $.post('/g/h/'+$user.ke,e.a,function(d){
            try{
                d=JSON.parse(d);e.ch.empty();
                d.sort(function(x, y){
                    return x.end - y.end;
                });
                $.each(d,function(n,v){
                    try{if(v.user instanceof Object===false){v.user=JSON.parse(v.user)}}catch(er){return}
                    e.ch.append('<tr class="tab_item animated" uid="'+v.ke+'" chs="'+v.id+'" time="'+v.start+'" end="'+v.end+'"><td class="time" title="'+v.start+'">'+v.start+'</td><td class="" title="'+v.end+'">'+v.end+'</td><td title="'+v.user.ip+' : '+v.id+'"><span class="nom text-ellipsis">'+v.user.name+'</span></td><td>'+v.user.mail+'</td><td class="text-right"><a chs="d" class="btn btn-ghost btn-xs btn-white"><i class="fa fa-times"></i></a></td></tr>');
                });
                $.CloudChat.base.init('ls');
            }catch(er){}
        });
        return false;
    });
    $('#ChatHistory').on('show.bs.modal',function(){
        if($('#ChatHistory [chs]').length===0){
            $('#history_search').submit();
        }
    })
    $('.modal').on('show.bs.modal',function(){
        $('.modal').removeClass('ontop');$(this).addClass('ontop')
    })
//unm_files_list stuff
    $('.wtc-content').droppable({
      drop:function(e,ui){
          e.e=$('.wtc-content [chat][focus="1"]');
          if(e.e.length===1){
              e.u=e.e.attr('uid'),e.b=e.e.attr('CHAT');
              e.f=$.CloudChat.files(4,$(ui.draggable).parents('[files]').attr('files'));e.k=[e.u+'_'+e.b,e.u,e.b];
              if(e.f){e.ar=$.Filer.gather(e.k);
                  $.Filer.send({ar:e.ar,key:e.k},e.f)
              }
          }
      }
    });
    $.Filer.list=$('#unm_files_list');$.Filer.listr=$.Filer.list.parents('.w-f');
    $.Filer.mD=function(){
        $.Filer.list.find('li .folder').draggable({
            helper: 'clone',start: function(){
                $.Filer.listr.removeClass('scrollable');
            },
            stop: function(e){
                $.Filer.listr.addClass('scrollable');
                e.e=$(this).parents('[file]');
            }
        });
    }
    $.Filer.gather=function(t,e){
        if(!e){e={}};e.ar=[];
        e.joined_ops=$('[uid="'+t[1]+'"][CHAT="'+t[2]+'"]');e.opj=e.joined_ops.find('[opj]');
        if(e.joined_ops.attr('[chann]')){
            e.chh=$.CloudChat.chxn[t[2]];
            if(e.chh){
                $.each(e.chh,function(n,v){//gather stragglers
                    e.ar.push(v.uid+'_'+n);
                });
            }
        }else{e.ar.push(t[0]);}
        e.opj.each(function(n,v){
            v={e:$(v)};v.b=v.e.attr('opj'),v.u=v.e.attr('uid'),v.p=v.e.attr('peer');
            if($user.ke===v.u&&$user.id===v.b){return}
            e.ar.push(v.p);
        });
        return e.ar;
    }
    $.Filer.send=function(e,t){
        e.fi='<b>File Sent : </b>'+t.name;
        if(t.type.indexOf('image')>-1){e.fi+='<br><img unmFile="img" src="'+URL.createObjectURL($.CloudChat.b64toBlob(t.value))+'">'}
        tm(3,{msg:e.fi,c:'bg-primary',time:moment().format()},'[uid="'+e.key[1]+'"][CHAT="'+e.key[2]+'"] .msg_',1);
        $.each(e.ar,function(n,v){
            $.CloudChat.Peers[v]=$.CloudChat.Peer.p.connect(v,{metadata:{f:'fi',d:t,uid:e.key[1],bid:e.key[2],$uid:$user.ke,$bid:$user.id}});
            $.CloudChat.Peers[v].close();
        })
    };
    $.Filer.mD();
///**********************************FIREBASE***********************************//
<?php if(intval($_SESSION['lv'])>0&&isset($_SESSION['ids']['firebase'])&&$_SESSION['ids']['firebase']['apiKey']!==''){ ?>
  var FireBaseConfig = <?= json_encode($_SESSION['ids']['firebase'])?>;
<?php }else{ ?>
  var FireBaseConfig = {
    apiKey: "AIzaSyBZ68U1anJHhKLLt30f66BwmB7ED1ipht0",
    authDomain: "cloudchat-5bb80.firebaseapp.com",
    storageBucket: "cloudchat-5bb80.appspot.com",
  };
<?php } ?>
firebase.initializeApp(FireBaseConfig);firebase.initializeApp=function(){}
$.FireBs={a:firebase.storage()};$.FireBs.buck='CloudChat.Online/'+$user.ke+'/';
$.FireBs.ref=$.FireBs.a.ref();
    $.FireBs.drawFiles=function(e){e={u:e[1],b:e[2]};
        if(!$.FireBs.FILES){$.FireBs.FILES={}};if(!$.FireBs.FILES[e.b]){$.FireBs.FILES[e.b]=[];}
        e.e=$('[CHAT="'+e.b+'"] .unm-file-attachments').empty();
        $.each($.FireBs.FILES[e.b],function(n,v){
            e.e.append('<div class="unm-file-attached-element" title="Attached : '+v.name+'"><i class="chi-attach"></i></div>')
        })
    }
//    $.FireBs.drawFiles();
});
}
}