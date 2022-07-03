var mario1,mario1Img,mario2,mario2Img,mariodeadImg,coin,coinImg;
var goomba1,goomba1Img,goomba2Img,goomba3Img;
var mariodead,kingdom,kingdomImg;
var PLAY=1; 
var END=0;
var gameState="PLAY";
var ground;
var goombaGroup,coinGroup,rand;
var score=0;

//to load the image
function preload(){
  mario1Img=loadImage("sprites/mario1.gif");
  kingdomImg = loadImage("sprites/kingdom.jpg");
  goomba1Img = loadImage("sprites/goomba1.gif");
  goomba2Img=loadImage("sprites/goomba2.png");
  goomba3Img=loadImage("sprites/goomba3.png");
  goomba4Img=loadImage("sprites/goomba4.png");
  goomba5Img=loadImage("sprites/goomba5.png");
  goomba6Img=loadImage("sprites/goomba6.png");
  coinImg=loadImage("sprites/coin.png");
  coin2Img=loadImage("sprites/coin2.png");
  coin3Img=loadImage("sprites/coin3.png");
  coin4Img=loadImage("sprites/coin4.png");
  mariodeadImg=loadImage("sprites/mariodead.jpg");
  
}

//create the sprites(objects)
function setup() {
  createCanvas(1500,700);

  kingdom=createSprite(750,350,1500,700);
  kingdom.addImage(kingdomImg);
  kingdom.scale=7.5;

  mario1=createSprite(90, 600, 50, 50);
  mario1.addImage(mario1Img);
  // mario1.debug=true;
  mario1.setCollider("circle",0,0,80);

  ground=createSprite(750,650,1500,20);
  ground.visible=false;

  mariodead = createSprite(750,350,1500,700);
    mariodead.addImage(mariodeadImg);
    mariodead.visible=false;

  goombaGroup=createGroup();
  coinGroup=createGroup();

}


//working
function draw() {
  background(0);

  //console.log(gameState);

  //game : play state
  if(gameState==="PLAY"){

    mario1.visible=true;

    //kingdom
    kingdom.velocityX=-5;
   // console.log(kingdom.x);

   //movement 
    if(kingdom.x<0){
      kingdom.x=width/2;
    }

    //mario to jump

    if(keyDown("space")&& mario1.y >= 250 ){
      mario1.velocityY=-8;
    }

    
  spawnCoin();

 
  spawnGoomba();  
  

    // score:
    if(mario1.isTouching(coinGroup)){
     // coinGroup.destroyEach();
      score=score+50;
    }
    // working of mario
    //console.log(mario1.y);

   if(mario1.isTouching(goombaGroup)){
      gameState="END";
      
    }
  }
    
 
    //gravity of mario
    mario1.velocityY=mario1.velocityY+1;

    //mario to stand on the ground
    mario1.collide(ground);
  


  //display the object
  drawSprites();

  if(gameState==="END"){

    mario1.velocityY=0;
    
    coinGroup.destroyEach();
    goombaGroup.destroyEach();
    coinGroup.setVelocityXEach(0);
    goombaGroup.setVelocityXEach(0);
    goombaGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    mariodead.visible=true;
    mario1.visible=false;
    kingdom.velocityX=0;  
    

    textSize(38);
    fill(255,255,255)
   
    text("Press 'r' to restart the game", 550,180);

    // to restart the game
    if(keyCode===114){
      reset();
    }
  }
  

  
  textSize(38);
  fill(255,255,255)
 
  text("Score: " +score, 1250,100);
  
  
  
}

function spawnCoin(){
  //to remove continues objects
  if(World.frameCount % 100 === 0){
  coin=createSprite(1500,Math.round(random(220,550)),10,10);
  coin.velocityX=-15;
  coin.scale=0.5;
  coin.debug=true;
  
  //console.log(coin.x);
  var rand = Math.round(random(1,4));
  switch(rand) {
    case 1: coin.addImage(coinImg);
           break;
    case 2: coin.addImage(coin2Img);
          break;
    case 3: coin.addImage(coin3Img);
      break;
    case 4:  coin.addImage(coin4Img);
          break;
   
    default: break;
  }

  //depth
  coin.depth=mario1.depth;
  mario1.depth=mario1.depth+1;

  coinGroup.add(coin);

  //lifetime
  coin.lifetime=300;

  //speed=distamce/time --> t= d/s = 1500/5 =300
  }

}


function spawnGoomba(){
  if(World.frameCount % 120 === 0){
  goomba=createSprite(1500,650,10,10);
  goomba.y=Math.round(random(100,620));
  goomba.velocityX=-12;
  goomba.scale=0.5;
  goomba.debug=true;
  
  console.log(goomba.x);

  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1: goomba.addImage(goomba1Img);
           break;
    case 2: goomba.addImage(goomba2Img);
          break;
    case 3: goomba.addImage(goomba3Img);
      break;
    case 4:  goomba.addImage(goomba4Img);
          break;
    case 5:  goomba.addImage(goomba5Img);
          break;
    case 6:  goomba.addImage(goomba6Img);
          break;
    default: break;
  }
 

  //depth
  goomba.depth=mario1.depth;
  mario1.depth=mario1.depth+1;

  goombaGroup.add(goomba);

  goomba.lifetime=300;
  }

}

function reset(){
gameState="PLAY";
  score=0;
  coinGroup.destroyEach();
  goombaGroup.destroyEach();
  mariodead.visible=false;
  mario1.visible=true;
 //theme.play();
 
 }

