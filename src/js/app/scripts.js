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

  function resizeFeatures() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var windowOffset = 60;
    var imgHeight = Math.floor($(window).height() / 1.65);

    if (windowHeight > 1200) {
      windowHeight = 1200;
    }

    if (windowHeight > (windowWidth * 0.8)) {
      imgHeight = 372;
    }

    // context.height(windowHeight + windowOffset);
    if (windowHeight < (windowWidth * 0.8)) {
      context.css('min-height', function(){ 
        return windowHeight + windowOffset;
      });
    }
    $('.features-item img').each(function(i,e) {

      $(e).show();
      $(e).height(imgHeight);
    })
  }
 
  function updateSlide(slide) {
    $slideBackground.attr('class','');
    $slideBackground.addClass('features-top -slide' + slide);
    $quotes.each(function(i,e) {
      $(e).hide();
      if ($(e).hasClass('features-controls__slide' + slide)) {
        $(e).fadeIn();
      }
    });
    $featureSlides.each(function(i,e) {
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
  var $shiffy = $('.intro-shiffy');
  var $spinner = $('.section-intro__spinner');
  var $button = $('.button__signup');
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

  $button.prop('disabled', true);
  $spinner.show();

  var callback = function(err, result) {
    if (err) {
      $fail.show();
      $shiffy.hide();
      $button.prop('disabled', false);
      $spinner.hide();
    }
    else {
      $fail.hide();
      $success.show();
      $shiffy.hide();
      $button.prop('disabled', false);
      $spinner.hide();
      // Facebook tracking
      fbq('trackCustom', 'CompleteTextLink');
      ga('send', 'event', 'Shyft For Teams', 'User requested a text link to the app', 'Marketing Site');
    }
  };
  branch.sendSMS(phone, linkData, options, callback);
  form.phone.value = "";
}

// handles the mobiles slideshow
function handleMobileSlider() {
  var carousel = $('.features-slider--mobile');
  carousel.slick({
    prevArrow: $('.features-controls__prev--mobile'),
    nextArrow: $('.features-controls__next--mobile')
  });

  carousel.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    if (nextSlide < 4) {
      carousel.removeClass('-slide2');
      carousel.removeClass('-slide3');
      carousel.addClass('-slide1');
    } else if (nextSlide > 3 && nextSlide < 8) {
      carousel.removeClass('-slide1');
      carousel.removeClass('-slide3');
      carousel.addClass('-slide2');
    } else if (nextSlide > 7 && nextSlide < 12) {
      carousel.removeClass('-slide1');
      carousel.removeClass('-slide2');
      carousel.addClass('-slide3');
    }
  });
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
  // mobile slider
  handleMobileSlider();
});

// $("#div").addClass("error").delay(1000).queue(function(next){
//     $(this).removeClass("error");
//     next();
// });