window.onload = function() {

  let canvas = document.getElementById("sky");
  let ctx = canvas.getContext("2d");

  let W = window.innerWidth;
  let H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  //generate snowflakes and apply attributes
  let mf = 100;  //maximum # of flakes on the screen
  let flakes = [];

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

  function drawFlakes() {
    ctx.clearRect(0,0,W,H);  //clear anything currently on the rectangle of the canvas
    ctx.fillStyle = "white"; //color of the snowflakes
    ctx.beginPath();  //tells javascript that a path or shape will be drawn

    for(i=0; i < mf; i++) {

      let f = flakes[i];
      ctx.moveTo(f.x, f.y);  //will move the start point of each flake to their new co-ordinates
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);

    }
    ctx.fill();  //fills those newly circles shapes with the color chosen in ctx.fillStyle = "white"
    moveFlakes(); //call the function that animates the flakes
  }
  let angle = 0;

  function moveFlakes(){
    angle += 0.01;  //increment the angle of the left/right movement of the flakes
    for(i=0; i < mf; i++) {

      let f = flakes[i];

      f.y += Math.pow(f.d, 2) + 1;  //Math.pow(f.d, 2) = density to the power of 2 (squaring the density)
      //this affects how much the Y coord will change, higher Y means lower on the page
      f.x += Math.sin(angle) * 2;  //creating a horizontal left <-> right sin-wave

      if(f.y > H) {
        flakes[i] = {x: Math.random()*W, y: 0, r: f.r, d: f.d};
      }
    }
  }
  setInterval(drawFlakes, 25);
}
