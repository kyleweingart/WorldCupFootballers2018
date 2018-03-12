$(document).ready(function() {
  //  VARIABlES
  // =======================================================================================================

  var footballers = [
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Neymar",
    "Paul Pogba",
    "Luis Suarez",
    "Sergio Aguero",
    "Paulo Dybala",
    "Sadio Mane",
    "Mario Gotze",
    "Mohammed Salah",
    "Isco",
    "Gareth Bale",
    "Phillipe Coutinho",
    "Roberto Firmino",
    "Kylian Mbappe"
  ];

  var APIkey = "bAr8QUY94r4iQkUa2MyGWWxeunV69y31";

  // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  //       footballers + "&api_key=" + APIkey + "&limit=10";

  // FUNCTIONS
  // ======================================================================================================
  // Function for displaying the footballer gifs
  function displayFootballerGifs() {
    $("#gif-view").empty();
    $(".background-img").css("background", "transparent");

    var footballer = $(this).attr("footballer-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      footballer +
      "&api_key=" +
      APIkey +
      "&limit=12";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i <= results.length; i++) {
        console.log(results[i].images.fixed_height.url);
        var imageURL = results[i].images.fixed_height.url;
        console.log(imageURL);
        var footballerDiv = $("<div>");
        footballerDiv.addClass("gif");
        var rating = $("<p>").text("Rating: " + results[i].rating);
        rating.addClass("gif-heading");
        var footballerGIF = $("<img>");
        footballerGIF.attr("src", results[i].images.fixed_height.url);
        footballerGIF.attr("alt", "footballer GIF");
        footballerGIF.attr("data-state", "active");
        footballerGIF.attr("data-animate", results[i].images.fixed_height.url);
        footballerGIF.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        footballerGIF.addClass("gif-size");
        footballerDiv.append(rating);
        footballerDiv.append(footballerGIF);
        $("#gif-view").append(footballerDiv);
      }
    });
  }
  
  
  // This function creates the buttons for the footballers
  function renderButtons() {
    // Deleting the footballer buttons prior to adding new footballer buttons
    // (this is necessary otherwise we will have repeat buttons)

    $("#footballers-view").empty();

    // Looping through the array of footballers
    for (var i = 0; i < footballers.length; i++) {
      // Then dynamically generating buttons for each footballer in the array.

      var a = $("<button>");
      // Adding a class
      a.addClass("footballer");
      a.addClass("btn");
      a.addClass("btn-dark");
      a.addClass("btn-kw");

      // Adding a data-attribute with a value of the footballer at index i
      a.attr("footballer-name", footballers[i]);
      // Providing the button's text with a value of the footballer at index i
      a.text(footballers[i]);
      // Adding the button to the HTML
      $("#footballers-view").append(a);
    }
  }


  
  // This function starts and stops the gif
  function startstopGIF(){

      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "active") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "active");
      }
    }
    
  

  // MAIN PROCESS
  // ============================================================================================================

  renderButtons();

  

  // This function handles events where  button is clicked
  $("#add-footballer").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var footballer = $("#footballer-input")
      .val()
      .trim();

    if (footballer == "") {
      return false;
    } else {
      // Adding the footballer from the textbox to the array
      footballers.push(footballer);
      // Calling renderButtons which handles the processing of the footballer array
      renderButtons();
    }
  });

  $(document).on("click", ".footballer", displayFootballerGifs);
  $(document).on("click", ".gif-size", startstopGIF)

});
