
this.system = this.system || {};
(function(){
    "use strict";

    const ShowWinCombinationComponent = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(ShowWinCombinationComponent,createjs.Container);

    p._symbols = null;
    p._doorLeft = null;
    p._doorRight = null;

    p._init = function () {
        p._symbols = [];
        let image = system.CustomMethods.makeImage('ps0');
        const width = image.image.width;
        for(let i = 0; i < 4; i++){
            let sym = image.clone();
            sym.x = i * width;
            this.addChild(sym);
            this._symbols.push(sym);
        }
        const doorLeft = this._doorLeft = system.CustomMethods.makeImage('showCodeLeft');
        doorLeft.x = -2;
        doorLeft.y = -2;
        this.addChild(doorLeft);

        const doorRight = this._doorRight = system.CustomMethods.makeImage('showCodeRight');
        doorRight.x = doorLeft.x + 102;
        doorRight.y = -2;
        this.addChild(doorRight);
    };

    p.showCombination = function(show,combination) {
        let xPos = show === true ? [-102, 202] : [-2, 100];
        createjs.Tween.get(this._doorLeft).to({x:xPos[0]},1000, createjs.Ease.quadInOut);
        createjs.Tween.get(this._doorRight).to({x:xPos[1]},1000, createjs.Ease.quadInOut).call(()=>{
            if (combination) {
                this.updateCombination(combination);
            }
        });
    };

    p.updateCombination = function(combination) {
        for(let i = 0; i < combination.length; i++){
            const imgName = `ps${combination[i]}`;
            system.CustomMethods.swapImages(this._symbols[i], imgName);
        }
    };

    system.ShowWinCombinationComponent = createjs.promote(ShowWinCombinationComponent,"Container");
})();


