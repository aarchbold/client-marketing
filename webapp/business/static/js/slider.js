
$.fn.handleSlider = function() {
    var $context = $(this),
        $button = $('.-open-login'),
        $overlay = $('.slider-overlay', $context),
        $panel = $('.slder-content', $context),
        $inputPhoneNumber = $('#phoneNumber', $context),
        $backButtons = $('.go-back', $context),
        $phoneInput = $('#phoneNumber', $context),
        $phoneNumberContainer = $('.slider-phone-number', $context);

        // views
        // $viewEnterNumber = $('#view-enter-number', $context),
        // $viewConfirmCode = $('#view-confirm-code', $context),


    function goToView(view) {
        $('.slider-wrapper', $context).each(function(index,elem) {
            console.log(elem);
            $(elem).hide();
        })
        $('#' + view).fadeIn();
    }

    function closeSlider() {
        $('body').css('overflow','visible');
        $panel.removeClass('-active');
        setTimeout(function(){
            $context.removeClass('-active');
            $overlay.removeClass('-active');
        },200)
    }

    function openSlider() {
        $context.addClass('-active');
        $overlay.addClass('-active');
        setTimeout(function(){
            $panel.addClass('-active');
        },200)
        $('body').css('overflow','hidden');
    }

    function checkPhoneNumber() {
        // hit endpoint to send verification code
        // don't have this endpoint yet so just fake it for now
        $phoneNumberContainer.html($phoneInput.val());
        goToView('view-confirm-code');
    }

    $backButtons.each(function(index,elem) {
        $(elem).click(function(e) {
            e.preventDefault();
            goToView($(elem).attr('data-view'));
        })
    })

    $inputPhoneNumber.keyup(function(e) {
        if (e.keyCode === 13) {
            checkPhoneNumber();
        }
    });

    $button.click(function(e) {
        e.preventDefault();
        openSlider();
    });

    $overlay.click(function(e) {
        e.preventDefault();
        closeSlider();
    });

    function submitCode() {
        var $code1 = $('#code1', $context),
            $code2 = $('#code2', $context),
            $code3 = $('#code3', $context),
            $code4 = $('#code4', $context),
            postData = {
                code: $code1.val() + $code2.val() + $code3.val() + $code4.val()
            };
        console.log(postData);
        closeSlider();
    }

    $('#slider-login', $context).click(function(e) {
        e.preventDefault();
        submitCode();
    });
};

$(function(){
  $.get('business/includes/slider.html', function(data) {
      console.log(data);
      $('.slder-content').html(data);
      $('.slider-container').handleSlider();
  });
});
