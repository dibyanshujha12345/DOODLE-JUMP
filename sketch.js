var bgImg;
var touches = [];
var doodle;
var doodleAnimate;
var bars;
var monsters;
var coin;
var score=0;
var ground;
var grndImg;
var bar,barG,barImg;
var invisibleGround;
var coin,coinImg,coinG;
var monster,monsterImg,monsterG;
var lives = 5;
var score = 0;
var coins = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;var btn;var bullet,bulletImg,bulletG;
var jumpS,checkPointS,dieS;var kills = 0


function preload(){
  bgImg = loadImage("background.png");
  doodleAnimate = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");
 grndImg = loadImage("road4.jpg");
 barImg = loadImage("brick.png");
 coinImg = loadImage("goldCoin.png");
 monsterImg = loadImage("monster.png");
 bulletImg = loadImage("fire.png");
 jumpS = loadSound("jump.mp3");
 checkPointS = loadSound("checkpoint.mp3");
 dieS = loadSound("die.mp3");


}

function setup(){
  createCanvas(windowWidth,windowHeight);




  ground = createSprite(width/2,height-100,width,10);
  ground.addImage(grndImg);
  
  ground.velocityX = -5;  

  doodle = createSprite(100,height-100,200,200);
  doodle.addAnimation("jumping",doodleAnimate);
  doodle.scale=0.5;
  //doodle.debug = true;

 barG = new Group(); 
 coinG = new Group();
 monsterG = new Group();
 bulletG = new Group(); 

 invisibleGround = createSprite(width/2,height-60,width,10);
  invisibleGround.visible=false;
 doodle.setCollider("rectangle",0,0,200,200);

// monster.debug = true;

btn = createButton("FIRE");
btn.position(width-70,height/6);

 
}

function draw(){
  background(bgImg);
btn.mousePressed(()=>{
bullet = createSprite(doodle.x+50,doodle.y-40,40,10);
bullet.addImage(bulletImg);
bullet.velocityX = 5;
bulletG.add(bullet);
bullet.scale = 0.5;
touches = [];
})


drawSprites();

if(gameState === END){
  textSize(40)
  text("GAME OVER",width/2,height/2);

  text("WELL PLAYED!!!".width/2,height/2+50);
  coinG.destroyEach();
  barG.destroyEach();
  monsterG.destroyEach();
  doodle.velocityY = 5;
  dieS.play(); 

} 
if(gameState===PLAY){

  if(ground.x<width/4){
    ground.x = width/2;
  }
  spawnBars();
  spawnCoins();
  spawnMonsters();
  console.log(doodle.y);
  if(keyDown("space") && doodle.y>= 453|| touches.length>1){
    doodle.velocityY = -15;
    jumpS.play();
    touches = [];
   

    
  }
  if(bulletG.isTouching(monsterG)){
  bulletG.destroyEach();
 monsterG.destroyEach();
 kills +=1;
  }
  
  if(score% 100 === 0 && score>0){
    checkPointS.play();
  }
  doodle.velocityY +=0.5;
  doodle.collide(invisibleGround);

  if(barG.isTouching(doodle) || monsterG.isTouching(doodle)){
    lives -=1;
    barG.destroyEach();
    monsterG.destroyEach();
    
  }
  if(coinG.isTouching(doodle)){
    coins+=1;
    coinG.destroyEach();

  }
  score = score + Math.round(getFrameRate()/60);

  if(lives === 0){
    gameState = END;
  }






  textSize(18);
  text("LIVES : "+ lives,50,50); 
  text("COINS : "+coins,50,100);
  text("SCORE : "+ score,50,150);
  text("KILLS : "+kills,50,200);
} 
}

function spawnBars(){
  if(frameCount % 200 ===0){
    bar = createSprite(width-20,height-100,100,10);
    bar.addImage(barImg);
    bar.scale = 0.2;
    bar.velocityX = -5;
    bar.lifetime = 240;
    barG.add(bar);


  }


}

function spawnCoins(){
  if(frameCount % 200 === 0){
coin = createSprite(width-20,random(height-100,height-350),20,20);
coin.addImage(coinImg);
coin.scale = 0.1;
coin.velocityX = -8;
coin.lifetime = 240;
coinG.add(coin);  
  }
}
function spawnMonsters(){
  if(frameCount % 100 === 0){
    monster = createSprite(width-20,random(height-50,height-350),30,30);
    monster.addImage(monsterImg);
    monster.scale = 0.11;
    monster.velocityX = -10;
    monster.lifetime = 240;
    monsterG.add(monster);
   // monster.debug = true;

     
  }
}

