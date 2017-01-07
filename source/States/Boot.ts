/// <reference path="../Lib/phaser.d.ts"/>
/// <reference path="../k2016Game.ts"/>

module k2016Game{
    export class Boot extends Phaser.State{

        preload(){
         var bmd : Phaser.BitmapData = this.game.add.bitmapData(200,50);
			
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);


			bmd = this.game.add.bitmapData(200,200);
			bmd.ctx.beginPath();
            bmd.ctx.fillStyle="#FFFFFF";
            bmd.ctx.strokeStyle="#FFF";
            bmd.ctx.lineWidth = 20;
            bmd.ctx.arc(bmd.width/2,bmd.height/2,50,0,2*Math.PI);
            bmd.ctx.closePath();
            bmd.ctx.fill();
            bmd.ctx.stroke();
			this.game.cache.addBitmapData('circleBtn', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button', bmd);

			bmd = this.game.add.bitmapData(50,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('bonus', bmd);

			bmd = this.game.add.bitmapData(2000,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 2000, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('ground', bmd);

			bmd = this.game.add.bitmapData(1024,600);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 600);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('layer', bmd);
			
			bmd = this.game.add.bitmapData(1024,600);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 600);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('layerWhite', bmd);


			bmd = this.game.add.bitmapData(1024,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 20);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('collider', bmd);




			bmd = this.game.add.bitmapData(1024,150);
			bmd.ctx.fillStyle = '#ff0000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 150);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('tieAlert', bmd);

			bmd = this.game.add.bitmapData(50,50);
			bmd.ctx.fillStyle = '#ff0000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('core', bmd);


        }

     create(){
        

		   if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
				setDevice(true);
            }
            else {
                setDevice(false);
            }

            this.game.stage.backgroundColor = '#000000';
		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
		    this.game.state.start('Preloader');



           
        }
    }
}