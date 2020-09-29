var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,monster,fruitGroup,enemyGroup, score,r,randomFruit, position;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage
var gameOverSound ,knifeSwoosh;

function preload(){
  
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
}



function setup() {
 createCanvas(windowWidth,windowHeight);
  
  
   sword=createSprite(40,height-40,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
  

  

  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
 background(220);
  
  text("Score : "+ score,width/2-100,30);
  
  if(gameState===PLAY){
    
  
    fruits();
    Enemy();
   
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    
    if(touches.length>0) {
        trex.velocityY = -12;
      knifeSwooshSound.play();
        touches=[];
    }
    
    
   
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      knifeSwooshSound.play();
      score=score+2;
    }
    else
    {
     
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        gameOverSound.play()
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
       
        sword.addImage(gameOverImage);
        sword.x=height/2;
        sword.y=height/2;
      }
    }
  }
  
  drawSprites();
  
 
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(width,height-40,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit=createSprite(width,height-35,20,20);
 
    
    
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
      fruit.velocityX= (7+(score/4));
      }
    }
    
    fruit.scale=0.2;
    
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    
    fruit.setLifetime=width/6;
    
    fruitGroup.add(fruit);
  }
}