/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game {
    export class Menu extends Phaser.State {

        private startBtn: Phaser.Sprite;

        private curtainLeft: Phaser.Image;
        private curtainBackLeft: Phaser.Image;
        private curtainRight: Phaser.Image;
        private curtainBackRight: Phaser.Image;
        private curtainTop: Phaser.Image;

        private bgPenguins: Phaser.Image;
        private deathstar: Phaser.Image;
        private destroyer: Phaser.Sprite;

        private penguinsGroup: Phaser.Group;
        private penguinTrab: Phaser.Sprite;

        private how2playGroup: Phaser.Group;
        private creditGroup: Phaser.Group;
        private buttonsGroup: Phaser.Group;

        private gameTitle: Phaser.Text;
        private gameSubTitle: Phaser.Text;

        private introSkip: Phaser.Text;

        private pCounter: number = 0;
        private pStep: number = Math.PI * 3 / 270;

        private btnRed: Phaser.Image;
        private btnBlue: Phaser.Image;
        private btnPurple: Phaser.Image;
        private btnGreen: Phaser.Image;

        private fishfries: Phaser.Image;

        private back_emitter: Phaser.Emitter;
        private mid_emitter: Phaser.Emitter;
        private front_emitter: Phaser.Emitter;

        private max: number = 0;

        private letters: Array<string> = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        private textArr: Array<string> = [];
        private textwriter: Phaser.Text;

        private penguins: any;
        private lampiamento: boolean = false;
        

        private levelText: Phaser.Text;
        private levelLabel: Phaser.Text;

        constructor() {

            super();



        }

        preload() {

        }

        create() {
             //this.game.time.advancedTiming = true;
            setUpGame(this.game);

            setScore(0);
            this.game.world.setBounds(0, 0, 1024, 600);
            this.game.camera.x = 0;
            this.penguinsGroup = this.game.add.group();

            this.bgPenguins = this.game.add.image(this.game.world.centerX, this.game.world.centerY, "bgPenguins");
            this.bgPenguins.anchor.set(.5);

            this.game.physics.arcade.gravity.y = 0;


            this.deathstar = this.game.add.image(-50, 90, "deathstar");
            this.deathstar.anchor.set(0);

            this.destroyer = this.game.add.sprite(900, 150, "destroyer");
            this.destroyer.anchor.set(0);
            this.destroyer.scale.set(0.75);



            this.penguinsGroup.add(this.bgPenguins);
            this.penguinsGroup.add(this.deathstar);
            this.penguinsGroup.add(this.destroyer);

            this.penguinsGroup.add(new Tie(this.game, 1));
            this.penguinsGroup.add(new Tie(this.game, 1));

            this.penguinsGroup.add(new Tie(this.game, 2));
            this.penguinsGroup.add(new Tie(this.game, 2));

            this.penguinsGroup.add(new Tie(this.game, 3));
            this.penguinsGroup.add(new Tie(this.game, 3));


            this.penguinsGroup.scale.set(1.5);


            this.penguins = [];

            this.penguins.push(this.game.add.sprite(362, 340, 'penguin1'));
            this.penguins[0].anchor.set(0.5, 1);
            this.penguinsGroup.add(this.penguins[0]);

            this.penguins.push(this.game.add.sprite(447, 323, 'penguin2'));
            this.penguins[1].anchor.set(0.5, 1);
            this.penguinsGroup.add(this.penguins[1]);

            this.penguins.push(this.game.add.sprite(590, 322, 'penguin3'));
            this.penguins[2].anchor.set(0.5, 1);
            this.penguinsGroup.add(this.penguins[2]);

            this.penguins.push(this.game.add.sprite(682, 329, 'penguin4'));
            this.penguins[3].anchor.set(0.5, 1);
            this.penguinsGroup.add(this.penguins[3]);

            this.penguins.push(this.game.add.sprite(439, 470, 'penguin5'));
            this.penguins[4].anchor.set(0.5, 1);
            this.penguinsGroup.add(this.penguins[4]);

            this.penguins.push(this.game.add.sprite(507, 455, 'penguin6'));
            this.penguins[5].anchor.set(0.5, 1);
            this.penguinsGroup.add(this.penguins[5]);

            this.penguinTrab = this.penguins[this.game.rnd.integerInRange(0, 5)];

            this.curtainBackLeft = this.game.add.image(0, 0, 'curtainBackLeft');

            this.curtainBackRight = this.game.add.image(1024, 0, 'curtainBackRight');
            this.curtainBackRight.pivot.set(this.curtainBackRight.width, 0);

            this.curtainLeft = this.game.add.image(0, 0, 'curtainLeft');
            this.curtainRight = this.game.add.image(1024, 0, 'curtainRight');
            this.curtainRight.pivot.set(this.curtainRight.width, 0);

            this.curtainTop = this.game.add.image(this.game.world.centerX, 0, 'curtainTop');
            this.curtainTop.anchor.set(0.5, 0);



            //TITLE
            var _style: any = { font: 'normal 65px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
            this.gameTitle = this.game.add.text(this.game.world.centerX, 0, "XMAS RUN 2k16", _style);
            this.gameTitle.anchor.set(.5);
            this.gameTitle.alpha = 0;
            this.gameTitle.font = 'Press Start 2P';

            //SUBTITLE
            _style = { font: 'normal 30px', fill: '#ff0000', stroke: '#000000', strokeThickness: 8 };
            this.gameSubTitle = this.game.add.text(-300, 140, "FRIED FISH EDITION", _style);
            this.gameSubTitle.anchor.set(.5);
            this.gameSubTitle.alpha = 0;
            this.gameSubTitle.font = 'Press Start 2P';


            //tap to skip
            _style = { font: 'normal 14px', fill: '#ffffff', stroke: '#ff0000', strokeThickness: 0 };
            this.introSkip = this.game.add.text(820, 580, "TAP TO SKIP", _style);
            this.introSkip.anchor.set(.5);
            this.introSkip.alpha = 1;
            this.introSkip.font = 'Press Start 2P';


            //fishfries

            this.fishfries = this.game.add.image(800, -140, "fishfries");
            this.fishfries.anchor.set(.5);
            this.fishfries.alpha = 0;


            this.buttonsGroup = this.game.add.group();

            //btn Green
            this.btnGreen = this.game.add.sprite(200, 650, "btnGreen");
            this.btnGreen.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#368005', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnGreen.addChild(_spriteText);
            this.btnGreen.inputEnabled = true;
            this.btnGreen.events.onInputDown.add(function () {

                stopSound(gameSound.menu);

                k2016Game.goState("GameWing", this.game);
            }, this);

            //btn Blue
            this.btnBlue = this.game.add.sprite(400, 650, "btnBlue");
            this.btnBlue.anchor.setTo(0.5);
            _style = { font: 'normal 17px', fill: '#ffffff', stroke: '#00577f', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'HOW2PLAY', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnBlue.addChild(_spriteText);
            this.btnBlue.inputEnabled = true;
            this.btnBlue.events.onInputDown.add(function () {
                this.openHow2play();
            }, this);

            //btn Purple
            this.btnPurple = this.game.add.sprite(600, 650, "btnPurple");
            this.btnPurple.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#5c0077', strokeThickness: 6 };
            var _spriteText = this.game.add.text(0, 4, 'CREDITS', _style);
            _spriteText.font = 'Press Start 2P';
            _spriteText.anchor.set(0.5);
            this.btnPurple.addChild(_spriteText);
            this.btnPurple.inputEnabled = true;
            this.btnPurple.events.onInputDown.add(function () {
                 this.openCredits();
            }, this);


            //btn Red
             _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#5c0077', strokeThickness: 0 };
            this.levelLabel = this.game.add.text(800, 650, 'LEVEL', _style);
            this.levelLabel.anchor.set(0.5);
             this.levelLabel.font = 'Press Start 2P';
            this.buttonsGroup.add(this.levelLabel);

            this.btnRed = this.game.add.sprite(800, 650, "btnRed");
            this.btnRed.anchor.setTo(0.5);
            _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#851600', strokeThickness: 6 };
            this.levelText = this.game.add.text(0, 4, getLevelLabel(), _style);
            this.levelText.font = 'Press Start 2P';
            this.levelText.anchor.set(0.5);
            this.btnRed.addChild(this.levelText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {
                
                let _level = getLevel();
                _level++;
                if (_level > 2) _level = 0;
                setLevel(_level);
                this.levelText.text=getLevelLabel();

                 playSound(gameSound.tieShot);


            }, this);


            this.buttonsGroup.add(this.btnBlue);
            this.buttonsGroup.add(this.btnRed);
            this.buttonsGroup.add(this.btnPurple);
            this.buttonsGroup.add(this.btnGreen);

 if (!isMobile()) {

            this.back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
            this.back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
            this.back_emitter.maxParticleScale = 0.6;
            this.back_emitter.minParticleScale = 0.2;
            this.back_emitter.setYSpeed(20, 100);
            this.back_emitter.gravity = 0;
            this.back_emitter.width = this.game.world.width * 1.5;
            this.back_emitter.minRotation = 0;
            this.back_emitter.maxRotation = 40;
            this.back_emitter.frequency = 250;
            this.back_emitter.lifespan = 14000;
            this.back_emitter.z = 0;
            this.penguinsGroup.add(this.back_emitter);

            this.mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 25);
            this.mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
            this.mid_emitter.maxParticleScale = 1.2;
            this.mid_emitter.minParticleScale = 0.8;
            this.mid_emitter.setYSpeed(50, 150);
            this.mid_emitter.gravity = 0;
            this.mid_emitter.width = this.game.world.width * 1.5;
            this.mid_emitter.minRotation = 0;
            this.mid_emitter.maxRotation = 40;
            this.mid_emitter.frequency = 250;
            this.mid_emitter.lifespan = 12000;
            this.penguinsGroup.add(this.mid_emitter);

            this.front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 12);
            this.front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
            this.front_emitter.maxParticleScale = 1;
            this.front_emitter.minParticleScale = 0.5;
            this.front_emitter.setYSpeed(100, 200);
            this.front_emitter.gravity = 0;
            this.front_emitter.width = this.game.world.width * 1.5;
            this.front_emitter.minRotation = 0;
            this.front_emitter.maxRotation = 40;
            this.front_emitter.frequency = 250;
            this.front_emitter.lifespan = 6000;
            this.penguinsGroup.add(this.front_emitter);

            this.changeWindDirection();

            this.back_emitter.start(false, 14000);
            this.mid_emitter.start(false, 12000);
            this.front_emitter.start(false, 6000);
 }
            playSound(gameSound.intro);

            _style = { font: 'normal 40px', fill: '#ffffff', stroke: '#000000', strokeThickness: 8, wordWrap: true, wordWrapWidth: 1000 };
            this.textwriter = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "", _style);
            this.textwriter.anchor.set(0, 0.5);
            this.textwriter.font = 'Press Start 2P';


            //how2play screen start
            //------------------------------------------
            this.how2playGroup = this.game.add.group();
            this.how2playGroup.inputEnableChildren = false;

            var layer = this.game.add.image(0, 0, "howToPlay");
            layer.inputEnabled = true;
            layer.events.onInputDown.add(function () {
                this.closeHow2play();
            }, this);

            var deluca = this.game.add.sprite(this.game.world.centerX - 20, 170, "delucaFly");
            deluca.anchor.set(.5);
            deluca.scale.set(.6);
            this.game.add.tween(deluca).to({ y: deluca.y + 20 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            deluca.animations.add('fly', [1, 2, 3, 4], 12, true).play();

            this.how2playGroup.add(layer);
            this.how2playGroup.add(deluca);
            this.how2playGroup.x = -1024;
            this.how2playGroup.alpha = 0;

            //how2play screen end
            //------------------------------------------

             //credits screen start
            //------------------------------------------
            this.creditGroup = this.game.add.group();
            this.creditGroup.inputEnableChildren = false;

            var princess = this.game.add.image(0, 0, "carrie");
            princess.inputEnabled = true;
            princess.events.onInputDown.add(function () {
                this.closeCredits();
            }, this);


            this.creditGroup.add(princess);
            this.creditGroup.x = -1024;
            this.creditGroup.alpha = 0;

            //credits screen end
            //------------------------------------------

            this.game.input.onDown.addOnce(this.skipIntro, this);

             



       //setFirstTime(false);
       //this.openCurtain()
            if (getFirstTime()) { this.textWriter(0); } else { this.openCurtain() }


        }


        render (){



           // this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        }

         openCredits() {

            this.game.time.events.add(300, function () { playSound(gameSound.lightsaber); }, this);
            this.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.creditGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {

                this.creditGroup.ignoreChildInput = false;

            }, this);
        }


         closeCredits() {

            this.game.time.events.add(300, function () { playSound(gameSound.lightsaber); }, this);

            this.creditGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.creditGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {

                this.buttonsGroup.ignoreChildInput = false;

            }, this)


        }


        openHow2play() {

            this.game.time.events.add(300, function () { playSound(gameSound.lightsaber); }, this);
            this.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {

                this.how2playGroup.ignoreChildInput = false;

            }, this)

        }


        closeHow2play() {

            this.game.time.events.add(300, function () { playSound(gameSound.lightsaber); }, this);

            this.how2playGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {

                this.buttonsGroup.ignoreChildInput = false;

            }, this)


        }


        skipIntro(){

              if(!getFirstTime()) return;
              this.openCurtain();

        }

        openCurtain() {



          
                    this.introSkip.alpha=0;
                            setFirstTime(false);
                            this.textwriter.text = "";
                            this.textwriter.alpha = 0;
                            this.textArr = [];
            stopSound(gameSound.intro);
            playSound(gameSound.menu);
          

            this.game.add.tween(this.curtainBackLeft).to({ x: this.curtainBackLeft.x - this.curtainBackLeft.width }, 1600, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.curtainBackRight).to({ x: this.curtainBackRight.x + this.curtainBackRight.width }, 1600, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.curtainLeft).to({ x: this.curtainLeft.x - 80 }, 2000, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.curtainRight).to({ x: this.curtainRight.x + 80 }, 2000, Phaser.Easing.Cubic.Out, true);

            this.game.add.tween(this.curtainTop).to({ y: this.curtainTop.y - 130 }, 2000, Phaser.Easing.Cubic.Out, true);


            this.game.add.tween(this.penguinsGroup.scale).to({ y: 1, x: 1 }, 2000, Phaser.Easing.Cubic.Out, true);

            this.game.add.tween(this.gameTitle).to({ y: 80, alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.gameSubTitle).to({ x: this.game.world.centerX - 80, alpha: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 800);
            this.game.add.tween(this.fishfries).to({ y: 140, alpha: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 1400);


            this.game.add.tween(this.btnGreen).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 0);
            this.game.add.tween(this.btnBlue).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 200);
            this.game.add.tween(this.btnPurple).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 400);
            this.game.add.tween(this.btnRed).to({ y: 550 }, 1000, Phaser.Easing.Cubic.Out, true, 600);

            this.game.add.tween(this.levelLabel).to({ y: 520 }, 1000, Phaser.Easing.Cubic.Out, true, 800);


        }

        update() {

            if (getFirstTime()) {
                this.textwriter.text = this.textArr.join("");
            } else {

                this.destroyer.x -= 0.05;
                if (this.destroyer.x == -200) { this.destroyer.x = 900; }
                var tStep = Math.cos(this.pCounter);
                this.penguinTrab.rotation += Phaser.Math.degToRad(-0.25 * tStep);
                this.pCounter += this.pStep;

                if (this.game.rnd.integerInRange(0, 1500) > 1480) {

                    if (this.lampiamento) { return; }
                    this.lampiamento = true;
                    var penguin: Phaser.Sprite = this.penguins[this.game.rnd.integerInRange(0, 5)];
                    var penguinAnim = penguin.animations.add('neon', [1, 0, 1], 10, false);
                    penguinAnim.onComplete.add(function () { var penguinIdle = penguin.animations.add('idle', [0], 0, true); penguinIdle.play(); this.lampiamento = false; }, this);
                    penguinAnim.play();

                }


            }




        }

        textWriter(index: number) {

            if(!getFirstTime) return;
            var _this = this;
            var texts = [

                { text: "FROM A THEATER FAR, FAR AWAY...", x: 30, size: "normal 30px" },
                { text: "IN SALERNO", x: 300, size: "normal 40px" },
                { text: "WE ARE PROUD TO PRESENT", x: 50, size: "normal 40px" },
                { text: "A NEW ZERO89 PRODUCTION", x: 50, size: "normal 40px" },
                { text: "CALLED...", x: 300, size: "normal 40px" },



            ];

            var obj = texts[index];
            this.textwriter.x = obj.x;
            this.textwriter.text = "";
            this.textwriter.alpha = 1;
            this.textArr = [];

            this.textwriter.setStyle({ font: obj.size, fill: '#ffffff', stroke: '#000000', strokeThickness: 8, wordWrap: true, wordWrapWidth: 1000 });
            this.textwriter.font = 'Press Start 2P';

            for (var i = 0; i < obj.text.length; i++) {

                if (obj.text[i] != " ") {

                    if (i == obj.text.length - 1) {

                        this.tweenTextArr(obj.text[i], i, 1000 + (i * 50), index + 1);
                    } else {
                        this.tweenTextArr(obj.text[i], i, 1000 + (i * 50));

                    }

                } else { this.textArr[i] = " "; }

            }




        }

        tweenTextArr(letter: string, index: number, delay: number, callback?: any) {


            var scoreValue: any = { score: 0, end: 10, index: index, game: this.game, menu: this, arr: this.textArr, letters: this.letters, letter: letter, callback: callback };

            var scoreTween = this.game.add.tween(scoreValue).to({ score: 10 }, 500, Phaser.Easing.Quadratic.Out, false, delay);

            scoreTween.onUpdateCallback(function () {

                if (parseInt(scoreValue.score) == scoreValue.end - 1) {
                    scoreValue.arr[scoreValue.index] = scoreValue.letter;


                } else {
                    if (scoreValue.last != parseInt(scoreValue.score)) {
                        scoreValue.last = parseInt(scoreValue.score);
                        scoreValue.arr[scoreValue.index] = scoreValue.letters[scoreValue.game.rnd.integerInRange(0, 35)];
                    }


                }

            });

            scoreTween.onComplete.add(function () {

                if (scoreValue.callback != undefined) {


                    var scoreTween = scoreValue.game.add.tween(scoreValue.menu.textwriter).to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.Out, true, 1000);
                    scoreTween.onComplete.add(function () {

                        if (scoreValue.callback == 5) {

                           if(getFirstTime())  scoreValue.menu.openCurtain();

                        } else { scoreValue.menu.textWriter(scoreValue.callback); }


                    })

                }
            });

            scoreTween.start();
        };



        changeWindDirection() {

            var multi = Math.floor((this.max + 200) / 4);
            var frag = (Math.floor(Math.random() * 100) - multi);
            this.max = this.max + frag;

            if (this.max > 200) this.max = 150;
            if (this.max < -200) this.max = -150;

            this.setXSpeed(this.back_emitter, this.max);
            this.setXSpeed(this.mid_emitter, this.max);
            this.setXSpeed(this.front_emitter, this.max);

        }

        setXSpeed(emitter, max) {

            emitter.setXSpeed(max - 20, max);
            emitter.forEachAlive(this.setParticleXSpeed, this, max);

        }

        setParticleXSpeed(particle, max) {

            particle.body.velocity.x = max - Math.floor(Math.random() * 30);

        }

        stopEmitters() {

            this.back_emitter.destroy();
            this.front_emitter.destroy();
            this.mid_emitter.destroy();
          

        }



    }
}