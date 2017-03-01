$.M={};
$.M.tm=function(x,d,z){
    if(!d){d={}};d.tmp='';
    switch(x){
        case 0://draw coupon users
            if(!d.name||d.name===''){d.name='<i>No Name</i>'};
            d.tmp+='<tr><td>'+d.ke+'</td><td>'+d.name+'</td><td>'+d.mail+'</td></tr>';
        break;
    }
    return d.tmp;
}
$.M.pm=function(x,d,z){
    if(!d){d={}};d.tmp='';
    switch(x){
        case 0://draw coupon users
            $.each(d,function(n,v){
                d.tmp+=$.M.tm(x,v,z);
                if(z){$(z).append(d.tmp);}
            });
        break;
    }
    return d.tmp;
}