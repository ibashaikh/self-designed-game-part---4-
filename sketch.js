
var score = 0
var gameover
var gameState = 1
function preload() {
 
  
  bgImg= loadImage(" bg.jpg")
  cbImg = loadImage("cb-removebg-preview.png")
  coinImg = loadImage("coin.png")
  thiefImg = loadImage("thief.png")
  gameoverImg = loadImage("gameover-removebg-preview.png")
  bg1Img = loadImage("start.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);



  bg = createSprite(width/2, height/+30)
  bg.addImage(bgImg)
  bg.scale = 2.5
  bg.velocityX = -5

  
  cowboy = createSprite(150, height-150)
  cowboy.addImage(cbImg)

  edges = createEdgeSprites() //edges[left edge, right,top,bottom]

  coinGroup = createGroup()

  thiefGroup = createGroup()

  //cowboy.debug = true
  cowboy.setCollider("circle", 0, 0, 200)
  
  gameover = createSprite(width/2, height/2)
  gameover.addImage(gameoverImg)
  gameover.visible = false

  
 
 
}

function draw() {
  background("black");
  drawSprites()

if(gameState === 1){
  

  if(bg.x < 0 ){
    bg.x = width/2
  }
  coins()
  thieves()

  if(keyDown("space")){
    cowboy.velocityY = -15
  }
  cowboy.velocityY = cowboy.velocityY + 1

  if(cowboy.isTouching(coinGroup)){
    score = score + 1
    coinGroup.destroyEach()
  }

  if(cowboy.isTouching(thiefGroup)){
    gameState = 2 
  }
  

}

if(gameState === 2){
  bg.visible = false
  
  gameover.visible = true

  thiefGroup.destroyEach()
  coinGroup.destroyEach()
  cowboy.visible = false

  fill("white")
  textSize(35) 
  text("Press R to Restart", width/2-220, height/2 + 300)

  if(keyDown("R")){
    reset()
  }
}


cowboy.collide( edges[3] )

  //Score : value
  textSize(35)
  text("Score : " + score , 100, 60)
}

function reset(){
  gameState = 1

  gameover.visible = false
  bg.visible = true
  cowboy.visible = true
  score = 0
  
}


function coins(){
  if(frameCount % 400 === 0){
      coin = createSprite(width, 350)
      coin.addImage(coinImg)
      coin.velocityX = -5
      coin.scale = 0.5
      coin.lifetime = width/5
      //coin.debug = true
      coin.setCollider("circle", 0, 0, 150)
      coinGroup.add(coin)
  }
}

function thieves(){
  if(frameCount % 160 ===0){
    thief = createSprite(width, 650)
    thief.addImage(thiefImg)
    thief.velocityX = -5
    thief.scale = 0.5
   thief.lifetime = width/5
   //thief.debug = true
   thief.setCollider("circle", 0, 0, 250)
   thiefGroup.add(thief)
  }
}
