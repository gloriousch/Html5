
/* window.onload比 $(function(){}) 加载的更晚一些，这样那些宽度的计算在Chrome中就可以准确计算了*/ 
function wfgd() {
  
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
    
  }; 
}

      