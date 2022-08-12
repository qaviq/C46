var bg,bgImage;
var player,playerImg;
var ground;
var policeOffier, policeOffierImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,gameOverImg;
var reset,resetImg;
var rightWall;
var leftWall;
var score;
var diamonds,diamondsImg;
var diamondsGroup

function preload(){
    bgImage = loadImage("assets/background.jpg");
    playerImg = loadImage("assets/pc.png");
    policeOffierImg = loadImage("assets/npc.png");
    gameOverImg = loadImage("assets/gameover.png");
    resetImg = loadImage("assets/playagain.png");
    diamondsImg = loadImage("assets/diamond.png");
}



function setup(){
    createCanvas(1200,700);

    bg = createSprite(700,350);
    bg.addImage(bgImage);
    bg. scale = 2.5;

    player = createSprite(450,600);
    player.addImage(playerImg);
    player.scale = 0.2;

    ground = createSprite(500,600,1200,10)    
    ground.visible = false;

    policeOfficer = createSprite(150,550);
    policeOfficer.addImage(policeOffierImg);
    policeOfficer.scale = 0.3;
    policeOfficer.velocityX = 2;

    gameOver = createSprite(600,350);
    gameOver.addImage(gameOverImg);

    reset = createSprite(100,70);
    reset.addImage(resetImg);
    reset.visible = false;
    reset.scale = 0.7;

    rightWall = createSprite(1180,600,10,500);
    rightWall.visible = false;

    leftWall = createSprite(20,600,10,500);
    leftWall. visible = false;

    diamondsGroup = new Group;

    score = 0;
    stroke("black");
    fill("black");
    textSize(20);
}

function draw(){
    background(0);

    if(gameState === PLAY){
        player.visisble = true;

        gameOver.visible = false;


        bg.velocityX = -3;
        if(bg.x < 450){
            bg.x = 600;
        }
        
        if(keyDown("UP_ARROW") && player.y >= 200){
            player.velocityY = -12;
        }

        if(policeOfficer.collide(rightWall)){
            policeOfficer.velocityX = -2;
        }
        else if(policeOfficer.collide(leftWall)){
            policeOfficer.velocityX = 2;
        }

        player.velocityY = player.velocityY +0.8

        player.collide(ground)
        if(diamondsGroup.overlap(player)){
            score = score+1;
            diamondsGroup[0].destroy();
        }
        if(player.collide(policeOfficer)){
            player.velocityY = 0;
            player.visible = false;
            bg.velocityX = 0;
            policeOfficer.velocityX = 0;
            policeOfficer.visible = false;
            gameState = END;  
        }
        

        
    }
    

    else if(gameState === END){
        bg.velocityX = 0;
        player.velocityY = 0;
        player.visible = false;
        bg.velocityX = 0;
        policeOfficer.velocityX = 0;
        policeOfficer.visible = false;
        gameOver.visible = true;
        reset.visible = true;
        

    if(mousePressedOver(reset)){
        restart();
    }
    diamondsGroup.velocityXEach();
    diamondsGroup.setVisibleEach(false);
    }



    spawnDiamonds();
    drawSprites();
    text("Score:"+score,250,250);
    text("Please reload your screen to play again",600,50);
}


function restart(){
    gameState = PLAY;
    reset.visible = false
    player.visible = true;
    policeOfficer.visible = true;
    policeOfficer.velocityX = 2;
    player.velocityX = 0;
    player.x = 450;
    policeOfficer.x = 150;
    score = 0;
    diamondsGroup.velocityXEach(0);
    diamondsGroup.setVisibleEach(false);
}

function spawnDiamonds(){
    if(frameCount % 150 === 0){
        diamonds = createSprite(1180,600);
        diamonds.addImage(diamondsImg);
        diamonds.velocityX = -3;
        diamonds.scale = 0.2;
        diamondsGroup.add(diamonds);
    }
}