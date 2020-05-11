// VARIABLES ==========================================================================

var characterName = ""
var APIKey = "S43IKOzbb1L394FnVMrdlmpxpaYFVWca";
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + characterName + "&limit=10&offset=0&rating=G&lang=en"

var tvCharacters = ["Homer Simpson", "Peter Griffin", "Carlton Banks", "Al Bundy", "George Costanza", "Kramer", "Joey Tribiani", "Monica Geller", "Steve Urkel", "Michelle Tanner", "Archie Bunker", "Lucille Ball"]



// RENDER BUTTONS =====================================================================

function renderButtons(){
    $(".buttons-container").empty()
    for (var i=0; i < tvCharacters.length; i++){
        console.log(tvCharacters[i])
        b = $("<button>")
        b.addClass("character-button")
        b.attr("data-name", tvCharacters[i])
        b.text(tvCharacters[i])
        b.appendTo(".buttons-container")
    }
}

renderButtons()

// AJAX CALL TO GIPHY API =============================================================

$(document).on("click", ".character-button", function(){
    $(".gifs-container").empty()

    characterName = ($(this).data("name"))
    
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey + "&q=" + characterName + "&limit=10&offset=0&rating=G&lang=en"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log("queryURL " + queryURL)
    console.log(response)
   
    for (var i=0; i<response.data.length; i++){

    

    newGif = $("<img>")
    // newGif.attr("src", "https://via.placeholder.com/150")
    newGif.attr("src", response.data[i].embed_url)
    newGif.appendTo(".gifs-container")

    newGifRating = $("<div>")
    newGifRating.text("Gif Rating: " + response.data[i].rating)
    newGifRating.appendTo(".gifs-container")
    }
})
})


// ADD A CARACTER BUTTON =================================================================

$(document).on("click", "#add-character", function(event) {
    event.preventDefault();
    newChar = $("#character-input").val().trim();
    tvCharacters.push(newChar);
    renderButtons();
  });