/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Trash extends Phaser.Sprite {


        game: Phaser.Game;
        private _vel: number;
        private _trash: number;
        private _x: number;
        private _y: number;
        private _fixed: number;

        constructor(game: Phaser.Game, _trash: number, _x: number, _y: number, _type: number, _fixed: boolean) {


            super(game, _x, _y, "trash" + _trash);

            this.game = game;
            this.type = _type;
            this.anchor.set(.5);
            this.fixedToCamera = _fixed;
            this.animations.add('rotation', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12, true);
            this.animations.play("rotation");

            this.setValues();
            game.add.existing(this);



        }

        setValues() {

            this._vel = this.game.rnd.realInRange(2, 4);
            this.y = this.game.rnd.integerInRange(50, 550);
            this.scale.set(this.game.rnd.realInRange(.4, .6));


        }

        update() {

            //return;

            this.x -= this._vel;
             if (!isMobile()) {this.angle += .5;}

            if (this.x < this.game.camera.x-100) {
                this.x = this.game.camera.x+1024+100;
                this.setValues()
            }


        }





    }
}