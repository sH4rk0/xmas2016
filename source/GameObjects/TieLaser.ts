/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class TieLaser extends Phaser.Sprite {


        game: Phaser.Game;
       
       private laserAudio: Phaser.Sound;

        constructor(game: Phaser.Game, x:number, y:number) {


            super(game, game.camera.x + 1024 + x, y, "tieShot");

            this.game = game;
            this.name="tieShot";
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(.5);
            this.anchor.set(.5);  

            game.add.existing(this)

            playSound(gameSound.tieShot);
          

        }

       

        update() {

            this.x -= 25;
              if (this.x < this.game.camera.x - 100) { this.removeEnemy(); }

        }

        removeEnemy() {


            this.kill();
            this.destroy();


        }




    }
}