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
        $introShiffy = $('.intro-shiffy__container', context),
        $introBubble = $('.intro-shiffy__bubble', context),
        $shiffySched = $('.section-intro__image .-shiffy', context),
        $map = $('.map-phone__container', context),
        $mapThumb = $('.map-phone__container .map-thumb', context),
        $pin1 = $('.-pin-green', context),
        $pin2 = $('.-pin-blue', context),
        $hero1 = $('.-icon-purple', context),
        $hero2 = $('.-icon-red', context),
        $hero3 = $('.-icon-yellow', context),
        $hero4 = $('.-icon-blue', context),
        $hero5 = $('.-icon-green', context);

    setTimeout(function(){
        $shiffy.addClass('-animate');
        $cert.addClass('-animate');
        $introShiffy.addClass('-animate');
        $map.addClass('-animate');
        $hero1.addClass('-animate');
    },1000)

    setTimeout(function(){
        $introBubble.fadeIn();
        $shiffySched.addClass('-animate');
        $mapThumb.addClass('-animate');
    },1400)

    setTimeout(function(){
        $hero2.addClass('-animate');
    },2000)

    setTimeout(function(){
        $pin1.addClass('-animate');
    },2500)

    setTimeout(function(){
        $pin2.addClass('-animate');
        $hero3.addClass('-animate');
    },3000)

    setTimeout(function(){
        $hero4.addClass('-animate');
    },4000)

    setTimeout(function(){
        $hero5.addClass('-animate');
    },5000)

};

$.fn.initCalc = function() {
    var context = $(this),
        calculator;

    function initCalc(calculator) {
        var $context = calculator,
            $total = $('.calc-total', $context),
            $numEmployees = $('#numEmployees', $context),
            $callOutRequests = $('#callOutRequests', $context),
            $shiftDuration = $('#shiftDuration', $context),
            $profitPerLabor = $('#profitPerLabor', $context),
            $noShows = $('#noShows', $context);

        function makePercentage(value) {
            return value / 100;
        }

        function calculateTotal() {
            var total = Math.round($numEmployees.val() * ($callOutRequests.val() * 12) * $shiftDuration.val() * $profitPerLabor.val() * makePercentage($noShows.val()));
            var prettyNumber = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            //console.log(prettyNumber);
            $total.html(prettyNumber);
        }

        $numEmployees.on('focus', function(e) {
            $(this).parent().addClass('-focus');
        });
        $numEmployees.on('blur', function(e) {
            $(this).parent().removeClass('-focus');
        });
        $numEmployees.on('input propertychange', function(e) {
            if (this.value.length > 7) {
                this.value = this.value.slice(0, 7);
            }
            calculateTotal();
        });
        $callOutRequests.on('focus', function(e) {
            $(this).parent().addClass('-focus');
        });
        $callOutRequests.on('blur', function(e) {
            $(this).parent().removeClass('-focus');
        });
        $callOutRequests.on('input propertychange', function() {
            if (this.value.length > 4) {
                this.value = this.value.slice(0, 4);
            }
            calculateTotal();
        });
        $shiftDuration.on('focus', function(e) {
            $(this).parent().addClass('-focus');
        });
        $shiftDuration.on('blur', function(e) {
            $(this).parent().removeClass('-focus');
        });
        $shiftDuration.on('input propertychange', function() {
            if (this.value.length > 2) {
                this.value = this.value.slice(0, 2);
            }
            calculateTotal();
        });
        $profitPerLabor.on('focus', function(e) {
            $(this).parent().addClass('-focus');
        });
        $profitPerLabor.on('blur', function(e) {
            $(this).parent().removeClass('-focus');
        });
        $profitPerLabor.on('input propertychange', function() {
            if (this.value.length > 5) {
                this.value = this.value.slice(0, 5);
            }
            calculateTotal();
        });
        $noShows.on('focus', function(e) {
            $(this).parent().addClass('-focus');
        });
        $noShows.on('blur', function(e) {
            $(this).parent().removeClass('-focus');
        });
        $noShows.on('input propertychange', function() {
            if (this.value.length > 3) {
                this.value = this.value.slice(0, 3);
            }
            calculateTotal();
        });

        console.log($context);
        console.log($total);

        calculateTotal();

    }

    // Load the calculator code
    $.get('business/includes/calculator.html', function(data) {
        context.html(data);
        calculator = $('#calculator');
        initCalc(calculator);
        $('.modal-request-demo__calc').handleModal()
    });
};


// Handles all the stuffs with the request demo modal
$.fn.handleModal = function() {
    var $requestDemoButton = $(this);

    // handle the form and interactions with the modal
    function doFormStuff(modal) {
        var $context = modal,
            $closeButton = $('.modal-button__close', $context),
            $thanksCloseBtn = $('.-close', $context),
            $inputs = $('.modal-input', $context),
            $fullname = $('#fullName', $context),
            $jobtitle = $('#jobTitle', $context),
            $workEmail = $('#workEmail', $context),
            $companyName = $('#companyName', $context),
            $numEmployees = $('#numEmployees', $context),
            $submit = $('.modal-button', $context),
            validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|jobs|name|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
            $headerRequest = $('.modal-header.-request', $context),
            $headerThanks = $('.modal-header.-thanks', $context),
            $bodyRequest = $('.modal-content.-request', $context),
            $bodyThanks = $('.modal-content.-thanks', $context),
            $successName = $('.form-firstname', $context);

        function sendToMixPanel() {
            var postData = {
                'Fullname': $fullname.val(),
                'Jobtitle': $jobtitle.val(),
                'Email': $workEmail.val(),
                'Company': $companyName.val(),
                'Employees': $numEmployees.val()
            };
            console.log(postData);
            mixpanel.track(
                'DemoRequest',
                postData,
                function(e){
                    console.log('Mixpanel tracked!');
                    console.log(e);
                    $successName.html($fullname.val());
                    $headerRequest.hide();
                    $bodyRequest.hide();
                    $headerThanks.show();
                    $bodyThanks.show();
                    // go to the thank you page
                }
            );
        }

        function validateForm() {
            var valid = true;

            if ($fullname.val() === '') {
                alert('huh?');
                $fullname.addClass('-error');
            } else {
                $fullname.removeClass('-error');
            }
            if ($jobtitle.val() === '') {
                $jobtitle.addClass('-error');
            } else {
                $jobtitle.removeClass('-error');
            }
            if ($workEmail.val() === '' || !validEmail.test($workEmail.val())) {
                $workEmail.addClass('-error');
            } else {
                $workEmail.removeClass('-error');
            }
            if ($companyName.val() === '') {
                $companyName.addClass('-error');
            } else {
                $companyName.removeClass('-error');
            }
            if ($numEmployees.val() === '0') {
                $numEmployees.addClass('-error');
            } else {
                $numEmployees.removeClass('-error');
            }

            $inputs.each(function(i,e) {
                console.log(e);
                if ($(e).hasClass('-error')) {
                    valid = false;
                }
            })
            if ($numEmployees.val() === '0') {
                valid = false;
            }

            if (valid === true) {
                sendToMixPanel()
            }
        }

        $submit.click(function(e) {
            e.preventDefault();
            // verify that fields are filled
            validateForm();
        })

        $closeButton.click(function(e) {
            e.preventDefault();
            modal.empty();
            modal.removeClass('-active');
            modal.remove();
            $('body').css('overflow','visible');
            window.location.hash = 'close';
        });

        $thanksCloseBtn.click(function(e) {
            e.preventDefault();
            modal.empty();
            modal.removeClass('-active');
            modal.remove();
            $('body').css('overflow','visible');
            window.location.hash = 'close';
        })

        modal.click(function(e) {
            // close the modal when user clicks on the overlay
            if ($(e.target).hasClass('modal-overlay')) {
                modal.empty();
                modal.removeClass('-active');
                modal.remove();
                $('body').css('overflow','visible');
                window.location.hash = 'close';
            }
        })

        $(window).on('hashchange', function() {
            if (window.location.has !== 'requestInfo') {
                $closeButton.trigger('click');
            }
        });

    }

    // inject the modal inside the <body> tag
    function addModalToDom() {
        // create an instance of the overlay
        var $overlay = $('<div class="modal-overlay"></div>');
        $('body').prepend($overlay);
        $overlay.addClass('-active');
        $('body').css('overflow','hidden');
        // load the modal content
        $.get('business/includes/request-demo.html', function(data) {
            $overlay.html(data);
            doFormStuff($overlay);
        });
    }

    $requestDemoButton.click(function(e) {
        e.preventDefault();
        window.location.hash = '#requestInfo';
        addModalToDom();
    });
};

$.fn.setGetShyftLink = function() {
    var $button = $(this),
        ua = navigator.userAgent.toLowerCase(),
        isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
    if ($button.length && isAndroid) {
        $button.attr('href','https://play.google.com/store/apps/details?id=com.coffeeenterprise&hl=en');
    }
};


$(function(){
  $('.main-navigation').handleMenu();

  // slide in shiffy
  $('.section-animate').handleAnimations();

  // inject calculator
  $('.section-increase-profits').initCalc();

  // modal hook
  $('.modal-request-demo').handleModal();

  // set mobile link
  $('.button-get-shyft').setGetShyftLink();

  // lazy load images
  $('.lazy-image').lazyload({
    effect : 'fadeIn',
    threshold : 400
  });

});
