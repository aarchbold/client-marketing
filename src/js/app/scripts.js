/* eslint-disable */

$.fn.handleRequestDemo = function() {
    console.log('request demo initialized');
    console.log($(this));
}

// handle the request demo slider
$.fn.handleSlider = function() {
    var $requestDemo = $(this),
        $body = $('body');
        $sliderOverlay = $('.page-slider__overlay'),
        $slider = $('.page-slider');

    function openSlider() {
        $sliderOverlay.addClass('-show');
        $slider.addClass('-show');
        $body.css('overflow', 'hidden');
        $slider.load('../../includes/request-demo.html',function() {
            // load request demo specific javascript here
            $('.request-demo-content').handleRequestDemo();
        });
    }

    function closeSlider() {
        $sliderOverlay.removeClass('-show');
        $slider.removeClass('-show');
        $body.css('overflow', 'visible');
    }

    $requestDemo.click(function() {
        openSlider();
    });

    $sliderOverlay.click(function() {
        closeSlider();
    });
};

$(function(){
    $('.button-rquest-demo').handleSlider();
});
