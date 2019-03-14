"use strict"

// global object for whole project. DONT change it!
const RS = {};

// global vars
RS.ESC_CODE = 27;

// brakepoints
RS.fromDesktop = window.matchMedia( "(min-width: 1025px)" );
RS.atMobile = window.matchMedia( "(max-width: 1024px)" );
RS.less500 = window.matchMedia("(max-width: 500px)");

RS.svgGlobal = function(){
  new Vue({
    	el: '#global-svg',
    	template: ''
    })
};

RS.imgAdaptive = function(){
  const $imgAdaptiveItem = $('.js-adaptive-bg');

  const setImg = function(){
    $imgAdaptiveItem.each(function(){
      if(RS.fromDesktop.matches){
        const desktopImg = $(this).data('bg-desktop');

        $(this).css('background-image', 'url("'+ desktopImg +'")');
      }

      if(RS.less500.matches){
        const atMobileImg = $(this).data('bg-mobile');

        $(this).css('background-image', 'url("'+ atMobileImg +'")');
      }
    });
  };

  setImg();

  $(window).on('resize', function(){
    setImg();
  });
};

RS.datepicker = function(){
  const $datepickers = $('.js-datepicker');

  $datepickers.each(function(i){
    const value = $(this).data('value');
    const valueSplited = value.split('.');
    const startDateArr = new Date(valueSplited[2], valueSplited[1], valueSplited[0]);
    const startDate = startDateArr;
    const dp = $('#datepicker' + i + '').datepicker({startDate: startDate}).data('datepicker');

    dp.selectDate(startDate);
  });
};

(function onPageReady () {
  RS.datepicker();
}());
