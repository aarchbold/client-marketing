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
        $shiffy = $('.section-intro__image', context);

    setTimeout(function(){
        $shiffy.addClass('-animate');
    },1000)
};

$(function(){
  // alert('hi');
  $('.main-navigation').handleMenu();

  // slide in shiffy
  $('.section-intro').handleAnimations();

});
