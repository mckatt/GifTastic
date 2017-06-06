$(document).ready(function(){ 

    var gifArray = ['Acoustic Guitar','Violin','Drums','harmonica','Piano','Synthesizer','cymbal', 'Kazoo','Electric Guitar','Mouth Harp','Cello','Sitar'];

    function appendNewButton(newGif){ 
        var createButton = $('<button>')
        createButton.attr('type', "button");
        createButton.addClass('gif');
        createButton.attr('data-name', newGif);
        createButton.text(newGif);
        $('#buttonsView').append(createButton);
        };

        function renderButtons(){ 
        for (var i = 0; i < gifArray.length; i++){
        appendNewButton(gifArray[i])
        }
    };

    function displayGifInfo(){

        $('#gifView').empty();
        var gif = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div>');
                var p = $('<p>').text("Rating: " + results[i].rating);
                var gifImage = $('<img>');
                var gifStill = response.data[i].images.fixed_height_still.url;
                var gifAnimate = results[i].images.fixed_height.url

                gifImage.addClass('gifToggle');
                gifImage.attr('data-still', gifStill);
                gifImage.attr('data-animate', gifAnimate);
                gifImage.attr('data-state', 'still');
                gifImage.attr('src', gifStill);

                gifDiv.append(p);
                gifDiv.append(gifImage);                    

                $('#gifView').prepend(gifDiv);  
            }
        }); 
    }
    
    function gifState () {
        var state = $(this).attr('data-state');

        if (state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    };



    renderButtons();
    
    $('#searchButton').on('click', function(){
        $('#gif-input').text('');
        $('#gifView').empty();

        var gifSearch = $('#gif-input').val().trim();
        gifArray.push(gifSearch);
        appendNewButton(gifSearch);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                // console.log(response);

                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div>');
                    var gifImage = $('<img>');
                    var p = $('<p>').text("Rating: " + results[i].rating);
                    var gifStill = response.data[i].images.fixed_height_still.url;
                    var gifAnimate = results[i].images.fixed_height.url;

                    gifImage.addClass('gifToggle');

                    gifImage.attr('data-still', gifStill);
                    gifImage.attr('data-animate', gifAnimate);
                    gifImage.attr('data-state', 'still');
                    gifImage.attr('src', gifStill);

                    gifDiv.append(gifImage);
                    gifDiv.append(p);
                    

                    $('#gifView').prepend(gifDiv);
                    gifState ();

                }

                if (results.length == 0) {
                    $('#gifView').text("No gifs found")
                };

            });


        return false;
    });

    $(document).on('click', '.gif', displayGifInfo);
    $(document).on('click', '.gifToggle', gifState);
});