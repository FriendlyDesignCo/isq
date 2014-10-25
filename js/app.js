// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


// ISQ JavaScript
jQuery(document).ready(function($) {
   isq.utility.init();

   $(window).resize(function(){ isq.utility.resize(); });
   $(window).scroll(function(){ isq.utility.onScroll(); });
});









/*
=============================================================================
  FUNCTION DECLARATIONS
=============================================================================
*/

var isq = (function($) {

  /*
    Utility
    
    Various utility functions that load/unload/route data,
    call other functions, etc.
  */

  var utility = (function() {

    var debug = false;

    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

    var init = function() { // Called on page load, calls all other functions that should occur on page load
      
      // PLUGINS CALLS / DEVICE FIXES
      // conditionizr({ // http://conditionizr.com/docc.html
      //  debug      : false,
      //  scriptSrc  : 'js/conditionizr/',
      //  styleSrc   : 'css/conditionizr/',
      //  ieLessThan : {
      //    active: true,
      //    version: '9',
      //    scripts: false,
      //    styles: false,
      //    classes: true,
      //    customScript: // Separate polyfills with commas
      //      '//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.6.1/html5shiv.js, //cdnjs.cloudflare.com/ajax/libs/respond.js/1.1.0/respond.min.js'
      //    },
      //  chrome     : { scripts: false, styles: false, classes: true, customScript: false },
      //  safari     : { scripts: false, styles: false, classes: true, customScript: false },
      //  opera      : { scripts: false, styles: false, classes: true, customScript: false },
      //  firefox    : { scripts: false, styles: false, classes: true, customScript: false },
      //  ie10       : { scripts: false, styles: false, classes: true, customScript: false },
      //  ie9        : { scripts: false, styles: false, classes: true, customScript: false },
      //  ie8        : { scripts: false, styles: false, classes: true, customScript: false },
      //  ie7        : { scripts: false, styles: false, classes: true, customScript: false },
      //  ie6        : { scripts: false, styles: false, classes: true, customScript: false },
      //  retina     : { scripts: false, styles: false, classes: true, customScript: false },
      //  touch      : { scripts: false, styles: false, classes: true, customScript: false },
      //  mac        : true,
      //  win        : true,
      //  x11        : true,
      //  linux      : true
      // });
      
      // Disable scaling until user begins a gesture (prevents zooming when user rotates to landscape mode)
      if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) {
          viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
          document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
          }, false);
        }
      }

      // FUNCTIONS
      // uiMod.example();

      
      // REPEATING FUNCTIONS
      // var example = setInterval(function(){
      //  // do stuff
      // }, 200);


      /*
        USER INTERACTION
      */
      // uiMod.example();
    };

    var onScroll = function() { // Called when the browser window is scrolled
      // Functions
    };

    var resize = function() { // Called when the browser window is resized
      // Functions
    };

    // var responsiveState = function(req) { // Returns what responsive state we're at. Values based on CSS media queries.
    //   // Below is an idiotic bug fix.
    //   // Chrome & Safari exclude scrollbars from window width for CSS media queries.
    //   // Firefox, Opera and IE include scrollbars in window width for CSS media queries, but not in JS.
    //   // So we have to add some px to the window width for Firefox, Opera and IE so that breakpoints
    //   // match up between CSS and JS. What a world.
    //   if ($('html').hasClass('chrome') || $('html').hasClass('safari')) {
    //     var winWidth = $(window).width();
    //   }
    //   else {
    //     var winWidth = $(window).width() + 17;
    //   }

    //   if (typeof req === 'undefined' || req === 'state') {
    //     // MODIFY THESE IF STATEMENTS TO MATCH YOUR RESPONSIVE WIDTHS
    //     if (winWidth >= 1025) {
    //       return 'desktop';
    //     }
    //     if (winWidth >= 768 && winWidth <= 1024) {
    //       return 'tablet';
    //     }
    //     if (winWidth <= 767) {
    //       return 'mobile';
    //     }
    //     // STOP MODIFYING HERE.
    //   }
    //   else {
    //     return winWidth;
    //   }
    // };

    var howMuchVisible = function(el) { // Checks how much of an element is visible by checking its position and height compared to window height.
      // Get dimensions
      var windowHeight  = $(window).height(),
          scrollTop     = $(window).scrollTop(),
          elHeight      = el.outerHeight(),
          elOffset      = el.offset().top,
          elFromTop     = (elOffset - scrollTop),
          elFromBottom  = windowHeight - (elFromTop + elHeight);
      // console.table([{windowHeight:windowHeight, scrollTop:scrollTop, elHeight:elHeight, elOffset:elOffset, elFromTop:elFromTop, elFromBottom:elFromBottom}]);

      // Check if the item is at all visible
      if (
          (elFromTop <= windowHeight && elFromTop >= 0) || 
          (elFromBottom <= windowHeight && elFromBottom >= 0) || 
          (elFromTop <= 0 && elFromBottom <= 0 && elHeight >= windowHeight)
        ) {
        // console.log('Item is in view.');

        // If full element is visible...
        if (elFromTop >= 0 && elFromBottom >= 0) {
          var o = {
            pixels: elHeight, // Height of element that is visible (pixels), in this case = to elHeight since the whole thing is visible
            percent: (elHeight / windowHeight) * 100 // Percent of window height element takes up.
          };
          return o; // Return the height of the element
        }
        // If only the TOP of the element is visible...
        else if (elFromTop >= 0 && elFromBottom < 0) {
          var o = {
            pixels: windowHeight - elFromTop, // Height of element that is visible (pixels)
            percent: ((windowHeight - elFromTop) / windowHeight) * 100 // Percent of window height element takes up.
          };
          return o;
        }
        // If only the BOTTOM of the element is visible...
        else if (elFromTop < 0 && elFromBottom >= 0) {
          var o = {
            pixels: windowHeight - elFromBottom, // Height of element that is visible (pixels)
            percent: ((windowHeight - elFromBottom) / windowHeight) * 100 // Percent of window height element takes up.
          };
          return o;
        }
        // If the element is bigger than the window and only a portion of it is being shown...
        else if (elFromTop <= 0 && elFromBottom <= 0 && elHeight >= windowHeight) {
          var o = {
            pixels: windowHeight, // Height of element that is visible (pixels)
            percent: 100 // Percent of window height element takes up. 100 b/c it's covering the window.
          };
          return o;
        }
      }
      else {
        // console.log('Item is NOT in view.');
        var o = { // Item isn't visible, so return 0 for both values.
          pixels: 0,
          percent: 0
        };
        return o;
      }
    };

    var smoothScroll = function(el,source,offsetInt) {
      if (source == 'href') {
        target = el.attr('href');
      }
      else if (source == 'elementID')
      {
        target = '#' + el.attr('id');
      }

      if (offsetInt == undefined) {
        offsetInt = '0px';
      }

      $(target)
         .velocity("scroll", { 
            duration: 1200, 
            offset: offsetInt,
            easing: "easeInOutQuart",
            begin: function() {
              // navAnimating = true;
            },
            complete: function() { 
              // navAnimating = false;
            }
          }); 
    };

    return  {
      init: init,
      onScroll: onScroll,
      resize: resize,
      howMuchVisible: howMuchVisible,
      // responsiveState: responsiveState,
      smoothScroll: smoothScroll
    }
  })();
  /* 
    UI Modifications 

    Various functions which operate on elements to achieve visual
    effects that are impossible to create with CSS alone.
  */

  var uiMod = (function() {

    var example = function() {

    };

    // public
    return {
      example: example,
    };
  })(); // var uiMod = (function() {



  /* 
    User interaction 

    Various functions which are called when the user intearcts
    with a piece of the site (eg. clicking, scrolling, etc)
  */
  var userInput = (function() {

    var example = function() {

    };

    // public
    return {
      example: example,
    };
  })(); // var uiMod = (function() {

  

  // public
  return {
    utility: utility,
    uiMod: uiMod,
    userInput: userInput
  };
})(jQuery); // var isq = (function() {