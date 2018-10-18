
$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url:'/articles'
    }).then(function(data){

        data.forEach(element => {
            var row = $('<row>')
            row.append($(`<h2>${element.title}</h2>`))
            row.append($(`<p data-id = ${element._id}>${element.body}</p>`))
            row.append($(`<a href=${element.link}>${element.link}</a>`))

            $('#articles').append(row)
        });
    })


    $(document).on("click", "p", function() {
        $("#notes").empty();
        var thisId = $(this).attr("data-id");
      
        $.ajax({
          method: "GET",
          url: "/articles/" + thisId
        })
          .then(function(data) {
            console.log(data);
            $("#notes").append("<h2>" + data.title + "</h2>");
            $("#notes").append("<input id='titleinput' name='title' >");
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      
            if (data.note) {
              $("#titleinput").val(data.note.title);
              $("#bodyinput").val(data.note.body);
            }
          });
      });


      $(document).on("click", "#savenote", function() {
        var thisId = $(this).attr("data-id");
      
        $.ajax({
          method: "POST",
          url: "/articles/" + thisId,
          data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
          }
        })
          .then(function(data) {
            console.log(data);
            $("#notes").empty();
          });
      
        $("#titleinput").val("");
        $("#bodyinput").val("");
      });
      




})


