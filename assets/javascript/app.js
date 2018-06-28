const MOVIES = ["Toy Story",
    "Shrek",
    "The Incredibles",
    "Monster Inc.",
    "Despicable Me",
    "Minions",
    "Boss Baby",
    "The Nut Job",
    "Inside Out",
    "The Lego Movie"];

(function () {
    for (let i = 0; i < MOVIES.length; ++i) {
        addButton(MOVIES[i]);
    }
}())

// Adds a button to the document with the text given in input parameter
function addButton(btnVal) {
    $("<button>").
        addClass("search-gimpy").
        attr("data-movie", btnVal).
        text(btnVal).
        appendTo($(".buttons"));
}

function trim(str) {
    let reg = new RegExp("^[\s]*(.*)[\s]*$", "\1");
    str.replace(reg, "");
}

// Adds a button with text given in input text field
$(document).on("click", ".btn-search", function () {
    console.log("search pressed");
    let userIn = $(".user-input").val();
    if (userIn != "") {
        addButton(userIn);
    }
})

$(document).on("click", ".images", function () {
    if ($(this).attr("data-still") === "true") {
        $(this).attr("src", $(this).attr("image-move"));
        $(this).attr("data-still", "false");
    }
    else {
        $(this).attr("src", $(this).attr("image-still"));
        $(this).attr("data-still", "true");
    }
})

$(document).on("click", ".search-gimpy", function () {
    $("#gifs-appear-here").html("");

    var movie = $(this).attr("data-movie");
    let appKey = "3AzDFpfTyJGXuBgEAeMFLz2LDCKAEJHl";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=" + appKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            let gifData = results[i];
            var gifDiv = $("<div>").addClass("ajax-item");

            var pRating = $("<p>").text("Rating: " + gifData.rating);
            var pTitle = $("<p>").text("Title: " + gifData.title);

            var image = $("<img>");
            let stillUrl = gifData.images.fixed_height_still.url;
            image.attr("image-still", stillUrl);
            image.attr("image-move", gifData.images.fixed_height.url);
            image.attr("data-still", "true");
            image.attr("src", stillUrl);
            image.addClass("images");

            gifDiv.append(image);
            gifDiv.append(pRating);
            gifDiv.append(pTitle);

            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
});
