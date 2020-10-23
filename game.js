// alert("Test");
let buttonColours = ["red","blue","green","yellow"]; //button arrays;
let gamePattern=[],randomNumber,userClickedPattern=[];
let gameStarted=0,level=0; //var to check if game started. level of game
let ind=0;      // index of userclick pattern tracker

function nextSequence(){
  userClickedPattern=[];
  ind=0;    //reset ind and clicked pattern array for next level
  $("#level-title").text("Level "+level);
     randomNumber= Math.floor(Math.random()*4);
//    console.log(randomNumber);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log(randomChosenColour);

      $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
    ///  console.log(gamePattern);
}

//when game is over it will call this function to reset values
function startOver(){
  level=0;
  gamePattern=[];
  gameStarted=0;
}


//click handler when a button is clicked
$(".btn").click(function(event){
  let userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  checkAnswer(ind); //level working as last index clicked
  ind++;            //increase index for next click
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //console.log(userClickedPattern);
});

//plays sound with the name param passed to it
function playSound(name){
  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

//animate clicking of button
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
    setTimeout(()=>{
    $("#"+currentColour).removeClass("pressed");
  },100);
}

//wait for first key press to start game

  $(document).keypress(function(event){
    console.log(event.key);
    if(gameStarted!=1)
    {
      nextSequence();
    }gameStarted=1;
  //  console.log(gameStarted);
  });
  if ("ontouchstart" in document.documentElement)
  {
    console.log(event.key);
    if(gameStarted!=1)
    {
      nextSequence();
    }gameStarted=1;
  }

//function to check if the clicks matches with the pattern
function checkAnswer(ind){
  if(userClickedPattern[ind]==gamePattern[level]&&ind==level)
{
//  console.log("success"+ind+level);
  level++;
    setTimeout(nextSequence,1000);
}
  else if(ind==level||userClickedPattern[ind]!=gamePattern[ind]){
  //  console.log("wrong"+ind+level);
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart ");
      setTimeout(()=>{
        $("body").removeClass("game-over");
      },200);
      startOver();
  }
}
