
/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game {
        export class GameState extends Phaser.State {


                private introSky: Phaser.TileSprite;
                private introCloud1: Phaser.TileSprite;
                private introCloud2: Phaser.TileSprite;
                private introRocks: Phaser.TileSprite;
                private introRoad: Phaser.TileSprite;

                public ground: Phaser.Sprite;
                public player: Player;

                public start: boolean;

                private back1: number;
                private back2: number;

                private score: Phaser.Text;
                private realScore: number=0;

                public bonusGroup: Phaser.Group;
                public enemyGroup: Phaser.Group;

                private randomBonusSpawnTime: number;
                private randomEnemySpawnTime: number;

                private randomEnemySpawnTimeLevel: number;

                private level:number=0;



                private readyText: Phaser.Text;
                private readyOnce: boolean = false;

                private gameTheme: Phaser.Sound;
                private gameTimer: Phaser.Timer;



                constructor() {

                        super();

                        this.back1 = 0;
                        this.back2 = 0;


                }

                preload() {

                }

                create() {

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

                        this.player = new Player(this.game, this);

                        this.gameTheme = this.game.add.audio('game', 1, true);
                        this.gameTheme.allowMultiple = true;
                        this.gameTheme.play();


                }


                update() {



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
                                this.game.physics.arcade.overlap(this.bonusGroup, this.player, this.collisionHandler,null,this);
                                this.game.physics.arcade.overlap(this.enemyGroup, this.player, this.collisionEnemyHandler,null,this);
                                this.startScroll();
                                this.spawnBonus();
                                this.spawnEnemy();


                        }




                }

                updateLevel(){ this.level++; console.log("level:"+this.level) }


                getSpawnLevel():number{

                        let molt:number;

                        switch (this.level){

                                case 0:
                                molt=300;
                                break;

                                case 1:
                                molt=250;
                                break;

                                case 2:
                                 molt=200;
                                break;

                                case 3:
                                 molt=150;
                                break;

                                case 4:
                                 molt=100;
                                break;

                                case 5:
                                 molt=50;
                                break;


                        }

                       return  Math.abs(this.game.rnd.integerInRange(10, 20) * molt)


                }

                 collisionHandler(_player: Player, _bonus: Bonus) {

                        _bonus.removeBonus(true);


                }

                collisionEnemyHandler(_player: Player, _enemy: any) {

                       // console.log(_enemy.x,_enemy.y);

                        this.enemyGroup.add(new Explosion(this.game,this,_enemy.x,_enemy.y,"exp1"))
                        this.enemyGroup.add(new Explosion(this.game,this,_enemy.x,_enemy.y,"exp2"))
                       
                        _player.setIdle(true);
                        _enemy.removeEnemy();
                        
                


                }


                tweenScore(end: number) {
                        
                       
                       
                        var obj = this.score;
                        
                        var scoreValue = { score: 0, end:end, start: this.realScore };
                        this.realScore=this.realScore+end;

                        var scoreTween = this.game.add.tween(scoreValue).to({ score: scoreValue.end }, 200, Phaser.Easing.Quadratic.Out);

                        scoreTween.onUpdateCallback(function () { obj.text = (scoreValue.start + Math.round(scoreValue.score)) + ""; });
                        scoreTween.onComplete.add( function () { obj.text =  ""+(scoreValue.start + scoreValue.end); },this);
                        scoreTween.start();

                };

                
                                 render() {
                // this.game.debug.text('Elapsed seconds: ' +   this.game.time.elapsedSecondsSince(this.game.time.now), 32, 32);
                       // this.game.debug.bodyInfo(this.player, 32, 32);
                       // this.game.debug.body(this.player);
                    
                  
                
                }
                

               


                startScroll() {


                        this.introRoad.tilePosition.x -= this.back1;
                        this.introRocks.tilePosition.x -= this.back2;


                }

                spawnBonus() {

                        if (this.randomBonusSpawnTime < this.game.time.now) {
                                this.randomBonusSpawnTime = this.game.time.now + Math.abs(this.game.rnd.integerInRange(10, 20) * 100);
                                this.bonusGroup.add(new Bonus(this.game, this));

                        }


                }

                spawnEnemy() {

                        if (this.randomEnemySpawnTime < this.game.time.now) {
                                this.randomEnemySpawnTime = this.game.time.now + this.getSpawnLevel();

                                this.enemyGroup.add(new Enemy(this.game, this, "bomb"));

                        }


                }


                gameOver() {

                        this.start = false;
                        this.readyOnce = false;
                        this.gameTheme.stop();

                        setScore(parseInt(this.score.text));


                        goState("Gameover", this.game);


                };

                tweenScroll(_state): void {

                        var backValue: any = { back1: 0, back2: 0 };
                        var backEnd: any = { back1: 4, back2: 1.5 };
                        var backTween: Phaser.Tween = this.game.add.tween(backValue).to(backEnd, 1000, Phaser.Easing.Quadratic.Out);

                        backTween.onUpdateCallback(function () {

                                _state.back1 = backValue.back1;
                                _state.back2 = backValue.back2;

                        });

                        backTween.start();
                }



        }


}