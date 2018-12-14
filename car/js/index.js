var line = document.getElementById("line");
$('#music').get(0).play();
$(".music-icon").click(function(){
    if ($('#music')[0].paused){
      run(6000); 
      $('#music').get(0).play();
      // $("#line").addClass('round');
      // $('.music-icon').css('animation-play-state','running');
      // alert("播放");
      
    }
    else {
      $('#music').get(0).pause();
      // $("#line").removeClass('round');
      $("#container #content").stop(); 
      // alert("停止");

    }
})

  
  /*计算一个segment的宽度*/

  var segmentWidth = 0; 
  $("#container #content li").each(function(){ 
    segmentWidth+= $(this).outerWidth(true); 
  }); 

  $("#container #content li").clone().appendTo($("#container #content")); 

  run(6000); 

  function run(interval){ 
    $("#container #content").animate({"left":-segmentWidth}, interval,"linear",function(){ 
      $("#container #content").css("left",0); 
      run(6000); 
    }); 
  } 