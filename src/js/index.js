import 'bootstrap3/dist/js/bootstrap.min';
import 'smoothscroll/smoothscroll';
import 'fancybox/dist/js/jquery.fancybox';
import 'counterup/jquery.counterup.min';
import 'waypoints/lib/jquery.waypoints.min';
import '../vendor/jqBootstrapValidation';
import '../vendor/easypiechart';
import '../vendor/jquery.isotope';
import '../scss/main.scss';

$('a.page-scroll').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
    let target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
    if (target.length) {
      $('html,body').animate({
        scrollTop: target.offset().top - 40
      }, 900);
      return false;
    }
  }
});

// affix the navbar after scroll below header
$('#nav').affix({
  offset: {
    top: $('header').height(),
  },
});

// skills chart
$(document).ready(function(e) {
  let index = 0;
  $(document).scroll(function(){
    const top = $('#skills').height() - $(window).scrollTop();
    if (top <- 300) {
      if (index === 0) {
        $('.chart').easyPieChart({
          easing: 'easeOutBounce',
          onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
        });
      }
      index++;
    }
  });
});

// CounterUp
$(document).ready(function($) {
  if ($('span.count').length > 0) {
    $('span.count').counterUp({
      delay: 10, // the delay time in ms
      time: 1500 // the speed time in ms
    });
  }
});

// FancyBox
$('a.gallery').fancybox({
  'transitionIn': 'elastic',
  'transitionOut': 'elastic',
  'speedIn': 600,
  'speedOut': 200,
  'overlayShow': false,
});

// Isotope
let $grid = $('.grid').isotope({
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
});

let filterFns = {
  number: function () {
    const number = $(this).find('.number').text();
    return parseInt(number, 10) > 50;
  },
};

$('.filters-button-group').on('click', 'button', function () {
  let filterValue = $(this).attr('data-filter');
  filterValue = filterFns[filterValue] || filterValue;
  $grid.isotope({ filter: filterValue });
});

$('.button-group').each(function(i, buttonGroup) {
  let $buttonGroup = $(buttonGroup);
  $buttonGroup.on('click', 'button', function () {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $(this).addClass('is-checked');
  });
});

// Email validator
$('input,textarea').jqBootstrapValidation({
  preventSubmit: true,
  submitError: function ($form, event, errors) {},
  submitSuccess: function ($form, event) {
    event.preventDefault();
    var name = $('input#name').val();
    var email = $('input#email').val();
    var message = $('textarea#message').val();
    var firstName = name;
    if (firstName.indexOf(' ') >= 0) {
      firstName = name.split(' ').slice(0, -1).join(' ');
    }
    $.ajax({
      url: '././contact_me.php',
      type: 'POST',
      data: {
        name: name,
        email: email,
        message: message,
      },
      cache: false,
      success: function() {
        $('#success').html('<div class="alert alert-success">');
        $('#success > .alert-success').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
          .append('</button>');
        $('#success > .alert-success')
          .append('<strong>Your message has been sent. </strong>');
        $('#success > .alert-success')
          .append('</div>');
        $('#contactForm').trigger('reset');
      },
      error: function() {
        $('#success').html('<div class="alert alert-danger">');
        $('#success > .alert-danger').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;')
          .append('</button>');
        $('#success > .alert-danger').append('<strong>Sorry ' + firstName + ', it seems that my mail server is not responding. Please try again later!');
        $('#success > .alert-danger').append('</div>');
        $('#contactForm').trigger('reset');
      },
    });
  },
  filter: function() {
    return $(this).is(':visible');
  },
});

$('a[data-toggle=\'tab\']').click(function(e) {
  e.preventDefault();
  $(this).tab('show');
});

// When clicking on Full hide fail or success boxes
$('#name').focus(function() {
  $('#success').html('');
});
