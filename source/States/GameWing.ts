
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game {
        export class GameWing extends Phaser.State {


                private tunnel: Phaser.TileSprite;
                private layer1: Phaser.TileSprite;
                private layer2: Phaser.TileSprite;
                private back1: number;
                private back2: number;
                private back3: number;
                public player: PlayerWing;
                public torpedo: number;
                private flapKey: any;
                private readyText: Phaser.Text;
                private idleTween: Phaser.Tween;

                private torpedoGroup: Phaser.Group;

                private colliderTop: Phaser.Sprite;
                private colliderBottom: Phaser.Sprite;

                public core: Phaser.Sprite;

                private score: Phaser.Text;
                private realScore: number = 0;

                private backgroundGroup: Phaser.Group;
                private backgroundGroupFront: Phaser.Group;

                private trashGroup: Phaser.Group;
                private trashGroupFront: Phaser.Group;

                private colliderGroup: Phaser.Group;
                private obstacleGroup: Phaser.Group;
                public playerGroup: Phaser.Group;

                public bonusGroup: Phaser.Group;
                public enemyGroup: Phaser.Group;

                private bonusIsActive: boolean;
                private bombIsActive: boolean;
                private tieIsActive: boolean;

                private randomBonusSpawnTime: number;
                private randomEnemySpawnTime: number;
                private randomTieSpawnTime: number;
                private bonusSpawn: number;
                private bombSpawn: number;
                private tieSpawn: number;

                private isStarted = false;

                private audioEffect: Phaser.Sound;


                private gameTimer: Phaser.Timer;

                private story: any;

                private cheat: boolean;

                private playerStart: number;

                private reactor: Phaser.Sprite;

                constructor() {

                        super();

                }

                preload() { }

                create() {

                       // this.game.time.advancedTiming = true;
                        this.cheat = false;
                        this.playerStart = null; //number value or null
                        this.torpedo = 0;

                        setScore(0);

                        this.realScore = 0;
                        this.story = getLevelData();

                        // console.log(this.story);

                        this.bonusIsActive = false;
                        this.bombIsActive = false;
                        this.tieIsActive = false;


                        this.back1 = 0;
                        this.back2 = 0;
                        this.back3 = 0;


                        this.game.physics.arcade.gravity.y = 400;
                        this.game.world.setBounds(0, 0, 52000, 600);
                        this.game.camera.x = 0;
                        //this.game.world.x=0;  

                        this.randomBonusSpawnTime = this.game.time.now;
                        this.bonusSpawn = 100;
                        this.randomEnemySpawnTime = this.game.time.now;
                        this.bombSpawn = 100;
                        this.randomTieSpawnTime = this.game.time.now;
                        this.tieSpawn = 150;

                        this.backgroundGroup = this.game.add.group()
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

                        this.player = new PlayerWing(this.game, this);
                        this.player.play("idle");
                        this.idleTween = this.game.add.tween(this.player).to({ y: this.player.y - 50 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                        this.playerGroup.add(this.player);

                        this.game.camera.follow(this.player);
                        this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 100, 600);

                        this.layer1 = this.game.add.tileSprite(0, -50, 1024, 700, 'layer1');
                        this.layer1.fixedToCamera = true;
                        this.backgroundGroupFront.add(this.layer1);

                        if (isMobile(this.game)) {
                                this.game.input.onDown.addOnce(this.startGame, this);
                                this.game.input.onDown.add(this.player.flap, this.player);

                        } else {

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


                        this.trashGroup.add(new Trash(this.game, 1, 100, 200, 3, false));
                        this.trashGroup.add(new Trash(this.game, 2, 400, 200, 3, false));
                        this.trashGroup.add(new Trash(this.game, 3, 300, 200, 3, false));
                        if (!isMobile(this.game)) {// less trash for mobile
                                this.trashGroup.add(new Trash(this.game, 4, 200, 200, 3, false));
                                this.trashGroup.add(new Trash(this.game, 5, 500, 200, 3, false));
                                this.trashGroup.add(new Trash(this.game, 6, 800, 200, 3, false));

                                this.trashGroupFront.add(new Trash(this.game, 7, 900, 200, 3, false));
                                this.trashGroupFront.add(new Trash(this.game, 8, 450, 200, 3, false));
                                this.trashGroupFront.add(new Trash(this.game, 9, 330, 200, 3, false));
                        }
                        this.trashGroupFront.add(new Trash(this.game, 10, 210, 200, 3, false));
                        this.trashGroupFront.add(new Trash(this.game, 11, 100, 200, 3, false));
                        this.trashGroupFront.add(new Trash(this.game, 12, 700, 200, 3, false));

                        this.setupPath();

                        playSound(gameSound.ingame);
                        playSound(gameSound.engine);



                }

                win() {

                        setScore(this.realScore);

                        this.player.disableFire();
                        this.game.camera.fade(0xffffff, 3000);
                        this.game.camera.onFadeComplete.add(function () {

                                stopSound(gameSound.ingame);
                                stopSound(gameSound.engine);



                                this.game.add.sprite(0, 0, this.game.cache.getBitmapData("layerWhite"));
                                this.game.world.setBounds(0, 0, 1024, 600);
                                this.game.time.events.add(50, function () { goState("Gamewin", this.game); }, this);


                        }, this)
                        this.camera.shake(0.015, 3000, true, Phaser.Camera.SHAKE_BOTH, true);
                        this.tweenScroll(this, { back1: 0, back2: 0, back3: 0 }, { back1: 6.5, back2: 7.5, back3: 7 });
                        var playerTween: Phaser.Tween = this.game.add.tween(this.player).to({ x: this.player.x + 1024, angle: 0 }, 2000, Phaser.Easing.Quadratic.In, true, 0);
                        this.player.play("fly");
                        this.player.body.angle = 0;

                        for (var i = 0; i < 20; i++) {

                                this.game.time.events.add(100 * i + (this.game.rnd.integerInRange(0, 100)),
                                        function () {

                                                this.enemyGroup.add(new Explosion(this.game, this, this.game.rnd.integerInRange(this.core.x - 150, this.core.x + 150), this.game.rnd.integerInRange(0, 600), "exp3", ""));


                                        }, this);


                        }


                }




                setupPath() {


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


                        var lastY: number = 200;
                        var start: number;
                        var end: number;
                        var _x: number;
                        var _y: number;
                        var _obstacleLvl: number = getObstacleLevel();
                        for (var o = 0; o <= 75; o++) {

                                _x = this.setTopX(o);

                                //_y= 800 + lastY;
                                _y = Math.ceil((800 - (o * _obstacleLvl)) + lastY);
                                // _y= 600 + (200 - (o * _obstacleLvl)) + lastY;

                                //console.log(o, Math.ceil((_y-lastY)-600));

                                this.obstacleGroup.add(new Obstacle(this.game, this, "top", _x, lastY));
                                this.obstacleGroup.add(new Obstacle(this.game, this, "bottom", _x, _y));

                                start = (lastY - 100);
                                end = (lastY + 100);

                                if (start < 100) { start = 100; end = 200; }
                                else if (end > 400) { start = 300; end = 400; }

                                lastY = this.game.rnd.integerInRange(start, end)


                        }

                }

                setTopX(index: number): number {
                        var obstaclesX: number;
                        var plus = 0;
                        if (index >= 26 && index <= 50) { plus = 15000; index = index % 26; }
                        if (index >= 51) { plus = 30000; index = index % 51; }


                        obstaclesX = 5000 + plus + (400 * index);
                        return obstaclesX

                }



                removeTorpedo() {


                        var torp: Torpedo = this.torpedoGroup.getFirstAlive();

                        if (torp) {
                                torp.kill();
                        }



                }


                TieAttackFinal() {

                        this.enemyGroup.add(new TieAttack(this.game, this, 150));
                        this.enemyGroup.add(new TieAttack(this.game, this, 200));
                        this.enemyGroup.add(new TieAttack(this.game, this, 250));
                        this.enemyGroup.add(new TieAttack(this.game, this, 300));
                        this.enemyGroup.add(new TieAttack(this.game, this, 350));
                        this.enemyGroup.add(new TieAttack(this.game, this, 400));
                        this.enemyGroup.add(new TieAttack(this.game, this, 450));

                }






                startGame() {


                        // this.engineLoop.play();

                        this.tweenScroll(this);
                        this.player.body.allowGravity = true;

                        this.player.play("fly");
                        this.player.alive = true;
                        this.player.flap();
                        this.player.body.velocity.x = 100;

                        if (this.playerStart != null) this.player.x = this.playerStart;

                        this.idleTween.pause();
                        this.isStarted = true;
                        this.readyText.text = "GO!!!!";
                        this.game.add.tween(this.readyText).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.In, true, 0);

                }

                render() {

                        if (this.cheat) {
                                this.game.debug.cameraInfo(this.game.camera, 32, 32);
                                this.game.debug.bodyInfo(this.player, 32, 132);
                                this.game.debug.body(this.core);
                               // this.game.debug.text(this.game.time.fps + "", 2, 14, "#00ff00");
                        }




                }


                playerKilled() {

                        stopSound(gameSound.engine);
                        this.isStarted = false;
                        this.tweenScroll(this, null, { back1: 0, back2: 0, back3: 0 });
                        this.camera.flash(0xffffff, 200);
                        this.camera.shake(0.015, 500, true, Phaser.Camera.SHAKE_BOTH, true);
                        this.game.time.events.add(3000, this.gameOver, this);

                }



                gameOver() {

                        stopSound(gameSound.ingame);
                        setScore(this.realScore);
                        goState("Gameover", this.game);



                }



                update() {


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


                }



                setVelocity(vel: string): void {

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

                                        var playerTween: Phaser.Tween = this.game.add.tween(this.player).to({ y: 150, angle: 0 }, 1000, Phaser.Easing.Quadratic.In, true, 0);
                                        this.player.play("idle");
                                        playerTween.onComplete.add(function () {

                                                this.game.add.tween(this.player).to({ y: this.player.y + 300, angle: 0 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
                                                this.setMessage("USE THE FORCE...");
                                                this.setSound("useTheForce");
                                                this.game.time.events.add(3000, this.shot, this);
                                        }, this);






                                        break;

                        }



                }


                shot() {

                        this.setMessage("TAP TO FIRE!!");
                        this.player.enableFire();

                }



                setMessage(_mess: string): void {


                        this.readyText.alpha = 0;
                        this.readyText.text = _mess;
                        this.readyText.setStyle({ font: 'normal 30px', fill: '#ff0000', stroke: '#ffffff', strokeThickness: 8 });
                        this.readyText.font = 'Press Start 2P';
                        var tween = this.game.add.tween(this.readyText).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.In, true, 0);
                        tween.onComplete.add(function () {

                                this.game.add.tween(this.readyText).to({ alpha: 0 }, 500, Phaser.Easing.Quadratic.In, true, 2000);


                        }, this)



                }

                setSound(_sound: string): void {

                        //console.log(_sound);

                        switch (_sound) {

                                case "attackSequence":
                                        playSound(gameSound.attacksequence);
                                        break;

                                case "stayFocused":
                                        playSound(gameSound.stayfocused);
                                        break;

                                case "watchEnemy":
                                        playSound(gameSound.watchenemy);
                                        break;

                                case "TheForce":
                                        playSound(gameSound.theforce);
                                        break;

                                case "stayOnTarget":
                                        playSound(gameSound.stayontarget);
                                        break;

                                case "useTheForce":
                                        playSound(gameSound.usetheforce);
                                        break;

                        }



                }


                setLevel(_obj: any): void {

                        if (_obj.pVel != undefined && _obj.pVel != null) this.player.body.velocity.x = _obj.pVel;
                        if (_obj.vel != undefined && _obj.vel != null) this.setVelocity(_obj.vel);
                        if (_obj.message != undefined && _obj.message != null) this.setMessage(_obj.message);
                        if (_obj.sound != undefined && _obj.sound != null) this.setSound(_obj.sound);
                        if (_obj.bonus != undefined && _obj.bonus != null) this.bonusIsActive = _obj.bonus;
                        if (_obj.bonusSpawn != undefined && _obj.bonusSpawn != null) this.bonusSpawn = _obj.bonusSpawn;

                        if (_obj.bomb != undefined && _obj.bomb != null) this.bombIsActive = _obj.bomb;
                        if (_obj.bombSpawn != undefined && _obj.bombSpawn != null) this.bombSpawn = _obj.bombSpawn;

                        if (_obj.tie != undefined && _obj.tie != null) this.tieIsActive = _obj.tie;
                        if (_obj.tieSpawn != undefined && _obj.tieSpawn != null) this.tieSpawn = _obj.tieSpawn;




                }

                checkLevel(): void {

                        var camX = this.game.camera.x;
                        var _obj: any;
                        for (var l = 0; l < this.story.length; l++) {

                                _obj = this.story[l];

                                if (camX >= _obj.startX && camX <= _obj.endX) {


                                        if (!_obj.started) {
                                                _obj.started = true;
                                                this.setLevel(_obj.level);
                                        }

                                }

                        }

                }


                collisionHandlerBounds(_player: PlayerWing, _bound: Phaser.Sprite) {

                        if (!this.cheat) {



                                _player.kill();


                                if (_bound.name == "colliderBottom") {

                                        this.playerGroup.add(new Explosion(this.game, this, _player.x, _player.y, "exp3", "playerBoundBottom"));

                                } else {
                                        this.playerGroup.add(new Explosion(this.game, this, _player.x, _player.y, "exp3", "playerBoundTop"));


                                }

                        }




                }


                collisionHandlerObstacles(_player: Player, _enemy: any) {
                        if (!this.cheat) {
                                _player.kill();

                                this.playerGroup.add(new Explosion(this.game, this, _player.x, _player.y, "exp3", "playerObstacle"));
                        }

                }


                collisionHandlerBonus(_player: Player, _bonus: Bonus) {

                        _bonus.removeBonus(true);


                }

                collisionHandlerEnemy(_player: Player, _enemy: any) {

                        if (!this.cheat) {
                                _player.kill();
                                this.playerGroup.add(new Explosion(this.game, this, _player.x, _player.y, "exp3", "player"));
                        }


                        _enemy.removeEnemy();

                        if (_enemy.name == "bomb" || _enemy.name == "tie") {

                                this.playerGroup.add(new Explosion(this.game, this, _enemy.x, _enemy.y, "exp3", _enemy.name));
                        }



                }





                spawnBonus() {

                        if (!this.bonusIsActive) return;
                        if (this.randomBonusSpawnTime < this.game.time.now) {
                                this.randomBonusSpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * this.bonusSpawn);
                                this.bonusGroup.add(new Bonus(this.game, this));

                        }


                }

                spawnEnemyBomb() {

                        if (!this.bombIsActive) return;
                        if (this.randomEnemySpawnTime < this.game.time.now) {
                                this.randomEnemySpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * this.bombSpawn);
                                this.enemyGroup.add(new Bomb(this.game, this));

                        }
                }


                spawnEnemyTie() {

                        if (!this.tieIsActive) return;
                        if (this.randomTieSpawnTime < this.game.time.now) {
                                this.randomTieSpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * this.tieSpawn);
                                this.enemyGroup.add(new TieAttack(this.game, this));

                        }
                }

                scrollBackground(): void {

                        this.tunnel.tilePosition.x -= this.back1;

                        this.layer1.tilePosition.x -= this.back2;

                        this.layer2.tilePosition.x -= this.back3;

                }



                tweenScore(end: number): void {

                        var obj = this.score;

                        var scoreValue = { score: 0, end: end, start: this.realScore };
                        this.realScore = this.realScore + end;

                        this.checkTorpedo()

                        var scoreTween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);

                        scoreTween.onUpdateCallback(function () { obj.text = (scoreValue.start + Math.round(scoreValue.score)) + ""; });
                        scoreTween.onComplete.add(function () { obj.text = "" + (scoreValue.start + scoreValue.end); }, this);
                        scoreTween.start();

                };

                checkTorpedo(): void {

                        var tor: number = Math.floor(this.realScore / 5000);
                        if (tor > 0 && tor > this.torpedo) {
                                this.torpedo++;

                                var _torpedo: Phaser.Sprite = this.game.add.sprite(1024 - (this.torpedo * 30), 530, "torpedo");
                                _torpedo.anchor.set(.5, 0);
                                _torpedo.scale.set(.75);
                                _torpedo.fixedToCamera = true;
                                this.torpedoGroup.add(_torpedo);
                                //console.log(200 + (this.torpedo * 44))
                        }


                }



                tweenScroll(_state: GameWing, _start?: Object, _end?: Object, _time?: number): void {

                        var backValue: any = { back1: 0, back2: 0, back3: 0 };

                        if (_start != null) backValue = _start;

                        var backEnd: any = { back1: 6.5, back2: 7.5, back3: 7 };

                        if (_end != null) backEnd = _end;

                        var backTween: Phaser.Tween = this.game.add.tween(backValue).to(backEnd, _time, Phaser.Easing.Quadratic.Out);

                        backTween.onUpdateCallback(function () {

                                _state.back1 = backValue.back1;
                                _state.back2 = backValue.back2;
                                _state.back3 = backValue.back3;


                        });

                        backTween.start();
                }




        }


}