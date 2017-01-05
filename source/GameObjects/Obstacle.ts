/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Obstacle extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameWing;
        private range: any;
        private scrolled: boolean;
        private who: string;

        constructor(game: Phaser.Game, gameState: GameWing, type: string, x: number, y: number) {


            super(game, x, y, "collider");

            this.game = game;
            this.gameState = gameState;
            this.who = type;
            this.scrolled = false;
            this.game.physics.arcade.enable(this);
            this.body.immovable = true;
            this.body.allowGravity = false;

            this.anchor.set(.5, 1);
            game.add.existing(this)

        }


        update() {


            if (this.x < this.gameState.player.x && !this.scrolled && this.who == "top") {

                this.scrolled = true;
                this.gameState.tweenScore(50);

                playSound(gameSound.colliderSound);

                var score: string = "50";
                var _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
                var scoreText: Phaser.Text = this.game.add.text(this.gameState.player.x, this.gameState.player.y, score, _style);
                scoreText.alpha = 1;
                scoreText.font = 'Press Start 2P';
                scoreText.anchor.set(.5);
                var scoreTween: Phaser.Tween = this.game.add.tween(scoreText).to({ alpha: 0, y: this.gameState.player.y - 50 }, 300, Phaser.Easing.Quadratic.In, true, 0);
                scoreTween.onComplete.add(function () {
                    this.destroy();

                }, scoreText)


            }


              if (this.x < this.game.camera.x - 100) {

                this.removeObstacle();
            }

        }




        removeObstacle() {


            this.kill();
            this.destroy();


        }



    }
}