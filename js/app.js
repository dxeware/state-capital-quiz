$(document).ready(function() {

  var DEBUG_MODE = true;
  var debug = function(msg) {
      if (DEBUG_MODE === true) {
          console.log("DEBUG:", msg);
      }
  };

  // Variables for tracking
  var numQuesAnswered = 0;
  var maxQuestions = 5;
  var numberQuestionsCorrect = 0;

  // Create state object "class"
  function State(name, capital, choices, image) {
    this.name = name;
    this.capital = capital;
    this.choices = choices;
    this.image = image;

  }

  // Method to randomly sort order of question choices
  State.prototype.shuffleChoices = function () {

    this.choices.shuffle();

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
    states.shuffle();
    displayQuestions();
  });

  // Show result of choice submitted, and wait
  // Then  either another question displayed or finale
  $('button#submit').click(function() {
    var correct = 'incorrect';
    var delay=1000; //1 seconds

    var input = $('input[name="city"]:checked');
    if (input.length === 0) {
      alert("Please choose an answer!");
    } else {
      var text = $.trim(input.closest('li').text());

      if (text === states[numQuesAnswered-1].capital) {
        correct = 'correct';
        numberQuestionsCorrect++;
      }

      $('#result').text(correct);
      $('#result').show();
      setTimeout(function(){
        displayQuestions();
      }, delay);
    }
  });

  // Show state questions again when 'Try Again' clicked
  $('button#try-again').click(function() {
    //numQuesAnswered = displayQuestions(numQuesAnswered);
    states.shuffle();
    numberQuestionsCorrect = 0;
    displayQuestions();
  });

  // New shuffle for arrays -- randomly shuffle array elements
  Array.prototype.shuffle = function() {
    var i = this.length, j, temp;
    if ( i == 0 ) return this;
    while ( --i ) {
       j = Math.floor( Math.random() * ( i + 1 ) );
       temp = this[i];
       this[i] = this[j];
       this[j] = temp;
    }
    return this;
  }

  function setupState(state) {
    $('.state-one').css('background-image', "url('images/" + state.image + "')");
    $('ul lh span').text(state.name);

    // Shuffle choices and then append to UL
    state.shuffleChoices();
    $('li').remove();
    for (var i = 0; i < state.choices.length; i++) {
      $('ul').append($('<li><label><input id="option" type="radio" name="city" value="' + i + '"> ' + state.choices[i] + '</label></li>'));
    }
  }

  function displayQuestions() {
    debug("Displaying questions!");

    $('.instructions').hide();
    $('.finale').hide();
    $('#result').hide();

    // If reached max questions, show finale
    if (numQuesAnswered === maxQuestions) {
      $('.state-present').hide();
      $('.finale h3 span').text(numberQuestionsCorrect);
      $('.finale').show();
      //resetStates();
      numQuesAnswered = 0;
    } else { // Show another question
      setupState(states[numQuesAnswered]);
      $('.state-one').show();
      numQuesAnswered++;
    }

  }


});



