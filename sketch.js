var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, tree;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImage,restartImage;
var restart;

var score = 0;

var newImage;
var treeImage1;
var treeImage2, treeImage3, treeImage4, treeImage5, treeImage6;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  treeImage1 = loadImage("obstacle1.png");
  treeImage2 = loadImage("obstacle2.png");
  treeImage3 = loadImage("obstacle3.png");
  treeImage4 = loadImage("obstacle4.png");
  treeImage5 = loadImage("obstacle5.png");
  treeImage6 = loadImage("obstacle6.png");
gameOverImage  = loadImage("gameOver.png")
restartImage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
gameOver = createSprite(250,50,50,20);
  restart = createSprite(250,100,50,20);
  gameOver.addImage(gameOverImage);
  restart.addImage(restartImage);
  restart.scale = .5
  trex = createSprite(50, 160, 20, 50);
 trex.addAnimation("running", trex_running);
 
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  console.log("Hello" + 5)
  cloudsGroup = new Group();
  obstaclesGroup = new Group();


}
function reset(){
  gameState=PLAY;
  score=0
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
   trex.changeAnimation("running", trex_running);
  
}
function draw() {
  background(180);
  textSize(20)
  text("score=" + score, 400, 25);



  trex.collide(invisibleGround);


  if (gameState === PLAY) {
    trex.velocityY = trex.velocityY + 0.9
    if (keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
    
    }
    //spawn the clouds
    spawnClouds();
    generateObstacles();
gameOver.visible=false;
    restart.visible=false;
    if (ground.x < 1) {
      ground.x = ground.width / 2;
    }
    ground.velocityX = -(4+score%100);
    if (trex.isTouching(obstaclesGroup)) {
    // gameState = END;
      trex.velocityY = -10;
    }
    score = score + Math.round(getFrameRate() / 30)

  } else if (gameState === END) {
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided)
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    gameOver.visible=true;
  restart.visible=true;
if(mousePressedOver(restart)){
  reset();
  
}
    trex.velocityY=0;
    
  
  }
  console.log(gameState);

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10, 60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloudsGroup.add(cloud);

    //assigning lifetime to the variable
    cloud.lifetime = 134

    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
  }

}

function generateObstacles() {
  if (frameCount % 50 === 0) {
    var tree = createSprite(600, 160, 30, 50);
    tree.velocityX = -(4+score%100)
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        tree.addImage(treeImage1);
        break;
      case 2:
        tree.addImage(treeImage2);
        break;
      case 3:
        tree.addImage(treeImage3);
        break;
      case 4:
        tree.addImage(treeImage4);
        break;
      case 5:
        tree.addImage(treeImage5);
        break;
      case 6:
        tree.addImage(treeImage6);
        break;
      default:
        break;

    }
    obstaclesGroup.add(tree);
    tree.lifetime = 175;


    tree.scale = .7
  }





}