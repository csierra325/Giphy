//  Key: e1wKfEvTs4fxDAl40AguhTo5EbCcadbY
// Host: api.giphy.com
//Path: /v1/gifs/search


// Params
// api_key
// q
// limit
// rating
// https://api.giphy.com/v1/gifs/search?api_key=e1wKfEvTs4fxDAl40AguhTo5EbCcadbY&q=javascript&limit=15&rating=pg


var band = ["Paramore", "Gwen Stefani", "Red Hot Chili Peppers", "Blink 182", "Luke Bryan", "The Beatles", "AC/DC", "P!nk", "Led Zeppelin", "Jimmy Hendrix", "Guns and Roses", "Taylor Swift", "Pearl Jam", "Metallica", "Green Day", "Nicki Minaj", "Katy Perry"];


function renderButtons() {

    // Deleting the bands prior to adding new bands
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of bands
    for (var i = 0; i < band.length; i++) {

      //
      // This code $("<button>") is what jQuery needs to create a button. 
      var a = $("<button>");
      // Adding a class of movie-btn to our button
      a.addClass("band-btn");
      // Adding a data-attribute
      a.attr("data-name", band[i]);
      // Providing the initial button text
      a.text(band[i]);
      // Adding the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
  $(document).on("click", ".band-btn", searchGiphyByButton );
  renderButtons();






// creates button
function addButton(text) {
    var button = $("<button>");
    button.html(text);
    return button;
};

function createImage(rating, url, still, animated) {
    var image = $('<img>');
    var pOne = $("<p>").text("rating: " + rating);
    image.attr({
        src: url,
        'data-animated': animated,
        'data-still': still,
        'data-state': 'still',
        'data-rating': rating

    });

    return image;
};

function displayGiphy(response) {
    $('.giphy_images').empty();
    var data = response.data;

    for (var i = 0; i < data.length; i++) {
        var animated = data[i].images.fixed_height.url;
        var still = data[i].images.fixed_height_still.url;
        var rating = data[i].rating;
        var url = still;
        //return images

        // displaying rating and images
        $('.giphy_images').prepend( $("<header>").text("Rating: " + rating).prepend());
        $('.giphy_images').prepend(createImage(rating, url, still, animated));
        
        

    }

};


// connects the API
function grabGiphy(val) {

    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?api_key=e1wKfEvTs4fxDAl40AguhTo5EbCcadbY&q=' + val,
            method: 'GET'

        })


        .done(function (data) {
            console.log("Data: ", data);
            displayGiphy(data);
        })
        .fail(function (error) {
            console.log("error", error);
        });

};


function searchGiphy(event) {

    event.preventDefault();

    var value = $('#search').val();

    $('.giphy_multiplebuttons').append(addButton(value));
    grabGiphy(value);
    $('#search').val('');
};

$('.giphy_search').on('click', searchGiphy);

function searchGiphyByButton() {

    var name = $(this).html();
    grabGiphy(name);
    console.log('Name', name);
    
};



$('.giphy_search').on('click', searchGiphy);
$(document).on('click', '.giphy_multiplebuttons button', searchGiphyByButton);


function playGiphy() {
    var still = $(this).attr('data-still');
    var animated = $(this).attr('data-animated');
    var state = $(this).attr('data-state');
   

    if (state === 'still') {
        $(this).attr({
            'data-state': 'play',
            src: animated
        })

    } else {

        $(this).attr({
            'data-state': 'still',
            src: still
        });

    }


}
$(document).on('click', 'img', playGiphy);