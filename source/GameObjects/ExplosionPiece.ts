/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class ExplosionPiece extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: Phaser.State;
        x: number;
        y: number;
        private explosionAudio: Phaser.Sound;
        private _angle:number;

        constructor(game: Phaser.Game, gameState: Phaser.State, x: number, y: number, name: string, type: string) {


            super(game, x, y, name);

            this.game = game;
            this.gameState = gameState;


            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.moves = true;
            this.anchor.setTo(0.5);
            this.scale.set(0.5);

            this.body.collideWorldBounds = false;
            var Xvector = (game.rnd.realInRange(-25, 25)) * 3;
            var Yvector = (game.rnd.realInRange(-25, 25)) * 3;
            this.body.allowGravity = false;
            this.body.velocity.setTo(Xvector, Yvector);

            if (type == "enemy") {
                this.animations.add('rotation', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12, true);
                this.animations.play("rotation");
            }

            this._angle=this.game.rnd.realInRange(-3,3);
            game.add.existing(this);





        }


        update() {

            this.angle +=  this._angle;


        }







    }
}