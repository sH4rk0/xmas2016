/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game {

    export class Bonus extends Phaser.Sprite {


        game: Phaser.Game;
        gameState: GameWing;
        private vel: number;
        private range: any;

        

        constructor(game: Phaser.Game, gameState: GameWing, range?: any) {


            super(game, game.camera.x + 1024 + 100, 0, "bonus");

            this.game = game;

            this.gameState = gameState;
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(0.50);
            this.range = range;
            this.setValues();
            game.add.existing(this)

        }


        setValues() {


            this.type = this.game.rnd.integerInRange(1, 5);
            this.frame = this.type - 1;
            this.vel = this.game.rnd.realInRange(5 + this.type, 10 + this.type);
            if (this.range == null) { this.y = this.game.rnd.integerInRange(100, 500); } else {
                this.y = this.game.rnd.integerInRange(this.range.start, this.range.end);
            }



        }

        update() {


            this.x -= this.vel;

            if (this.x < this.game.camera.x - 100) { this.removeBonus(false) }




        }


        dissolve() {

            playSound(gameSound.bonus)

            var dissolve = this.game.add.sprite(this.x, this.y, "bonusEffect");
            dissolve.anchor.set(.5);
            dissolve.scale.set(1);
            var anim=dissolve.animations.add("diss", [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 20, false);
            dissolve.animations.play("diss");
            anim.onComplete.add(function(){ this.destroy(); },dissolve);
            this.gameState.bonusGroup.add(dissolve);


            var score:string=(100*this.type)+"";
            var _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
            var scoreText:Phaser.Text=this.game.add.text(this.x,this.y,score,_style);
             scoreText.alpha=0;
             scoreText.font = 'Press Start 2P';
             scoreText.anchor.set(.5);
            var scoreTween :Phaser.Tween = this.game.add.tween(scoreText).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.In, true, 0);
scoreTween.onComplete.add(function(){

     var scoreTween2 :Phaser.Tween = this.game.add.tween(scoreText).to({ alpha: 0, y:scoreText.y-50 }, 300, Phaser.Easing.Quadratic.In, true, 0);
        scoreTween2.onComplete.add(function(){ this.destroy();},scoreText)    
},scoreText)


        }




        removeBonus(score?: boolean) {

            if (score) { 
                this.gameState.tweenScore((100 * this.type)); 
              this.dissolve();
        }
          
            this.kill();
            this.destroy();




        }



    }
}