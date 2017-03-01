    $('#loginform [type=submit]').prop('disabled',false);
    $(document).ready(function(o){
        HBR.loggedIn=false;
    $('#login_input_sub').change(function(e){
        e.f=$('[for="login_input_sub"] i');e.l=Op(null,null,'unmLogin_'+location.hostname).login;e.c=$(this).is(':checked'),e.cc=$('[for="login_input_sub"]');
        if(e.c){
            e.m='Sub';e.cc.addClass('checked');
        }else{
            e.m='Master';e.cc.removeClass('checked');
        }
        if(!e.l){e.l={}};e.l.sub=e.c;
        Op('login',e.l,'unmLogin_'+location.hostname)
        $('#login_type span').html(e.m)
    }).change();

            o=Op(null,null,'unmLogin_'+location.hostname).login;
            if(!o){o={}};
            if(o&&o.user&&o.pass){
                $('#login_input_name').val(o.user),$('#login_input_password').val(o.pass),$('#login_input_key').val(o.ke);
                if(o.sub==true){$('#login_input_sub').prop('checked',true).change()};
//                <?php if(!isset($path[4])){ ?>$('#login_input_key').val(o.ke);<?php } ?>
                setTimeout(function(){$('#loginform').submit()},200)
            }
    $('#loginform').submit(function(e){
        e.preventDefault();e.e=$(this);
        e.s=e.e.serialize();e.cf=e.e.find('input,[type=submit]').prop('disabled',true);
        if(e.s.ke===''){$('#login_msg').text('Please Enter Your Key');return false;}
        $.post('/p/a/',e.s,function(d){
            try{d=JSON.parse(d)}catch(er){d={success:false,text:d}}
            if(!d.msg){d.msg=''}
            d.p=$('#pkg'),e.ll=$('#login_msg');
            console.log(d)
            if(d.success===true){
                HBR.loggedIn=true;
                $.get('/pg/block/body',function(w){$('#MAIN_FRAME').html(w);$user=d.u;HBCd();$('#login-content').hide();})
            }else{
                if(d.pkg){d.msg+='<span id="pkg">';
                    $.each(d.pkg,function(n,v){
                        d.msg+='<a key="'+v.ke+'">'+v.ke+'</a> ';
                    })
                    d.msg+='</span>';
                }
                e.cf.prop('disabled',false);
            };
            e.ll.html(d.msg);
        })
        return false;
    })
    $('#loginform [type="submit"]').click(function(e){
        if($(this).hasClass('remember')){Op('login',$('#loginform').serializeObject(),'unmLogin_'+location.hostname)}else{Op('login',{},'unmLogin_'+location.hostname)}
    })
    $('body').on('click','[key]',function(e){
        $('[name="ke"]').val($(this).attr('key'));$('#loginform').submit();
    })
    })