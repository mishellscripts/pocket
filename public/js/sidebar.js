$(document).ready(function () {
  var trigger = $('#toggle-button'),
     isClosed = false;

    trigger.click(function () {
      toggle();      
    });

    function toggle() {

      if (isClosed == true) {          
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});