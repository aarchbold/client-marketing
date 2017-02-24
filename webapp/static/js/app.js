/* eslint-disable */

// Newsletter Signup Handling
$.fn.handleNewsletter = function(){
  var context = $(this),
    $input = $('.newsletter-signup__input', context),
    $button = $('.button__signup', context),
    $success = $('.newsletter-signup__form.-success', context),
    $fail = $('.newsletter-signup__form.-fail', context),
    $entry = $('.newsletter-signup__form.-entry', context),
    $spinner = $('.newsletter-signup__spinner', context),
    $errorMsg = $('.newsletter-signup__error-msg', context),
    errorDefault = 'Oops! Something went wrong. Please make sure you\'ve entered a valid Email address.',
    validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;


  function disableForm() {
    $input.prop('disabled', true);
    $button.prop('disabled', true);
    $spinner.show();
  }

  function enableForm() {
    $input.prop('disabled', false);
    $button.prop('disabled', false);
    $spinner.hide();
  }

  function submitForm() {
    $input.removeClass('-error');
    $fail.hide();
    $success.hide();
    // TODO: make sure email is valid.
    if (validEmail.test($input.val())) {
      // send to service
      disableForm();
      newsletterSignup($input.val());
    } else {
      $errorMsg.html(errorDefault);
      $fail.show();
      $input.addClass('-error');
    };
  }

  function newsletterSignup(value) {
    console.log('signs up for email service');
    var signupUrl = 'https://cxmdzic2yc.execute-api.us-east-1.amazonaws.com/prod/track';
    var postData = 'email=' + value;

    // TODO: wire this up with proper 
    $.post(signupUrl, postData, function() {
      // successful sign up
      $success.show();
      $fail.hide();
      $entry.hide();
      enableForm();
    })
    .fail(function(response) {
      // failed signup
      if (response && response.responseText) {
        // insert error message from server
        $errorMsg.html(JSON.parse(response.responseText).error);
      } else {
        // show default error
        $errorMsg.html(errorDefault);
      }
      $success.hide();
      $fail.show();
      $input.addClass('-error');
      enableForm();
    });
  }

  $button.click(function(e) {
    e.preventDefault();
    submitForm();
  });

  $input.keyup(function(e) {
    if (e.which === 13) {
      submitForm();
    }
  });

}


$(function(){
  $('.newsletter-signup').handleNewsletter();
});

