/* eslint-disable */



$(function(){
  // animate shiffy
  window.setTimeout(function(){
    $('.intro-shiffy').addClass('-show-shiffy').delay(500).queue(function(next) {
      $('.intro-shiffy__quote').addClass('-animate');
      $();
      next();
    });
  }, 1000)
  window.setTimeout(function(){
    $('.intro-shiffy__quote-text').show();
  }, 1800)
  
});

// $("#div").addClass("error").delay(1000).queue(function(next){
//     $(this).removeClass("error");
//     next();
// });