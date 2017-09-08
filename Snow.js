window.onload = function() {

  //get the HTML canvas and store in variable
  let canvas = document.getElementById("sky");
  //get the context to draw 2d shapes on here
  let ctx = canvas.getContext("2d");

  //set canvas dimensions equla to window height and width
  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //generate snowflakes and apply attributes
  let mf = 100;  //maximum # of flakes on the screen
  let flakes = [];

  //loop trhough empty flakes array and give each flake random attributes
  for (i=0; i < mf; i++) {
    flakes.push({
      x: Math.random()*W,
      //random x-coordinate, min of 0, max of right of window X
      y: Math.random()*H,
      //random y-coordinate, min of 0, max of top of window H
      r: Math.random()*5+2,
      //min radius of 2px and max of 7px. Radius is for movement?
      d: Math.random()+1 //min density of flake is 1, max is 2
    })
  }

  //draw flakes onto canvas
  function drawFlakes() {
    ctx.clearRect(0,0,W,H);  //clear anything currently on the rectangle of the canvas
    ctx.fillStyle = "white"; //color of the snowflakes
    ctx.beginPath();  //tells javascript that a path or shape will be drawn

    //draw each flake given their location and size as circles
    for(i=0; i < mf; i++) {

      let f = flakes[i];
      ctx.moveTo(f.x, f.y);  //will move the start point of each flake to their new co-ordinates
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
      //f.x and f.y are start co-ordinates,
      //then using f.r as radius to go out from those co-ordinates
      //Math.PI*2 = 360 degrees in radians
      //0, Math.PI*2, true   means:  start at 0 degrees, do a full cirle, move clockwise in that circle

    }
    ctx.fill();  //fills those newly circles shapes with the color chosen in ctx.fillStyle = "white"

    moveFlakes(); //call the function that animates the flakes
  }

  //animate the flakes
  let angle = 0;

  function moveFlakes(){
    angle += 0.01;  //increment the angle of the left/right movement of the flakes
    for(i=0; i < mf; i++) {

      //store current flake
      let f = flakes[i];

      //update X and Y coords of each flake
      f.y += Math.pow(f.d, 2) + 1;  //Math.pow(f.d, 2) = density to the power of 2 (squaring the density)
      //this affects how much the Y coord will change, higher Y means lower on the page
      f.x += Math.sin(angle) * 2;  //creating a horizontal left <-> right sin-wave

      //if flake reaches the bottom, send a new one to the top
      if(f.y > H) {
        flakes[i] = {x: Math.random()*W, y: 0, r: f.r, d: f.d};
        //new flake will have a random X coord, will start at top of page
        //and will have the same radius and density of last snowflake
        //could give new random radius and density like near top
      }
    }
  }

  //call the drawFlakes every 25 miliseconds
  setInterval(drawFlakes, 25);

}
