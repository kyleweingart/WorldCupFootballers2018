$(document).ready(function () {

  //  VARIABlES
  // =======================================================================================================


  var footballers = [
    "Messi", "Ronaldo", "Neymar", "Pogba", "Suarez", "Aguero", "Griezman", "Mane", "Gotze", "Salah", "Isco", "Bale", "Coutinho", "Firmino", "Mbappe"
  ];


  var APIkey = "bAr8QUY94r4iQkUa2MyGWWxeunV69y31";

  // var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  //       footballers + "&api_key=" + APIkey + "&limit=10";



  // FUNCTIONS
  // ======================================================================================================
  // function displayFootballerGifs() - when time create function for click event. 

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




  // MAIN PROCESS
  // ============================================================================================================

  renderButtons();

  // Function for displaying the footballer gifs 
  // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
  // $(document).on("click", ".footballer", displayFootballerGifs);
  
  
  $(".footballer").on("click", function () {
      $("#gif-view").empty();
      var footballer = $(this).attr("footballer-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        footballer + "&api_key=" + APIkey + "&limit=12";


      $.ajax({
          url: queryURL,
          method: "GET"
        })

        .then(function(response) {
            
            var results = (response.data);
           
            for (var i = 0; i <= results.length; i++) {
              console.log(results[i].images.fixed_height.url);
              var imageURL = results[i].images.fixed_height.url;
              console.log(imageURL);
              var footballerDiv = $("<div>");
              footballerDiv.addClass("gif");
              var rating = $("<p>").text("Rating: " + results[i].rating);
              rating.addClass("gif-heading")
              var footballerGIF = $("<img>");
              footballerGIF.attr("src", results[i].images.fixed_height.url);
              footballerGIF.attr("alt", "footballer GIF");
              footballerGIF.addClass("gif-size");
              footballerDiv.append(rating);
              footballerDiv.append(footballerGIF)
              $("#gif-view").append(footballerDiv);
            }

          }

        );

    }

  )
})