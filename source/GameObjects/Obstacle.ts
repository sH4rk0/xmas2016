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
        private createNext: boolean;
        private startX: number;
        private index: number;
        private max: number;
        private pathId: number;

        constructor(game: Phaser.Game, gameState: GameWing, type: string, x: number, y: number, index: number, max: number, pathId:number) {


            super(game, x, y, "collider");

            this.game = game;
            this.gameState = gameState;
            this.startX = x;
            this.index = index;
            this.pathId=pathId;
            this.max=max;
            this.who = type;
            this.scrolled = false;
            this.game.physics.arcade.enable(this);
            this.body.immovable = true;
            this.body.allowGravity = false;

            this.anchor.set(.5, 1);
            this.createNext = true;
            game.add.existing(this);



        }


        update() {



            if (((this.startX - this.game.camera.x) < 800) && this.createNext && (this.who == "top") && (this.index < this.max)  {


                this.gameState.createObstacles( this.pathId,this.startX + 400, this.y, this.index + 1, this.max);

                this.createNext = false;

            }

            
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

            if(this.max==this.index && this.who=="top"){ this.gameState.setupPath(this.pathId+1); }
            this.kill();
            this.destroy();
           


        }



    }
}