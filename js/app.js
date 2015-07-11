$(document).ready(function() {

  var DEBUG_MODE = true;
  var debug = function(msg) {
      if (DEBUG_MODE === true) {
          console.log("DEBUG:", msg);
      }
  };

  var numQuesAnswered = 0;
  var numberQuestions = 5;

  // Create state object "class"
  function State(name, capital, choices, image) {
    this.name = name;
    this.capital = capital;
    this.choices = choices;
    this.image = image;

  }

  // Method to randomly sort order of question choices
  State.prototype.shuffleChoices = function () {
    var newChoices = [];

    while(this.choices.length !== 0) {
      newChoices.push(randomArrayItem(this.choices));
    }
    this.choices = newChoices;
  };

  // Create individual state objects
  var alabama = new State("Alabama", "Montogomery", ["Montogomery", "Mobile", "Birmingham"], "alabama.jpg");
  var texas = new State("Texas", "Austin", ["Austin", "Houston", "San Antonio"], "texas.jpg");
  var louisiana = new State("Louisiana", "Baton Rouge", ["Baton Rouge", "New Orleans", "Shreveport"], "louisiana.jpg");
  var idaho = new State("Idaho", "Boise", ["Boise", "Nampa", "Meridian"], "idaho.jpg");
  var oregon = new State("Oregon", "Salem", ["Salem", "Portland", "Eugene"], "oregon.jpg");
  var newyork = new State("New York", "Albany", ["Albany", "New York City", "Buffalo"], "new-york.jpg");
  var pennsylvania = new State("Pennsylvania", "Harrisburg", ["Harrisburg", "Philadelphia", "Pittsburgh"], "pennsylvania.jpg");
  var hawaii = new State("Hawaii", "Honolulu", ["Honolulu", "Hilo", "Lahaina"], "hawaii.jpg");
  var nebraska = new State("Nebraska", "Lincoln", ["Omaha", "Lincoln", "Bellevue"], "nebraska.jpg");
  var florida = new State("Florida", "Tallahassee", ["Tallahassee", "Jacksonville", "Miami"], "florida.jpg");


  // Array of states
  var states = [alabama, texas, louisiana, idaho, oregon, newyork, pennsylvania, hawaii, nebraska, florida];

  // Hide state questions and finale on page load
  $('.state-present').hide();
  $('.finale').hide();

  // Show state question when 'Begin' clicked
  $('button#begin').click(function() {
    //numQuesAnswered = displayQuestions(numQuesAnswered);
    displayQuestions();
  });

  // Show finale when 'Submit' clicked
  $('button#submit').click(function() {
    //numQuesAnswered = displayQuestions(numQuesAnswered);
    displayQuestions();
  });

  // Show state question when 'Try Again' clicked
  $('button#try-again').click(function() {
    //numQuesAnswered = displayQuestions(numQuesAnswered);
    displayQuestions();
  });

  // get random array item -- item removed from array
  function randomArrayItem(arr) {

    var index = Math.floor((Math.random() * arr.length));

    var removed = arr.splice(index, 1);

    debug("Removed state " + removed[0].name);
    return removed[0];

  }

  function resetStates() {
    states = [alabama, texas, louisiana, idaho, oregon, newyork, pennsylvania, hawaii, nebraska, florida];
  }

  function setupState(state) {
    $('.state-one').css('background-image', "url('images/" + state.image + "')");
    $('ul lh span').text(state.name);

    //randomizeArray(state.choices);
    state.shuffleChoices();
    $('li').remove();
    for (var i = 0; i < state.choices.length; i++) {
      $('ul').append($('<li><input id="option" type="radio" name="city" value="' + i + '"> ' + state.choices[i] + '</li>'));
    }
  }

  //function displayQuestions(numQuesAnswered) {
  function displayQuestions() {
    debug("Displaying questions!");

    $('.instructions').hide();
    $('.finale').hide();

    if (numQuesAnswered === numberQuestions) {
      $('.state-present').hide();
      $('.finale').show();
      resetStates();
      numQuesAnswered = 0;
    } else {
      setupState(randomArrayItem(states));
      $('.state-one').show();
      numQuesAnswered++;
    }

    //return numQuesAnswered;


  }


});



