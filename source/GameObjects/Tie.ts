/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Tie extends Phaser.Sprite {


        game: Phaser.Game;
        vel: number;
        type: number;
        constructor(game: Phaser.Game, type: number) {


            super(game, 1100, 0, "tie");

            this.game = game;
            this.type = type;
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;

            this.setValues();
            game.add.existing(this)

          

        }

        setValues() {

            
            switch (this.type) {

                case 1:
                    {
                       
                        this.vel = this.game.rnd.realInRange(.3, 1);
                        this.y = this.game.rnd.integerInRange(50, 100);
                        this.scale.set(this.game.rnd.realInRange(.1, .3));
                        
                        break;
                    }
                case 2:
                    {
                        this.vel = this.game.rnd.realInRange(2, 4);
                        this.y = this.game.rnd.integerInRange(70, 180);
                        this.scale.set(this.game.rnd.realInRange(.4, .7));
                        break;
                    }
                case 3:

                    {
                        this.vel = this.game.rnd.realInRange(7, 12);
                        this.y = this.game.rnd.integerInRange(150, 270);
                        this.scale.set(1);
                        break;

                    }



            }



        }

        update() {


            this.x -= this.vel;
            if (this.x < -150) {
                this.x = 1100;
                this.setValues()
            }


        }





    }
}