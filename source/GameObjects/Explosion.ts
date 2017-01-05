/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Explosion extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameWing;
        x: number;
        y: number;
        

        constructor(game: Phaser.Game, gameState: GameWing, x: number, y: number, name: string, type: string) {


            super(game, x, y, name);

            this.game = game;
            this.gameState = gameState;

            playSound(gameSound.explosion);

            var anim = this.animations.add('boom', null, 20, false);
            this.anchor.set(.5);
            anim.onComplete.add(function () { this.destroy(); }, this)
            this.play('boom');
            this.scale.set(1.5);



            switch (type) {

                case "player":

                    break;

                case "playerBoundTop":
                    this.angle = 180;
                    this.anchor.set(.5, .6);
                    break;

                case "playerBoundBottom":
                    this.anchor.set(.5, .7);
                    break;

                case "playerObstacle":

                    break;

                case "bomb":

                    break;


            }


            game.add.existing(this);

            if (type == "bomb" || type == "tie") {


                for (var i = 0; i < 10; i++) {

                    this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "trash" + (i + 1), "enemy"));

                }

            }

            else if (type == "player") {

                for (var i = 0; i < 5; i++) {

                    this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "trash" + (i + 1), "enemy"));

                }

                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaBody", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaHead", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));

                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip1", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip3", "player"));
                this.gameState.playerGroup.add(new ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip4", "player"));



            }




        }


        update() { }

        removeExplosion() {

            this.kill();
            this.destroy();


        }



    }
}