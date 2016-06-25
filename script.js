//click on name, iframe opens
  //give each name a class and event listener
//close button for iframe
  //hide iframe on click
//button to install splash again
//stretch out splash pattern
//set glow to names
  //make separate class for glow, unhitch from sigils
//put names in separate div with pledged member title
//make house title no-picture
//add transitions
//more styling
//think of new functionality
//test on big screen
//

var housePics = {
  362:"./resources/stark.jpg",
  395:"./resources/tully-house.jpg",
  380:"./resources/tarth-house.jpg",
  72:"./resources/clegane-house.jpg",
  202:"./resources/hornwood-house.jpg",
  66:"./resources/cerwyn-house.jpg",
  255:"./resources/manderly-house.jpg",
  133:"./resources/florent-house.jpg",
  7:"./resources/arryn-house.jpg",
  10:"./resources/baelish-house.jpg",
  427:"./resources/whent-house.jpg",
  229:"./resources/lannister-house.jpg",
  258:"./resources/marbrand-house.jpg",
  317:"./resources/redwyne-house.jpg",
  271:"./resources/mormont-house.jpg",
  98:"./resources/dayne-house.jpg",
  150:"./resources/glover-house.jpg",
  169:"./resources/greyjoy-house.jpg",
  215:"./resources/karstark-house.jpg",
  34:"./resources/bolton-house.jpg",
  117:"./resources/estermont-house.jpg",
  285:"./resources/martell-house.jpg",
  16:"./resources/baratheon-house.jpg",
  102:"./resources/dondarrion-house.jpg",
  80:"./resources/connington-house.jpg",
  378:"./resources/targaryen-house.jpg",
  398:"./resources/tyrell-house.jpg"
}

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
      var div = document.createElement('div')
      div.className = "house-container"
      $('.main').append(div)
  }
  //show house name and list the sworn members of a house
  //and if they have an actor, show that picture
  function createHouse(data, id){
    removeSplash();
    var houseName = data.name;
    var spacer = document.createElement('div')
    var h3 = document.createElement("h3")
    var ul = document.createElement('ul')
    $(spacer).css( "height", "90px" );
    ul.className = ('swornMembers')
    $(h3).html(houseName)
    $('.main').css('background-image', 'url(' + housePics[id] + ')')
    $('.house-container').append(h3).append(spacer)
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
    var span = document.createElement('span')
    li.className = "sworn-member glow"
    $(li).html(swornMember).appendTo(span)
    // if (playedBy){
    //     callAjax(htmlIfy(playedBy),'https://api.themoviedb.org/3/search/person?api_key=6d797f03997e4b6fa4035391d0ebb660&query=',
    //          createActorPic, 'jsonp', [li, playedBy])
    //    } else {
    //      $(".standInPic").css("height","50px").css("width", "50px")
    //      gender === "Male" ? $(li).append(guyPic) : $(li).append(girlPic)
    //    }
    $('.swornMembers').append(span)
  }

  function createActorPic(data, options){
    var li = options[0]
    var actor = options[1]
    var img = document.createElement('img')
    if(data.results.length > 0 &&
      (data.results[0].profile_path ? data.results[0].profile_path!==null : false)){//data.results[0].profile_path !== null){
      var id = data.results[0].profile_path;
      $(img).attr("src", `https://image.tmdb.org/t/p/w1280/`+id)
    } else {
      $(img).attr("src", "./resources/no-picture.png")
    }
    $(img).css("height","70px")
    .css("width", "50px")
    $(li).append(` (played by ${actor})`)
    $(li).append(img)
  }

  function createMemberIframeEvent(){
    $('iframe').remove()
    $('.main').css("background-image","none")
    var name = $(this).text();
    $('<iframe>', {
       src: 'http://awoiaf.westeros.org/index.php/' + name,
       class:  'myFrame',
       frameborder: 0,
    })
      .appendTo('.main');
  }
  function createHouseEvent() {
    var id = this.id;
    callAjax(id, 'http://www.anapioficeandfire.com/api/houses/', createHouse, 'json', id)
  }
  function htmlIfy(str){
    return str.replace(" ","%20")
  }

  $(document).ready(function(){
     splashPageInit()
     $('.sigil').on("click", createHouseEvent)
     $(document).on('click', '.sworn-member', createMemberIframeEvent)
  })
