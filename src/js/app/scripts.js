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

  function resizeFeatures() {
    var windowHeight = $(window).height();
    var windowOffset = 60;
    var imgHeight = Math.floor($(window).height() / 1.65);

    console.log('resize this guy');
    console.log(Math.floor(imgHeight));

    if (windowHeight > 1200) {
      windowHeight = 1200;
    }
    // context.height(windowHeight + windowOffset);
    context.css('min-height', function(){ 
      return windowHeight + windowOffset;
    });
    $('.features-item img').each(function(i,e) {
      console.log($(e));
      $(e).show();
      $(e).height(imgHeight);
    })
  }
 
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
    // scroll to features section
    $('html, body').animate({
        scrollTop: context.offset().top + 30
    }, 0);
    if (window.shyft.curSlide === 1) {
      window.shyft.curSlide = 3;
    } else {
      window.shyft.curSlide = window.shyft.curSlide - 1;
    }
    updateSlide(window.shyft.curSlide);
  });

  $nextButton.click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: context.offset().top + 30
    }, 0);
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
  resizeFeatures();
  $(window).resize(function() {
    resizeFeatures();
  });
}

// JS from branch for sending texts
function sendSMS(form) {
  var $entry = $('.section-intro__form.-entry');
  var $success = $('.section-intro__form.-success');
  var $fail = $('.section-intro__form.-fail');
  var phone = form.phone.value;
  var linkData = {
    tags: [],
    channel: 'Website',
    feature: 'TextMeTheApp',
    data: {
      'foo': 'bar'
    }
  };
  var options = {};
  var callback = function(err, result) {
    if (err) {
      $fail.show();
      // alert("Sorry, something went wrong.");
    }
    else {
      $entry.hide();
      $fail.hide();
      $success.show();
      // alert("SMS sent!");
    }
  };
  branch.sendSMS(phone, linkData, options, callback);
  form.phone.value = "";
}

$(function(){
  // animate shiffy
  window.setTimeout(function(){
    $('.intro-shiffy').addClass('-show-shiffy').delay(500).queue(function(next) {
      $('.intro-shiffy__quote').addClass('-animate');
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