/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {


    export class PlayerWing extends Phaser.Sprite {

        game: Phaser.Game;
        gameState: GameWing;
        private onGround: boolean = false;

        private yeahAudio: Phaser.Sound;
        private yeahhState: boolean;
        private stopFlap: boolean;

        private ableToFire: boolean;



        constructor(game: Phaser.Game, gameState: GameWing) {

            super(game, 50, game.world.centerY, "delucaFly");

            this.gameState = gameState;
            this.game.physics.arcade.enableBody(this);
            this.scale.set(.5);
            this.anchor.setTo(0.5, 0.5);
            this.alive = false;
            this.onGround = false;
            this.yeahhState = false;
            this.stopFlap = false;
            this.ableToFire = false;

            this.body.allowGravity = false;
            this.body.collideWorldBounds = true;

            this.animations.add('fly', [1, 2, 3, 4], 12, true);
            this.animations.add('idle', [5, 6, 7, 8], 25, true);

            this.events.onKilled.add(this.onKilled, this);
            this.body.setSize(160, 60, 50, 50);

            this.game.add.existing(this);

            this.yeahAudio = this.game.add.audio('yeahh', .5, false);
            this.yeahAudio.allowMultiple = true;



        }



        update() {


            if (this.angle < 40 && this.alive) {


                this.angle += 0.5;
            }

            if (!this.alive) {
                this.body.velocity.x = 0;
            }


        }


        flap() {

            if (!this.stopFlap) {

                if (!!this.alive) {
                   this.gameState.engineLoop.volume = .4;
                    this.body.velocity.y = -200;
                    this.game.add.tween(this).to({ angle: -40 }, 100).start();
                    this.game.add.tween(this.gameState.engineLoop).to({ volume: .1 }, 500).start();

                }
            }

            if (this.ableToFire) {
                if (this.gameState.torpedo > 0 && this.gameState.core.alive) {

                  
                    this.disableFire();
                    this.game.time.events.add(1000, this.enableFire, this);
                    this.gameState.playerGroup.add(new Torpedo(this.game, this.gameState, this.x, this.y));
                    this.gameState.playerGroup.bringToTop(this);

                } 

            }


        };

        yeahh() {

            if (!this.yeahhState && this.alive) {

                this.yeahhState = true;
                this.yeahAudio.play();
                this.gameState.tweenScore(750);

                var score: string = "750";
                var _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
                var scoreText: Phaser.Text = this.game.add.text(this.gameState.player.x, this.gameState.player.y, score, _style);
                scoreText.alpha = 1;
                scoreText.font = 'Press Start 2P';
                scoreText.anchor.set(.5);
                var scoreTween: Phaser.Tween = this.game.add.tween(scoreText).to({ alpha: 0, y: this.gameState.player.y - 100 }, 500, Phaser.Easing.Quadratic.In, true, 0);
                scoreTween.onComplete.add(function () {
                    this.destroy();

                }, scoreText);

                this.game.time.events.add(1000, this.resetYeahh, this);
            }



        }

        resetYeahh() { this.yeahhState = false; }

        disableFlap() {


            this.stopFlap = true;

        }

        enableFire() {

            this.ableToFire = true;

        }

        disableFire() {

            this.ableToFire = false;

        }

        onKilled() {

            this.yeahAudio.destroy();
            this.gameState.playerKilled();

        };








    }

}