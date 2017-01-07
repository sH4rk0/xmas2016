
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game {
    export class GameOver extends Phaser.State {


       
        private btnGreen: Phaser.Sprite;
        private btnBlue: Phaser.Sprite;
        private btnRed: Phaser.Sprite;

        private insulti: Array<string> = [
            "Personaggetto!",
            "Cafone!",
            "Consumatore abusivo di ossigeno!",
            "Imbecille!",
            "Imbecille e cafone!",
            "Personaggetto col sorrisetto!",
            "Cialtrone!",
            "Affannato mentale!",
            "Cialtroneria pura!",
            "Ti devono ammazzare!"
        ];


        public player: number;

        constructor() {

            super();


        }


        create() {

            this.game.world.setBounds(0, 0, 1024, 600);
            //this.game.world.x=0;  
            var bg: Phaser.Image = this.game.add.image(0, 0, "gameoverBg");

            var _style = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 97, 'GAME OVER', _style);
            _gameOverText.font = 'Press Start 2P';
            _gameOverText.anchor.set(0.5);

            var deluca = this.game.add.sprite(0, 600, 'delucaMenu');
            deluca.pivot.set(0, deluca.height);


            //btn Green
            this.btnGreen = this.game.add.sprite(900, 40, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {
                stopSound(gameSound.gameover);
                k2016Game.goState("GameWing", this.game);
            }, this);

            //btn Blue
            this.btnBlue = this.game.add.sprite(900, 90, "btnBlue");
            this.btnBlue.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'SHARE', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnBlue.addChild(_spriteText);
            this.btnBlue.inputEnabled = true;
            this.btnBlue.events.onInputDown.add(function () {
                getLoginStatus();
            }, this);

            //btn Red
            this.btnRed = this.game.add.sprite(900, 140, "btnRed");
            this.btnRed.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#851600', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'MENU', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnRed.addChild(_spriteText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {
                stopSound(gameSound.gameover);
                k2016Game.goState("Menu", this.game);
            }, this);


           playSound(gameSound.gameover);

            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _text = 'You score ONLY ' + getScore() + ' points!\n' + this.insulti[this.game.rnd.integerInRange(0, this.insulti.length-1)];
            var _gameOverSpeech = this.game.add.text(210, 390, _text, _style);
		    _gameOverSpeech.font='Press Start 2P';


           var _anonymous = getUrlParameter("anonymous") ? true : false;
            if(!_anonymous){anonymous();}
           


    
        }
         

    update(){


              

        } 




       





}

    
}