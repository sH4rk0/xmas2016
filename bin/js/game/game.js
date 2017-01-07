var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.game.load.onLoadStart.add(function () { }, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(function () {
                this.loadingBar.visible = false;
                this.loadingPerc.visible = false;
                this.startBtn.visible = true;
                this.game.input.onDown.addOnce(function () { k2016Game.goState("Menu", this.game); }, this);
            }, this);
            //start button
            //--------------------------
            this.startBtn = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);
            this.startBtn.visible = false;
            // this.loadingContainer.addChild(this.startBtn);
            //Loading container
            //--------------------------
            this.loadingBar = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('loadingBar'));
            this.loadingBar.anchor.setTo(0.5);
            this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#0096ff', strokeThickness: 5 });
            this.loadingPerc.anchor.set(0.5);
            this.loadingBar.addChild(this.loadingPerc);
            this.game.load.setPreloadSprite(this.loadingBar);
            //Assets Load
            //--------------------------	
            // IMAGES		
            for (var i = 0; i < gameData.assets.images.length; i++) {
                this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path);
            }
            // SPRITESHEETS		
            for (var i = 0; i < gameData.assets.spritesheets.length; i++) {
                this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames);
            }
            //bitmap fonts
            for (var i = 0; i < gameData.assets.bitmapfont.length; i++) {
                this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
            }
            // SOUNDS
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
            }
            this.game.load.script('webfont', 'js/libs/webfonts.js');
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) { this.loadingPerc.text = progress + "%"; };
        return Preloader;
    }(Phaser.State));
    k2016Game.Preloader = Preloader;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            var bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('loadingBar', bmd);
            bmd = this.game.add.bitmapData(200, 200);
            bmd.ctx.beginPath();
            bmd.ctx.fillStyle = "#FFFFFF";
            bmd.ctx.strokeStyle = "#FFF";
            bmd.ctx.lineWidth = 20;
            bmd.ctx.arc(bmd.width / 2, bmd.height / 2, 50, 0, 2 * Math.PI);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            bmd.ctx.stroke();
            this.game.cache.addBitmapData('circleBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('startBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('button', bmd);
            bmd = this.game.add.bitmapData(50, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 50, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('bonus', bmd);
            bmd = this.game.add.bitmapData(2000, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 2000, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('ground', bmd);
            bmd = this.game.add.bitmapData(1024, 600);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 600);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('layer', bmd);
            bmd = this.game.add.bitmapData(1024, 600);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 600);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('layerWhite', bmd);
            bmd = this.game.add.bitmapData(1024, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 20);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('collider', bmd);
            bmd = this.game.add.bitmapData(1024, 150);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 150);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('tieAlert', bmd);
            bmd = this.game.add.bitmapData(50, 50);
            bmd.ctx.fillStyle = '#ff0000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 50, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('core', bmd);
        };
        Boot.prototype.create = function () {
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                k2016Game.setDevice(true);
            }
            else {
                k2016Game.setDevice(false);
            }
            this.game.stage.backgroundColor = '#000000';
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.smoothed = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    k2016Game.Boot = Boot;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
            this.pCounter = 0;
            this.pStep = Math.PI * 3 / 270;
            this.max = 0;
            this.letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
            this.textArr = [];
            this.lampiamento = false;
        }
        Menu.prototype.preload = function () {
        };
        Menu.prototype.create = function () {
            //this.game.time.advancedTiming = true;
            k2016Game.setUpGame(this.game);
            k2016Game.setScore(0);
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
            this.penguinsGroup.add(new k2016Game.Tie(this.game, 1));
            this.penguinsGroup.add(new k2016Game.Tie(this.game, 1));
            this.penguinsGroup.add(new k2016Game.Tie(this.game, 2));
            this.penguinsGroup.add(new k2016Game.Tie(this.game, 2));
            this.penguinsGroup.add(new k2016Game.Tie(this.game, 3));
            this.penguinsGroup.add(new k2016Game.Tie(this.game, 3));
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
            var _style = { font: 'normal 65px', fill: '#ffffff', stroke: '#000000', strokeThickness: 10 };
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
                k2016Game.stopSound(k2016Game.gameSound.menu);
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
            this.levelText = this.game.add.text(0, 4, k2016Game.getLevelLabel(), _style);
            this.levelText.font = 'Press Start 2P';
            this.levelText.anchor.set(0.5);
            this.btnRed.addChild(this.levelText);
            this.btnRed.inputEnabled = true;
            this.btnRed.events.onInputDown.add(function () {
                var _level = k2016Game.getLevel();
                _level++;
                if (_level > 2)
                    _level = 0;
                k2016Game.setLevel(_level);
                this.levelText.text = k2016Game.getLevelLabel();
                k2016Game.playSound(k2016Game.gameSound.tieShot);
            }, this);
            this.buttonsGroup.add(this.btnBlue);
            this.buttonsGroup.add(this.btnRed);
            this.buttonsGroup.add(this.btnPurple);
            this.buttonsGroup.add(this.btnGreen);
            if (!k2016Game.isMobile()) {
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
            k2016Game.playSound(k2016Game.gameSound.intro);
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
            this.game.input.onDown.addOnce(this.openCurtain, this);
            //setFirstTime(false);
            //this.openCurtain()
            if (k2016Game.getFirstTime()) {
                this.textWriter(0);
            }
            else {
                this.openCurtain();
            }
        };
        Menu.prototype.render = function () {
            // this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
        };
        Menu.prototype.openCredits = function () {
            this.game.time.events.add(300, function () { k2016Game.playSound(k2016Game.gameSound.lightsaber); }, this);
            this.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.creditGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {
                this.creditGroup.ignoreChildInput = false;
            }, this);
        };
        Menu.prototype.closeCredits = function () {
            this.game.time.events.add(300, function () { k2016Game.playSound(k2016Game.gameSound.lightsaber); }, this);
            this.creditGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.creditGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {
                this.buttonsGroup.ignoreChildInput = false;
            }, this);
        };
        Menu.prototype.openHow2play = function () {
            this.game.time.events.add(300, function () { k2016Game.playSound(k2016Game.gameSound.lightsaber); }, this);
            this.buttonsGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: 0, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {
                this.how2playGroup.ignoreChildInput = false;
            }, this);
        };
        Menu.prototype.closeHow2play = function () {
            this.game.time.events.add(300, function () { k2016Game.playSound(k2016Game.gameSound.lightsaber); }, this);
            this.how2playGroup.ignoreChildInput = true;
            var tween = this.game.add.tween(this.how2playGroup).to({ x: -1024, alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true, 600);
            tween.onComplete.add(function () {
                this.buttonsGroup.ignoreChildInput = false;
            }, this);
        };
        Menu.prototype.openCurtain = function () {
            this.introSkip.alpha = 0;
            k2016Game.setFirstTime(false);
            this.textwriter.text = "";
            this.textwriter.alpha = 0;
            this.textArr = [];
            k2016Game.stopSound(k2016Game.gameSound.intro);
            k2016Game.playSound(k2016Game.gameSound.menu);
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
        };
        Menu.prototype.update = function () {
            if (k2016Game.getFirstTime()) {
                this.textwriter.text = this.textArr.join("");
            }
            else {
                this.destroyer.x -= 0.05;
                if (this.destroyer.x == -200) {
                    this.destroyer.x = 900;
                }
                var tStep = Math.cos(this.pCounter);
                this.penguinTrab.rotation += Phaser.Math.degToRad(-0.25 * tStep);
                this.pCounter += this.pStep;
                if (this.game.rnd.integerInRange(0, 1500) > 1480) {
                    if (this.lampiamento) {
                        return;
                    }
                    this.lampiamento = true;
                    var penguin = this.penguins[this.game.rnd.integerInRange(0, 5)];
                    var penguinAnim = penguin.animations.add('neon', [1, 0, 1], 10, false);
                    penguinAnim.onComplete.add(function () { var penguinIdle = penguin.animations.add('idle', [0], 0, true); penguinIdle.play(); this.lampiamento = false; }, this);
                    penguinAnim.play();
                }
            }
        };
        Menu.prototype.textWriter = function (index) {
            if (!k2016Game.getFirstTime)
                return;
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
                    }
                    else {
                        this.tweenTextArr(obj.text[i], i, 1000 + (i * 50));
                    }
                }
                else {
                    this.textArr[i] = " ";
                }
            }
        };
        Menu.prototype.tweenTextArr = function (letter, index, delay, callback) {
            var scoreValue = { score: 0, end: 10, index: index, game: this.game, menu: this, arr: this.textArr, letters: this.letters, letter: letter, callback: callback };
            var scoreTween = this.game.add.tween(scoreValue).to({ score: 10 }, 500, Phaser.Easing.Quadratic.Out, false, delay);
            scoreTween.onUpdateCallback(function () {
                if (parseInt(scoreValue.score) == scoreValue.end - 1) {
                    scoreValue.arr[scoreValue.index] = scoreValue.letter;
                }
                else {
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
                            if (k2016Game.getFirstTime())
                                scoreValue.menu.openCurtain();
                        }
                        else {
                            scoreValue.menu.textWriter(scoreValue.callback);
                        }
                    });
                }
            });
            scoreTween.start();
        };
        ;
        Menu.prototype.changeWindDirection = function () {
            var multi = Math.floor((this.max + 200) / 4);
            var frag = (Math.floor(Math.random() * 100) - multi);
            this.max = this.max + frag;
            if (this.max > 200)
                this.max = 150;
            if (this.max < -200)
                this.max = -150;
            this.setXSpeed(this.back_emitter, this.max);
            this.setXSpeed(this.mid_emitter, this.max);
            this.setXSpeed(this.front_emitter, this.max);
        };
        Menu.prototype.setXSpeed = function (emitter, max) {
            emitter.setXSpeed(max - 20, max);
            emitter.forEachAlive(this.setParticleXSpeed, this, max);
        };
        Menu.prototype.setParticleXSpeed = function (particle, max) {
            particle.body.velocity.x = max - Math.floor(Math.random() * 30);
        };
        Menu.prototype.stopEmitters = function () {
            this.back_emitter.destroy();
            this.front_emitter.destroy();
            this.mid_emitter.destroy();
        };
        return Menu;
    }(Phaser.State));
    k2016Game.Menu = Menu;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            _super.call(this);
            this.realScore = 0;
            this.level = 0;
            this.readyOnce = false;
            this.back1 = 0;
            this.back2 = 0;
        }
        GameState.prototype.preload = function () {
        };
        GameState.prototype.create = function () {
            this.gameTimer = this.game.time.create(false);
            this.gameTimer.loop(10000, this.updateLevel, this);
            this.randomBonusSpawnTime = this.game.time.now;
            this.randomEnemySpawnTime = this.game.time.now;
            this.game.stage.backgroundColor = "#4488AA";
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = 2000;
            this.introSky = this.game.add.tileSprite(0, -50, 1024, 650, 'introSky');
            this.introSky.fixedToCamera = true;
            this.introCloud1 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud1');
            this.introCloud1.fixedToCamera = true;
            this.introCloud1.tilePosition.x = 0;
            this.introCloud2 = this.game.add.tileSprite(0, 0, 1024, 300, 'cloud2');
            this.introCloud2.fixedToCamera = true;
            this.introCloud2.tilePosition.x = 0;
            this.introRocks = this.game.add.tileSprite(0, 298, 1024, 96, 'introRocks');
            this.introRocks.fixedToCamera = true;
            this.introRoad = this.game.add.tileSprite(0, 331, 1024, 269, 'introRoad');
            this.introRoad.fixedToCamera = true;
            this.ground = this.game.add.sprite(this.game.world.centerX, 510, this.game.cache.getBitmapData('ground'));
            this.physics.arcade.enable(this.ground);
            this.ground.anchor.setTo(0.5, 0.5);
            this.ground.body.immovable = true;
            this.ground.fixedToCamera = true;
            this.ground.visible = false;
            this.ground.body.allowGravity = false;
            var _style = { font: 'normal 40px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
            this.readyText = this.game.add.text(this.game.world.width / 2, this.game.world.height / 2, 'START RUN WHEN READY!', _style);
            this.readyText.font = 'Press Start 2P';
            this.readyText.anchor.set(0.5);
            _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#aaaaaa', strokeThickness: 5 };
            this.score = this.game.add.text(20, 20, '0', _style);
            this.score.font = 'Press Start 2P';
            this.score.anchor.set(0);
            this.enemyGroup = this.game.add.group();
            //this.enemyGroup.enableBody = true;
            //this.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
            this.bonusGroup = this.game.add.group();
            //this.bonusGroup.enableBody = true;
            //this.bonusGroup.physicsBodyType = Phaser.Physics.ARCADE;
            this.player = new k2016Game.Player(this.game, this);
            this.gameTheme = this.game.add.audio('game', 1, true);
            this.gameTheme.allowMultiple = true;
            this.gameTheme.play();
        };
        GameState.prototype.update = function () {
            this.introCloud1.tilePosition.x -= 0.07;
            this.introCloud2.tilePosition.x -= 0.03;
            //make it only one time                
            if (this.start) {
                if (!this.readyOnce) {
                    this.gameTimer.start();
                    this.readyOnce = true;
                    this.readyText.text = "GO!!!!";
                    this.game.add.tween(this.readyText).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.In, true, 0);
                }
                // console.log(this.gameTimer.ms)
                this.game.physics.arcade.overlap(this.bonusGroup, this.player, this.collisionHandler, null, this);
                this.game.physics.arcade.overlap(this.enemyGroup, this.player, this.collisionEnemyHandler, null, this);
                this.startScroll();
                this.spawnBonus();
                this.spawnEnemy();
            }
        };
        GameState.prototype.updateLevel = function () { this.level++; console.log("level:" + this.level); };
        GameState.prototype.getSpawnLevel = function () {
            var molt;
            switch (this.level) {
                case 0:
                    molt = 300;
                    break;
                case 1:
                    molt = 250;
                    break;
                case 2:
                    molt = 200;
                    break;
                case 3:
                    molt = 150;
                    break;
                case 4:
                    molt = 100;
                    break;
                case 5:
                    molt = 50;
                    break;
            }
            return Math.abs(this.game.rnd.integerInRange(10, 20) * molt);
        };
        GameState.prototype.collisionHandler = function (_player, _bonus) {
            _bonus.removeBonus(true);
        };
        GameState.prototype.collisionEnemyHandler = function (_player, _enemy) {
            // console.log(_enemy.x,_enemy.y);
            this.enemyGroup.add(new k2016Game.Explosion(this.game, this, _enemy.x, _enemy.y, "exp1"));
            this.enemyGroup.add(new k2016Game.Explosion(this.game, this, _enemy.x, _enemy.y, "exp2"));
            _player.setIdle(true);
            _enemy.removeEnemy();
        };
        GameState.prototype.tweenScore = function (end) {
            var obj = this.score;
            var scoreValue = { score: 0, end: end, start: this.realScore };
            this.realScore = this.realScore + end;
            var scoreTween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);
            scoreTween.onUpdateCallback(function () { obj.text = (scoreValue.start + Math.round(scoreValue.score)) + ""; });
            scoreTween.onComplete.add(function () { obj.text = "" + (scoreValue.start + scoreValue.end); }, this);
            scoreTween.start();
        };
        ;
        GameState.prototype.render = function () {
            // this.game.debug.text('Elapsed seconds: ' +   this.game.time.elapsedSecondsSince(this.game.time.now), 32, 32);
            // this.game.debug.bodyInfo(this.player, 32, 32);
            // this.game.debug.body(this.player);
        };
        GameState.prototype.startScroll = function () {
            this.introRoad.tilePosition.x -= this.back1;
            this.introRocks.tilePosition.x -= this.back2;
        };
        GameState.prototype.spawnBonus = function () {
            if (this.randomBonusSpawnTime < this.game.time.now) {
                this.randomBonusSpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * 100);
                this.bonusGroup.add(new k2016Game.Bonus(this.game, this));
            }
        };
        GameState.prototype.spawnEnemy = function () {
            if (this.randomEnemySpawnTime < this.game.time.now) {
                this.randomEnemySpawnTime = this.game.time.now + this.getSpawnLevel();
                this.enemyGroup.add(new Enemy(this.game, this, "bomb"));
            }
        };
        GameState.prototype.gameOver = function () {
            this.start = false;
            this.readyOnce = false;
            this.gameTheme.stop();
            k2016Game.setScore(parseInt(this.score.text));
            k2016Game.goState("Gameover", this.game);
        };
        ;
        GameState.prototype.tweenScroll = function (_state) {
            var backValue = { back1: 0, back2: 0 };
            var backEnd = { back1: 4, back2: 1.5 };
            var backTween = this.game.add.tween(backValue).to(backEnd, 1000, Phaser.Easing.Quadratic.Out);
            backTween.onUpdateCallback(function () {
                _state.back1 = backValue.back1;
                _state.back2 = backValue.back2;
            });
            backTween.start();
        };
        return GameState;
    }(Phaser.State));
    k2016Game.GameState = GameState;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.call(this);
            this.insulti = [
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
        }
        GameOver.prototype.create = function () {
            this.game.world.setBounds(0, 0, 1024, 600);
            //this.game.world.x=0;  
            var bg = this.game.add.image(0, 0, "gameoverBg");
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
                k2016Game.stopSound(k2016Game.gameSound.gameover);
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
                k2016Game.stopSound(k2016Game.gameSound.gameover);
                k2016Game.goState("Menu", this.game);
            }, this);
            k2016Game.playSound(k2016Game.gameSound.gameover);
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _text = 'You score ONLY ' + k2016Game.getScore() + ' points!\n' + this.insulti[this.game.rnd.integerInRange(0, this.insulti.length - 1)];
            var _gameOverSpeech = this.game.add.text(210, 390, _text, _style);
            _gameOverSpeech.font = 'Press Start 2P';
            var _anonymous = k2016Game.getUrlParameter("anonymous") ? true : false;
            if (!_anonymous) {
                anonymous();
            }
        };
        GameOver.prototype.update = function () {
        };
        return GameOver;
    }(Phaser.State));
    k2016Game.GameOver = GameOver;
})(k2016Game || (k2016Game = {}));
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/Game.ts"/>
/// <reference path="States/GameOver.ts"/>
var k2016Game;
(function (k2016Game) {
    var _newGame;
    var _playerScore = 0;
    var _firstTime = true;
    var _level = 2;
    var _game;
    var _gameSetup = false;
    var _gameSounds = [];
    var _ismobile = true;
    function setFirstTime(_val) { _firstTime = _val; }
    k2016Game.setFirstTime = setFirstTime;
    function getFirstTime() { return _firstTime; }
    k2016Game.getFirstTime = getFirstTime;
    function getScore() { return _playerScore; }
    k2016Game.getScore = getScore;
    function setScore(val) { _playerScore = val; }
    k2016Game.setScore = setScore;
    function setGame(game) { _game = game; }
    k2016Game.setGame = setGame;
    function getGame() { return _game; }
    k2016Game.getGame = getGame;
    function getSound(_sound) {
        return _gameSounds[_sound];
    }
    k2016Game.getSound = getSound;
    function playSound(_sound) {
        _gameSounds[_sound].play();
    }
    k2016Game.playSound = playSound;
    function stopSound(_sound) {
        _gameSounds[_sound].stop();
    }
    k2016Game.stopSound = stopSound;
    function pauseSound(_sound) {
        _gameSounds[_sound].stop();
    }
    k2016Game.pauseSound = pauseSound;
    function setSoundVolume(_sound, _volume) {
        _gameSounds[_sound].volume = _volume;
    }
    k2016Game.setSoundVolume = setSoundVolume;
    (function (gameSound) {
        gameSound[gameSound["intro"] = 0] = "intro";
        gameSound[gameSound["menu"] = 1] = "menu";
        gameSound[gameSound["lightsaber"] = 2] = "lightsaber";
        gameSound[gameSound["tieShot"] = 3] = "tieShot";
        gameSound[gameSound["ingame"] = 4] = "ingame";
        gameSound[gameSound["engine"] = 5] = "engine";
        gameSound[gameSound["explosion"] = 6] = "explosion";
        gameSound[gameSound["bonus"] = 7] = "bonus";
        gameSound[gameSound["colliderSound"] = 8] = "colliderSound";
        gameSound[gameSound["yeahh"] = 9] = "yeahh";
        gameSound[gameSound["gameover"] = 10] = "gameover";
        gameSound[gameSound["attacksequence"] = 11] = "attacksequence";
        gameSound[gameSound["stayfocused"] = 12] = "stayfocused";
        gameSound[gameSound["watchenemy"] = 13] = "watchenemy";
        gameSound[gameSound["theforce"] = 14] = "theforce";
        gameSound[gameSound["stayontarget"] = 15] = "stayontarget";
        gameSound[gameSound["tiefly"] = 16] = "tiefly";
        gameSound[gameSound["usetheforce"] = 17] = "usetheforce";
    })(k2016Game.gameSound || (k2016Game.gameSound = {}));
    var gameSound = k2016Game.gameSound;
    function setUpGame(_game) {
        if (!_gameSetup) {
            //console.log("gameSetup");
            setGame(_game);
            var _sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;
        }
    }
    k2016Game.setUpGame = setUpGame;
    function isMobile() {
        return _ismobile;
    }
    k2016Game.isMobile = isMobile;
    function setDevice(isMobile) {
        _ismobile = isMobile;
    }
    k2016Game.setDevice = setDevice;
    function getLevel() { return _level; }
    k2016Game.getLevel = getLevel;
    function getLevelLabel() {
        var _label;
        switch (_level) {
            case 0:
                _label = "JAR JAR";
                break;
            case 1:
                _label = "TROOPER";
                break;
            case 2:
                _label = "JEDI";
                break;
            default:
                break;
        }
        return _label;
    }
    k2016Game.getLevelLabel = getLevelLabel;
    function setLevel(val) { _level = val; }
    k2016Game.setLevel = setLevel;
    function getLevelData() {
        var _arr = JSON.parse(JSON.stringify(gameData.levels[getLevel()].slice()));
        return _arr;
    }
    k2016Game.getLevelData = getLevelData;
    function getObstacleLevel() {
        var difficult = 0;
        switch (getLevel()) {
            case 0:
                difficult = .65;
                break;
            case 1:
                difficult = 1;
                break;
            case 2:
                difficult = 1.35;
                break;
        }
        return difficult;
    }
    k2016Game.getObstacleLevel = getObstacleLevel;
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
    k2016Game.getUrlParameter = getUrlParameter;
    ;
    function goState(_state, _game) {
        var st = _game.plugins.add(Phaser.Plugin.StateTransition);
        if (isMobile()) {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            });
        }
        else {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });
        }
        st.to(_state);
    }
    k2016Game.goState = goState;
    var initGame = (function () {
        function initGame(width, height) {
            var dpr = 1;
            try {
                if (devicePixelRatio != undefined) {
                    dpr = devicePixelRatio || 1;
                    if (!width) {
                        width = screen.width * dpr;
                    }
                    if (!height) {
                        height = screen.height * dpr;
                    }
                }
            }
            catch (err) { }
            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);
            this.game.state.add("Boot", k2016Game.Boot, false);
            this.game.state.add("Preloader", k2016Game.Preloader, false);
            this.game.state.add("Menu", k2016Game.Menu, false);
            this.game.state.add("GameWing", k2016Game.GameWing, false);
            this.game.state.add("Gameover", k2016Game.GameOver, false);
            this.game.state.add("Gamewin", k2016Game.Gamewin, false);
            this.game.state.start("Boot");
        }
        return initGame;
    }());
    k2016Game.initGame = initGame;
    window.onresize = function () { };
    window.onload = function () { _newGame = new initGame(1024, 600); };
})(k2016Game || (k2016Game = {}));
// when the page has finished loading, create our game
var WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }
};
var gameData = {
    assets: {
        spritesheets: [
            { name: "deluca", path: "assets/images/game/deluca.png", width: 160, height: 168, frames: 60 },
            { name: "penguin1", path: "assets/images/game/menu/penguin1.png", width: 45, height: 96, frames: 2 },
            { name: "penguin2", path: "assets/images/game/menu/penguin2.png", width: 42, height: 93, frames: 2 },
            { name: "penguin3", path: "assets/images/game/menu/penguin3.png", width: 42, height: 90, frames: 2 },
            { name: "penguin4", path: "assets/images/game/menu/penguin4.png", width: 42, height: 93, frames: 2 },
            { name: "penguin5", path: "assets/images/game/menu/penguin5.png", width: 45, height: 93, frames: 2 },
            { name: "penguin6", path: "assets/images/game/menu/penguin6.png", width: 45, height: 93, frames: 2 },
            { name: "snowflakes", path: "assets/images/game/menu/snowflakes.png", width: 17, height: 17, frames: 6 },
            { name: "snowflakes_large", path: "assets/images/game/menu/snowflakes_large.png", width: 64, height: 64, frames: 6 },
            { name: "exp1", path: "assets/images/game/rockGround.png", width: 279, height: 84, frames: 12 },
            { name: "exp2", path: "assets/images/game/explosion.png", width: 44, height: 63, frames: 8 },
            { name: "exp3", path: "assets/images/game/explosion2.png", width: 80, height: 80, frames: 28 },
            { name: "bomb", path: "assets/images/game/bomb.png", width: 33, height: 31, frames: 6 },
            { name: "bomb2", path: "assets/images/game/bomb2.png", width: 30, height: 33, frames: 4 },
            { name: "bonus", path: "assets/images/game/bonus.png", width: 200, height: 115, frames: 5 },
            { name: "delucaFly", path: "assets/images/game/delucaFly.png", width: 212, height: 128, frames: 9 },
            { name: "reactor", path: "assets/images/game/reactor.png", width: 300, height: 600, frames: 2 },
            { name: "trash1", path: "assets/images/game/trash1.png", width: 37, height: 42, frames: 16 },
            { name: "trash2", path: "assets/images/game/trash2.png", width: 47, height: 53, frames: 16 },
            { name: "trash3", path: "assets/images/game/trash3.png", width: 61, height: 61, frames: 16 },
            { name: "trash4", path: "assets/images/game/trash4.png", width: 54, height: 45, frames: 16 },
            { name: "trash5", path: "assets/images/game/trash5.png", width: 46, height: 46, frames: 16 },
            { name: "trash6", path: "assets/images/game/trash6.png", width: 33, height: 26, frames: 16 },
            { name: "trash7", path: "assets/images/game/trash7.png", width: 36, height: 52, frames: 16 },
            { name: "trash8", path: "assets/images/game/trash8.png", width: 58, height: 64, frames: 16 },
            { name: "trash9", path: "assets/images/game/trash9.png", width: 75, height: 69, frames: 16 },
            { name: "trash10", path: "assets/images/game/trash10.png", width: 39, height: 48, frames: 16 },
            { name: "trash11", path: "assets/images/game/trash11.png", width: 63, height: 56, frames: 16 },
            { name: "trash12", path: "assets/images/game/trash12.png", width: 63, height: 69, frames: 16 },
            { name: "bonusEffect", path: "assets/images/game/bonusEffect.png", width: 192, height: 192, frames: 20 }
        ],
        images: [
            { name: "introSky", path: "assets/images/game/sky.png" },
            { name: "tunnel", path: "assets/images/game/deathTunnel.png" },
            { name: "introRocks", path: "assets/images/game/rocks.png" },
            { name: "introRoad", path: "assets/images/game/road.png" },
            { name: "cloud1", path: "assets/images/game/cloud1.png" },
            { name: "cloud2", path: "assets/images/game/cloud2.png" },
            { name: "delucaMenu", path: "assets/images/game/menu/deluca-pixelated.png" },
            { name: "curtainLeft", path: "assets/images/game/menu/curtain-left.png" },
            { name: "curtainBackLeft", path: "assets/images/game/menu/curtain-back-left.png" },
            { name: "curtainRight", path: "assets/images/game/menu/curtain-right.png" },
            { name: "curtainBackRight", path: "assets/images/game/menu/curtain-back-right.png" },
            { name: "curtainTop", path: "assets/images/game/menu/curtain-top.png" },
            { name: "bgPenguins", path: "assets/images/game/menu/bg-penguins.jpg" },
            { name: "btnBlue", path: "assets/images/game/menu/btn-blue.png" },
            { name: "btnRed", path: "assets/images/game/menu/btn-red.png" },
            { name: "btnPurple", path: "assets/images/game/menu/btn-purple.png" },
            { name: "btnGreen", path: "assets/images/game/menu/btn-green.png" },
            { name: "fishfries", path: "assets/images/game/menu/fishfries.png" },
            { name: "deathstar", path: "assets/images/game/menu/deathstar.png" },
            { name: "destroyer", path: "assets/images/game/menu/destroyer.png" },
            { name: "tie", path: "assets/images/game/menu/tie.png" },
            { name: "gameoverBg", path: "assets/images/game/menu/bg-halloffame.jpg" },
            { name: "layer1", path: "assets/images/game/layer1.png" },
            { name: "layer2", path: "assets/images/game/layer2.png" },
            { name: "collider", path: "assets/images/game/collider.png" },
            { name: "expDelucaArm", path: "assets/images/game/expDelucaArm.png" },
            { name: "expDelucaBody", path: "assets/images/game/expDelucaBody.png" },
            { name: "expDelucaHead", path: "assets/images/game/expDelucaHead.png" },
            { name: "expDelucaLeg", path: "assets/images/game/expDelucaLeg.png" },
            { name: "expDelucaShip1", path: "assets/images/game/expDelucaShip1.png" },
            { name: "expDelucaShip2", path: "assets/images/game/expDelucaShip2.png" },
            { name: "expDelucaShip3", path: "assets/images/game/expDelucaShip3.png" },
            { name: "expDelucaShip4", path: "assets/images/game/expDelucaShip4.png" },
            { name: "tieShot", path: "assets/images/game/tieShot.png" },
            { name: "wingShot", path: "assets/images/game/wingShot.png" },
            { name: "carrie", path: "assets/images/game/carrie.jpg" },
            { name: "howToPlay", path: "assets/images/game/howToPlay.png" },
            { name: "torpedo", path: "assets/images/game/torpedo.png" },
            { name: "kyber", path: "assets/images/game/kyber.png" }
        ],
        sounds: [
            { name: "intro", paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"], volume: 1, loop: false },
            { name: "starwars", paths: ["assets/sounds/starwars.ogg", "assets/sounds/starwars.m4a"], volume: 1, loop: true },
            { name: "lightSaber", paths: ["assets/sounds/lightSaber.ogg", "assets/sounds/lightSaber.m4a"], volume: 1, loop: false },
            { name: "tieShot", paths: ["assets/sounds/tieShot.ogg", "assets/sounds/tieShot.m4a"], volume: .5, loop: false },
            { name: "game", paths: ["assets/sounds/gameTheme.ogg", "assets/sounds/gameTheme.m4a"], volume: 1, loop: true },
            { name: "engine2", paths: ["assets/sounds/engine2.ogg", "assets/sounds/engine2.m4a"], volume: 1, loop: true },
            { name: "explosion", paths: ["assets/sounds/explosion.ogg", "assets/sounds/explosion.m4a"], volume: 1, loop: false },
            { name: "bonus", paths: ["assets/sounds/bonus.ogg", "assets/sounds/bonus.m4a"], volume: .5, loop: false },
            { name: "colliderSound", paths: ["assets/sounds/colliderSound.ogg", "assets/sounds/colliderSound.m4a"], volume: 1, loop: false },
            { name: "yeahh", paths: ["assets/sounds/yeahh.ogg", "assets/sounds/yeahh.m4a"], volume: 1, loop: false },
            { name: "final", paths: ["assets/sounds/final.ogg", "assets/sounds/final.m4a"], volume: .5, loop: true },
            { name: "attackSequence", paths: ["assets/sounds/attackSequence.ogg", "assets/sounds/attackSequence.m4a"], volume: .5, loop: false },
            { name: "stayFocused", paths: ["assets/sounds/stayFocused.ogg", "assets/sounds/stayFocused.m4a"], volume: .5, loop: false },
            { name: "watchEnemy", paths: ["assets/sounds/watchEnemy.ogg", "assets/sounds/watchEnemy.m4a"], volume: .5, loop: false },
            { name: "TheForce", paths: ["assets/sounds/TheForce.ogg", "assets/sounds/TheForce.m4a"], volume: .5, loop: false },
            { name: "stayOnTarget", paths: ["assets/sounds/stayOnTarget.ogg", "assets/sounds/stayOnTarget.m4a"], volume: .5, loop: false },
            { name: "tieFly", paths: ["assets/sounds/tieFly.ogg", "assets/sounds/tieFly.m4a"], volume: .5, loop: false },
            { name: "useTheForce", paths: ["assets/sounds/useTheForce.ogg", "assets/sounds/useTheForce.m4a"], volume: .5, loop: false }
        ],
        bitmapfont: []
    },
    levels: [
        //pussy
        [
            { startX: 0, endX: 100, started: false, level: { vel: "accelerate", pVel: 100, message: null, sound: "attackSequence", bonus: false, bomb: false, tie: false } },
            { startX: 100, endX: 150, started: false, level: { vel: null, pVel: null, message: "ALERT, INCOMING MINEFIELD", } },
            { startX: 300, endX: 400, started: false, level: { vel: null, pVel: null, message: null, bonus: true, bomb: true, bombSpawn: 200 } },
            { startX: 4000, endX: 4100, started: false, level: { sound: "stayFocused" } },
            { startX: 3700, endX: 3800, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false } },
            { startX: 3800, endX: 3900, started: false, level: { vel: "decelerate", pVel: 200, message: null } },
            { startX: 14500, endX: 14600, started: false, level: { sound: "watchEnemy" } },
            { startX: 14600, endX: 14800, started: false, level: { vel: null, pVel: null, message: "ALERT, TIE FIGHTERS APPROACHING" } },
            { startX: 15000, endX: 15100, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: false, tie: true, tieSpawn: 250 } },
            { startX: 18800, endX: 18900, started: false, level: { sound: "stayFocused" } },
            { startX: 18500, endX: 18600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 19000, endX: 19100, started: false, level: { vel: "decelerate2", pVel: 250, message: null } },
            { startX: 29800, endX: 29900, started: false, level: { sound: "watchEnemy" } },
            { startX: 29900, endX: 30000, started: false, level: { vel: null, pVel: null, message: "WATCH OUT, INCOMING ENEMIES" } },
            { startX: 30200, endX: 30300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 300, tie: true, tieSpawn: 350 } },
            { startX: 33800, endX: 33900, started: false, level: { sound: "stayFocused" } },
            { startX: 33500, endX: 33600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 34000, endX: 34100, started: false, level: { vel: "decelerate3", pVel: 300, message: null } },
            { startX: 44800, endX: 44900, started: false, level: { sound: "TheForce" } },
            { startX: 44900, endX: 45000, started: false, level: { vel: null, pVel: null, message: "LAST RUSH...BE FOCUS!" } },
            { startX: 45200, endX: 45300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 250, tie: true, tieSpawn: 300 } },
            { startX: 47500, endX: 47600, started: false, level: { message: null, bonus: false, bomb: false, tie: false } },
            { startX: 47800, endX: 47900, started: false, level: { sound: "stayOnTarget", action: "createCore" } },
            { startX: 47900, endX: 48000, started: false, level: { vel: "decelerate4", pVel: 80, message: null, bonus: false, bomb: false, tie: false } },
            { startX: 48100, endX: 48200, started: false, level: { vel: "stop", pVel: 0, message: null, bonus: false, bomb: false, tie: false } },
        ],
        //normal
        [
            { startX: 0, endX: 100, started: false, level: { vel: "accelerate", pVel: 100, message: null, sound: "attackSequence", bonus: false, bomb: false, tie: false } },
            { startX: 100, endX: 150, started: false, level: { vel: null, pVel: null, message: "ALERT, INCOMING MINEFIELD", } },
            { startX: 300, endX: 400, started: false, level: { vel: null, pVel: null, message: null, bonus: true, bomb: true, bombSpawn: 200 } },
            { startX: 4000, endX: 4100, started: false, level: { sound: "stayFocused" } },
            { startX: 3700, endX: 3800, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false } },
            { startX: 3800, endX: 3900, started: false, level: { vel: "decelerate", pVel: 200, message: null } },
            { startX: 14500, endX: 14600, started: false, level: { sound: "watchEnemy" } },
            { startX: 14600, endX: 14800, started: false, level: { vel: null, pVel: null, message: "ALERT, TIE FIGHTERS APPROACHING" } },
            { startX: 15000, endX: 15100, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: false, tie: true } },
            { startX: 18800, endX: 18900, started: false, level: { sound: "stayFocused" } },
            { startX: 18500, endX: 18600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 19000, endX: 19100, started: false, level: { vel: "decelerate2", pVel: 250, message: null } },
            { startX: 29800, endX: 29900, started: false, level: { sound: "watchEnemy" } },
            { startX: 29900, endX: 30000, started: false, level: { vel: null, pVel: null, message: "WATCH OUT, INCOMING ENEMIES" } },
            { startX: 30200, endX: 30300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 250, tie: true, tieSpawn: 300 } },
            { startX: 33800, endX: 33900, started: false, level: { sound: "stayFocused" } },
            { startX: 33500, endX: 33600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 34000, endX: 34100, started: false, level: { vel: "decelerate3", pVel: 300, message: null } },
            { startX: 44800, endX: 44900, started: false, level: { sound: "TheForce" } },
            { startX: 44900, endX: 45000, started: false, level: { vel: null, pVel: null, message: "LAST RUSH...BE FOCUS!" } },
            { startX: 45200, endX: 45300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 200, tie: true, tieSpawn: 250 } },
            { startX: 47500, endX: 47600, started: false, level: { message: null, bonus: false, bomb: false, tie: false } },
            { startX: 47800, endX: 47900, started: false, level: { sound: "stayOnTarget", action: "createCore" } },
            { startX: 47900, endX: 48000, started: false, level: { vel: "decelerate4", pVel: 80, message: null, bonus: false, bomb: false, tie: false } },
            { startX: 48100, endX: 48200, started: false, level: { vel: "stop", pVel: 0, message: null, bonus: false, bomb: false, tie: false } },
        ],
        //Hard
        [
            { startX: 0, endX: 200, started: false, level: { vel: "accelerate", pVel: 100, message: null, sound: "attackSequence", bonus: false, bomb: false, tie: false } },
            { startX: 100, endX: 350, started: false, level: { vel: null, pVel: null, message: "ALERT, INCOMING MINEFIELD", } },
            { startX: 300, endX: 400, started: false, level: { vel: null, pVel: null, message: null, bonus: true, bomb: true, bombSpawn: 100 } },
            { startX: 4000, endX: 4100, started: false, level: { sound: "stayFocused" } },
            { startX: 3700, endX: 3800, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false } },
            { startX: 3800, endX: 3900, started: false, level: { vel: "decelerate", pVel: 200, message: null } },
            { startX: 14500, endX: 14600, started: false, level: { sound: "watchEnemy" } },
            { startX: 14600, endX: 14800, started: false, level: { vel: null, pVel: null, message: "ALERT, TIE FIGHTERS APPROACHING" } },
            { startX: 15000, endX: 15100, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: false, tie: true, tieSpawn: 150 } },
            { startX: 18800, endX: 18900, started: false, level: { sound: "stayFocused" } },
            { startX: 18500, endX: 18600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 19000, endX: 19100, started: false, level: { vel: "decelerate2", pVel: 250, message: null } },
            { startX: 29800, endX: 29900, started: false, level: { sound: "watchEnemy" } },
            { startX: 29900, endX: 30000, started: false, level: { vel: null, pVel: null, message: "WATCH OUT, INCOMING ENEMIES" } },
            { startX: 30200, endX: 30300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 200, tie: true, tieSpawn: 250 } },
            { startX: 33800, endX: 33900, started: false, level: { sound: "stayFocused" } },
            { startX: 33500, endX: 33600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 34000, endX: 34100, started: false, level: { vel: "decelerate3", pVel: 300, message: null } },
            { startX: 44800, endX: 44900, started: false, level: { sound: "TheForce" } },
            { startX: 44900, endX: 45000, started: false, level: { vel: null, pVel: null, message: "LAST RUSH...BE FOCUS!" } },
            { startX: 45200, endX: 45300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 150, tie: true, tieSpawn: 200 } },
            { startX: 47500, endX: 47600, started: false, level: { message: null, bonus: false, bomb: false, tie: false } },
            { startX: 47800, endX: 47900, started: false, level: { sound: "stayOnTarget", action: "createCore" } },
            { startX: 47900, endX: 48000, started: false, level: { vel: "decelerate4", pVel: 80, message: null, bonus: false, bomb: false, tie: false } },
            { startX: 48100, endX: 48200, started: false, level: { vel: "stop", pVel: 0, message: null, bonus: false, bomb: false, tie: false } },
        ]
    ]
};
var _guserid;
var _gname;
var _gfriends;
var sharing = false;
function checkLoginStatus(response) {
    //alert("checkLoginStatus")
    if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        FB.api('/me', function (response) {
            if (response && !response.error) {
                _guserid = response.id;
                _gname = response.name;
                FB.api("/me/friends", function (response) {
                    if (response && !response.error) {
                        _gfriends = response.data;
                        //alert("to share")
                        share();
                    }
                });
            }
        });
    }
    else if (response.status === 'not_authorized') {
        performLogin();
    }
    else {
        performLogin();
    }
}
function performLogin() {
    //alert("performLogin")
    FB.login(function (response) {
        //alert(response)
        if (response.authResponse) {
            checkLoginStatus(response);
        }
        else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, { scope: 'public_profile, email, user_friends' });
}
function getLoginStatus() {
    //alert("getLoginStatus")
    FB.getLoginStatus(function (response) { checkLoginStatus(response); });
}
function anonymous() {
    $.ajax({
        url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
        data: { who: "save", game: "xmas2016", name: "anonymous (" + k2016Game.getLevelLabel() + " level)", callback: "gamescores", score: k2016Game.getScore() },
        dataType: "jsonp",
        jsonpCallback: "gamescores",
        context: document.body
    }).done(function (data) { });
}
function share() {
    if (sharing)
        return;
    sharing = true;
    $.ajax({
        url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
        data: { who: "save", game: "xmas2016", name: _gname + " (" + k2016Game.getLevelLabel() + " level)", callback: "gamescores", score: k2016Game.getScore() },
        dataType: "jsonp",
        jsonpCallback: "gamescores",
        context: document.body
    }).done(function (data) {
        FB.ui({
            method: 'feed',
            name: 'XMAS RUN 2k16',
            link: 'http://xmas2016.zero89.it/halloffame.html',
            description: 'You score ' + k2016Game.getScore() + " points @ " + k2016Game.getLevelLabel() + " level!",
            caption: "May the FORCE be with you!",
            picture: 'http://xmas2016.zero89.it/assets/images/game/cover.png'
        }, function (response) {
            sharing = false;
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        //console.log(jqXHR, textStatus, errorThrown)
    });
}
;
window.fbAsyncInit = function () {
    FB.init({
        appId: '319545484920372',
        xfbml: true,
        version: 'v2.2'
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Bomb = (function (_super) {
        __extends(Bomb, _super);
        function Bomb(game, gameState, range) {
            _super.call(this, game, game.camera.x + 1024 + 100, 0, "bomb");
            this.game = game;
            this.gameState = gameState;
            this.checkOnce = false;
            this.name = "bomb";
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(2);
            this.anchor.set(.5, .5);
            var anim = this.animations.add('anim', [0, 1, 2, 3, 4, 5], 9, true);
            this.range = range;
            if (this.range == null) {
                this.y = this.game.rnd.integerInRange(100, 500);
            }
            else {
                this.y = this.game.rnd.integerInRange(this.range.start, this.range.end);
            }
            this.play('anim');
            this.vel = game.rnd.realInRange(2, 4);
            game.add.existing(this);
            //this.game.add.tween(this).to({ y: this.y+20, }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true)
        }
        Bomb.prototype.update = function () {
            this.x -= this.vel;
            if (!k2016Game.isMobile()) {
                this.angle -= this.vel;
            }
            if (this.game.physics.arcade.distanceBetween(this, this.gameState.player) < 60 && !this.checkOnce) {
                this.checkOnce = true;
                this.gameState.player.yeahh();
            }
            if (this.x < this.game.camera.x - 100) {
                this.removeEnemy();
            }
        };
        Bomb.prototype.removeEnemy = function () {
            this.kill();
            this.destroy();
        };
        return Bomb;
    }(Phaser.Sprite));
    k2016Game.Bomb = Bomb;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Bonus = (function (_super) {
        __extends(Bonus, _super);
        function Bonus(game, gameState, range) {
            _super.call(this, game, game.camera.x + 1024 + 100, 0, "bonus");
            this.game = game;
            this.gameState = gameState;
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(0.50);
            this.range = range;
            this.setValues();
            game.add.existing(this);
        }
        Bonus.prototype.setValues = function () {
            this.type = this.game.rnd.integerInRange(1, 5);
            this.frame = this.type - 1;
            this.vel = this.game.rnd.realInRange(5 + this.type, 10 + this.type);
            if (this.range == null) {
                this.y = this.game.rnd.integerInRange(100, 500);
            }
            else {
                this.y = this.game.rnd.integerInRange(this.range.start, this.range.end);
            }
        };
        Bonus.prototype.update = function () {
            this.x -= this.vel;
            if (this.x < this.game.camera.x - 100) {
                this.removeBonus(false);
            }
        };
        Bonus.prototype.dissolve = function () {
            k2016Game.playSound(k2016Game.gameSound.bonus);
            var dissolve = this.game.add.sprite(this.x, this.y, "bonusEffect");
            dissolve.anchor.set(.5);
            dissolve.scale.set(1);
            var anim = dissolve.animations.add("diss", [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 20, false);
            dissolve.animations.play("diss");
            anim.onComplete.add(function () { this.destroy(); }, dissolve);
            this.gameState.bonusGroup.add(dissolve);
            var score = (100 * this.type) + "";
            var _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
            var scoreText = this.game.add.text(this.x, this.y, score, _style);
            scoreText.alpha = 0;
            scoreText.font = 'Press Start 2P';
            scoreText.anchor.set(.5);
            var scoreTween = this.game.add.tween(scoreText).to({ alpha: 1 }, 200, Phaser.Easing.Quadratic.In, true, 0);
            scoreTween.onComplete.add(function () {
                var scoreTween2 = this.game.add.tween(scoreText).to({ alpha: 0, y: scoreText.y - 50 }, 300, Phaser.Easing.Quadratic.In, true, 0);
                scoreTween2.onComplete.add(function () { this.destroy(); }, scoreText);
            }, scoreText);
        };
        Bonus.prototype.removeBonus = function (score) {
            if (score) {
                this.gameState.tweenScore((100 * this.type));
                this.dissolve();
            }
            this.kill();
            this.destroy();
        };
        return Bonus;
    }(Phaser.Sprite));
    k2016Game.Bonus = Bonus;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Explosion = (function (_super) {
        __extends(Explosion, _super);
        function Explosion(game, gameState, x, y, name, type) {
            _super.call(this, game, x, y, name);
            this.game = game;
            this.gameState = gameState;
            k2016Game.playSound(k2016Game.gameSound.explosion);
            var anim = this.animations.add('boom', null, 20, false);
            this.anchor.set(.5);
            anim.onComplete.add(function () { this.destroy(); }, this);
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
                if (!k2016Game.isMobile()) {
                    for (var i = 0; i < 10; i++) {
                        this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "trash" + (i + 1), "enemy"));
                    }
                }
            }
            else if (type == "player") {
                if (!k2016Game.isMobile()) {
                    for (var i = 0; i < 5; i++) {
                        this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "trash" + (i + 1), "enemy"));
                    }
                }
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaArm", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaBody", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaHead", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaLeg", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip1", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip2", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip3", "player"));
                this.gameState.playerGroup.add(new k2016Game.ExplosionPiece(this.game, this.gameState, x, y, "expDelucaShip4", "player"));
            }
        }
        Explosion.prototype.update = function () { };
        Explosion.prototype.removeExplosion = function () {
            this.kill();
            this.destroy();
        };
        return Explosion;
    }(Phaser.Sprite));
    k2016Game.Explosion = Explosion;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var ExplosionPiece = (function (_super) {
        __extends(ExplosionPiece, _super);
        function ExplosionPiece(game, gameState, x, y, name, type) {
            _super.call(this, game, x, y, name);
            this.game = game;
            this.gameState = gameState;
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.moves = true;
            this.anchor.setTo(0.5);
            this.scale.set(0.5);
            if (!k2016Game.isMobile()) {
                this.lifespan = 5000;
            }
            else {
                this.lifespan = 2000;
            }
            this.body.collideWorldBounds = false;
            var Xvector = (game.rnd.realInRange(-25, 25)) * 3;
            var Yvector = (game.rnd.realInRange(-25, 25)) * 3;
            this.body.allowGravity = false;
            this.body.velocity.setTo(Xvector, Yvector);
            if (type == "enemy") {
                this.animations.add('rotation', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12, true);
                this.animations.play("rotation");
            }
            this._angle = this.game.rnd.realInRange(-3, 3);
            game.add.existing(this);
        }
        ExplosionPiece.prototype.update = function () {
            this.angle += this._angle;
        };
        return ExplosionPiece;
    }(Phaser.Sprite));
    k2016Game.ExplosionPiece = ExplosionPiece;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Obstacle = (function (_super) {
        __extends(Obstacle, _super);
        function Obstacle(game, gameState, type, x, y, index, max, pathId) {
            _super.call(this, game, x, y, "collider");
            this.game = game;
            this.gameState = gameState;
            this.startX = x;
            this.index = index;
            this.pathId = pathId;
            this.max = max;
            this.who = type;
            this.scrolled = false;
            this.game.physics.arcade.enable(this);
            this.body.immovable = true;
            this.body.allowGravity = false;
            this.anchor.set(.5, 1);
            this.createNext = true;
            game.add.existing(this);
        }
        Obstacle.prototype.update = function () {
            if (((this.startX - this.game.camera.x) < 800) && this.createNext && (this.who == "top") && (this.index < this.max)) {
                this.gameState.createObstacles(this.pathId, this.startX + 400, this.y, this.index + 1, this.max);
                this.createNext = false;
            }
            if (this.x < this.gameState.player.x && !this.scrolled && this.who == "top") {
                this.scrolled = true;
                this.gameState.tweenScore(50);
                k2016Game.playSound(k2016Game.gameSound.colliderSound);
                var score = "50";
                var _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
                var scoreText = this.game.add.text(this.gameState.player.x, this.gameState.player.y, score, _style);
                scoreText.alpha = 1;
                scoreText.font = 'Press Start 2P';
                scoreText.anchor.set(.5);
                var scoreTween = this.game.add.tween(scoreText).to({ alpha: 0, y: this.gameState.player.y - 50 }, 300, Phaser.Easing.Quadratic.In, true, 0);
                scoreTween.onComplete.add(function () {
                    this.destroy();
                }, scoreText);
            }
            if (this.x < this.game.camera.x - 100) {
                this.removeObstacle();
            }
        };
        Obstacle.prototype.removeObstacle = function () {
            if (this.max == this.index && this.who == "top") {
                this.gameState.setupPath(this.pathId + 1);
            }
            this.kill();
            this.destroy();
        };
        return Obstacle;
    }(Phaser.Sprite));
    k2016Game.Obstacle = Obstacle;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    (function (PlayerStates) {
        PlayerStates[PlayerStates["IDLE"] = 0] = "IDLE";
        PlayerStates[PlayerStates["RUNNING"] = 1] = "RUNNING";
        PlayerStates[PlayerStates["JUMPING"] = 2] = "JUMPING";
    })(k2016Game.PlayerStates || (k2016Game.PlayerStates = {}));
    var PlayerStates = k2016Game.PlayerStates;
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, gameState) {
            _super.call(this, game, 100, 0, "deluca");
            this.game = game;
            this.gameState = gameState;
            this.lastRate = 0;
            this.playerSpeed = 0;
            this.isJumping = false;
            this.anim = new Array;
            this.scale.set(0.75);
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.fixedToCamera = false;
            this.body.allowGravity = true;
            this.body.setSize(48, 168, 56, 0);
            var anim = this.animations.add("idle", [12, 13, 14, 13], 5, true);
            this.anim.push(anim);
            anim = this.animations.add("run", [0, 2, 4, 6, 8, 10], 0, true);
            this.anim.push(anim);
            anim = this.animations.add("jump", [2], 0, false);
            this.anim.push(anim);
            this.anim[PlayerStates.IDLE].play();
            this.currentState = PlayerStates.IDLE;
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                this.btnLeft = this.game.add.sprite(850, 550, this.game.cache.getBitmapData('circleBtn'));
                this.btnLeft.anchor.set(0.5, 0.5);
                this.btnLeft.scale.set(0.65);
                this.btnLeft.inputEnabled = true;
                this.btnLeft.events.onInputDown.add(this.goLeft, this);
                this.btnLeft.alpha = .2;
                this.btnRight = this.game.add.sprite(950, 550, this.game.cache.getBitmapData('circleBtn'));
                this.btnRight.anchor.set(0.5, 0.5);
                this.btnRight.scale.set(0.65);
                this.btnRight.inputEnabled = true;
                this.btnRight.events.onInputDown.add(this.goRight, this);
                this.btnRight.alpha = .32;
                this.btnUp = this.game.add.sprite(100, 550, this.game.cache.getBitmapData('circleBtn'));
                this.btnUp.anchor.set(0.5, 0.5);
                this.btnUp.scale.set(0.65);
                this.btnUp.inputEnabled = true;
                this.btnUp.events.onInputDown.add(this.goUp, this);
                this.btnUp.alpha = .2;
            }
            else {
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
                this.leftButton.onDown.add(this.goLeft, this);
                this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
                this.rightButton.onDown.add(this.goRight, this);
                this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.upButton.onDown.add(this.goUp, this);
            }
            this.game.add.existing(this);
        }
        Player.prototype.update = function () {
            if (this.gameState.start) {
                if (this.x > 700) {
                    this.x = 700;
                }
                if (this.x < -100) {
                    this.gameState.gameOver();
                }
                this.checkSpeed();
            }
            if (this.body.velocity.y > 0) {
                this.game.physics.arcade.collide(this, this.gameState.ground, this.groundHeandler);
            }
        };
        Player.prototype.groundHeandler = function (_sprite, _game) {
            if (_sprite.isJumping) {
                _sprite.body.velocity.x = -240;
                _sprite.isJumping = false;
                _sprite.anim[PlayerStates.JUMPING].stop();
                _sprite.anim[PlayerStates.RUNNING].play();
                _sprite.anim[PlayerStates.RUNNING].stop();
                _sprite.checkIdle(_game);
            }
        };
        Player.prototype.goLeft = function () {
            if (this.isJumping || this.isIdle)
                return;
            if (!this.gameState.start) {
                this.gameState.start = true;
                this.gameState.tweenScroll(this.gameState);
            }
            this.clickRate(0);
        };
        Player.prototype.goRight = function () {
            if (this.isJumping || this.isIdle)
                return;
            if (!this.gameState.start) {
                this.gameState.start = true;
                this.gameState.tweenScroll(this.gameState);
            }
            this.clickRate(1);
        };
        Player.prototype.setIdle = function (idle) {
            //console.log("setidle", idle);
            this.isIdle = idle;
            this.alpha = .5;
            if (idle)
                this.game.time.events.add(1000, function () { this.setIdle(false); this.alpha = 1; }, this);
        };
        Player.prototype.goUp = function () {
            if (this.isJumping || this.isIdle)
                return;
            if (!this.gameState.start) {
                this.gameState.start = true;
                this.gameState.tweenScroll(this.gameState);
            }
            this.isJumping = true;
            this.body.velocity.y = -1050;
            this.anim[PlayerStates.JUMPING].play();
            this.currentState = PlayerStates.JUMPING;
            if (this.playerSpeed > 0) {
                this.body.velocity.x = +100;
            }
            else {
                this.body.velocity.x = 0;
            }
        };
        Player.prototype.clickRate = function (key) {
            if (this.isJumping)
                return;
            if (this.lastRate != key) {
                this.lastRate = key;
                this.increaseSpeed(this.game);
                this.anim[PlayerStates.IDLE].stop();
                this.anim[PlayerStates.RUNNING].next(1);
                this.currentState = PlayerStates.RUNNING;
            }
            else if (this.lastRate == key) {
                this.resetSpeed();
            }
        };
        Player.prototype.resetSpeed = function () {
            if (this.isJumping)
                return;
            this.playerSpeed = 0;
            this.anim[PlayerStates.RUNNING].stop();
            this.anim[PlayerStates.IDLE].play();
            this.currentState = PlayerStates.IDLE;
        };
        Player.prototype.increaseSpeed = function (game) {
            if (this.lastSpeed == null) {
                this.lastSpeed = 0;
            }
            else {
                var speed = this.game.time.time - this.lastSpeed;
                this.lastSpeed = this.game.time.time;
                if (speed < 99 && speed >= 50) {
                    this.playerSpeed = 5;
                }
                else if (speed < 149 && speed >= 100) {
                    this.playerSpeed = 4;
                }
                else if (speed < 199 && speed >= 150) {
                    this.playerSpeed = 3;
                }
                else if (speed < 249 && speed >= 200) {
                    this.playerSpeed = 2;
                }
                else if (speed < 299 && speed >= 250) {
                    this.playerSpeed = 1;
                }
                else if (speed >= 300) {
                    this.playerSpeed = 0;
                }
                else {
                    this.playerSpeed = 0;
                }
                this.checkIdle(game);
            }
        };
        Player.prototype.checkSpeed = function () {
            if (this.playerSpeed == 0 && !this.isJumping) {
                this.body.velocity.x = -240;
            }
            else if (this.playerSpeed == 1) {
                this.body.velocity.x = +0;
            }
            else if (this.playerSpeed == 2) {
                this.body.velocity.x = +30;
            }
            else if (this.playerSpeed == 3) {
                this.body.velocity.x = +60;
            }
            else if (this.playerSpeed == 4) {
                this.body.velocity.x = +90;
            }
            else if (this.playerSpeed == 5) {
                this.body.velocity.x = +120;
            }
        };
        Player.prototype.checkIdle = function (game) {
            if (this.timer != undefined)
                this.timer.destroy();
            this.timer = this.game.time.create(false);
            this.timer.add(150, this.resetSpeed, this);
            this.timer.start();
        };
        return Player;
    }(Phaser.Sprite));
    k2016Game.Player = Player;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var PlayerWing = (function (_super) {
        __extends(PlayerWing, _super);
        function PlayerWing(game, gameState) {
            _super.call(this, game, 50, game.world.centerY, "delucaFly");
            this.onGround = false;
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
        }
        PlayerWing.prototype.update = function () {
            if (this.angle < 40 && this.alive) {
                this.angle += 0.5;
            }
            if (!this.alive) {
                this.body.velocity.x = 0;
            }
        };
        PlayerWing.prototype.flap = function () {
            if (!this.stopFlap) {
                if (!!this.alive) {
                    k2016Game.setSoundVolume(k2016Game.gameSound.engine, .4);
                    k2016Game.getSound(k2016Game.gameSound.engine);
                    this.body.velocity.y = -200;
                    this.game.add.tween(this).to({ angle: -40 }, 100).start();
                    this.game.add.tween(k2016Game.getSound(k2016Game.gameSound.engine)).to({ volume: .1 }, 500).start();
                }
            }
            if (this.ableToFire) {
                if (this.gameState.torpedo > 0 && this.gameState.core.alive) {
                    this.disableFire();
                    this.game.time.events.add(1000, this.enableFire, this);
                    this.gameState.playerGroup.add(new k2016Game.Torpedo(this.game, this.gameState, this.x, this.y));
                    this.gameState.playerGroup.bringToTop(this);
                }
            }
        };
        ;
        PlayerWing.prototype.yeahh = function () {
            if (!this.yeahhState && this.alive) {
                this.yeahhState = true;
                k2016Game.playSound(k2016Game.gameSound.yeahh);
                this.gameState.tweenScore(750);
                var score = "750";
                var _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
                var scoreText = this.game.add.text(this.gameState.player.x, this.gameState.player.y, score, _style);
                scoreText.alpha = 1;
                scoreText.font = 'Press Start 2P';
                scoreText.anchor.set(.5);
                var scoreTween = this.game.add.tween(scoreText).to({ alpha: 0, y: this.gameState.player.y - 100 }, 500, Phaser.Easing.Quadratic.In, true, 0);
                scoreTween.onComplete.add(function () {
                    this.destroy();
                }, scoreText);
                this.game.time.events.add(1000, this.resetYeahh, this);
            }
        };
        PlayerWing.prototype.resetYeahh = function () { this.yeahhState = false; };
        PlayerWing.prototype.disableFlap = function () {
            this.stopFlap = true;
        };
        PlayerWing.prototype.enableFire = function () {
            this.ableToFire = true;
        };
        PlayerWing.prototype.disableFire = function () {
            this.ableToFire = false;
        };
        PlayerWing.prototype.onKilled = function () {
            this.gameState.playerKilled();
        };
        ;
        return PlayerWing;
    }(Phaser.Sprite));
    k2016Game.PlayerWing = PlayerWing;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Tie = (function (_super) {
        __extends(Tie, _super);
        function Tie(game, type) {
            _super.call(this, game, 1100, 0, "tie");
            this.game = game;
            this.type = type;
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.setValues();
            game.add.existing(this);
        }
        Tie.prototype.setValues = function () {
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
        };
        Tie.prototype.update = function () {
            this.x -= this.vel;
            if (this.x < -150) {
                this.x = 1100;
                this.setValues();
            }
        };
        return Tie;
    }(Phaser.Sprite));
    k2016Game.Tie = Tie;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var TieAttack = (function (_super) {
        __extends(TieAttack, _super);
        function TieAttack(game, gameState, y) {
            _super.call(this, game, game.camera.x + 1024 + 1536, 0, "tie");
            this.game = game;
            this.gameState = gameState;
            this.name = "tie";
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.shoots = 2;
            this.audioStarted = false;
            this.scale.set(2);
            this.anchor.set(.5);
            game.add.existing(this);
            var _y = this.game.rnd.integerInRange(100, 500);
            this.y = _y;
            if (y != null)
                this.y = y;
            var alert = this.game.add.sprite(0, this.y, this.game.cache.getBitmapData("tieAlert"));
            alert.fixedToCamera = true;
            alert.alpha = 0.25;
            alert.anchor.set(0, .5);
            var tweenAlert = this.game.add.tween(alert).to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.In, true, 0);
            tweenAlert.onComplete.add(function () { this.destroy(); }, alert);
            game.time.events.add(400, this.shot, this);
            game.time.events.add(600, this.shot, this);
            game.time.events.add(800, this.shot, this);
        }
        TieAttack.prototype.shot = function () {
            this.gameState.enemyGroup.add(new k2016Game.TieLaser(this.game, 100, this.y + (20 * this.shoots)));
            this.shoots--;
        };
        TieAttack.prototype.update = function () {
            this.x -= 20;
            if (this.x < (this.game.camera.x + 1024) && !this.audioStarted) {
                this.audioStarted = true;
                k2016Game.playSound(k2016Game.gameSound.tiefly);
            }
            if (this.x < this.game.camera.x - 100) {
                this.removeEnemy();
            }
        };
        TieAttack.prototype.removeEnemy = function () {
            this.kill();
            this.destroy();
        };
        return TieAttack;
    }(Phaser.Sprite));
    k2016Game.TieAttack = TieAttack;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var TieLaser = (function (_super) {
        __extends(TieLaser, _super);
        function TieLaser(game, x, y) {
            _super.call(this, game, game.camera.x + 1024 + x, y, "tieShot");
            this.game = game;
            this.name = "tieShot";
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(.5);
            this.anchor.set(.5);
            game.add.existing(this);
            k2016Game.playSound(k2016Game.gameSound.tieShot);
        }
        TieLaser.prototype.update = function () {
            this.x -= 25;
            if (this.x < this.game.camera.x - 100) {
                this.removeEnemy();
            }
        };
        TieLaser.prototype.removeEnemy = function () {
            this.kill();
            this.destroy();
        };
        return TieLaser;
    }(Phaser.Sprite));
    k2016Game.TieLaser = TieLaser;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Torpedo = (function (_super) {
        __extends(Torpedo, _super);
        function Torpedo(game, gameState, x, y) {
            _super.call(this, game, x + 50, y + 15, "wingShot");
            this.game = game;
            this.gameState = gameState;
            this.game.physics.arcade.enable(this);
            this.body.immovable = false;
            this.body.allowGravity = false;
            this.scale.set(.5);
            this.anchor.set(.5);
            game.add.existing(this);
            k2016Game.playSound(k2016Game.gameSound.tieShot);
        }
        Torpedo.prototype.update = function () {
            this.x += 25;
            this.game.physics.arcade.overlap(this, this.gameState.core, this.collisionHandler, null, this);
            if (this.alive && this.x > this.game.camera.x + 1024 + 100) {
                this.removeEnemy();
            }
        };
        Torpedo.prototype.collisionHandler = function () {
            this.gameState.enemyGroup.add(new k2016Game.Explosion(this.game, this.gameState, this.x, this.y, "exp3", "bomb"));
            this.gameState.core.kill();
            this.gameState.win();
            this.removeEnemy();
        };
        Torpedo.prototype.removeEnemy = function () {
            this.gameState.torpedo--;
            this.gameState.removeTorpedo();
            if (this.gameState.torpedo == 0 && this.gameState.core.alive) {
                this.gameState.player.disableFire();
                this.gameState.TieAttackFinal();
            }
            this.kill();
            this.destroy();
        };
        return Torpedo;
    }(Phaser.Sprite));
    k2016Game.Torpedo = Torpedo;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Trash = (function (_super) {
        __extends(Trash, _super);
        function Trash(game, _trash, _x, _y, _type, _fixed) {
            _super.call(this, game, _x, _y, "trash" + _trash);
            this.game = game;
            this.type = _type;
            this.anchor.set(.5);
            this.fixedToCamera = _fixed;
            this.animations.add('rotation', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 12, true);
            this.animations.play("rotation");
            this.setValues();
            game.add.existing(this);
        }
        Trash.prototype.setValues = function () {
            this._vel = this.game.rnd.realInRange(2, 4);
            this.y = this.game.rnd.integerInRange(50, 550);
            this.scale.set(this.game.rnd.realInRange(.4, .6));
        };
        Trash.prototype.update = function () {
            //return;
            this.x -= this._vel;
            if (!k2016Game.isMobile()) {
                this.angle += .5;
            }
            if (this.x < this.game.camera.x - 100) {
                this.x = this.game.camera.x + 1024 + 100;
                this.setValues();
            }
        };
        return Trash;
    }(Phaser.Sprite));
    k2016Game.Trash = Trash;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var Gamewin = (function (_super) {
        __extends(Gamewin, _super);
        function Gamewin() {
            _super.call(this);
        }
        Gamewin.prototype.create = function () {
            this.game.world.setBounds(0, 0, 1024, 600);
            this.game.world.x = 0;
            var bg = this.game.add.image(0, 0, "gameoverBg");
            var _style = { font: 'normal 50px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            var _gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 97, 'YOU WIN!', _style);
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
                k2016Game.stopSound(k2016Game.gameSound.gameover);
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
                k2016Game.stopSound(k2016Game.gameSound.gameover);
                k2016Game.goState("Menu", this.game);
            }, this);
            k2016Game.playSound(k2016Game.gameSound.gameover);
            _style = { font: 'normal 25px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _text = 'You score is ' + k2016Game.getScore() + ' points!';
            var _gameOverSpeech = this.game.add.text(210, 390, _text, _style);
            _gameOverSpeech.font = 'Press Start 2P';
            var _anonymous = k2016Game.getUrlParameter("anonymous") ? true : false;
            if (!_anonymous) {
                anonymous();
            }
        };
        Gamewin.prototype.update = function () {
        };
        return Gamewin;
    }(Phaser.State));
    k2016Game.Gamewin = Gamewin;
})(k2016Game || (k2016Game = {}));
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
var k2016Game;
(function (k2016Game) {
    var GameWing = (function (_super) {
        __extends(GameWing, _super);
        function GameWing() {
            _super.call(this);
            this.realScore = 0;
            this.isStarted = false;
        }
        GameWing.prototype.preload = function () { };
        GameWing.prototype.create = function () {
            this.debugFps = k2016Game.getUrlParameter("fps") ? true : false;
            this.debugRender = k2016Game.getUrlParameter("render") ? true : false;
            this.debugCheat = k2016Game.getUrlParameter("cheat") ? true : false;
            this.debugCollide = k2016Game.getUrlParameter("collide") ? true : false;
            this.debugObstacles = k2016Game.getUrlParameter("obstacle") ? true : false;
            if (this.debugFps) {
                this.game.time.advancedTiming = true;
            }
            this.cheat = this.debugCheat;
            this.playerStart = null; //number value or null
            this.torpedo = 0;
            this.paths = [
                { pathid: 0, start: 5000, distance: 200, index: 0, max: 24 },
                { pathid: 1, start: 20000, distance: 200, index: 24, max: 49 },
                { pathid: 2, start: 35000, distance: 200, index: 49, max: 74 }
            ];
            k2016Game.setScore(0);
            this.realScore = 0;
            this.story = k2016Game.getLevelData();
            this.bonusIsActive = false;
            this.bombIsActive = false;
            this.tieIsActive = false;
            this.back1 = 0;
            this.back2 = 0;
            this.back3 = 0;
            this.game.physics.arcade.gravity.y = 400;
            this.game.world.setBounds(0, 0, 52000, 600);
            this.game.camera.x = 0;
            this.randomBonusSpawnTime = this.game.time.now;
            this.bonusSpawn = 100;
            this.randomEnemySpawnTime = this.game.time.now;
            this.bombSpawn = 100;
            this.randomTieSpawnTime = this.game.time.now;
            this.tieSpawn = 150;
            this.backgroundGroup = this.game.add.group();
            this.trashGroup = this.game.add.group();
            this.enemyGroup = this.game.add.group();
            this.obstacleGroup = this.game.add.group();
            this.bonusGroup = this.game.add.group();
            this.playerGroup = this.game.add.group();
            this.trashGroupFront = this.game.add.group();
            this.backgroundGroupFront = this.game.add.group();
            this.colliderGroup = this.game.add.group();
            this.torpedoGroup = this.game.add.group();
            this.tunnel = this.game.add.tileSprite(-100, 0, 1237, 600, 'tunnel');
            this.tunnel.fixedToCamera = true;
            this.backgroundGroup.add(this.tunnel);
            this.layer2 = this.game.add.tileSprite(0, 0, 1024, 600, 'layer2');
            this.layer2.fixedToCamera = true;
            this.backgroundGroup.add(this.layer2);
            this.player = new k2016Game.PlayerWing(this.game, this);
            this.player.play("idle");
            this.idleTween = this.game.add.tween(this.player).to({ y: this.player.y - 50 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
            this.playerGroup.add(this.player);
            this.game.camera.follow(this.player);
            this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 600);
            this.layer1 = this.game.add.tileSprite(0, -50, 1024, 700, 'layer1');
            this.layer1.fixedToCamera = true;
            this.backgroundGroupFront.add(this.layer1);
            if (k2016Game.isMobile()) {
                this.game.input.onDown.addOnce(this.startGame, this);
                this.game.input.onDown.add(this.player.flap, this.player);
            }
            else {
                this.flapKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                this.flapKey.onDown.addOnce(this.startGame, this);
                this.flapKey.onDown.add(this.player.flap, this.player);
                this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            }
            var _style = { font: 'normal 40px', fill: '#ffffff', stroke: '#1d5779', strokeThickness: 10 };
            this.readyText = this.game.add.text(512, this.game.world.centerY, 'TAP/SPACE WHEN READY!', _style);
            this.readyText.font = 'Press Start 2P';
            this.readyText.anchor.set(.5);
            this.readyText.fixedToCamera = true;
            _style = { font: 'normal 30px', fill: '#ffffff', stroke: '#aaaaaa', strokeThickness: 5 };
            this.score = this.game.add.text(990, 20, '0', _style);
            this.score.font = 'Press Start 2P';
            this.score.anchor.set(1, 0);
            this.score.fixedToCamera = true;
            this.colliderTop = this.game.add.sprite(0, -20, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderTop);
            this.colliderTop.name = "colliderTop";
            this.colliderTop.body.immovable = true;
            this.colliderTop.fixedToCamera = true;
            this.colliderTop.visible = false;
            this.colliderTop.body.allowGravity = false;
            this.colliderGroup.add(this.colliderTop);
            this.colliderBottom = this.game.add.sprite(0, 580, this.game.cache.getBitmapData('collider'));
            this.game.physics.arcade.enable(this.colliderBottom);
            this.colliderBottom.name = "colliderBottom";
            this.colliderBottom.body.immovable = true;
            this.colliderBottom.fixedToCamera = true;
            this.colliderBottom.visible = false;
            this.colliderBottom.body.allowGravity = false;
            this.colliderGroup.add(this.colliderBottom);
            // less trash for mobile
            if (!k2016Game.isMobile()) {
                this.trashGroup.add(new k2016Game.Trash(this.game, 1, 100, 200, 3, false));
                this.trashGroup.add(new k2016Game.Trash(this.game, 2, 400, 200, 3, false));
                this.trashGroup.add(new k2016Game.Trash(this.game, 3, 300, 200, 3, false));
                this.trashGroup.add(new k2016Game.Trash(this.game, 4, 200, 200, 3, false));
                this.trashGroup.add(new k2016Game.Trash(this.game, 5, 500, 200, 3, false));
                this.trashGroup.add(new k2016Game.Trash(this.game, 6, 800, 200, 3, false));
                this.trashGroupFront.add(new k2016Game.Trash(this.game, 7, 900, 200, 3, false));
                this.trashGroupFront.add(new k2016Game.Trash(this.game, 8, 450, 200, 3, false));
                this.trashGroupFront.add(new k2016Game.Trash(this.game, 9, 330, 200, 3, false));
                this.trashGroupFront.add(new k2016Game.Trash(this.game, 10, 210, 200, 3, false));
                this.trashGroupFront.add(new k2016Game.Trash(this.game, 11, 100, 200, 3, false));
                this.trashGroupFront.add(new k2016Game.Trash(this.game, 12, 700, 200, 3, false));
            }
            this.setupPath(0);
            k2016Game.playSound(k2016Game.gameSound.ingame);
            k2016Game.setSoundVolume(k2016Game.gameSound.engine, 0.5);
            k2016Game.playSound(k2016Game.gameSound.engine);
        };
        GameWing.prototype.win = function () {
            k2016Game.setScore(this.realScore);
            this.player.disableFire();
            this.game.camera.fade(0xffffff, 3000);
            this.game.camera.onFadeComplete.add(function () {
                k2016Game.stopSound(k2016Game.gameSound.ingame);
                k2016Game.stopSound(k2016Game.gameSound.engine);
                this.game.add.sprite(0, 0, this.game.cache.getBitmapData("layerWhite"));
                this.game.world.setBounds(0, 0, 1024, 600);
                this.game.time.events.add(50, function () { k2016Game.goState("Gamewin", this.game); }, this);
            }, this);
            this.camera.shake(0.015, 3000, true, Phaser.Camera.SHAKE_BOTH, true);
            this.tweenScroll(this, { back1: 0, back2: 0, back3: 0 }, { back1: 6.5, back2: 7.5, back3: 7 });
            var playerTween = this.game.add.tween(this.player).to({ x: this.player.x + 1024, angle: 0 }, 2000, Phaser.Easing.Quadratic.In, true, 0);
            this.player.play("fly");
            this.player.body.angle = 0;
            for (var i = 0; i < 20; i++) {
                this.game.time.events.add(100 * i + (this.game.rnd.integerInRange(0, 100)), function () {
                    this.enemyGroup.add(new k2016Game.Explosion(this.game, this, this.game.rnd.integerInRange(this.core.x - 150, this.core.x + 150), this.game.rnd.integerInRange(0, 600), "exp3", ""));
                }, this);
            }
        };
        GameWing.prototype.setupPath = function (index) {
            if (index > this.paths.length - 1) {
                return;
            }
            this.createObstacles(this.paths[index].pathid, this.paths[index].start, this.paths[index].distance, this.paths[index].index, this.paths[index].max);
        };
        GameWing.prototype.createObstacles = function (pathId, x, y, index, max) {
            var start = (y - 100);
            var end = (y + 100);
            if (start < 100) {
                start = 100;
                end = 200;
            }
            else if (end > 400) {
                start = 300;
                end = 400;
            }
            y = this.game.rnd.integerInRange(start, end);
            var _y = Math.ceil(((800) + y) - (index * k2016Game.getObstacleLevel()));
            this.obstacleGroup.add(new k2016Game.Obstacle(this.game, this, "top", x, y, index, max, pathId));
            this.obstacleGroup.add(new k2016Game.Obstacle(this.game, this, "bottom", x, _y, index, max, pathId));
        };
        GameWing.prototype.removeTorpedo = function () {
            var torp = this.torpedoGroup.getFirstAlive();
            if (torp) {
                torp.kill();
            }
        };
        GameWing.prototype.TieAttackFinal = function () {
            this.enemyGroup.add(new k2016Game.TieAttack(this.game, this, 150));
            this.enemyGroup.add(new k2016Game.TieAttack(this.game, this, 200));
            this.enemyGroup.add(new k2016Game.TieAttack(this.game, this, 250));
            this.enemyGroup.add(new k2016Game.TieAttack(this.game, this, 300));
            this.enemyGroup.add(new k2016Game.TieAttack(this.game, this, 350));
            this.enemyGroup.add(new k2016Game.TieAttack(this.game, this, 400));
            this.enemyGroup.add(new k2016Game.TieAttack(this.game, this, 450));
        };
        GameWing.prototype.startGame = function () {
            this.tweenScroll(this);
            this.player.body.allowGravity = true;
            this.player.play("fly");
            this.player.alive = true;
            this.player.flap();
            this.player.body.velocity.x = 100;
            if (this.playerStart != null)
                this.player.x = this.playerStart;
            this.idleTween.pause();
            this.isStarted = true;
            this.readyText.text = "GO!!!!";
            this.game.add.tween(this.readyText).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.In, true, 0);
        };
        GameWing.prototype.render = function () {
            if (this.debugRender) {
                this.game.debug.cameraInfo(this.game.camera, 32, 32);
                this.game.debug.bodyInfo(this.player, 32, 132);
            }
            if (this.debugFps) {
                this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
            }
        };
        GameWing.prototype.playerKilled = function () {
            k2016Game.stopSound(k2016Game.gameSound.engine);
            this.isStarted = false;
            this.tweenScroll(this, null, { back1: 0, back2: 0, back3: 0 });
            this.camera.flash(0xffffff, 200);
            this.camera.shake(0.015, 500, true, Phaser.Camera.SHAKE_BOTH, true);
            this.game.time.events.add(3000, this.gameOver, this);
        };
        GameWing.prototype.gameOver = function () {
            k2016Game.stopSound(k2016Game.gameSound.ingame);
            k2016Game.setScore(this.realScore);
            k2016Game.goState("Gameover", this.game);
        };
        GameWing.prototype.update = function () {
            this.scrollBackground();
            if (this.isStarted) {
                this.checkLevel();
                this.game.physics.arcade.overlap(this.bonusGroup, this.player, this.collisionHandlerBonus, null, this);
                this.game.physics.arcade.overlap(this.enemyGroup, this.player, this.collisionHandlerEnemy, null, this);
                this.game.physics.arcade.overlap(this.colliderGroup, this.player, this.collisionHandlerBounds, null, this);
                this.game.physics.arcade.overlap(this.obstacleGroup, this.player, this.collisionHandlerObstacles, null, this);
                this.spawnBonus();
                this.spawnEnemyBomb();
                this.spawnEnemyTie();
            }
        };
        GameWing.prototype.setVelocity = function (vel) {
            switch (vel) {
                case "accelerate":
                    this.tweenScroll(this, { back1: 2.5, back2: 3.5, back3: 3 }, { back1: 6.5, back2: 7.5, back3: 7 });
                    break;
                case "decelerate":
                    this.tweenScroll(this, { back1: 6.5, back2: 7.5, back3: 7 }, { back1: 2.5, back2: 3.5, back3: 3 });
                    break;
                case "decelerate2":
                    this.tweenScroll(this, { back1: 6.5, back2: 7.5, back3: 7 }, { back1: 3.2, back2: 4.3, back3: 3.7 });
                    break;
                case "decelerate3":
                    this.tweenScroll(this, { back1: 6.5, back2: 7.5, back3: 7 }, { back1: 3.9, back2: 5.2, back3: 4.6 });
                    break;
                case "decelerate4":
                    this.tweenScroll(this, { back1: 6.5, back2: 7.5, back3: 7 }, { back1: 0, back2: 0, back3: 0 }, 4000);
                    break;
                case "stop":
                    this.player.disableFlap();
                    this.player.body.allowGravity = false;
                    this.player.body.immovable = true;
                    this.player.body.velocity.x = 0;
                    this.player.body.velocity.y = 0;
                    var playerTween = this.game.add.tween(this.player).to({ y: 150, angle: 0 }, 1000, Phaser.Easing.Quadratic.In, true, 0);
                    this.player.play("idle");
                    playerTween.onComplete.add(function () {
                        this.game.add.tween(this.player).to({ y: this.player.y + 300, angle: 0 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                        this.setMessage("USE THE FORCE...");
                        this.setSound("useTheForce");
                        this.game.time.events.add(3000, this.shot, this);
                    }, this);
                    break;
            }
        };
        GameWing.prototype.shot = function () {
            this.setMessage("TAP TO FIRE!!");
            this.player.enableFire();
        };
        GameWing.prototype.setMessage = function (_mess) {
            this.readyText.alpha = 0;
            this.readyText.text = _mess;
            this.readyText.setStyle({ font: 'normal 30px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 8 });
            this.readyText.font = 'Press Start 2P';
            var tween = this.game.add.tween(this.readyText).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.In, true, 0);
            tween.onComplete.add(function () {
                this.game.add.tween(this.readyText).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.In, true, 2000);
            }, this);
        };
        GameWing.prototype.setAction = function (_action) {
            switch (_action) {
                case "createCore":
                    this.reactor = this.game.add.sprite(48800, 0, "reactor");
                    this.reactor.animations.add('light', [0, 1], 12, true).play();
                    this.core = this.game.add.sprite(48950, this.game.world.centerY - 10, "kyber");
                    this.game.add.tween(this.core).to({ y: this.core.y + 20 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                    this.core.anchor.set(0.5);
                    this.game.physics.arcade.enableBody(this.core);
                    this.core.body.allowGravity = false;
                    this.core.body.collideWorldBounds = true;
                    this.enemyGroup.add(this.reactor);
                    this.enemyGroup.add(this.core);
                    break;
            }
        };
        GameWing.prototype.setSound = function (_sound) {
            //console.log(_sound);
            switch (_sound) {
                case "attackSequence":
                    k2016Game.playSound(k2016Game.gameSound.attacksequence);
                    break;
                case "stayFocused":
                    k2016Game.playSound(k2016Game.gameSound.stayfocused);
                    break;
                case "watchEnemy":
                    k2016Game.playSound(k2016Game.gameSound.watchenemy);
                    break;
                case "TheForce":
                    k2016Game.playSound(k2016Game.gameSound.theforce);
                    break;
                case "stayOnTarget":
                    k2016Game.playSound(k2016Game.gameSound.stayontarget);
                    break;
                case "useTheForce":
                    k2016Game.playSound(k2016Game.gameSound.usetheforce);
                    break;
            }
        };
        GameWing.prototype.setLevel = function (_obj) {
            if (_obj.pVel != undefined && _obj.pVel != null)
                this.player.body.velocity.x = _obj.pVel;
            if (_obj.vel != undefined && _obj.vel != null)
                this.setVelocity(_obj.vel);
            if (_obj.message != undefined && _obj.message != null)
                this.setMessage(_obj.message);
            if (_obj.sound != undefined && _obj.sound != null)
                this.setSound(_obj.sound);
            if (_obj.bonus != undefined && _obj.bonus != null)
                this.bonusIsActive = _obj.bonus;
            if (_obj.bonusSpawn != undefined && _obj.bonusSpawn != null)
                this.bonusSpawn = _obj.bonusSpawn;
            if (_obj.bomb != undefined && _obj.bomb != null)
                this.bombIsActive = _obj.bomb;
            if (_obj.bombSpawn != undefined && _obj.bombSpawn != null)
                this.bombSpawn = _obj.bombSpawn;
            if (_obj.action != undefined && _obj.action != null)
                this.setAction(_obj.action);
            if (_obj.tie != undefined && _obj.tie != null)
                this.tieIsActive = _obj.tie;
            if (_obj.tieSpawn != undefined && _obj.tieSpawn != null)
                this.tieSpawn = _obj.tieSpawn;
        };
        GameWing.prototype.checkLevel = function () {
            var camX = this.game.camera.x;
            var _obj;
            for (var l = 0; l < this.story.length; l++) {
                _obj = this.story[l];
                if (camX >= _obj.startX && camX <= _obj.endX) {
                    if (!_obj.started) {
                        _obj.started = true;
                        this.setLevel(_obj.level);
                    }
                }
            }
        };
        GameWing.prototype.collisionHandlerBounds = function (_player, _bound) {
            if (!this.debugCollide) {
                _player.kill();
                if (_bound.name == "colliderBottom") {
                    this.playerGroup.add(new k2016Game.Explosion(this.game, this, _player.x, _player.y, "exp3", "playerBoundBottom"));
                }
                else {
                    this.playerGroup.add(new k2016Game.Explosion(this.game, this, _player.x, _player.y, "exp3", "playerBoundTop"));
                }
            }
        };
        GameWing.prototype.collisionHandlerObstacles = function (_player, _enemy) {
            if (!this.debugObstacles) {
                _player.kill();
                this.playerGroup.add(new k2016Game.Explosion(this.game, this, _player.x, _player.y, "exp3", "playerObstacle"));
            }
        };
        GameWing.prototype.collisionHandlerBonus = function (_player, _bonus) {
            _bonus.removeBonus(true);
        };
        GameWing.prototype.collisionHandlerEnemy = function (_player, _enemy) {
            if (!this.cheat) {
                _player.kill();
                this.playerGroup.add(new k2016Game.Explosion(this.game, this, _player.x, _player.y, "exp3", "player"));
            }
            _enemy.removeEnemy();
            if (_enemy.name == "bomb" || _enemy.name == "tie") {
                this.playerGroup.add(new k2016Game.Explosion(this.game, this, _enemy.x, _enemy.y, "exp3", _enemy.name));
            }
        };
        GameWing.prototype.spawnBonus = function () {
            if (!this.bonusIsActive)
                return;
            if (this.randomBonusSpawnTime < this.game.time.now) {
                this.randomBonusSpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * this.bonusSpawn);
                /*
                            var bonus = this.bonusGroup.getFirstDead(true);

console.log(bonus)
if (bonus)
{
    bonus.revive();
    console.log("revive");
}
else{
console.log("new bonus");
       

}*/
                this.bonusGroup.add(new k2016Game.Bonus(this.game, this));
            }
        };
        GameWing.prototype.spawnEnemyBomb = function () {
            if (!this.bombIsActive)
                return;
            if (this.randomEnemySpawnTime < this.game.time.now) {
                this.randomEnemySpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * this.bombSpawn);
                this.enemyGroup.add(new k2016Game.Bomb(this.game, this));
            }
        };
        GameWing.prototype.spawnEnemyTie = function () {
            if (!this.tieIsActive)
                return;
            if (this.randomTieSpawnTime < this.game.time.now) {
                this.randomTieSpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * this.tieSpawn);
                this.enemyGroup.add(new k2016Game.TieAttack(this.game, this));
            }
        };
        GameWing.prototype.scrollBackground = function () {
            this.tunnel.tilePosition.x -= this.back1;
            this.layer1.tilePosition.x -= this.back2;
            this.layer2.tilePosition.x -= this.back3;
        };
        GameWing.prototype.tweenScore = function (end) {
            var obj = this.score;
            var scoreValue = { score: 0, end: end, start: this.realScore };
            this.realScore = this.realScore + end;
            this.checkTorpedo();
            var scoreTween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);
            scoreTween.onUpdateCallback(function () { obj.text = (scoreValue.start + Math.round(scoreValue.score)) + ""; });
            scoreTween.onComplete.add(function () { obj.text = "" + (scoreValue.start + scoreValue.end); }, this);
            scoreTween.start();
        };
        ;
        GameWing.prototype.checkTorpedo = function () {
            var tor = Math.floor(this.realScore / 5000);
            if (tor > 0 && tor > this.torpedo) {
                this.torpedo++;
                var _torpedo = this.game.add.sprite(1024 - (this.torpedo * 30), 530, "torpedo");
                _torpedo.anchor.set(.5, 0);
                _torpedo.scale.set(.75);
                _torpedo.fixedToCamera = true;
                this.torpedoGroup.add(_torpedo);
            }
        };
        GameWing.prototype.tweenScroll = function (_state, _start, _end, _time) {
            var backValue = { back1: 0, back2: 0, back3: 0 };
            if (_start != null)
                backValue = _start;
            var backEnd = { back1: 6.5, back2: 7.5, back3: 7 };
            if (_end != null)
                backEnd = _end;
            var backTween = this.game.add.tween(backValue).to(backEnd, _time, Phaser.Easing.Quadratic.Out);
            backTween.onUpdateCallback(function () {
                _state.back1 = backValue.back1;
                _state.back2 = backValue.back2;
                _state.back3 = backValue.back3;
            });
            backTween.start();
        };
        return GameWing;
    }(Phaser.State));
    k2016Game.GameWing = GameWing;
})(k2016Game || (k2016Game = {}));
