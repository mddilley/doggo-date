let dogArray = [];

class Dog{
  constructor(obj){
    this.id = obj.id
    this.name = obj.name
    this.age = obj.age
    this.breed = obj.breed
    this.weight = obj.weight
    if(obj.fixed === true){
	     this.fixed = "Yes"
     } else {
	     this.fixed = "No"
     }
    this.userId = obj. userId
    this.img = obj.img
    this.friendlyRating = obj.friendlyRating
    this.aggressiveRating = obj.aggressiveRating
    this.sex = obj.sex
    this.playDates = obj.playDates.map(playDate => new PlayDate(playDate));
  }
}

Dog.prototype.friendlyIcons = function(){
  let html = "Friendly Rating ";
  for(let i = 0; i < this.friendlyRating; i++){
    html += "<i class=\"fas fa-smile yellow-text\"></i> "
  }
  for(let i = 0; i < (10 - this.friendlyRating); i++){
    html += "<i class=\"fas fa-smile invert\"></i>"
  }
  return html;
}

Dog.prototype.aggressiveIcons = function(){
  let html = "Aggressive Rating ";
  for(let i = 0; i < this.aggressiveRating; i++){
    html += "<i class=\"fas fa-angry red-text\"></i> "
  }
  for(let i = 0; i < (10 - this.aggressiveRating); i++){
    html += "<i class=\"fas fa-angry invert\"></i>"
  }
  return html;
}

function registerHelpers(){
Handlebars.registerHelper('imgLink', function(dogObj) {
  if(this.img === "" || this.img === null){
    this.img = "/images/dogs.png";
  }
  else if(this.img.substring(0,4).toLowerCase() !== "http"){
    this.img = `/images/${this.img}`;
  }
});
}

function showDog(id, userId){
  $.get("/users/" + userId + "/dogs/" + id, function(json){
    let dog = new Dog(json);
    dog.playDates.forEach(playDate => playDate.formatTime());
    dog.playDates.forEach(playDate => playDate.formatDate());
    const source = $("#dog-template").html();
    const template = Handlebars.compile(source);
    const content = template(dog);
    $("div.dog-show").hide().html(content);
    $("div.dog-show").fadeIn();
  });
}

function checkNext(id){
  let index = dogArray.indexOf(id);
  if(index + 1 < dogArray.length){
    $("div.dog-show").data("id", dogArray[index + 1]);
    return dogArray[index + 1];
  } else {
    return dogArray[index];
  }
}

function checkPrev(id){
  let index = dogArray.indexOf(id);
  if(index - 1 >= 0){
    $("div.dog-show").data("id", dogArray[index - 1]);
    return dogArray[index - 1];
  } else {
    return dogArray[index];
  }
}

function fillDogArray(){
  let userId = $("div.dog-show").data("uid");
  $.get("/users/" + userId + "/dogs", function(json){
    json.forEach(obj => dogArray.push(obj.id));
  });
}

$(function(){
  registerHelpers();
  let id = $("div.dog-show").data("id");
  let userId = $("div.dog-show").data("uid");
  showDog(id, userId);
  fillDogArray();
  $("div.dog-show").on('click', '#nextDog', function(){
      let id = $("div.dog-show").data("id");
      showDog(checkNext(id), userId);
  });
  $("div.dog-show").on('click', '#prevDog', function(){
      let id = $("div.dog-show").data("id");
      showDog(checkPrev(id), userId);
  });
});
