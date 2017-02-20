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
    validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  console.log($input);
  console.log($button);
  console.log($success);
  console.log($fail);

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

  function newsletterSignup(value) {
    console.log('signs up for email service');
    var signupUrl = 'http://www.someurl.com/api/capture_email';
    var postData = {
      email: value
    };
    // TODO: wire this up with proper 
    $.post(signupUrl, JSON.stringify(postData), function() {
      // successful sign up
      $success.show();
      $fail.hide();
      $entry.hide();
      enableForm();
    })
    .fail(function(response) {
      // failed signup
      $success.hide();
      $fail.show();
      $input.addClass('-error');
      enableForm();
    });
  }

  $button.click(function(e) {
    e.preventDefault();
    $input.removeClass('-error');
    $fail.hide();
    $success.hide();
    // TODO: make sure email is valid.
    if (validEmail.test($input.val())) {
      // send to service
      disableForm();
      newsletterSignup($input.val());
    } else {
      $fail.show();
      $input.addClass('-error');
    };
  
  });

}


$(function(){
  $('.newsletter-signup').handleNewsletter();
});

