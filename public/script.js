$('#toggleMenu').on('click', function(event) {// when the button with ToggleMenu id pressed the following event is triggered(in our case its opening the menu)
  $('#menu').sidebar('toggle');
});