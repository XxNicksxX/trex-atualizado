var checksom
var pulosom
var mortasom
var fim,imgfim;
var restart,restartimg;
var rex_collide;
var rex,rex_run;
var bordas;
var solo,colisaosolo;
var nuvem,imagem_nuvem;
var placar = 0;
var gobstaculos, gnuvens;

//PAUSAR
var JOGAR = 0;
var PAUSAR = 1;
var modo = JOGAR;

function preload(){
  //carregar animações e imagens
  rex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  imagemSolo = loadImage("ground2.png");
  
  
  restartimg = loadImage("restart.png");
  imgfim = loadImage("gameOver.png")
  
  imagem_nuvem = loadImage("cloud.png");
  rex_collide = loadImage("trex_collided.png");
  console.log("Placar: "+0);
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  pulosom = loadSound("jump.mp3");
  checksom = loadSound("checkPoint.mp3");
  mortasom = loadSound("die.mp3");
}

function setup(){
  //adicionar sprites e etc
  createCanvas(600,200);
  
  var helenatrombosi = "é uma velha kkkkkk"
 
  
   fim = createSprite(300,100);
   fim.addImage(imgfim);
   restart = createSprite(300,150);
  restart.addImage(restartimg); nicolas=createSprite(100,300);
  
  //sprite rex
  rex = createSprite(100,100,10,10);
  //animação rex correndo
  rex.addAnimation("running",rex_run);
  rex.addImage("morreu", rex_collide);
  rex.scale = 0.5;
  rex.x = 50;
  
  

 //rex.debug = trues
  
rex.setCollider("circle",0,0,30)
  
  //solo
  solo = createSprite(300,190,600,20);
  solo.addImage("solo",imagemSolo);
  solo.x = solo.width / 2;
  
  colisaosolo = createSprite(300,190,600,10);
  colisaosolo.visible = false;
  
  restart.visible = false;
  fim.visible = false;
  
  gobstaculos = new Group();
  
  gnuvens = new Group();
  
  

  //bordas do jogo
  bordas = createEdgeSprites();
}

function draw(){
  //funcionamento do jogo
  //console.time();
  background('white');
  
  text ("Placar: "+placar,500,20);
  
  if (placar % 100 === 0 && placar > 0){
     checksom.play();
  
    
  }
   camera.position.x = rex.position.x
 
if(modo === JOGAR){
    //mover o solo
    solo.velocityX = -10;
    
    //atualizar placar
    placar = placar + Math.round(frameRate()/60);
    
    //reiniciar solo
  if (solo.x < 0){
    solo.x = solo.width/2;
  }  
    
   //Pulo rex
  if(keyDown("space")&&rex.isTouching(solo)){
    rex.velocityY = -10;
    pulosom.play();
  }
  
   //gravidade
  rex.velocityY = rex.velocityY + 0.6;
  
  gerarNuvens();
  
  gerarObstaculos();
  
  if(gobstaculos.isTouching(rex)){
    modo = PAUSAR;
    mortasom.play();
    
  }
  
  
}
  
  
else if (modo === PAUSAR){
    //parar  o solo
   restart.visible = true;
   fim.visible = true;
  
  solo.velocityX = 0;
    rex.velocityY = 0;
  gobstaculos.setVelocityXEach(0);
  gnuvens.setVelocityXEach(0);
  gobstaculos.setLifetimeEach(-1);
  gnuvens.setLifetimeEach(-1);
  rex.changeAnimation("morreu");
  
  if (mousePressedOver(restart)){

    reset()
  }
    
  }

  //rex.collide (bordas [3]);
  //rex.collide(solo);
  rex.collide(colisaosolo);
  
    
  drawSprites();
  //console.timeEnd();
}

function gerarNuvens(){
  if(frameCount % 80 === 0){
  nuvem = createSprite(600,100,50,10);
  nuvem.addImage(imagem_nuvem);
  nuvem.y = Math.round(random(10,130));
  nuvem.scale = 0.5;
  nuvem.velocityX = -3;
    
    
    nuvem.lifetime = 210;
    
    //ajustar profundidade
    
    nuvem.depth = rex.depth
    rex.depth = rex.depth + 1;
    
     gnuvens.add(nuvem);
  
  }
  
 
}

function gerarObstaculos(){
  if (frameCount % 60 === 0){
    var obstaculo = createSprite(600,175,10,40);
    obstaculo.scale = 0.5;
    obstaculo.velocityX = -10;
    obstaculo.lifetime = 110;
    
    //gerar obstaculos aleatorios
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstaculo.addImage(obstaculo1);
        break;
      case 2: obstaculo.addImage(obstaculo2);
        break;
      case 3: obstaculo.addImage(obstaculo3);
        break;
      case 4: obstaculo.addImage(obstaculo4);
        break;  
      case 5: obstaculo.addImage(obstaculo5);
        break;
      case 6: obstaculo.addImage(obstaculo6);
        break;   
        default: break;  
      }  
    
      gobstaculos.add(obstaculo);
    
  }
}

 function reset(){
   
       modo = JOGAR
       fim.visible = false;
       restart.visible = false;
       gobstaculos.destroyEach();
       gnuvens.destroyEach();
       placar = 0;
       rex.changeAnimation("running");
   
 }



