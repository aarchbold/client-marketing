/* eslint-disable */

$.fn.handleMenu = function() {
    var context = $(this),
        $menuBtn = $('.main-navigation__mobile-button', context),
        $menu = $('.main-navigation__business', context);

    $menuBtn.click(function(e) {
        e.preventDefault();
        if ($menuBtn.hasClass('fa-bars')) {
            $menuBtn.addClass('fa-times');
            $menuBtn.removeClass('fa-bars');
            $menu.fadeIn();
        } else {
            $menuBtn.addClass('fa-bars');
            $menuBtn.removeClass('fa-times');
            $menu.fadeOut();
        };
    });
};

$.fn.handleAnimations = function() {
    var context = $(this),
        $cert = $('.compliance-img__cert', context),
        $shiffy = $('.section-intro__image', context),
        $quote1 = $('.space-quote1', context),
        $quote2 = $('.space-quote2', context);

    setTimeout(function(){
        $shiffy.addClass('-animate');
        $cert.addClass('-animate');
    },1000)

    setTimeout(function(){
        $quote1.addClass('-animate');
    },2000)

    setTimeout(function(){
        $quote2.addClass('-animate');
    },4000)

};

$.fn.initCalc = function() {
    var context = $(this),
        calculator;

    console.log(context);

    // Load the calculator code
    $.get('includes/calculator.html', function(data) {
        console.log(data);
        context.html(data);
        calculator = $('#calculator');
        console.log(calculator);
    });
};

$.fn.handleModal = function() {
    var $requestDemoButton = $(this),
        $modal = $('.modal-overlay');

    function doFormStuff(modal) {
        var $context = modal,
            $closeButton = $('.modal-button__close', $context);
        console.log(modal);

        $closeButton.click(function(e) {
            modal.empty();
            $modal.removeClass('-active');
        });
    }

    $requestDemoButton.click(function(e) {
        e.preventDefault();
        $modal.addClass('-active');
        $.get('includes/request-demo.html', function(data) {
            console.log(data);
            $modal.html(data);
            doFormStuff($modal);
        });
    });
};

$(function(){
  // alert('hi');
  $('.main-navigation').handleMenu();

  // slide in shiffy
  $('.section-animate').handleAnimations();

  // inject calculator
  $('.section-increase-profits').initCalc();

  // modal hook
  $('.modal-request-demo').handleModal();

});
