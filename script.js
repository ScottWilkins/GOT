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
  362:"./resources/stark-house.jpg",
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
    h3.className = 'h3Houses'
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
    var swornMember = data.name;
    var li = document.createElement('li')
    var span = document.createElement('span')
    li.className = "sworn-member glow"
    li.id = data.url
    $(li).html(swornMember).appendTo(span)
    $('.swornMembers').append(span)
  }

  function createActorPic(data, options){
    var div = options[0]
    var actor = options[1]
    var img = document.createElement('img')
    img.className = "actorImg"
    if(data.results.length > 0 &&
      (data.results[0].profile_path ? data.results[0].profile_path!==null : false)){//data.results[0].profile_path !== null){
      var id = data.results[0].profile_path;
      $(img).attr("src", `https://image.tmdb.org/t/p/w1280/`+id)
    } else {
      $(img).attr("src", "./resources/no-picture.png")
    }
    $(img).css("height","280px")
    .css("width", "200px")
    $(div).append(img)
  }

  function createMemberIframeEvent() {
    $('.nameInfo').remove()
    $('iframe').remove()
    $('.main').css("background-image","none")
    var name = $(this).text();
    $('<iframe>', {
       src: 'http://awoiaf.westeros.org/index.php/' + name,
       class:  'iFrame',
       frameborder: 0,
    })
      .appendTo('.main');
  }
  function createHouseEvent(func) {

    var id = this.id;
    callAjax(id, 'http://www.anapioficeandfire.com/api/houses/', createHouse, 'json', id)
  }
  function showHouseInfo() {
    var id = this.id;
    $('.container').fadeOut("100", function(){
      callAjax(id, 'http://www.anapioficeandfire.com/api/houses/', houseInfo, 'json', id)
    })
  }
  function hideHouseInfo(){

    $('.container').fadeIn("slow", function(){
        $('.houseInfo').fadeOut("fast")
    })
  }
  function houseInfo(data, id){
    var founded = data.founded || "Long, long ago"
    var words = data.words || "Data not found, but surely they are epic"
    var houseName = data.name
    var houseRegion = data.region
    var coatOfArms = data.coatOfArms
    var houseText =  document.createElement('h2')
    var houseDiv = document.createElement('div')
    var img = document.createElement('img')
    var imgDiv = document.createElement('div')
    var textDiv = document.createElement('div')
    textDiv.className = "textDiv"
    houseDiv.className = houseInfo
    $(img).attr("src", housePics[id]).
      attr("height", "595px")
    img.setAttribute("style","-webkit-filter:brightness(180%)")
    $(houseText).html(houseName).
      append(`<h4>Region:  ${houseRegion}</h4>`).
      append(`<h4>Coat of Arms:  ${coatOfArms}</h4>`).
      append(`<h4>Words:  ${words}</h4>`).
      append(`<h4>Founded:  ${founded}</h4>`)
    $(imgDiv).append(img)
    $(textDiv).append(houseText)
    $(houseDiv).append(imgDiv).
      append(textDiv).
      hide()
    $('.background').append(houseDiv)
    $(houseDiv).fadeIn("fast")
    //console.log([data, id]);
  }
  function htmlIfy(str){
    return str.replace(" ","%20")
  }
  function hideMemberInfo(){
        $('.nameInfo').fadeOut("fast").
        remove()
        $('iframe').show()
  }
  function showMemberInfo() {
    $('iframe').hide()
    var id = $(this).attr("id");
      callAjax("", id, memberInfo, 'json')
  }
  function memberInfo(data){
    var name = data.name
    var born = data.born || "Age of Winter"
    var died = data.died || "Alive (for now)"
    var culture = data.culture || "Westorosi"
    var titlesArray = data.titles[0] || ["Inhabitant of Westoros"]
    var gender = data.gender
    var playedBy = data.playedBy[0] || "Not listed for the HBO series"
    console.log("name: "+name+" born: "+born+" died: "+died+" culture: "+culture+" titles: "+titlesArray+" played by: "+playedBy );
    var nameText =  document.createElement('h2')
    var nameDiv = document.createElement('div')
    var img = document.createElement('img')
    var imgDiv = document.createElement('div')
    var textDiv = document.createElement('div')
    var pic;
    textDiv.className = "textDiv"
    nameDiv.className = "nameInfo"
    pic = gender === "Male" ?  "./resources/guy-tall.png" : "./resources/girl-tall.png"
    $(img).attr("src", pic).
      attr("height", "595px")
    $(nameText).html(name).
      append(`<h4>Title:  ${titlesArray}</h4>`).
      append(`<h4>Culture:  ${culture}</h4>`).
      append(`<h4>born:  ${born}</h4>`).
      append(`<h4>died:  ${died}</h4>`).
      append(`<h4>Played by:  ${playedBy}</h4>`)
    $(imgDiv).append(img)
    $(textDiv).append(nameText)
    $(nameDiv).append(imgDiv).
      append(textDiv)
      if(playedBy !== "Not listed for the HBO series"){
        callAjax(htmlIfy(playedBy),'https://api.themoviedb.org/3/search/person?api_key=6d797f03997e4b6fa4035391d0ebb660&query=',
                createActorPic, 'jsonp', [textDiv, playedBy])
              }
    $(nameDiv).hide()
    $('.main').append(nameDiv)
    $(nameDiv).fadeIn("fast")

  }

  $(document).ready(function(){
     splashPageInit()
     $('.sigil').on("click", createHouseEvent)
     $(document).on('click', '.sworn-member', createMemberIframeEvent)
     $(document).hoverIntent({
         over: showHouseInfo,
         out: hideHouseInfo,
         selector: '.sigil'
     });
     $(document).hoverIntent({
         over: showMemberInfo,
         out: hideMemberInfo,
         selector: '.sworn-member'
     });
  })
