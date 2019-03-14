
// global object for whole project. DONT change it!
const WD = {};

// global vars
WD.ESC_CODE = 27;

// brakepoints
WD.fromDesktop = window.matchMedia( "(min-width: 1301px)" );
WD.atMobile = window.matchMedia( "(max-width: 767px)" );
WD.less500 = window.matchMedia("(max-width: 500px)");

WD.slider = function(){
  const $slider = $('.sppb-carousel-inner ');

  $slider.slick({
    dots: false,
    slidesToShow: 1,
    arrows: true,
    infinite: true,
    autoplay: '5000',
    prevArrow: '<button class="slick-arrow slick-arrow__prev" type="button"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button class="slick-arrow slick-arrow__next" type="button"><i class="fa fa-chevron-right"></i></button>',
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          autoplay: false
        }
      },
    ]
  });
};

WD.mainMenuToggle = function(){
  const $menu = $('.js-menu');
  const $btnOpen = $('.js-menu-open');
  const $btnClose = $menu.find('.js-menu-close');
  const $globalWrapper = $('.global-wrapper');

  const popupOpen = function(){
    $menu.addClass('active');
    $('.offcanvas-overlay').addClass('active');
    $globalWrapper.addClass('global-wrapper--menu-opened');
  };

  const popupClose = function(){
    $menu.removeClass('active');
    $('.offcanvas-overlay').removeClass('active');
    $globalWrapper.removeClass('global-wrapper--menu-opened');
  };

  $btnOpen.on('click', function(){
    popupOpen();
  });

  $btnClose.on('click', function(){
    popupClose();
  });

  $(document).on('keydown.js-main-menu', function onKeyDown(evt) {
      if (evt.keyCode === WD.ESC_CODE) {
          popupClose();
      }
  });
};

WD.accordion = function(){
  const $accordion = $('.js-accordion');
  const $accordionButtons = $accordion.find('.js-accordion-header');
  const $accordionContents = $accordion.find('.js-accordion-content');
  const $accordionItems = $accordion.find('.js-accordion-item');

  $accordionButtons.on('click', function(){
    const $parentItem = $(this).closest('.js-accordion-item');
    const $parentContent = $parentItem.find('> .js-accordion-content');
    const isActive = $parentItem.hasClass('active');

    $parentItem.addClass('active').siblings().removeClass('active').find('.js-accordion-content').slideUp('400');
    $parentContent.slideDown('400');

    if(isActive){
      $parentItem.removeClass('active');
      $parentContent.slideUp('400');
    }
  });

  const accordionMobile = function(){
    const $accordionMobile = $('.js-accordion-mobile');
    const $accordionMobileButtons = $accordionMobile.find('.js-accordion-mobile-header');
    const $accordionMobileContents = $accordionMobile.find('.js-accordion-mobile-content');
    const $accordionMobileItems = $accordionMobile.find('.js-accordion-mobile-item');

    $accordionMobileButtons.off('click').on('click', function(){
      const $parentItem = $(this).closest('.js-accordion-mobile-item');
      const $parentContent = $parentItem.find('.js-accordion-mobile-content');
      const isActive = $parentItem.hasClass('active');
      $parentItem.addClass('active').siblings().removeClass('active').find('.js-accordion-mobile-content').slideUp('400');

      $parentContent.slideDown('400');

      if(isActive){
        $parentItem.removeClass('active');
        $parentContent.slideUp('400');
      }
    });
  };

  $(window).resize(function() {
    const windowWidth = $(window).width();
    const destroyAccordion = function(){
      $('.js-accordion-mobile-content').show();
      $('.js-accordion-mobile-item').removeClass('active');
      $('.js-accordion-mobile-header').off();
    };

    if(windowWidth <= 767){
      $('.js-accordion-mobile-content').hide();
      accordionMobile();
    }else{
      destroyAccordion();
    }
  });

  $(window).load(function() {
    const windowWidth = $(window).width();
    const destroyAccordion = function(){
      $('.js-accordion-mobile-content').show();
      $('.js-accordion-mobile-item').removeClass('active');
      $('.js-accordion-mobile-header').off();
    };

    if(windowWidth <= 767){
      accordionMobile();
    }
  });

};

WD.ymaps = function(){
  ymaps.ready(function() {
		$('.js-map').each(function(el, idx) {
			var lat = $(this).attr('data-lat');
			var lon = $(this).attr('data-lon');
			var addr = $(this).attr('data-addr');
		    var myMap = new ymaps.Map($(this).attr('id'), {
		            center: [lat, lon],
		            zoom: 13,
		            controls: ['zoomControl', 'fullscreenControl']
		        }, {
		            searchControlProvider: 'yandex#search'
		        }),

		        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		            '<div style="color: #FFFFFF; font-weight: bold;"></div>'
		        ),

		        myPlacemarkWithContent = new ymaps.Placemark([lat, lon], {
		            hintContent: '',
		            balloonContent: addr,
		            iconContent: ''
		        }, {
		            iconLayout: 'default#imageWithContent',
		            iconImageHref: '/template/img/marc.png',
		            iconImageSize: [40, 47],
		            iconImageOffset: [-24, -24],
		            iconContentOffset: [15, 15],
		            iconContentLayout: MyIconContentLayout
		        });

		    myMap.geoObjects
		        .add(myPlacemarkWithContent);
         myMap.behaviors.disable('scrollZoom');
		});
	});
};

(function onPageReady () {
  WD.mainMenuToggle();
  WD.accordion();
  WD.ymaps();
  WD.slider();
}());
