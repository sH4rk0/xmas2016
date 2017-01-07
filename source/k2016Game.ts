/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
/// <reference path="States/Menu.ts"/>
/// <reference path="States/Game.ts"/>
/// <reference path="States/GameOver.ts"/>

module k2016Game {


    var _newGame: initGame;
    var _playerScore: number = 0;
    var _firstTime: boolean = true;
    var _level: number = 2;
    var _game: Phaser.Game;
    var _gameSetup: boolean = false;
    var _gameSounds: Array<Phaser.Sound> = [];
    var _ismobile: boolean= true;


    export function setFirstTime(_val: boolean): void { _firstTime = _val; }
    export function getFirstTime(): boolean { return _firstTime; }

    export function getScore(): number { return _playerScore; }
    export function setScore(val: number): void { _playerScore = val; }

    export function setGame(game: Phaser.Game) { _game = game; }
    export function getGame(): Phaser.Game { return _game; }

    export function getSound(_sound: gameSound): Phaser.Sound {

        return _gameSounds[_sound];

    }

    export function playSound(_sound: gameSound): void {

        _gameSounds[_sound].play();

    }

    export function stopSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function pauseSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function setSoundVolume(_sound: gameSound, _volume: number): void {

        _gameSounds[_sound].volume = _volume;

    }

    export enum gameSound {
        intro,
        menu,
        lightsaber,
        tieShot,
        ingame,
        engine,
        explosion,
        bonus,
        colliderSound,
        yeahh,
        gameover,
        attacksequence,
        stayfocused,
        watchenemy,
        theforce,
        stayontarget,
        tiefly,
        usetheforce
    }

    export function setUpGame(_game: Phaser.Game): void {

        if (!_gameSetup) {

            //console.log("gameSetup");
            setGame(_game);

            var _sound: Phaser.Sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;

        }

    }

    export function isMobile(): boolean {

        return _ismobile;
    }

    export function setDevice(isMobile:boolean): void {

       _ismobile=isMobile;
    }


    export function getLevel(): number { return _level; }

    export function getLevelLabel(): string {

        var _label: string;
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
    export function setLevel(val: number): void { _level = val; }

    export function getLevelData(): any {

        var _arr: any = JSON.parse(JSON.stringify(gameData.levels[getLevel()].slice()));
        return _arr;

    }

    export function getObstacleLevel(): number {
        let difficult: number = 0;

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


    export function getUrlParameter(sParam: string): any {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    export function goState(_state: string, _game: Phaser.Game): void {

        var st = <Phaser.Plugin.StateTransition>_game.plugins.add(Phaser.Plugin.StateTransition);
        if (isMobile()) {

            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            });

        } else {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });

        }


        st.to(_state);

    }


    export class initGame {


        public game: Phaser.Game;

        constructor(width?: number, height?: number) {

            var dpr: number = 1;
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

            } catch (err) { }

            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);
            
            this.game.state.add("Boot", Boot, false);
            this.game.state.add("Preloader", Preloader, false);
            this.game.state.add("Menu", Menu, false);
            this.game.state.add("GameWing", GameWing, false);
            this.game.state.add("Gameover", GameOver, false);
            this.game.state.add("Gamewin", Gamewin, false);
            this.game.state.start("Boot");




        }

    }


    window.onresize = () => { }

    window.onload = () => { _newGame = new initGame(1024, 600); }


}

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

            /* 
            { name: "alarm", paths: ["assets/sounds/alarm.ogg", "assets/sounds/alarm.m4a"] },
            { name: "engine", paths: ["assets/sounds/engine.ogg", "assets/sounds/engine.m4a"] },
            { name: "missionFailure", paths: ["assets/sounds/missionFailure.ogg", "assets/sounds/missionFailure.m4a"] },
            { name: "crowded", paths: ["assets/sounds/crowded.ogg", "assets/sounds/crowded.m4a"] },
            { name: "engaging", paths: ["assets/sounds/engaging.ogg", "assets/sounds/engaging.m4a"] },
            { name: "heavyFire", paths: ["assets/sounds/heavyFire.ogg", "assets/sounds/heavyFire.m4a"] },
            { name: "impressive", paths: ["assets/sounds/impressive.ogg", "assets/sounds/impressive.m4a"] },
            { name: "lockOn", paths: ["assets/sounds/lockOn.ogg", "assets/sounds/lockOn.m4a"] },
            */
        ],

        bitmapfont: [
         //   { name: "commodore", imgpath: "assets/fonts/commodore.png", xmlpath: "assets/fonts/commodore.xml", jsonpath:"assets/fonts/commodore.json" }
        ]

    },

    levels: [

        //pussy
        [

            { startX: 0, endX: 100, started: false, level: { vel: "accelerate", pVel: 100, message: null, sound: "attackSequence", bonus: false, bomb: false, tie: false } },
            { startX: 100, endX: 150, started: false, level: { vel: null, pVel: null, message: "ALERT, INCOMING MINEFIELD", } },
            { startX: 300, endX: 400, started: false, level: { vel: null, pVel: null, message: null, bonus: true, bomb: true, bombSpawn: 200 } },

            { startX: 4000, endX: 4100, started: false, level: { sound: "stayFocused" } },
            { startX: 3700, endX: 3800, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false } },
            { startX: 3800, endX: 3900, started: false, level: { vel: "decelerate", pVel: 200, message: null } }, //colliders

            { startX: 14500, endX: 14600, started: false, level: { sound: "watchEnemy" } },
            { startX: 14600, endX: 14800, started: false, level: { vel: null, pVel: null, message: "ALERT, TIE FIGHTERS APPROACHING" } },
            { startX: 15000, endX: 15100, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: false, tie: true, tieSpawn: 250 } },

            { startX: 18800, endX: 18900, started: false, level: { sound: "stayFocused" } },
            { startX: 18500, endX: 18600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 19000, endX: 19100, started: false, level: { vel: "decelerate2", pVel: 250, message: null } },//colliders

            { startX: 29800, endX: 29900, started: false, level: { sound: "watchEnemy" } },
            { startX: 29900, endX: 30000, started: false, level: { vel: null, pVel: null, message: "WATCH OUT, INCOMING ENEMIES" } },
            { startX: 30200, endX: 30300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 300, tie: true, tieSpawn: 350 } },

            { startX: 33800, endX: 33900, started: false, level: { sound: "stayFocused" } },
            { startX: 33500, endX: 33600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 34000, endX: 34100, started: false, level: { vel: "decelerate3", pVel: 300, message: null } },//colliders

            { startX: 44800, endX: 44900, started: false, level: { sound: "TheForce" } },
            { startX: 44900, endX: 45000, started: false, level: { vel: null, pVel: null, message: "LAST RUSH...BE FOCUS!" } },
            { startX: 45200, endX: 45300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 250, tie: true, tieSpawn: 300 } },

            { startX: 47500, endX: 47600, started: false, level: { message: null, bonus: false, bomb: false, tie: false } },

            { startX: 47800, endX: 47900, started: false, level: { sound: "stayOnTarget", action:"createCore" } },
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
            { startX: 3800, endX: 3900, started: false, level: { vel: "decelerate", pVel: 200, message: null } }, //colliders

            { startX: 14500, endX: 14600, started: false, level: { sound: "watchEnemy" } },
            { startX: 14600, endX: 14800, started: false, level: { vel: null, pVel: null, message: "ALERT, TIE FIGHTERS APPROACHING" } },
            { startX: 15000, endX: 15100, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: false, tie: true } },

            { startX: 18800, endX: 18900, started: false, level: { sound: "stayFocused" } },
            { startX: 18500, endX: 18600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 19000, endX: 19100, started: false, level: { vel: "decelerate2", pVel: 250, message: null } },//colliders

            { startX: 29800, endX: 29900, started: false, level: { sound: "watchEnemy" } },
            { startX: 29900, endX: 30000, started: false, level: { vel: null, pVel: null, message: "WATCH OUT, INCOMING ENEMIES" } },
            { startX: 30200, endX: 30300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 250, tie: true, tieSpawn: 300 } },

            { startX: 33800, endX: 33900, started: false, level: { sound: "stayFocused" } },
            { startX: 33500, endX: 33600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 34000, endX: 34100, started: false, level: { vel: "decelerate3", pVel: 300, message: null } },//colliders

            { startX: 44800, endX: 44900, started: false, level: { sound: "TheForce" } },
            { startX: 44900, endX: 45000, started: false, level: { vel: null, pVel: null, message: "LAST RUSH...BE FOCUS!" } },
            { startX: 45200, endX: 45300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 200, tie: true, tieSpawn: 250 } },

            { startX: 47500, endX: 47600, started: false, level: { message: null, bonus: false, bomb: false, tie: false } },

            { startX: 47800, endX: 47900, started: false, level: { sound: "stayOnTarget", action:"createCore" } },
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
            { startX: 3800, endX: 3900, started: false, level: { vel: "decelerate", pVel: 200, message: null } }, //colliders

            { startX: 14500, endX: 14600, started: false, level: { sound: "watchEnemy" } },
            { startX: 14600, endX: 14800, started: false, level: { vel: null, pVel: null, message: "ALERT, TIE FIGHTERS APPROACHING" } },
            { startX: 15000, endX: 15100, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: false, tie: true, tieSpawn: 150 } },

            { startX: 18800, endX: 18900, started: false, level: { sound: "stayFocused" } },
            { startX: 18500, endX: 18600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 19000, endX: 19100, started: false, level: { vel: "decelerate2", pVel: 250, message: null } },//colliders

            { startX: 29800, endX: 29900, started: false, level: { sound: "watchEnemy" } },
            { startX: 29900, endX: 30000, started: false, level: { vel: null, pVel: null, message: "WATCH OUT, INCOMING ENEMIES" } },
            { startX: 30200, endX: 30300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 200, tie: true, tieSpawn: 250 } },

            { startX: 33800, endX: 33900, started: false, level: { sound: "stayFocused" } },
            { startX: 33500, endX: 33600, started: false, level: { vel: null, pVel: null, message: "BE CAREFUL, INCOMING OBSTACLES", bonus: false, bomb: false, tie: false } },
            { startX: 34000, endX: 34100, started: false, level: { vel: "decelerate3", pVel: 300, message: null } },//colliders

            { startX: 44800, endX: 44900, started: false, level: { sound: "TheForce" } },
            { startX: 44900, endX: 45000, started: false, level: { vel: null, pVel: null, message: "LAST RUSH...BE FOCUS!" } },
            { startX: 45200, endX: 45300, started: false, level: { vel: "accelerate", pVel: 100, message: null, bonus: true, bomb: true, bombSpawn: 150, tie: true, tieSpawn: 200 } },

            { startX: 47500, endX: 47600, started: false, level: { message: null, bonus: false, bomb: false, tie: false } },

            { startX: 47800, endX: 47900, started: false, level: { sound: "stayOnTarget", action:"createCore" } },
            { startX: 47900, endX: 48000, started: false, level: { vel: "decelerate4", pVel: 80, message: null, bonus: false, bomb: false, tie: false } },
            { startX: 48100, endX: 48200, started: false, level: { vel: "stop", pVel: 0, message: null, bonus: false, bomb: false, tie: false } },

        ]


    ]

}




var _guserid: string;
var _gname: string;
var _gfriends: string;
var sharing: boolean = false;

function checkLoginStatus(response) {

    //alert("checkLoginStatus")
    if (response.status === 'connected') {

        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;

        FB.api('/me', function (response) {
            if (response && !response.error) {
                _guserid = response.id;
                _gname = response.name;

                FB.api("/me/friends",
                    function (response) {
                        if (response && !response.error) {
                            _gfriends = response.data;

                            //alert("to share")
                            share();

                        }
                    }
                );


            }
        });




    } else if (response.status === 'not_authorized') {
        performLogin()
    } else {
        performLogin()
    }
}

function performLogin() {

    //alert("performLogin")

    FB.login(function (response) {
        //alert(response)
        if (response.authResponse) {
            checkLoginStatus(response);
        } else {
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


    if (sharing) return;

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


};




window.fbAsyncInit = function () {
    FB.init({
        appId: '319545484920372',
        xfbml: true,
        version: 'v2.2'
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));
