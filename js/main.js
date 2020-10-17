window.onload=function() {
  canv=document.getElementById("gc");
  snakeCtx=canv.getContext("2d");
  document.addEventListener("keydown",keyPush);
  setInterval(game,1000/15);
}
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
highScore = 0;

function game() {
  px+=xv;
  py+=yv;
  if(px<0) {
    px= tc-1;
  }
  if(px>tc-1) {
    px= 0;
  }
  if(py<0) {
    py= tc-1;
  }
  if(py>tc-1) {
    py= 0;
  }

  //background colour
  snakeCtx.fillStyle="black";
  snakeCtx.fillRect(0,0,canv.width,canv.height);

  //colour for the snake
  snakeCtx.fillStyle="lime";

  for(var i=0;i<trail.length;i++) {
    snakeCtx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
    if(trail[i].x==px && trail[i].y==py) {

      if(tail > highScore) {
        highScore = tail;
        document.getElementById("highScoreVal").innerText = highScore - 5;
      }
      tail = 5;
      document.getElementById("scoreVal").innerHTML = tail - 5;
    }
  }
  trail.push({x:px,y:py});
  while(trail.length>tail) {
    trail.shift();
  }

  if(ax==px && ay==py) {
    tail++;
    document.getElementById("scoreVal").innerHTML = tail - 5;
    ax=Math.floor(Math.random()*tc);
    ay=Math.floor(Math.random()*tc);
  }

  //food colour
  snakeCtx.fillStyle="white";
  snakeCtx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}

//direction events
function keyPush(evt) {
  switch(evt.keyCode) {
    case 37:
      xv=-1;yv=0;
      break;
    case 38:
      xv=0;yv=-1;
      break;
    case 39:
      xv=1;yv=0;
      break;
    case 40:
      xv=0;yv=1;
      break;
  }
}
