/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class TieAttack extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameWing;
        private audioStarted:boolean;
        private shoots:number;
       
        constructor(game: Phaser.Game,  gameState: GameWing, y?:number) {


            super(game, game.camera.x + 1024 + 1536, 0, "tie");

            this.game = game;
            this.gameState= gameState;
            this.name="tie";

            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;

            this.shoots=2;

            this.audioStarted=false;

            
            this.scale.set(2);
            this.anchor.set(.5);
           

            game.add.existing(this)

            var _y:number=this.game.rnd.integerInRange(100, 500);
            this.y = _y;
            if(y!=null) this.y=y;

           var alert:Phaser.Sprite= this.game.add.sprite(0,this.y,this.game.cache.getBitmapData("tieAlert"));
           alert.fixedToCamera = true;
           alert.alpha=0.25;
           alert.anchor.set(0,.5);
           var tweenAlert:Phaser.Tween= this.game.add.tween(alert).to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.In, true, 0);
           tweenAlert.onComplete.add(function(){this.destroy()},alert);

            game.time.events.add(400, this.shot, this);
            game.time.events.add(600, this.shot, this);
            game.time.events.add(800, this.shot, this);

          

    

        }


        shot(){

            this.gameState.enemyGroup.add( new TieLaser(this.game,100,this.y+(20*this.shoots)));
            this.shoots--;

        }

       

        update() {


            this.x -= 20;

              if (this.x < (this.game.camera.x + 1024) && ! this.audioStarted) { 
                 
                 this.audioStarted=true;

                 playSound(gameSound.tiefly)
                
                 }
             if (this.x < this.game.camera.x - 100) { this.removeEnemy(); }

           




          

        }


 removeEnemy() {


            this.kill();
            this.destroy();


        }


    }
}