
var mysql=require('mysql'),fs=require('fs');
var conf=JSON.parse(fs.readFileSync('conf.json','UTF8'));conf.multipleStatements=true;
var conn=mysql.createConnection(conf);
s={};
s.cron=function(){
        conn.query('SELECT ke,hist FROM Ops WHERE hist !=?',[0],function(er,r){//10 day history limit
            if(er){console.log('cron.js : SQL ERROR');console.log(er);return;}
            if(r&&r[0]){
                er='';
                r.forEach(function(v){
                    er+='DELETE FROM Crumbs WHERE ke="'+v.ke+'" AND `end` < NOW() - INTERVAL '+v.hist+' DAY;DELETE FROM Chats WHERE ke="'+v.ke+'" AND `end` < NOW() - INTERVAL '+v.hist+' DAY;';
                });
                conn.query(er);
            }
        })
}
s.day=setInterval(function(){//Do cron once a day
    s.cron();
},60000*60*12);
s.cron();//do once on restart