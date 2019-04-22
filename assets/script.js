var topics = ["NES", "SNES", "Sega Genesis", "Sega CD", "Sega 32x", "N64", "Playstation", "Dreamcast", "Xbox", "Gamecube", "Playstation 2", "Xbox360", "Wii", "Playstation 3", "XboxOne", "Nintendo Switch"]

function theGif() {

  $("#gifs-appear-here").empty();
  var gif = $(this).attr("data-gif");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=NHHSGlX2b9a016LqFksIUcQAe8BGhbX6&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var gifImage = $("<img>");


      gifImage.attr("src", results[i].images.fixed_height.url);
      // I was able to add the attr for the src being still and the data states both animate and still. I also added the data-state as still by default.
      // I was unable to get the click function to work lines 87-99
      // gifImage.attr("src", results[i].images.fixed_height_still.url);
      // gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      // gifImage.attr("data-animate", results[i].images.fixed_height.url);
      // gifImage.attr("data-state", "still");
      gifImage.addClass("gif");

      gifDiv.prepend(p);
      gifDiv.prepend(gifImage);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });

}

function displayButtons() {


  // (this is necessary otherwise you will have repeat buttons)
  $("#buttonArea").empty();


  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each topic in the array
    var button = $("<button>");
    // Adding a class of gif to our button
    button.addClass("gifButton");
    // Adding a data-gif
    button.attr("data-gif", topics[i]);
    // Providing the initial button text
    button.text(topics[i]);
    // Adding the button to the buttonsArea div
    $("#buttonArea").append(button);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var gifToPush = $("#gif-input").val().trim();

  // The movie from the textbox is then added to our array
  topics.push(gifToPush);

  // Calling displayButtons which handles the processing of our topics array
  displayButtons();


});

// Generic function for displaying the gif and info
$(document).on("click", ".gifButton", theGif);

// Calling the displayButtons function to display the intial buttons
displayButtons();


// This on click function was suppose to change the animation from still to animate, although lines 22-29 didnt work with this function below
// $(".gif").on("click", function () {
//   console.log($(".gif"));

//   var state = $(this).attr("data-state");
//   console.log(this);

//   if (state == "still") {
//     $(this).attr("src", $(this).attr("data-animate"));
//     $(this).attr("data-state", "animate");
//   } if (state == "animate") {
//     $(this).attr("src", $(this).attr("data-still"));
//     $(this).attr("data-state", "still");
//   }

// });

