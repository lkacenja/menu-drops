(function ($) {
  var $screen = $('<div/>').attr('id', 'menu-drops-screen').css({display : 'none', position : 'absolute', top : 0, left : 0, 'z-index' : 100}).height($('body').height()).width($(window).width()).click(handleClickScreen);  ;
  var defaults = {
    mode: 'mouseover',
    onConstruct: [],
    onDestruct: [],
    onOpen: [],
    onClose: [] 
  };
  var hoverIntentIncluded = typeof($.fn.hoverIntent) == 'function' ? true : false;
  $.fn.menuDrops = function(options) {
    var config = {};
    options = options || {};
    $.extend(true, config, defaults, options);
    return this.each(function() {
      if (!$(this).hasClass('menu-drops-processed')) {
        $(this).addClass('menu-drops-processed').data('menu-drop-config', config);
        attach($(this));
        if (typeof(config.onConstruct) == 'function') {
          var callbacks = [config.onConstruct];
        }
        else if (config.onConstruct && config.onConstruct.length > 0) {
          var callbacks = config.onConstruct;
        }
        if (callbacks) {
          handleCallback(callbacks, this); 
        }
      } 
    });
  }
  $.fn.menuDropsRemove = function() {
    var config = $(this).data('menu-drop-config');
    if ($(this).hasClass('menu-drops-processed') && config) {
      detach($(this));
    }
    return this;
  }
  var attach = function($menu) {
    var config = $menu.data('menu-drop-config');
    var $menuParents = $menu.find('li:has(ul)').not('li li');
    if (config.mode == 'mouseover') {
      if (hoverIntentIncluded) {
        $menuParents.hoverIntent({over: handleMouseOver, out: handleMouseOut, timeout: 1000});
      }
      else {
        if (console && console.log) {
          console.log('Please include the hoverintent library.');
        }
      }
    }
    if (config.mode == 'click') {
      $('body').prepend($screen);
      $menuParents.find('a').not('li li a').click(preventDefault);
      $menuParents.click(handleClick);
    }  
  }
  var detach = function($menu) {
    $screen.hide();
    $menuParents = $menu.removeClass('menu-drops-processed').find('li:has(ul)').not('li li').removeClass('menu-drops-active').unbind();
    $menuParents.find('a').not('li li a').unbind('click').click(
      function() {
        return true;
      }
    );
    $menu.data('menu-drop-config', false);
  }
  var preventDefault = function(e) {
    $(this).parents('li').trigger('click');
    return false;
  }
  var handleCallback = function(callbacks, context) {
    if (callbacks instanceof Array && callbacks.length > 0) {
      for (var x in callbacks) {
        callbacks[x].call(context);
      }
    }
    else {
      throw new TypeError('Invalid callback provided.');
    }
  }
  var handleClick = function(e) {
    preventDefault(e);
    $item = $(e.target);
    if ($item.is('a')) {
      $item = $item.parents('li');
    }
    if (!$item.hasClass('menu-drops-active')) {
      $menu = $item.parents('.menu-drops-processed');
      $activeItem = $menu.data('menu-drops-active');
      if ($activeItem) {
        deactivateItem($activeItem);
      }
      activateItem($item);
      $screen.show();
      $menu.data('menu-drops-active', $item);
    }
    else {
      $screen.hide();
      deactivateItem($item);
      $menu.data('menu-drops-active', false);
    }
  }
  function handleClickScreen() {
    $('.menu-drops-processed .menu-drops-active').trigger('click');
  }
  function handleMouseOver() {
    activateItem($(this));
  }
  function handleMouseOut() {
    deactivateItem($(this));
  }
  var activateItem = function($item) {
    $menu = $item.parents('.menu-drops-processed');
    var config = $menu.data('menu-drop-config'); 
    if (config.onOpen && typeof(config.onOpen) == 'function') {
      var callbacks = [config.onOpen];
    }
    else if (config.onOpen && config.onOpen.length > 0) {
      var callbacks = config.onOpen;
    }
    if (callbacks) {
      handleCallback(callbacks, $item);
    }
    $item.addClass('menu-drops-active').find('ul').show();
  }
  var deactivateItem = function($item) {
    $item.removeClass('menu-drops-active').find('ul').hide();
    $menu = $item.parents('.menu-drops-processed');
    var config = $menu.data('menu-drop-config');
    if (config.onClose && typeof(config.onClose) == 'function') {
      var callbacks = [config.onClose];
    }
    else if (config.onClose && config.onClose.length > 0) {
      var callbacks = config.onClose;
    }
    if (callbacks) {
      handleCallback(callbacks, $item);
    }
  }
})(jQuery);
