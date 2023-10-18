jQuery(document).ready(function($){

  if($(window).scrollTop() > 330) {
    $("body").addClass("header_fix");
  }

  $(window).scroll(function () {
    if($(this).scrollTop() > 330) {
      $("body").addClass("header_fix");
    } else {
      $("body").removeClass("header_fix");
    };
  });


});