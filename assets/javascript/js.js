$(document).ready(function() {

    var topics = ["Cute Puppies", "Frenchie Puppies", "French Bulldogs", "English Bulldogs Puppies", "English Bulldogs", "German Shepard Puppies", "German Shepard", 
                "Corgi", "Yorkshire", "Labrador Puppies", "Huskies", "Poodle Puppies", "Maltipoos", "Corgi Puppies", "Huskies Puppies", "Maltese", "Pomeranian",
                "Chihuahua Martini", "Pitbull Puppies", "Funny Dogs"];

    function renderButtons() {
        $(".buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var dog = $("<button>");
            dog.addClass("dog colorbtn");
            dog.attr("data-dog", topics[i]);
            dog.text(topics[i]);
            $(".buttons").append(dog);
        }
    };
   
    $("#add-dog").on("click", function(event) {
        event.preventDefault();
        var btn = $("#dog-input").val().trim();
        topics.push(btn);
        renderButtons();
    });
   
    function displayDogs() {
        $(".img").empty();
        var dogbreed = $(this).attr("data-dog");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        dogbreed + "&api_key=lN8YQE4nz6EjKNjP57d6ISV4j1Jz6jIR";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
            .then(function(response) {
                console.log(queryURL);
                console.log(response);
                var results = response.data;
                for (var j = 0; j < 10; j++) {
                    var dogDiv = $("<div>");
                    var p = $("<p>").text("Rating: " + results[j].rating);
                    var dogImage = $("<img>");
                    dogImage.attr("src", results[j].images.fixed_height_still.url);
                    dogImage.width(220);
                    dogImage.height(220);
                    dogImage.addClass("dogimagemedia");
                    dogImage.attr("data-animate", results[j].images.fixed_height.url);
                    dogImage.attr("data-still", results[j].images.fixed_height_still.url);
                    dogImage.attr("data-state", "still");
                    dogDiv.append(p);
                    dogDiv.append(dogImage);
                    dogDiv.addClass("dogimage");
                    $(".img").prepend(dogDiv);
                }

                $(".dogimagemedia").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                })
            })
    };
    
    $(document).on("click", ".dog", displayDogs);
    
    renderButtons();
    
});