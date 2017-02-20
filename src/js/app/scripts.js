/* eslint-disable */

// Newsletter Signup Handling
$.fn.handleNewsletter = function(){
  var context = $(this),
    $input = $('.newsletter-signup__input', context),
    $button = $('.button__signup', context),
    $sucess = $('.newsletter-signup__form.-success', context),
    $fail = $('.newsletter-signup__form.-fail', context),
    $spinner = $('.newsletter-signup__spinner', context),
    validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

  console.log($input);
  console.log($button);
  console.log($sucess);
  console.log($fail);

  function newsletterSignup(value) {
    console.log('signs up for email service');
    var signupUrl = 'http://www.someurl.com/api/capture_email';
    var postData = {
      email: value
    };
    // TODO: wire this up with proper 
    $.post(signupUrl, JSON.stringify(postData), function() {
      // successful sign up
      $sucess.show();
      $fail.hide();
    })
    .fail(function(response) {
      // failed signup
      $sucess.hide();
      $fail.show();
      $input.addClass('-error');
    });
  }

  $button.click(function(e) {
    e.preventDefault();
    $input.removeClass('-error');
    // TODO: make sure email is valid.

    // TODO: if valid, disable input and show spinner

    // send to service
    newsletterSignup($input.val());
  });

}


$(function(){
  $('.newsletter-signup').handleNewsletter();
});

