//ultimately create an object that will be used by d3
//object will change with each click
//first one will be created with the sigil button
//next will be created by clicking sworn member node which will bring up their houses
//if a character is an an available actor, their picture will be shown

$(document).ready(function(){
   $('.sigil').on("click", function(){
        var id = this.id;
        callAjax(id, 'http://www.anapioficeandfire.com/api/houses/', createHouse, 'json')
        })
  //one ajax call function to rule them all
  function callAjax(id, url, func, type, optionalInfo) {
    $.ajax({
            type: "GET",
            dataType: type,
            url: url + id,
            beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'application/json');},
            success: function(result){
              func(result, optionalInfo)
       }});
     }
  //clear the stage
  function removeSplash(){
      $('footer').remove()
      $('svg').remove();
      $(".placeHolder").remove()
      var div = document.createElement('div');
      var footer = document.createElement('footer')
      $(div).css("width", "1450")
      .css("height","600")
      .css("background-color", "black")
      .css("color", "#bbb")
      .css("overflow", "scroll")
      div.className = "placeHolder"
      $('body').append(div).append(footer)
  }
  //show house name and list the sworn members of a house
  //and if they have an actor, show that picture
  function createHouse(data){
    removeSplash();
    var houseName = data.name;
    var h1 = document.createElement("h1");
    var ul = document.createElement('ul')
    ul.className = ('swornMembers')
     $(h1).html(houseName)
     $('.placeHolder').append(h1)
     .append(ul)
     data.swornMembers.forEach(member => callAjax("", member, createMemberArray, 'json'));
  }

  function createMemberArray(data){
    var playedBy = data.playedBy[0];
    var li = document.createElement('li')
    $(li).html(data.name)
    if (playedBy){ var id =
        callAjax(htmlIfy(playedBy),'https://api.themoviedb.org/3/search/person?api_key=6d797f03997e4b6fa4035391d0ebb660&query=',
             createActorPic, 'jsonp', [li, playedBy])
       } else {
         $(li).append('<img src="./resources/dayne.png">')
       }
    $('.swornMembers').append(li)
  }

  function createActorPic(data, options){
    console.log(data);
    var id = data.results[0].profile_path;
    var img = document.createElement('img')
    $(img).attr("src", `https://image.tmdb.org/t/p/w1280/`+id)
    .css("height","50px")
    .css("width", "50px")
    var li = options[0]
    var actor = options[1]
    $(li).append(` (played by ${actor})`)
    if(id)  $(li).append(img)
  }

  function htmlIfy(str){
    return str.replace(" ","%20")
  }
  })
