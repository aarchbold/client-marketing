/* eslint-disable */

// global vars
window.shyft = {
  curSlide: 1
}

// Handle the features carousel states
$.fn.handleFeatureSlides = function() {
  var context = $(this),
    sectionHeight = 200,
    $slideBackground = $('.features-top', context),
    $quotes = $('.features-controls__text p', context),
    $featureSlides = $('.feature-slide', context),
    $prevButton = $('.features-controls__prev', context),
    $nextButton = $('.features-controls__next', context);
  console.log(this);

  function updateSlide(slide) {
    console.log(slide);
    $slideBackground.attr('class','');
    $slideBackground.addClass('features-top -slide' + slide);
    $quotes.each(function(i,e) {
      $(e).hide();
      if ($(e).hasClass('features-controls__slide' + slide)) {
        $(e).fadeIn();
      }
    });
    $featureSlides.each(function(i,e) {
      console.log($(e))
      $(e).hide();
      if ($(e).hasClass('features-slide' + slide)) {
        $('.features-item').each(function(i,element) {
          $(element).css('transform','translateY(100%)');
        })
        $(e).show();
        $('.features-item', $(e)).each(function(i,element) {
          if (i === 0) {
            window.setTimeout(function() {
              $(element).css('transform','translateY(0)');
            },100)
          } else if (i === 1) {
            window.setTimeout(function() {
              $(element).css('transform','translateY(0)');
            },200)
          } else if (i === 2) {
            window.setTimeout(function() {
              $(element).css('transform','translateY(0)');
            },300)
          }
        })
      }
    })
  }

  $prevButton.click(function(e) {
    e.preventDefault();
    if (window.shyft.curSlide === 1) {
      window.shyft.curSlide = 3;
    } else {
      window.shyft.curSlide = window.shyft.curSlide - 1;
    }
    updateSlide(window.shyft.curSlide);
  });

  $nextButton.click(function(e) {
    e.preventDefault();
    if (window.shyft.curSlide === 3) {
      window.shyft.curSlide = 1;
    } else {
      window.shyft.curSlide = window.shyft.curSlide + 1;
    }
    updateSlide(window.shyft.curSlide);
  });

  // force height of section
  // context.attr('style','');
  // context.height(context.height() + 100);
  console.log(context.height());
}

$(function(){
  // animate shiffy
  window.setTimeout(function(){
    $('.intro-shiffy').addClass('-show-shiffy').delay(500).queue(function(next) {
      $('.intro-shiffy__quote').addClass('-animate');
      $();
      next();
    });
  }, 800)
  window.setTimeout(function(){
    $('.intro-shiffy__quote-text').show();
  }, 1600)
  
  $('.section-features').handleFeatureSlides();
  $( window ).resize(function() {
    // $('.section-features').handleFeatureSlides();
  });
});

// $("#div").addClass("error").delay(1000).queue(function(next){
//     $(this).removeClass("error");
//     next();
// });