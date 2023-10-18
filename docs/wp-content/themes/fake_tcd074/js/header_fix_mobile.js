jQuery(document).ready(function($){

  if($(window).scrollTop() > 330) {
    $("body").addClass("header_fix_mobile");
  }

  $(window).scroll(function () {
    if($(this).scrollTop() > 330) {
      $("body").addClass("header_fix_mobile");
    } else {
      if( !$('html').hasClass('open_menu') ){
        $("body").removeClass("header_fix_mobile");
      }
    };
  });


});