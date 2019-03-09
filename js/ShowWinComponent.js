
this.system = this.system || {};
(function(){
    "use strict";

    const ShowWinComponent = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(ShowWinComponent,createjs.Container);

    p._goldenBars = null;
    p._doorUp = null;
    p._doorDown = null;

    p._init = function () {
        let barImage = system.CustomMethods.makeImage('goldenBar');
        barImage.x = 1;
        barImage.y = 130;

        let width = barImage.image.width;
        let height = barImage.image.height;
        let spacing = 2;

        let barImage2 = barImage.clone();
        barImage2.x = barImage.x + width + spacing;
        barImage2.y = 130;

        let barImage3 = barImage.clone();
        barImage3.x = barImage2.x + width + spacing;
        barImage3.y = 130;

        let barImage4 = barImage.clone();
        barImage4.x = 40;
        barImage4.y = barImage.y - height;

        let barImage5 = barImage.clone();
        barImage5.x = barImage4.x + width + spacing;
        barImage5.y = barImage4.y;

        let barImage6 = barImage.clone();
        barImage6.x = 80;
        barImage6.y = barImage5.y - height;

        this.addChild(barImage,barImage2,barImage3,barImage4,barImage5,barImage6);
        this._goldenBars = [barImage,barImage2,barImage3,barImage4,barImage5,barImage6];

        const doorUp = this._doorUp = system.CustomMethods.makeImage('showWinUp');
        this.addChild(doorUp);
        const doorDown = this._doorDown = system.CustomMethods.makeImage('showWinDown');
        doorDown.y = 107;
        this.addChild(doorDown);
    };

    p.setGoldenBars = function(numOfBars) {
        for(let i = 0; i < this._goldenBars.length; i++){
            this._goldenBars[i].visible = i < numOfBars;
        }
    };

    p.showWin = function(show) {
        let yPos = show === true ? [-100, 206] : [0, 107];
        createjs.Tween.get(this._doorUp).to({y:yPos[0]},1000, createjs.Ease.quadInOut);
        createjs.Tween.get(this._doorDown).to({y:yPos[1]},1000, createjs.Ease.quadInOut);
    };

    system.ShowWinComponent = createjs.promote(ShowWinComponent,"Container");
})();


