class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
    if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){       
        form.hide();
        drawSprites();
        Player.getPlayerInfo();
        
        if(allPlayers!==null){
        image(back_img, 0, 0, 1000, 800);
        var x;
        var y=500
        var index =0;
        
        for(var plr in allPlayers){        
            index = index+1;
            y=500;
            x = 500 - allPlayers[plr].distance;        
            players[index -1].x = x;
            players[index - 1].y = y;
            // Differentiate the main player by printing
            // the name of the player on the basket. 
            if(index === player.index){
           fill("Black")
            textSize(25);
            text(allPlayers[plr].name,x-25,y+25);
        }
    }

        // Give movements for the players using arrow keys
  if(keyIsDown(RIGHT_ARROW) && player.index !== null){
    player.distance -=10
    player.update();
  }
  if(keyIsDown(LEFT_ARROW) && player.index !== null){
    player.distance +=10
    player.update();
  }
  for(var i=0 ; i < fruitGroup.length ; i++){
      if(fruitGroup.get(i).isTouching(players)){
          fruitGroup.get(i).destroy();
          player.score=player.score+1;
          player.update();
      }
      textSize(20);
fill("#FFF700");
text("Player1: "+ allPlayers.player1.score,80,50);
text("Player2: "+ allPlayers.player2.score,80,100);
  }
  if(player.score >= 15){
     this.end();
  }
  drawSprites(); 
} 
}

    end(){
       console.log("Game Ended");
      game.update(2);
       clear();
       textSize(20);
fill("#FFF700");
text("GAME OVER:)",350,300);
    }
     spawnFruits(){
         console.log("inside");
        if(frameCount % 60 === 0) {
         var fruit = createSprite(random(900,100),0,100,15,30);
          fruit.setCollider('circle',0,0,45);      
          fruit.velocityY = 6    
          var rand = Math.round(random(1,5));
          switch(rand) {
            case 1: fruit.addImage("apple2",fruit1_img);
                    break;
            case 2: fruit.addImage("banana2",fruit2_img);
                    break;
            case 3: fruit.addImage("melon2",fruit3_img);
                    break;
            case 4: fruit.addImage("orange2",fruit4_img);
                    break;
            case 5: fruit.addImage("pine2",fruit5_img);
                    break;
           
            default: break;
          }
         // fruit.scale = 0.2;
          fruit.lifetime = 180;
          fruitGroup.add(fruit);
        
}}}