/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>
/// <reference path="../States/Game.ts"/>

module k2016Game{

    export enum PlayerStates {IDLE, RUNNING, JUMPING}

    export class Player extends Phaser.Sprite{

        game:Phaser.Game;
        gameState:GameState;

        private isJumping:boolean;
        private isIdle:boolean;
        private playerSpeed:number;
        private currentState:PlayerStates;

        private lastRate:number;
        private timer:Phaser.Timer;
        private lastSpeed:number;

        private leftButton:Phaser.Key;
        private rightButton:Phaser.Key;
        private upButton:Phaser.Key;

        private btnLeft:Phaser.Sprite;
        private btnRight:Phaser.Sprite;
        private btnUp:Phaser.Sprite;

        private cursors:Phaser.CursorKeys;

        private anim:Array<Phaser.Animation>;
        
        constructor(game:Phaser.Game, gameState:GameState){

            super(game,100,0,"deluca");
            
            this.game=game;
            this.gameState=gameState;
            this.lastRate=0;
            this.playerSpeed=0;
            this.isJumping=false;
            this.anim = new Array;
        
            this.scale.set(0.75);
            this.game.physics.arcade.enable(this);
            
            this.body.immovable=false; 
            this.fixedToCamera=false;
            this.body.allowGravity=true;


            this.body.setSize(48,168,56,0);

            

         
            
            var anim=this.animations.add("idle", [12,13,14,13], 5, true);
            this.anim.push(anim);
            anim=this.animations.add("run", [0,2,4,6,8,10], 0, true);
            this.anim.push(anim);
            anim=this.animations.add("jump", [2], 0, false);
            this.anim.push(anim);

            this.anim[PlayerStates.IDLE].play();
            this.currentState=PlayerStates.IDLE;

            if(this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)){

                this.btnLeft = this.game.add.sprite(850,550,this.game.cache.getBitmapData('circleBtn'));
                this.btnLeft.anchor.set(0.5,0.5);
                this.btnLeft.scale.set(0.65);
                this.btnLeft.inputEnabled=true;
                this.btnLeft.events.onInputDown.add(this.goLeft,this);
                this.btnLeft.alpha=.2;

                this.btnRight = this.game.add.sprite(950,550,this.game.cache.getBitmapData('circleBtn'));
                this.btnRight.anchor.set(0.5,0.5);
                this.btnRight.scale.set(0.65);
                this.btnRight.inputEnabled=true;
                this.btnRight.events.onInputDown.add(this.goRight,this);
                this.btnRight.alpha=.32;

                this.btnUp = this.game.add.sprite(100,550,this.game.cache.getBitmapData('circleBtn'));
                this.btnUp.anchor.set(0.5,0.5);
                this.btnUp.scale.set(0.65);
                this.btnUp.inputEnabled=true;
                this.btnUp.events.onInputDown.add(this.goUp,this);
                this.btnUp.alpha=.2;

            }            
            else
            {
                
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

        

        update(){
            



            if(this.gameState.start){

              
                if( this.x>700){ this.x=700; }    

                if(this.x<-100){ this.gameState.gameOver(); } 
               
                this.checkSpeed();
            }


             if(this.body.velocity.y > 0){ 
                   
                    this.game.physics.arcade.collide(this, this.gameState.ground, this.groundHeandler); 
                
                }

                
        }


        


            groundHeandler(_sprite,_game)
        {

                if(_sprite.isJumping){

                    _sprite.body.velocity.x = -240;
                    _sprite.isJumping=false;
                    _sprite.anim[PlayerStates.JUMPING].stop();
                    _sprite.anim[PlayerStates.RUNNING].play();
                    _sprite.anim[PlayerStates.RUNNING].stop();
                    _sprite.checkIdle(_game);
                    
                }
            
        }


        goLeft(){

                    if(this.isJumping || this.isIdle) return;
                    if(!this.gameState.start){this.gameState.start=true; this.gameState.tweenScroll(this.gameState);}
                    this.clickRate(0);

        }

        goRight(){
                   
                    if(this.isJumping || this.isIdle) return;
                    if(!this.gameState.start){this.gameState.start=true; this.gameState.tweenScroll(this.gameState);}
                    this.clickRate(1);

        }


        setIdle(idle:boolean){

            //console.log("setidle", idle);
            this.isIdle=idle;
            this.alpha=.5;
            if(idle) this.game.time.events.add(1000,function(){this.setIdle(false);this.alpha=1;},this)

        }


        


        goUp(){

                   
                    if(this.isJumping || this.isIdle) return;
                    if(!this.gameState.start){this.gameState.start=true; this.gameState.tweenScroll(this.gameState);}
                    this.isJumping=true;
                    this.body.velocity.y = -1050;
                    this.anim[PlayerStates.JUMPING].play();
                    this.currentState=PlayerStates.JUMPING;

                    if(this.playerSpeed>0){ this.body.velocity.x = +100;} else{this.body.velocity.x = 0;}
        }



        clickRate(key)
        {
        if(this.isJumping) return;

            if(this.lastRate!=key){ 

                    this.lastRate=key; 
                    this.increaseSpeed(this.game);
                    this.anim[PlayerStates.IDLE].stop();
                    this.anim[PlayerStates.RUNNING].next(1);
                    this.currentState=PlayerStates.RUNNING;
                    

                }else if(this.lastRate==key){

                    this.resetSpeed();

                }

        }



        resetSpeed()
        {
            if(this.isJumping) return;
                    this.playerSpeed=0;
                    this.anim[PlayerStates.RUNNING].stop();
                    this.anim[PlayerStates.IDLE].play();
                    this.currentState=PlayerStates.IDLE;
            
        }

         increaseSpeed(game)
        {
            if(this.lastSpeed==null){

                this.lastSpeed=0;

            }else{

                var speed=this.game.time.time-this.lastSpeed;
                this.lastSpeed=this.game.time.time;

                if(speed<99 && speed>=50){  this.playerSpeed=5; }
                else if(speed<149 && speed>=100){ this.playerSpeed=4}
                else if(speed<199 && speed>=150){ this.playerSpeed=3}
                else if(speed<249 && speed>=200){ this.playerSpeed=2}
                else if(speed<299 && speed>=250){ this.playerSpeed=1}
                else if(speed>=300){ this.playerSpeed=0}
                else {this.playerSpeed=0}
                    this.checkIdle(game);

            }
        }

        checkSpeed()
        {

                if (this.playerSpeed==0 && !this.isJumping) {this.body.velocity.x=-240;}
                else if(this.playerSpeed==1){this.body.velocity.x=+0;}
                else if(this.playerSpeed==2){this.body.velocity.x=+30;}
                else if(this.playerSpeed==3){this.body.velocity.x=+60;}
                else if(this.playerSpeed==4){this.body.velocity.x=+90;}	
                else if(this.playerSpeed==5){this.body.velocity.x=+120;}

        }

        checkIdle(game)
        {

            if(this.timer!=undefined) this.timer.destroy();
                    this.timer = this.game.time.create(false);
                    this.timer.add(150, this.resetSpeed, this);	
                    this.timer.start();

            }
     



    }

}