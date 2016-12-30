/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Torpedo extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameWing;

        private laserAudio: Phaser.Sound;

        constructor(game: Phaser.Game, gameState: GameWing, x: number, y: number) {


            super(game, x + 50, y + 15, "wingShot");

            this.game = game;
            this.gameState = gameState;
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(.5);
            this.anchor.set(.5);

            game.add.existing(this)

            this.laserAudio = this.game.add.audio('tieShot', 1, false);
            this.laserAudio.allowMultiple = true;
            this.laserAudio.volume = .5;
            this.laserAudio.play();


        }



        update() {

            this.x += 25;
            this.game.physics.arcade.overlap(this, this.gameState.core, this.collisionHandler, null, this);
            if (this.alive && this.x > this.game.camera.x + 1024 + 100) { this.removeEnemy(); }




        }

        collisionHandler() {



            this.gameState.enemyGroup.add(new Explosion(this.game, this.gameState, this.x, this.y, "exp3", "bomb"));
            this.gameState.core.kill();
            this.gameState.win();

            this.removeEnemy();






        }

        removeEnemy() {

            this.gameState.torpedo--;
            this.gameState.removeTorpedo();

            if( this.gameState.torpedo==0 && this.gameState.core.alive){

                this.gameState.player.disableFire();
                this.gameState.TieAttackFinal();
            }
            

            this.kill();
            this.destroy();


        }




    }
}