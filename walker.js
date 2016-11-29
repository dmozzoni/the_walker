// Get the walker image:
var walker = document.getElementById('walker');

$("body").append("<div class='quote'></div>");

// Configure motion params:
var walkingLeft = true;
var leftBorder = 0;
var rightBorder = window.innerWidth - walker.offsetWidth;
var speed = 10;
var xPos = rightBorder;

// The update function is called once every "frame" (via setInterval)
// Changing the walker's position each frame, will cause him to move across the screen
function update() {
  // ensure walker is facing to the right (reverse of "normal")
  // CSS does this for us, we just assign the right class.

  // Move "speed" pixels per iteration:
  if(walkingLeft) {xPos -= speed;}
  else {xPos += speed;}
  // Reset back to left side, when we run into right wall
  if(xPos >= rightBorder){
    walker.classList.remove("flip");
    walkingLeft = true;
    xPos = rightBorder;
  }
  if(xPos <= leftBorder){
    walker.classList.add("flip");
    walkingLeft = false;
    xPos = leftBorder;
  }
  // reposition the walker
  walker.style.left = xPos + "px";
}


// Change right border when resized
window.addEventListener("resize", function(){
  rightBorder = window.innerWidth - walker.offsetWidth;
});

window.addEventListener("click", function(){
  if(walkingLeft) {
    walkingLeft = false;
    walker.classList.add("flip");
  }  else {
    walkingLeft = true;
    walker.classList.remove("flip");
  }
});

walker.addEventListener("click", function(){
    $.ajax({
        url: "https://got-quotes.herokuapp.com/quotes",
        type: "GET",
        dataType: "json"
    }).done(function(response){
        console.log(response);
        $(".quote").html(response.quote + "<br><span>"+response.character+"</span>");
    }).fail(function (){
        $(".quote").html("Failed to retrieve a quote...");
    });
});

$(document).keydown(function(event){ //left = 37, right = 39
  if(event.which === 39 && walkingLeft === true) {
      walkingLeft = false;
      walker.classList.add("flip");
  }  else if (event.which === 37 && walkingLeft === false){
      walkingLeft = true;
      walker.classList.remove("flip");
  }
//  console.log( event.which );
});





// Establish an update interval (framerate)
// This will call the "update" method every 100ms
// Add code to "update" to change the walker's position
setInterval(update, 100);
