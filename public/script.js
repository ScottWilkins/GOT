$(document).ready(function(){
  //ultimately create an object that will be used by d3
  //object will change with each click
  //first one will be created with the sigil button
  //next will be created by clicking sworn member node which will bring up their houses
  //if a character is an an available actor, their picture will be shown
   $('.sigil').on("click", function(){
        var id = this.id;
        callAjax(id, 'http://www.anapioficeandfire.com/api/houses/', createHouse)
        })

  function callAjax(id, url, func) {
    $.ajax({
            type: "GET",
            dataType: 'json',
            url: url + id,
            success: function(result){
            func(result)
       }});
     }
  function removeSplash(){
      $('svg').remove()
  }
  function createHouse(data){
    removeSplash();
    var houseName = data.name;
    data.swornMembers.forEach(member => callAjax("", member, memberArray));
    var h1 = document.createElement("h1");
     $(h1).html(houseName)
     $('body').append(h1)
  }
  function memberArray(data){
  console.log(data);;
  }
  })
