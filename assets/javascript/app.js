// VARIABLES ==========================================================================

var queryLimit = 10;
var characterName = ""
var APIKey = "S43IKOzbb1L394FnVMrdlmpxpaYFVWca";
var queryURL = ""
var tvCharacters = ["Homer Simpson", "Peter Griffin", "Carlton Banks", "Al Bundy", "George Costanza", "Kramer", "Joey Tribiani", "Monica Geller", "Steve Urkel", "Michelle Tanner", "Archie Bunker", "Lucille Ball"]



// RENDER BUTTONS =====================================================================

function renderButtons(){
    $(".buttons-container").empty()
    for (var i=0; i < tvCharacters.length; i++){
        b = $("<button>")
        b.addClass("character-button")
        b.attr("data-name", tvCharacters[i])
        b.text(tvCharacters[i])
        b.appendTo(".buttons-container")
    }
}

renderButtons()

// MORE GIFS ONCLICK ===============================================================
$(document).on("click", ".queryLimit-raiser", function(){
    if (characterName === ($(this).data("name"))) {
        console.log("if triggered")
        queryLimit = queryLimit + 10;
        console.log("limit raised to " + queryLimit)
    }    
})

// AJAX CALL TO GIPHY API =============================================================

$(document).on("click", ".character-button", function(){
    $(".gifs-container").empty()
    $("#instructions").text("Click on a gif to animate it! Click again to stop it.")

    if (characterName !== $(this).data("name")){
        queryLimit = 10
    }

    console.log(queryLimit)
    characterName = ($(this).data("name"))
    
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + characterName + "&limit=" + queryLimit + "offset=0&rating=G&lang=en"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    console.log(response)
   
    for (var i=0; i<response.data.length; i++){

    newGifDiv = $("<div>")
    newGifDiv.addClass("gif-div text-center")

    newGif = $("<img>")
    // newGif.addClass("card-img-top")
    newGif.attr("src", response.data[i].images.fixed_height_small_still.url)
    newGif.attr("data-still", response.data[i].images.fixed_height_small_still.url)
    newGif.attr("data-animate", response.data[i].images.fixed_height_small.url)
    newGif.attr("data-state", "still")
    newGif.addClass("gif")
    newGif.appendTo(newGifDiv)

    newGifTitle = $("<h6>")
    // newGifTitle.addClass("card-title")
    newGifTitle.text(response.data[i].title)
    newGifTitle.appendTo(newGifDiv)

    newGifRating = $("<p>")
    // newGifRating.addClass("card-text")
    newGifRating.text("Rating: " + response.data[i].rating)
    newGifRating.appendTo(newGifDiv)

    newGifFavButton = $("<button>", {text: "Add to Favorites"})
    newGifFavButton.addClass("fav-button btn btn-primary")
    newGifFavButton.attr("gifnumber", i)
    newGifFavButton.attr("img-src", response.data[i].images.fixed_height.url)
    newGifFavButton.attr("data-title", response.data[i].title)
    newGifFavButton.appendTo(newGifDiv)
    
    newGifDiv.appendTo(".gifs-container")
    }

    moreGifsButton = $("<button>", {text: "Give me 10 more " + characterName + " gifs!"})
    moreGifsButton.addClass("character-button queryLimit-raiser")
    moreGifsButton.attr("data-name", characterName)
    moreGifsButton.appendTo(".gifs-container")

    

})
})


// ADD A CHARACTER BUTTON =================================================================

$(document).on("click", "#add-character", function(event) {
    event.preventDefault();
    newChar = $("#character-input").val().trim();
    tvCharacters.push(newChar);
    renderButtons();
  });

// ONCLICK TO TOGGLE ANIMATION =============================================================

$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state")

    if (state === "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
      }

      else if (state === "animate") {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"))
      }
})


//  FAVORITE BUTTON ONCLICK ================================================================

var favGifNumber = 0;

$(document).on("click", ".fav-button", function(){
    console.log($(this).attr("gifnumber"))
    console.log($(this).attr("img-src"))
    

    favGifDiv = $("<div>")
    favGifDiv.addClass("card faves-card text-center")

//remove button classes
    favGifNumber++;
    removeValue = "removeValue" + favGifNumber
    favGifDiv.addClass(removeValue) 
//======================
    
    newFavGif = $("<img>")
    newFavGif.attr("src", $(this).attr("img-src"))
    newFavGif.addClass("card-img-top")
    newFavGif.appendTo(favGifDiv)
    newFavGifBody = $("<div>")
    newFavGifBody.addClass("card-title")
    newFavGifBody.text($(this).attr("data-title"))
    newFavGifBody.appendTo(favGifDiv)
    removeFavButton = $("<button>", {text: "Remove"})
    removeFavButton.addClass("btn btn-primary remove-fav")
    removeFavButton.attr("favGifNumber", favGifNumber)
    console.log($(this).attr("favGifNumber"))
    removeFavButton.appendTo(favGifDiv)
    favGifDiv.appendTo(".faves-div")
    
})

// REMOVE BUTTON ONCLICK ==========================================================

$(document).on("click", ".remove-fav", function(){
    console.log($(this).attr("favGifNumber"))
    console.log("removeValue" + favGifNumber)
    $(".faves-div").remove(".removeValue" + favGifNumber)
    $(".faves-div").remove(".removeMe")
    $(".faves-div").remove(".removeValue1")
})

