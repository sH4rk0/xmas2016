/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Bomb extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameWing;
        private range: any;
        private vel: number;
        private checkOnce: boolean;

        constructor(game: Phaser.Game, gameState: GameWing, range?: any) {


            super(game, game.camera.x + 1024 + 100, 0, "bomb");

            this.game = game;
            this.gameState = gameState;

            this.checkOnce = false;
            this.name = "bomb";
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(2);
            this.anchor.set(.5, .5)
            var anim = this.animations.add('anim', [0, 1, 2, 3, 4, 5], 9, true);
            this.range = range;

            if (this.range == null) { this.y = this.game.rnd.integerInRange(100, 500); } else {
                this.y = this.game.rnd.integerInRange(this.range.start, this.range.end);
            }

            this.play('anim');
            this.vel = game.rnd.realInRange(2, 4);
            game.add.existing(this)

            //this.game.add.tween(this).to({ y: this.y+20, }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true)


        }


        update() {

            this.x -= this.vel;
            if (!isMobile()) { this.angle -= this.vel; }


            if (this.game.physics.arcade.distanceBetween(this, this.gameState.player) < 60 && !this.checkOnce) {

                this.checkOnce = true;
                this.gameState.player.yeahh();


            }


            if (this.x < this.game.camera.x - 100) {

                this.removeEnemy()
            }



        }




        removeEnemy() {


            this.kill();
            this.destroy();


        }



    }
}