if(!$.CloudChat){$.CloudChat={base:{},Peers:{}}};$.CloudChat.Peer={};$.CloudChat.chxn={};$.CloudChat.Channels={l:['#General'],c:{},chxn:function(e,f){
    if(!$.CloudChat.chxn[f.$bid])$.CloudChat.chxn[f.$bid]={};if(!$.CloudChat.op){$.CloudChat.op=Op}
    if(f.chxn===1){
        if(!$.CloudChat.chxn[f.$bid][f.bid]){$.CloudChat.chxnc=$.CloudChat.chxnc+1;$.CloudChat.base.tm(0,{bid:f.bid},'[CHAT="'+f.$bid+'"][uid="'+f.uid+'"] .list-ousers',$.CloudChat.op().bid);}
        $.CloudChat.chxn[f.$bid][f.bid]={uid:f.uid,bid:f.bid};
    }else{
        $.CloudChat.chxnc=$.CloudChat.chxnc-1;
        delete($.CloudChat.chxn[f.$bid][f.bid]);
        $('[yid="'+f.bid+'"]').remove();
    }
    if(f.z){$(f.z).text($.CloudChat.chxnc)}
}};
$.CloudChat.base.lu=jQuery('#live_users')
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
$.Filer={};
$.CloudChat.files=function(f,e,n){
    if(!e)e={};if(!n)n={};
    switch(f){
            case 4://get
                n.j=JSON.parse(localStorage.getItem('unmFiles'))[e];
                if(n.j){n.j.value=localStorage.getItem('file['+e+']');n.j.name=e;
                try{return n.j}catch(e){return false;}}else{return false}
            break;
            case 3://remove
                e={name:e};localStorage.removeItem('file['+e.name+']');
                e.o=localStorage.getItem('unmFiles');if(!e.o){e.o={}}else{e.o=JSON.parse(e.o);};
                delete(e.o[e.name]);localStorage.setItem('unmFiles',JSON.stringify(e.o));
            break;
            case 2://add
                localStorage.setItem('file['+e.name+']',e.value);delete(e.value);
                e.o=localStorage.getItem('unmFiles');if(!e.o){e.o={}}else{e.o=JSON.parse(e.o);};
                e.o[e.name]={type:e.type,size:e.size};localStorage.setItem('unmFiles',JSON.stringify(e.o));
            break;
            case 1://draw one file
                n.j=JSON.parse(localStorage.getItem('unmFiles'))[n.n].type;
                n.id=n.n.replace(/ /g,'+');$('[files="'+n.id+'"]').remove();
                n.e=$('#unm_files_list');n.t='<li files="'+n.id+'"><div class="folder"';
                if(n.j.indexOf('image')>-1){n.t+=' style="background-image:url('+e+')"'}
                n.t+='></div><div class="holder"><div><div>'+n.n+'</div><small>('+parseInt(n.v.size)/1000+'kb, '+n.j+')</small></div><div><a class="btn-unm btn btn-xs btn-primary" download="'+n.n+'" href="'+e+'">Download</a> <a unmFile="del" del="'+n.n+'" class="pull-right btn btn-xs btn-unm btn-dnager">&nbsp;<i class="chi-cancel-circle fa fa-times"></i>&nbsp;</a></div></div></li>';
                if(!n.o){n.e.prepend(n.t);if($.Filer.mD){$.Filer.mD()};};
            return n.t;
            break;
            default://draw saved files
                e.e=$('#unm_files_list');e.t='';e.o=localStorage.getItem('unmFiles');if(!e.o){e.o={}}else{e.o=JSON.parse(e.o);};
                $.each(e.o,function(n,v){
                    e.t=$.CloudChat.files(1,URL.createObjectURL($.CloudChat.b64toBlob(localStorage.getItem('file['+n+']'))),{n:n,v:v,o:2})+e.t;
                })
                e.e.html(e.t);if($.Filer.mD){$.Filer.mD()};
            break;
    }
    return e.t;
};
$('body').on('click','[unmFile]',function(e){
    e.e=$(this),e.a=e.e.attr('unmFile')
    switch(e.a){
        case'ci':
            $('#unm-file-preview').hide();
        break;
        case'img':
            e.w=$('#unm-file-preview').show(),e.i=e.w.find('img');
            e.i.attr('src',e.e.attr('src'));
        break;
        case'del':
            e.e.parents('li').remove();$.CloudChat.files(3,e.e.attr('del'));
        break;
    }
});
$.CloudChat.iframe=function() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
$.CloudChat.base.tm=function(x,v,z,k,tmp){
    tmp='';
    switch(x){
        case 0:
            if(v.bid===k){return false;}
            v.e=$('[yid="'+v.bid+'"]')
            if(v.e.length===0){
                $.each(['bid','t'],function(n,b){if(!v[b]){v[b]='';}});if(!v.n){v.n='Guest'};
                tmp+='<li yid="'+v.bid+'"><b>'+v.n+'</b><span>'+v.t+'</span></li>';
                if(z){$(z).append(tmp)}
            }else{
                v.e.find('b').text(v.n);
                if(v.t.length>30){v.t.slice(v.t.length-30,v.t.length);}
                v.e.find('span').text(v.t);
            }
        break;
    }
    return tmp;
}
$.CloudChat.b64toBlob=function(b64Data, contentType, sliceSize){contentType=contentType || ''; sliceSize=sliceSize || 512; var byteCharacters=atob(b64Data); var byteArrays=[]; for (var offset=0; offset < byteCharacters.length; offset +=sliceSize){var slice=byteCharacters.slice(offset, offset + sliceSize); var byteNumbers=new Array(slice.length); for (var i=0; i < slice.length; i++){byteNumbers[i]=slice.charCodeAt(i);}var byteArray=new Uint8Array(byteNumbers); byteArrays.push(byteArray);}var blob=new Blob(byteArrays,{type: contentType}); return blob;};
jQuery.fn.serializeObject=function (){"use strict";var result={};var extend=function (i, element){var node=result[element.name];if ('undefined' !==typeof node && node !==null){if (jQuery.isArray(node)){node.push(element.value);}else{result[element.name]=[node, element.value];}}else{result[element.name]=element.value;}};jQuery.each(this.serializeArray(), extend);return result;};
$.CloudChat.base.emoji = {smile:{title:"Smile",codes:[":)",":=)",":-)"]},"sad-smile":{title:"Sad Smile",codes:[":(",":=(",":-("]},"big-smile":{title:"Big Smile",codes:[":D",":=D",":-D",":d",":=d",":-d"]},cool:{title:"Cool",codes:["8)","8=)","8-)","B)","B=)","B-)","(cool)"]},wink:{title:"Wink",codes:[":o",":=o",":-o",":O",":=O",":-O",";)"]},crying:{title:"Crying",codes:[";(",":'(",";=("]},sweating:{title:"Sweating",codes:["(sweat)","(:|"]},speechless:{title:"Speechless",codes:[":|",":=|",":-|"]},kiss:{title:"Kiss",codes:[":*",":=*",":-*"]},"tongue-out":{title:"Tongue Out",codes:[":P",":=P",":-P",":p",":=p",":-p"]},blush:{title:"Blush",codes:["(blush)",":$",":-$",":=$"]},wondering:{title:"Wondering",codes:[":^)"]},sleepy:{title:"Sleepy",codes:["|-)","I-)","I=)","(snooze)"]},dull:{title:"Dull",codes:["|(","|-(","|=("]},"in-love":{title:"In love",codes:["(inlove)"]},"evil-grin":{title:"Evil grin",codes:["]:)",">:)","(grin)"]},talking:{title:"Talking",codes:["(talk)"]},yawn:{title:"Yawn",codes:["(yawn)","|-()"]},puke:{title:"Puke",codes:["(puke)",":&",":-&",":=&"]},angry:{title:"Angry",codes:[":@",":-@",":=@","x(","x-(","x=(","X(","X-(","X=("]},"it-wasnt-me":{title:"It wasn't me",codes:["(wasntme)"]},party:{title:"Party!!!",codes:["(party)"]},worried:{title:"Worried",codes:[":S",":-S",":=S",":s",":-s",":=s"]},mmm:{title:"Mmm...",codes:["(mm)"]},nerd:{title:"Nerd",codes:["8-|","B-|","8|","B|","8=|","B=|","(nerd)"]},"lips-sealed":{title:"Lips Sealed",codes:[":x",":-x",":X",":-X",":#",":-#",":=x",":=X",":=#"]},hi:{title:"Hi",codes:["(hi)"]},call:{title:"Call",codes:["(call)"]},devil:{title:"Devil",codes:["(devil)"]},angel:{title:"Angel",codes:["(angel)"]},envy:{title:"Envy",codes:["(envy)"]},wait:{title:"Wait",codes:["(wait)"]},thinking:{title:"Thinking",codes:["(think)",":?",":-?",":=?"]},rofl:{title:"Rolling on the floor laughing",codes:["(rofl)"]},whew:{title:"Whew",codes:["(whew)"]},happy:{title:"Happy",codes:["(happy)"]},punch:{title:"Punch",codes:["(punch)"]},emo:{title:"Emo",codes:["(emo)"]},yes:{title:"Yes",codes:["(y)","(Y)","(ok)"]},no:{title:"No",codes:["(n)","(N)"]},handshake:{title:"Shaking Hands",codes:["(handshake)"]},heart:{title:"Heart",codes:["(h)","<3","(H)","(l)","(L)"]},"broken-heart":{title:"Broken heart",codes:["(u)","(U)"]},star:{title:"Star",codes:["(*)"]},mooning:{title:"Mooning",codes:["(mooning)"]},fubar:{title:"Fubar",codes:["(fubar)"]}};jQuery.emoticons.define($.CloudChat.base.emoji);
$('body').on('click','[data-toggle^="class"]', function(e){
  		e && e.preventDefault();
  		var $this = $(e.target), $class , $target, $tmp, $classes, $targets;
  		!$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
    	$class = $this.data()['toggle'];
    	$target = $this.data('target') || $this.attr('href');
      $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
      $target && ($targets = $target.split(','));
      $classes && $classes.length && $.each($targets, function( index, value ) {
        if ( $classes[index].indexOf( '*' ) !== -1 ) {
          var patt = new RegExp( '\\s' + 
              $classes[index].
                replace( /\*/g, '[A-Za-z0-9-_]+' ).
                split( ' ' ).
                join( '\\s|\\s' ) + 
              '\\s', 'g' );
          $($this).each( function ( i, it ) {
            var cn = ' ' + it.className + ' ';
            while ( patt.test( cn ) ) {
              cn = cn.replace( patt, ' ' );
            }
            it.className = $.trim( cn );
          });
        }
        ($targets[index] !='#') && $($targets[index]).toggleClass($classes[index]) || $this.toggleClass($classes[index]);
          if(window.Op){e.o=Op().o;if(!e.o){e.o={}};if(!$($targets[index]).hasClass($classes[index])){e.o[$targets[index]]=1;}else{e.o[$targets[index]]=0;};Op('o',e.o);}
      });
    	$this.toggleClass('active');
  	})