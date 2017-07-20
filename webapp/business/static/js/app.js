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
            var total = Math.round($numEmployees.val() * $callOutRequests.val() * $shiftDuration.val() * $profitPerLabor.val() * makePercentage($noShows.val()));
            var prettyNumber = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            //console.log(prettyNumber);
            $total.html(prettyNumber);
        }

        $numEmployees.on('input propertychange', function() {
            calculateTotal();
        });
        $callOutRequests.on('input propertychange', function() {
            calculateTotal();
        });
        $shiftDuration.on('input propertychange', function() {
            calculateTotal();
        });
        $profitPerLabor.on('input propertychange', function() {
            calculateTotal();
        });
        $noShows.on('input propertychange', function() {
            calculateTotal();
        });

        console.log($context);
        console.log($total);

        calculateTotal();

    }

    // Load the calculator code
    $.get('includes/calculator.html', function(data) {
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
            $firstname = $('#firstName', $context),
            $lastName = $('#lastName', $context),
            $workEmail = $('#workEmail', $context),
            $companyName = $('#companyName', $context),
            $numEmployees = $('#numEmployees', $context),
            $submit = $('.modal-button', $context),
            validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|jobs|name|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
            $headerRequest = $('.modal-header.-request', $context),
            $headerThanks = $('.modal-header.-thanks', $context),
            $bodyRequest = $('.modal-content.-request', $context),
            $bodyThanks = $('.modal-content.-thanks', $context);

        function sendToMixPanel() {
            var postData = {
                'Firstname': $firstname.val(),
                'Lastname': $lastName.val(),
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

            if ($firstname.val() === '') {
                $firstname.addClass('-error');
            } else {
                $firstname.removeClass('-error');
            }
            if ($lastName.val() === '') {
                $lastName.addClass('-error');
            } else {
                $lastName.removeClass('-error');
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
        });

        $thanksCloseBtn.click(function(e) {
            e.preventDefault();
            modal.empty();
            modal.removeClass('-active');
            modal.remove();
        })

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
