var getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.MozGetUserMedia||navigator.oGetUserMedia||navigator.msGetUserMedia;
  $(function(a) {a={};
    var video = document.getElementById('monitor')
      , canvas = document.getElementById('capture')
      , filter = new Worker('/libs/js/edge.js');
                 //recieve
    HBChat.on('v', function(d) {
        switch(d.f){
            case's':
              d.e=$('#receive_'+d.uid+'_'+d.bid)
              if(d.e.length===0){$('#videoChats').append('<img id="receive_'+d.uid+'_'+d.bid+'" style="width:320px;height:240px"><audio id="audio_'+d.uid+'_'+d.bid+'" style="display:none" controls="controls" autobuffer="autobuffer" autoplay="autoplay"><source /></audio>')}
              d.e.attr('src',d.d);
            break;
        }
        console.log(d)
    });
                 //end recieve
//    navigator.webkitGetUserMedia({
//        video: true, audio: true, toString:function(){return 'video, audio';}
//    },function(d){
//        video.src = URL.createObjectURL(d);
//        video.addEventListener('error', function() {
//            stream.stop();
//        });
//        $(video).click(function(e){
//            if(this.paused){a.contV(1)}else{a.contV(2)}
//        });
//        video.volume=0
//        a.contV(1)
//    },function(e){
//        console.log('Video is not possible. No Camera');return false;
//    });
      a.contV=function(e){switch(e){case 1:video.play();a.sendV=setInterval(function(e) {
          var ctx = canvas.getContext('2d');
          ctx.drawImage(video,0,0,320, 240);
          HBChat.emit('v',{f:'s',d:canvas.toDataURL()});
        },1000);break;case 2:video.pause();clearInterval(a.sendV);delete(a.sendV);break;}}
  });