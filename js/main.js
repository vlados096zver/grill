$(document).ready(function() {

   if (window.Swiper) {

     let recommendation_swiper = new Swiper(".swiper__recommendation", {
       slidesPerView: 6,
       pagination: {
         clickable: true,
         el: ".swiper-pagination",
       },
       navigation: {
         nextEl: ".info__block .swiper-button-next",
         prevEl: ".info__block .swiper-button-prev",
       },
       allowTouchMove: true,
       breakpoints: {
         0: {
           slidesPerView: 1,
         },
         460: {
           slidesPerView: 2,
         },
         768: {
           slidesPerView: 3,
         },
         1150: {
           slidesPerView: 4,
         },
         1250: {
           slidesPerView: 5,
         },
         1350: {
           slidesPerView: 6,
         }
       }
     });
     $(document).on('click', '#r_prev', function() {
       recommendation_swiper.slidePrev();
     })

     $(document).on('click', '#r_next', function() {
       recommendation_swiper.slideNext();
     })

   }



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

   $(".tabs__box").click(function() {
     $(".tabs__box").removeClass("tabs__box--active").eq($(this).index()).addClass("tabs__box--active");
     let index = $(this).index();
     $(".tabs__item").hide().eq(index).fadeIn()
   })


 })

 $(document).on('click', '#o_building .select__item', function(e) {
   let inputs = $('.order__item--data .input')
   if ($(this).hasClass('select__item--flat')) {
     inputs.removeClass('input--disabled');
     inputs.prop('disabled', false);
   } else {
     inputs.addClass('input--disabled');
     inputs.prop('disabled', true);
     inputs.val('');
   }
 })

 $(document).on('click', '.select__wrap', function(e) {
   /* $('.select__wrap').on('click', function(e) { */
   if ($(e.target).is('.select__disabled') || $(e.target).closest('.select__list').length) {
     return false;
   }

   let $select__wrap = $(this);

   if (!$select__wrap.hasClass('select__wrap--active')) {
     if ($select__wrap.hasClass('select__wrap--end-active')) {
       // предотвращение дребезга
       // меню ещё закрывается
       return
     }
     showSelectList($select__wrap)
   } else {
     hideSelectList($select__wrap)
   }

 });

 $(document).on('click', '.select__item', function(e) {
   /* $('.select__wrap').on('click', '.select__item', function(e) { */
   if ($(e.target).is('.select__item--disabled')) {
     return false;
   } else if ($(e.target).is(".select__item")) {
     let $select__wrap = $(this).parents('.select__wrap')
     let $select__item = $(this)

     $select__wrap.find('.select__item--active').removeClass('select__item--active')
     $select__item.addClass('select__item--active');
     setPlaceholder(this);

     hideSelectList($select__wrap)
     e.stopPropagation();
   }

 });

 $(document).on('input', '.select__input', function(e) {
   /* $('body').on('input', '.select__input', function(e) { */
   let isFound;
   $(e.target).parent().siblings('li').each((i, el) => {
     let is = $(el).html().toLowerCase().indexOf(e.target.value.toLowerCase()) != -1;
     $(el).css("display", is ? "block" : "none");
     if (is) isFound = true;
   });
   $('.select__item-search-not-found').css("display", isFound ? "none" : "block");
 })

 // $(document).on('click', function(e) {
 //   var $select__wrap = $(".select__wrap");
 //   if (!$select__wrap.is(e.target) && $select__wrap.has(e.target).length === 0) {
 //     hideSelectList($select__wrap)
 //   }
 // });

 function clickOutside(e) {
   var $select__wrap = $(".select__wrap");
   if (!$select__wrap.is(e.target) && $select__wrap.has(e.target).length === 0) {
     hideSelectList($select__wrap)
   }
 }

 function showSelectList($select__wrap) {
   $(document).on('click', clickOutside);
   let $select__list = $select__wrap.find(".select__list");

   let {
     height,
     top,
     bottom
   } = $select__list.get(0).getBoundingClientRect();
   if ($(window).height() < bottom - 16 && top > height + 16 * 2) {
     $select__wrap.addClass('select__wrap--position-top');
   }

   $('.select__wrap').removeClass('select__wrap--active');
   $select__wrap.addClass('select__wrap--start-active');
   setTimeout(() => {
     $select__wrap.removeClass('select__wrap--start-active').addClass('select__wrap--active');
     let duration = getTransitionDuration($select__list);
     setTimeout(() => {
       $select__wrap.addClass('select__wrap--end-active')
     }, duration)
   }, 0)

 }

 function hideSelectList($select__wrap) {
   $(document).off('click', clickOutside);
   $select__wrap.removeClass('select__wrap--active');
   let duration = getTransitionDuration($select__wrap.find(".select__list"));
   setTimeout(() => {
     $select__wrap.removeClass('select__wrap--position-top select__wrap--end-active')
   }, duration)
 }

 function setPlaceholder(self) {
   var value_pl = $(self).html();
   $(self).parents('.select__wrap').find('.select__placeholder').html(value_pl);
 }

 function checkActive(self) {
   var text = $(self).find('.select__item--active').text();
   /* if (text === undefined || text === '') {
        text = $(self).find('.select__item:not(.select__item--disabled):eq(0)').addClass('select__item--active').text();
    }*/
   $(self).find('.select__placeholder').html(text);
 }

 // Возвращает макс прододжительность анимации $self
 // Поддерживает только время в секундах (s)
 function getTransitionDuration($self) {
   return Math.max(...$self.css('transition-duration').split('s,').map(parseFloat), 0) * 1000 + 50;
 }



 // BASKET

 $('.basket__input').on('change, input', function() {
   $(this).val(
     $(this).val().replace(/^0|\D/, '')
   );
 })

 $('.basket__input').on('focus', function() {
   $(this).data("before", $(this).val())
 })

 $('input[data-together-input]').on('change, input', function() {
   $('input[data-together-input]').val($(this).val());
 })


 $('.basket__input').on('blur', function() {
   let v = /\d+/.exec($(this).val())
   if (!v || !parseInt(v)) v = $(this).data("before")
   $(this).val(v)
   $(this).trigger('input')
 })

 function InitProduct() {

   //basket

   $('.basket__item').each(function(i, e) {
     e = $(e);

     let quantity = e.find('.basket__input');

     var recount = new RecountProduct({
       summ: e.find('.basket__sum span'),
       quantity: quantity,
       price: e.find('.basket__input').attr('data-price'),
       fun: updateTotalSumm,
       decimalSeparator: ','
     })

     quantity.on('input', function() {
       recount.updateSumm();
     })

     e.find('.basket__arrow--decrement').click(function() {
       recount.update('minus');
     });

     e.find('.basket__arrow--increment').click(function() {
       recount.update('plus');
     });

     e.find('.basket__close').click(function() {
       e.remove();
       recount.updateSumm();
     });

     recount.updateSumm(false);
   });

   updateTotalSumm();
 }

 // summ - jq узел общей стоимости продуктов
 // quantity - jq узел количества продукта
 // price - стоимости продукта
 // after - строка, которая прибавится к общей стоимости
 // fun - функция, которая вызывается после пересчета стоимости

 function RecountProduct(param) {
   this.summ = param.summ;
   this.quantity = param.quantity;
   this.price = parseFloat(param.price);
   this.after = param.after || "";
   this.fun = param.fun;
   this.decimalSeparator = param.decimalSeparator;

   // обновления количества товара
   // action - флаг: 'plus' || 'minus'

   this.update = function(action) {
     var value = this.getQuantity();
     var together = this.quantity.data('together-input');
     console.log(together);

     if (action == 'plus') {
       value += 1;
     } else if (action == 'minus' && value != 1) {
       value -= 1;
     }

     if (together !== undefined) {
       $('[data-together-input="' + together + '"]').val(value).trigger('input');
     }

     this.quantity.val(value);
     this.updateSumm()
   }

   // обновление общей стоимости товара
   // если total == true будет запущен пересчёт общей суммы

   this.updateSumm = function(total = true) {
     var num = (this.getQuantity() * this.price)
     //if (this.decimalSeparator) num = num.replace('.', this.decimalSeparator)
     // num = this.format(num)

     this.summ.text(num);
     if (total && typeof this.fun === "function") this.fun()
   }

   // возвращает количество товара

   this.getQuantity = function() {
     return parseInt(this.quantity.val()) || 0
   }

   this.format = function(v) {
     return String(v).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')
   }
 }


 // Пересчёт общей суммы

 function updateTotalSumm() {
   var val = 0;

   $('.basket__sum').each(function(i, e) {
     val += parseFloat($(e).text().replace(/ /g, ""));
   })
   $('#basket__total').text(val);
   let discount = $('#basket__discount').text();
   $('#basket__pay').text(val - discount)
 }

 InitProduct();


 $(document).on('click', '.dishes:not(.dishes--inner) .dishes__image', function() {
   let elem = $(this).parents('.dishes__item');
   let title = elem.find('.dishes__subtitle').text();
   let desc = elem.find('.dishes__text p').text();
   let price = elem.find('.dishes__price').text();
   let weight = elem.find('.dishes__weight').text();

   $('#popup--product').addClass('popup--active');
   let scrollableElement = document.querySelector('.popup__holder');
   scrollLock.addScrollableTarget(scrollableElement);
   scrollLock.disablePageScroll();

   $('.popup__title').text(title);
   $('.popup__text p').text(desc);
   $('.popup__price').text(price);
   $('.popup__weight').text(weight)
 })

 $(document).on('click', '.header__box, .header__link', function() {
   scrollLock.enablePageScroll();
   if ($(this).hasClass('header__link')) {
     $('body').removeClass('active');
     $('.header__info').slideUp();
     $('.line-burger').removeClass('line-active');
   }
   let target = $(this).attr('href');
   let pos = target.indexOf('#');
   if (pos !== -1) {
     target = target.substring(pos)
   }
   let coordsScroll = $(target).offset().top
   $('html, body').animate({
     scrollTop: coordsScroll
   }, 600);
   return false;
 })

 $(document).mousedown(function(e) {

   if ($('#popup--product').is(e.target) && $('#popup--product').has(e.target).length === 0) {
     $('#popup--product').removeClass('popup--active');
     scrollLock.enablePageScroll();
   };

 })

 $(document).on('click', '.popup__close', function() {
   $('#popup--product').removeClass('popup--active');
   scrollLock.enablePageScroll();
 })
