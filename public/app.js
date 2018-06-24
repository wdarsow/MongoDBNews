

$.getJSON("/articles", function(data) {

        for(let i = 0; i < data.length; i++) {

     $("#articleDiv").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<button id= " + "button" + data[i]._id + ">" + "Save Article" + "</button>" + "</p>");
    }
});


$("#scrapenow").on("click", function() {
    
    $.getJSON("/scraping", function(data) {
      console.log(data.length);
        for(let i = 0; i < data.length; i++) {
            $("#articleDiv").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");   
    }})
      location.reload();
      console.log("scraping worked");
});
