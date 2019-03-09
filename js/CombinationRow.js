
this.system = this.system || {};
(function(){
    "use strict";

    const CombinationRow = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(CombinationRow,createjs.Container);

    p._symbols = null;
    p._dots = null;
    
    p._init = function () {
        this._symbols = [];
        this._dots = [];
        this._setSymbols();
        this._setDots();
    };

    p._setSymbols = function() {
        const spacing = 61;
        for(let i = 0; i < 4; i++){
            const sym = system.CustomMethods.makeImage('ps1', false, true);
            sym.x = i * spacing;
            this.addChild(sym);
            this._symbols.push(sym);
        }
    };

    p._setDots = function() {
        const startX = 273;
        const spacing = 60;
        for(let i = 0; i < 4; i++){
            const dot = system.CustomMethods.makeImage('dotGreen', false, true);
            dot.x = startX + (i * spacing);
            this.addChild(dot);
            this._dots.push(dot);
        }
    };

    p._clearSymbols = function() {
        this._symbols.forEach((symbol)=>{
            symbol.visible = false;
        });
    };

    p._clearDots = function() {
        this._dots.forEach((dot)=>{
            dot.visible = false;
        });
    };

    p.updateDots = function(numOfCorrect, numOfContain) {
        const totalDots = numOfCorrect + numOfContain;
        let imgName = '';
        for(let i = 0; i < totalDots; i++){
            if(numOfCorrect > 0){
                numOfCorrect--;
                imgName = 'dotGreen';
            }else{
                imgName = 'dotYellow';
            }
            system.CustomMethods.swapImages(this._dots[i], imgName);
            this._dots[i].visible = true;
        }
    };

    p.setCombination = function(combination) {
        this._clearSymbols();
        for(let i = 0; i < combination.length; i++){
            const imgName = `ps${combination[i]}`;
            system.CustomMethods.swapImages(this._symbols[i], imgName);
            this._symbols[i].visible = true;
        }
    };

    p.clearRow = function() {
        this._clearSymbols();
        this._clearDots();
    };

    system.CombinationRow = createjs.promote(CombinationRow,"Container");
})();


