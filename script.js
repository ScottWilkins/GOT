$(document).ready(function(){
   $('.sigil').on("click", function(){
     $('svg').remove()
     var id = this.id;
     $.ajax({
            type: "GET",
            dataType: 'json',
            url: 'http://www.anapioficeandfire.com/api/houses?name='+id,
            success: function(result){
            //result = JSON.stringify(result)
            name = result["0"].name;
             var h1 = document.createElement("h1");
             $(h1).html(name)
             $('body').append(h1)
    }});
});

   })
