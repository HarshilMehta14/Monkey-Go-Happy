var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var PLAY= 1;
var END= 0;
var gameState = PLAY;
var ground;
var FoodGroup, obstacleGroup;
var ObstacleY, FoodY;
var survivalTime=0, score=0;

function preload(){
    
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage=loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(500,400);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey=createSprite(40,320,10,10);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
}


function draw() {
  background(220);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+score, 350,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+survivalTime, 100,50);
  if (gameState == PLAY){
  if(ground.x/2>0){
    ground.x=ground.width/2;
  }
    survivalTime=Math.ceil(frameCount/frameRate());
    
  if(keyDown("space")&&monkey.y>200){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  Obstacle();
  Food();
  
  if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
    score=score+1;
  }
  
  if(obstacleGroup.isTouching(monkey)){ 
    gameState=END;
  }
}
  if(gameState == END){
    FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
    monkey.destroy();
    
    ground.velocityX=0;
    
    textSize(20);
    text("Game Over",180,200)
  }
  drawSprites();
}
function Food(){
  if(frameCount%120== 0){
  FoodY=Math.round(random(120,200))
  banana=createSprite(510,FoodY,10,10);
  banana.addImage(bananaImage);
  
  banana.scale=0.1;
  banana.velocityX=-4;
  banana.lifetime=150;
  FoodGroup.add(banana);
  }
}
function Obstacle(){
  if(frameCount%300== 0)
  {
  obstacle=createSprite(510,320,30,30);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  
  obstacle.velocityX=-4;
  obstacle.lifetime=280;
  obstacleGroup.add(obstacle);
  }
}





