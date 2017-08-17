
$.fn.handleSlider = function() {
    var API_ROOT = 'http://testdashboard-env.us-west-2.elasticbeanstalk.com/',
        VERIFICATION_PAYLOAD = {'phone_number':'','country':'','country_code':''},
        $context = $(this),
        $spinner = $('.slider-spinner', $context),
        $button = $('.-open-login'),
        $overlay = $('.slider-overlay', $context),
        $panel = $('.slder-content', $context),
        $inputPhoneNumber = $('#phoneNumber', $context),
        $resendCode = $('.button-resend', $context),
        $viewButtons = $('.go-to-view', $context),
        $phoneInput = $('#phoneNumber', $context),
        $phoneNumberContainer = $('.slider-phone-number', $context),
        $signupInput = $('.slider-signup-cta__input', $context),
        $teamName = $('.slider-team-name', $context),
        $bioFirstName = $('#bioFirstName', $context),
        $bioLastName = $('#bioLastName', $context),
        $bioJobTitle = $('#bioJobTitle', $context),
        $createProfile = $('#slider-save-profile', $context);

        // views
        // $viewEnterNumber = $('#view-enter-number', $context),
        // $viewConfirmCode = $('#view-confirm-code', $context),


    function goToView(view) {
        $('.slider-wrapper', $context).each(function(index,elem) {
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
        // format the phone number (just check for dashes for now)
        var rawNumber = $phoneInput.val();
        var processedNumber = rawNumber.replace(/\-/g,'');

        // format the data for sending
        VERIFICATION_PAYLOAD.country = 'USA';
        VERIFICATION_PAYLOAD.country_code = '1';
        VERIFICATION_PAYLOAD.phone_number = VERIFICATION_PAYLOAD.country_code + processedNumber;
        $.post(API_ROOT + 'sessions/verification_code_signin', VERIFICATION_PAYLOAD, function(data) {
             $spinner.hide();
             if (data.code === 1) {
                 console.log(data.code);
                 var formattedPhoneNumber = VERIFICATION_PAYLOAD.phone_number.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "$1-$2-$3-$4");
                 $phoneNumberContainer.html(formattedPhoneNumber);
                 goToView('view-confirm-code');
                 $('.slider-mobile-entry', $context).removeClass('-error');
                 $('.slider-phone-error', $context).hide();
             } else {
                 $('.slider-phone-error', $context).show();
                 $('.slider-mobile-entry', $context).addClass('-error');
             }
        })
        .fail(function(response) {
            $spinner.hide();
            $('.slider-mobile-entry', $context).addClass('-error');
            $('.slider-phone-error', $context).show();
        });
    }

    function saveProfile() {
        // TODO: validation!
        // TODO: make POST request to save the data and go to next view
        $spinner.hide();
        goToView('view-signup-phone');
    }

    $resendCode.click(function(e) {
        e.preventDefault();
        $spinner.show();
        checkPhoneNumber();
    })

    $createProfile.click(function(e) {
        e.preventDefault();
        $spinner.show();
        setTimeout(function(){
            saveProfile();
        },1000)
    });

    $viewButtons.each(function(index,elem) {
        $(elem).click(function(e) {
            e.preventDefault();
            goToView($(elem).attr('data-view'));
        });
    });

    $inputPhoneNumber.keyup(function(e) {
        if (e.keyCode === 13) {
            $spinner.show();
            checkPhoneNumber();
        }
    });

    $signupInput.keyup(function(e) {
        if (e.keyCode === 13) {
            // TODO: add POST to endoint for sending verification code
            $teamName.html($signupInput.val());
            goToView('view-more-info');
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

    // TODO: add POST to endoint for checking code
    function submitCode() {
        var $code1 = $('#code1', $context),
            $code2 = $('#code2', $context),
            $code3 = $('#code3', $context),
            $code4 = $('#code4', $context),
            postData = {
                code: $code1.val() + $code2.val() + $code3.val() + $code4.val()
            };
        closeSlider();
    }

    $('#slider-login', $context).click(function(e) {
        e.preventDefault();
        submitCode();
    });
};

$(function(){
  $.get('business/includes/slider.html', function(data) {
      $('.slder-content').html(data);
      $('.slider-container').handleSlider();
  });
});
