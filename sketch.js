//gloabl variables
var trex,trexRunning,trexCollided
var ground,groundImage;
var array=[1009,35,856,566,38,453,348];
var o1,o2,o3,o4,o5,o6;
var o=[];
var score=0;
var obstaclesGroup,cloudsGroup,birdsGroup;
var GS="play";
var PLAY=1;
var END=0;
var gameState=PLAY;
var bird;
var gameOver,gameOverImage,restart,restartImage;
var dieS,jumpS,checkpointS;

//preload - here I load all the images, amination and sound, font 
function preload(){
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided=loadAnimation("trex_collided.png");
  groundImage=loadImage("ground2.png");
  cloudImage=loadImage("cloud1.png");
  cloudImage2=loadImage("cloud2.png");
  birdImage=loadAnimation('bird.png');
  o1=loadImage("obstacle1.png");
  o2=loadImage("obstacle2.png");
  o3=loadImage("obstacle3.png");
  o4=loadImage("obstacle4.png");
  o5=loadImage("obstacle5.png");
  o6=loadImage("obstacle6.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  dieS = loadSound("die.mp3");
  jumpS = loadSound("jump.mp3");
  checkpointS = loadSound("checkpoint.mp3");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  //trex sprite
  trex = createSprite(250,height-30,30,30);
  trex.addAnimation("running",trexRunning);
  trex.addAnimation("collided",trexCollided);
  trex.scale = 0.7;
  trex.x=100;
  trex.debug=false;
  trex.setCollider("circle",0,0,40);
  console.log('This is setup.');

  //ground sprite
  ground=createSprite(width/2,height-20,width,20);
  ground.addImage(groundImage);
  edges=createEdgeSprites();
  iGround=createSprite(100,height-12,200,10)
  iGround.visible=false

  
  o=[o1,o2,o3,o4,o5,o6];

  obstaclesGroup=new Group();
  cloudsGroup=createGroup();
  birdsGroup=createGroup();
  gameOver=createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImage)
  restart=createSprite(width/2,height/2+50);
  restart.addImage(restartImage);

}

function draw(){
  background('#ffffff');
  textSize(30);
  text("score="+score,500,50);
  
  
  if(gameState===PLAY){
    score+=Math.round(getFrameRate()/60);
    ground.velocityX=-8-score/100;
    if(ground.x<100){
      ground.x=ground.width/2;
    }
    if(touches.length>0 || keyDown('space') && trex.y>height-50){
      trex.velocityY=-10;
      jumpS.play();
      touches=[];
    }
    if(score%100==0 && score!=0){
      checkpointS.play();
    }
    spawnClouds();
    spawnObstacles();
    spawnBird();
    if(trex.isTouching(obstaclesGroup) || trex.isTouching(birdsGroup)){
      dieS.play();
      gameState=END;
    }
    gameOver.visible=false;
    restart.visible=false;
  }
  else if(gameState===END){
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    birdsGroup.setVelocityXEach(0);
    birdsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided");
    gameOver.visible=true;
    restart.visible=true;
    if(mousePressedOver(restart)){
      reset();
    }
  }
  trex.velocityY+=0.5;
  trex.collide(iGround);
  drawSprites();
}

function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  birdsGroup.destroyEach();
  score=0;
  trex.changeAnimation("running"); 
}

function spawnClouds(){
  if(frameCount%60===0){
    var cloud=createSprite(width,100,20,20);
    cloud.y=random(width-200,width-500)
    cloud.velocityX=-4 -score/180;
    cloud.lifetime=width/2 +10;
    var randoms=Math.round(random(1,2));
    switch(randoms){
      case 1:cloud.addImage(cloudImage);
      break;
      case 2:cloud.addImage(cloudImage2);
      break;
      default:
        break;
    }
    
    cloud.scale=random(0.1,0.3);
    
    console.log(cloud.scale);
    trex.depth=cloud.depth+1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount%120===0){
    var obstacle=createSprite(width,height-40,10,10);
    obstacle.velocityX=-8-score/100;
    
    var r=Math.round(random(0,5));
    obstacle.addImage(o[r]);
    obstacle.lifetime=width/8;
    obstacle.scale=0.5;
    obstaclesGroup.add(obstacle);

  }
}

function spawnBird(){
  if(frameCount%219===0 && score > 500){
    var obstacle=createSprite(width,height-100,10,10);
    obstacle.velocityX=-8-score/150;
    obstacle.addAnimation("a",birdImage);
    obstacle.changeAnimation("a")
    obstacle.lifetime=width/4;
    obstacle.scale=0.05;
    birdsGroup.add(obstacle);

  }
}