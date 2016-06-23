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
            beforeSend: function(xhr){xhr.setRequestHeader('Accept', 'application/json');}
       }).done(function(result){
         func(result, optionalInfo);
     })
   }
  //clear the stage
  function removeSplash(){
      $('.main').html("")
      $('svg').remove();
      $('.main').addClass("container")
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
     $('.main').append(h1)
     .append(ul)
     data.swornMembers.forEach(function(member) {callAjax("", member, createMemberArray, 'json')
   });
  }

  function createMemberArray(data){
    var gender = data.gender
    var guyPic = '<img class="standInPic" src="./resources/sm-guy.png">'
    var girlPic = '<img class="standInPic" src="./resources/sm-girl.png">'
    var swornMember = data.name;
    var playedBy = data.playedBy[0];
    var li = document.createElement('li')
    $(li).html(swornMember)
    if (playedBy){
        callAjax(htmlIfy(playedBy),'https://api.themoviedb.org/3/search/person?api_key=6d797f03997e4b6fa4035391d0ebb660&query=',
             createActorPic, 'jsonp', [li, playedBy])
       } else {
         $(".standInPic").css("height","50px").css("width", "50px")
         gender === "Male" ? $(li).append(guyPic) : $(li).append(girlPic)
       }
    $('.swornMembers').append(li)
  }

  function createActorPic(data, options){
    var li = options[0]
    var actor = options[1]
    var img = document.createElement('img')
    if(data.results[0].profile_path !== null){
      var id = data.results[0].profile_path;
      $(img).attr("src", `https://image.tmdb.org/t/p/w1280/`+id)
    } else {
      $(img).attr("src", "./resources/no-picture.png")
    }
    $(img).css("height","50px")
    .css("width", "50px")
    $(li).append(` (played by ${actor})`)
    $(li).append(img)
  }

  function htmlIfy(str){
    return str.replace(" ","%20")
  }
  })
