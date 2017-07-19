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
        context.html(data);
        calculator = $('#calculator');
        $('.modal-request-demo').handleModal()
    });
};


// Handles all the stuffs with the request demo modal
$.fn.handleModal = function() {
    var $requestDemoButton = $(this);

    // handle the form and interactions with the modal
    function doFormStuff(modal) {
        var $context = modal,
            $closeButton = $('.modal-button__close', $context),
            $inputs = $('input', $context);

        console.log(modal);
        console.log($inputs);

        $closeButton.click(function(e) {
            e.preventDefault();
            modal.empty();
            modal.removeClass('-active');
            modal.remove();
        });
        modal.click(function(e) {
            // close the modal when user clicks on the overlay
            if ($(e.target).hasClass('modal-overlay')) {
                modal.empty();
                modal.removeClass('-active');
                modal.remove();
            }
        })
    }

    // inject the modal inside the <body> tag
    function addModalToDom() {
        // create an instance of the overlay
        var $overlay = $('<div class="modal-overlay"></div>');
        $('body').prepend($overlay);
        $overlay.addClass('-active');
        // load the modal content
        $.get('includes/request-demo.html', function(data) {
            $overlay.html(data);
            doFormStuff($overlay);
        });
    }

    $requestDemoButton.click(function(e) {
        e.preventDefault();
        addModalToDom();
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
