 $(document).ready(function() {

   $('.mobile-wrap').on('click', function() {
     $('.line-burger').toggleClass('line-active');
     $('.header__info').slideToggle(200);
     if ($('.line-burger').hasClass('line-active')) {
       let scrollableElement = document.querySelector('.header__info');
       scrollLock.addScrollableTarget(scrollableElement);
       scrollLock.disablePageScroll();
       $('body').addClass('active')
     } else {
       scrollLock.enablePageScroll();
       $('body').removeClass('active')
     }

   });

   $(window).resize(function() {
     if ($(document).width() > 780) {
       $('.header__info').attr('style', '');
       $('.line-burger').removeClass('line-active');
       scrollLock.enablePageScroll();
       $('body').removeClass('active')
     }
   })


 })