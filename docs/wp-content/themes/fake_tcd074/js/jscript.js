jQuery(document).ready(function($){

  var $window = $(window);
  var $body = $('body');

  // work category sort -------------------------------
  var $filters = $('.filter [data-filter]');

  $filters.on('click', function(e) {

    //var $boxes = $('.work_list [data-category]');
    var $boxes = $(this).closest('.work_area').find('.work_list .item');

    e.preventDefault();
    var $this = $(this);

    $this.closest('.child_category_list').find('li a').removeClass('active');
    $this.addClass('active');

    var $category_id = $this.attr('data-filter');

    if ($category_id == 'all') {
      $boxes.removeClass('animate')
        .fadeOut().finish().promise().done(function() {
          $boxes.each(function(i) {
            $(this).addClass('animate').delay((i++) * 300).fadeIn();
          });
        });
    } else {
      $boxes.removeClass('animate')
        .fadeOut().finish().promise().done(function() {
          $boxes.filter('[data-category = "' + $category_id + '"]').each(function(i) {
            $(this).addClass('animate').delay((i++) * 300).fadeIn();
          });
        });
    }
  });

  // category sort button
  $(".child_category_list .headline").on('click',function() {
    if($(this).parent().hasClass("open")) {
      $(this).parent().removeClass("open");
      $(this).parent().find('>.sort_button:not(:animated)').slideUp("fast");
      return false;
    } else {
      $(this).parent().addClass("open");
      $(this).parent().find('>.sort_button:not(:animated)').slideDown("fast");
      return false;
    };
  });


  // mega menu -------------------------------------------------

  // mega menu post list animation
  $(document).on({mouseenter : function(){
    $(this).parent().siblings().removeClass('active')
    $(this).parent().addClass('active');
    var $content_id = "." + $(this).attr('class');
    $(".megamenu_blog_list .post_list").hide();
    $($content_id).show();
    return false;
  }}, '.megamenu_blog_list .menu_area a');

  // mega menu basic animation
  $('[data-megamenu]').each(function() {

    var mega_menu_button = $(this);
    var sub_menu_wrap =  "#" + $(this).data("megamenu");
    var hide_sub_menu_timer;
    var hide_sub_menu_interval = function() {
      if (hide_sub_menu_timer) {
        clearInterval(hide_sub_menu_timer);
        hide_sub_menu_timer = null;
      }
      hide_sub_menu_timer = setInterval(function() {
        if (!$(mega_menu_button).is(':hover') && !$(sub_menu_wrap).is(':hover')) {
          $(sub_menu_wrap).stop().css('z-index','100').hide();
          clearInterval(hide_sub_menu_timer);
          hide_sub_menu_timer = null;
        }
      }, 20);
    };

    mega_menu_button.hover(
     function(){
       if (hide_sub_menu_timer) {
         clearInterval(hide_sub_menu_timer);
         hide_sub_menu_timer = null;
       }
       if ($('html').hasClass('pc')) {
         $(this).parent().addClass('active_button');
         $(this).parent().find("ul").addClass('megamenu_child_menu');
         $("#header").addClass('active');
         $(sub_menu_wrap).stop().css('z-index','200').show();
       }
     },
     function(){
       if ($('html').hasClass('pc')) {
         $(this).parent().removeClass('active_button');
         $(this).parent().find("ul").removeClass('megamenu_child_menu');
         $("#header").removeClass('active');
         hide_sub_menu_interval();
       }
     }
    );

    $(sub_menu_wrap).hover(
      function(){
        $(mega_menu_button).parent().addClass('active_button');
        $("#header").addClass('active');
      },
      function(){
        $(mega_menu_button).parent().removeClass('active_button');
        $("#header").removeClass('active');
      }
    );


    $('#header').on('mouseout', sub_menu_wrap, function(){
     if ($('html').hasClass('pc')) {
       hide_sub_menu_interval();
     }
    });

  }); // end mega menu


  $("a").bind("focus",function(){if(this.blur)this.blur();});
  $("a.target_blank").attr("target","_blank");

  // replase mobile catchphrase and description
  $('.has_mobile_word').each(function() {
    var mobile_word =  $(this).data("label");
    $(this).append('<span class="mobile">' + mobile_word + '</span>');
  });

  //return top button
  var return_top_button = $('#return_top');
  $('a',return_top_button).click(function() {
    var myHref= $(this).attr("href");
    var myPos = $(myHref).offset().top;
    $("html,body").animate({scrollTop : myPos}, 1000, 'easeOutExpo');
    return false;
  });
  return_top_button.removeClass('active');
  var footer_button = $('#footer_button');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      if( footer_button.length ) {
        footer_button.addClass('active');
      }
      return_top_button.addClass('active');
    } else {
      if( footer_button.length ) {
        footer_button.removeClass('active');
      }
      return_top_button.removeClass('active');
    }
  });

  //fixed footer content
  var fixedFooter = $('#fixed_footer_content');
  fixedFooter.removeClass('active');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 330) {
      fixedFooter.addClass('active');
    } else {
      fixedFooter.removeClass('active');
    }
  });
  $('#fixed_footer_content .close').click(function() {
    $("#fixed_footer_content").hide();
    return false;
  });

  // comment button
  $("#comment_tab li").click(function() {
    $("#comment_tab li").removeClass('active');
    $(this).addClass("active");
    $(".tab_contents").hide();
    var selected_tab = $(this).find("a").attr("href");
    $(selected_tab).fadeIn();
    return false;
  });

  //category widget
  $(".tcd_category_list li:has(ul)").addClass('parent_menu');
  $(".tcd_category_list li.parent_menu > a").parent().prepend("<span class='child_menu_button'></span>");
  $(".tcd_category_list li .child_menu_button").on('click',function() {
     if($(this).parent().hasClass("open")) {
       $(this).parent().removeClass("active");
       $(this).parent().removeClass("open");
       $(this).parent().find('>ul:not(:animated)').slideUp("fast");
       return false;
     } else {
       $(this).parent().addClass("active");
       $(this).parent().addClass("open");
       $(this).parent().find('>ul:not(:animated)').slideDown("fast");
       return false;
     };
  });

  //custom drop menu widget
  $(".tcdw_custom_drop_menu li:has(ul)").addClass('parent_menu');
  $(".tcdw_custom_drop_menu li").hover(function(){
     $(">ul:not(:animated)",this).slideDown("fast");
     $(this).addClass("active");
  }, function(){
     $(">ul",this).slideUp("fast");
     $(this).removeClass("active");
  });

  //archive list widget
  if ($('.p-dropdown').length) {
    $('.p-dropdown__title').click(function() {
      $(this).toggleClass('is-active');
      $('+ .p-dropdown__list:not(:animated)', this).slideToggle();
    });
  }

  //search widget
  $('.widget_search #searchsubmit').wrap('<div class="submit_button"></div>');
  $('.google_search #searchsubmit').wrap('<div class="submit_button"></div>');

  // design select box widget
  $(".design_select_box select").on("click" , function() {
    $(this).closest('.design_select_box').toggleClass("open");
  });
  $(document).mouseup(function (e){
    var container = $(".design_select_box");
    if (container.has(e.target).length === 0) {
      container.removeClass("open");
    }
  });


   // tab button scroll
   $("#tab_button_list a").off('click');
   $("#tab_button_list a").on('click',function() {
     $("#tab_button_list a").removeClass('active');
     $(this).addClass('active');
     var myHref= $(this).attr("href");
     var myPos = $(myHref).offset().top;
     $("html,body").animate({scrollTop : myPos}, 1000, 'easeOutExpo');
     return false;
   });


  // quick tag - underline ------------------------------------------
  if ($('.q_underline').length) {
    var gradient_prefix = null;

    $('.q_underline').each(function(){
      var bbc = $(this).css('borderBottomColor');
      if (jQuery.inArray(bbc, ['transparent', 'rgba(0, 0, 0, 0)']) == -1) {
        if (gradient_prefix === null) {
          gradient_prefix = '';
          var ua = navigator.userAgent.toLowerCase();
          if (/webkit/.test(ua)) {
            gradient_prefix = '-webkit-';
          } else if (/firefox/.test(ua)) {
            gradient_prefix = '-moz-';
          } else {
            gradient_prefix = '';
          }
        }
        $(this).css('borderBottomColor', 'transparent');
        if (gradient_prefix) {
          $(this).css('backgroundImage', gradient_prefix+'linear-gradient(left, transparent 50%, '+bbc+ ' 50%)');
        } else {
          $(this).css('backgroundImage', 'linear-gradient(to right, transparent 50%, '+bbc+ ' 50%)');
        }
      }
    });

    $window.on('scroll.q_underline', function(){
      $('.q_underline:not(.is-active)').each(function(){
        if ($body.hasClass('show-beyondtal')) {
          var left = $(this).offset().left;
          if (window.scrollX > left - window.innerHeight) {
            $(this).addClass('is-active');
          }
        } else {
          var top = $(this).offset().top;
          if (window.scrollY > top - window.innerHeight) {
            $(this).addClass('is-active');
          }
        }
      });
      if (!$('.q_underline:not(.is-active)').length) {
        $window.off('scroll.q_underline');
      }
    });
  }


// responsive ------------------------------------------------------------------------
$('#tab_button_list ul li:first-child a').addClass('active');
var tab_menu_num = $('#tab_button_list ul li').length;
var mql = window.matchMedia('screen and (min-width: 1051px)');
function checkBreakPoint(mql) {

 if(mql.matches){ //PC

   $("html").removeClass("mobile");
   $("html").addClass("pc");

   $("#menu_button").css("display","none");

   var window_width = document.documentElement.clientWidth;
   var window_width2 = document.documentElement.clientWidth - 220;

   $("#global_menu li:not(.megamenu_parent)").has('ul').hover(function(){
     $(">ul:not(:animated)",this).slideDown("fast");
     $('> a',this).addClass("active");
     // change direction
     child_menu_pos = $(">ul",this).offset();
     if(child_menu_pos) {
       child_menu_position_length = child_menu_pos.left + 220;
       if(child_menu_position_length > window_width){
         $(this).addClass("type2");
       }
       // this is for grand child menu
       if(child_menu_position_length > window_width2){
         $('li.menu-item-has-children',this).addClass("type2");
       }
     }
   }, function(){
     $(">ul",this).slideUp("fast");
     $('> a',this).removeClass("active");
   });

   // child menu hover
   $("#global_menu > ul > li.menu-item-has-children").hover(function(){
     $("#header").addClass('active');
   }, function(){
     $("#header").removeClass('active');
   });

   // tab button
   $('#tab_button_list').css("width",200 * tab_menu_num);

 } else { //smart phone

   $("html").removeClass("pc");
   $("html").addClass("mobile");

   $("#header").removeClass("animate");
   $("#header").removeClass("animate2");

   // perfect scroll
   if ($('#drawer_menu').length) {
     if(! $(body).hasClass('mobile_device') ) {
       new SimpleBar($('#drawer_menu')[0]);
     };
   };

   // tab button
   $('#tab_button_list').css("width",150 * tab_menu_num);

   // side menu
   $("#mobile_menu .child_menu_button").remove();
   $('#mobile_menu li > ul').parent().prepend("<span class='child_menu_button'><span class='icon'></span></span>");
   $("#mobile_menu .child_menu_button").on('click',function() {
     if($(this).parent().hasClass("open")) {
       $(this).parent().removeClass("open");
       $(this).parent().find('>ul:not(:animated)').slideUp("fast");
       return false;
     } else {
       $(this).parent().addClass("open");
       $(this).parent().find('>ul:not(:animated)').slideDown("fast");
       return false;
     };
   });

   // drawer menu button
   var menu_button = $('#menu_button');
   menu_button.off();
   menu_button.removeAttr('style');
   menu_button.toggleClass("active",false);

  // open drawer menu
   menu_button.on('click', function(e) {

      e.preventDefault();
      e.stopPropagation();
      $('html').toggleClass('open_menu');

      // fix position for ios
      var topPosition = $(window).scrollTop();
      $('body').css({'position':'fixed','top': - topPosition});

      $('#container').one('click', function(e){
        if($('html').hasClass('open_menu')){
          $('html').removeClass('open_menu');

          // clear fix position for ios
          $('body').css({'position':'','top': ''});
          $(window).scrollTop(topPosition);

          return false;
        };
      });

   });

 };
};
mql.addListener(checkBreakPoint);
checkBreakPoint(mql);


// tab button scroll bar
var tab_menu_width = tab_menu_num * 150;
var menu_mql = window.matchMedia('screen and (min-width: '  + tab_menu_width +  'px)');
function checkBreakPointMenu(menu_mql) {
 if(menu_mql.matches){
   $('#tab_button_list').removeClass('type2');
   $('#tab_button_list ul').css("width","auto");
 } else {
   $('#tab_button_list').addClass('type2');
   $('#tab_button_list ul').css("width",150 * tab_menu_num);
   if ($('#tab_button_list_inner').length) {
     if(! $(body).hasClass('mobile_device') ) {
       new SimpleBar($('#tab_button_list_inner')[0]);
     };
   };
 }
}
menu_mql.addListener(checkBreakPointMenu);
checkBreakPointMenu(menu_mql);


});