
this.system = this.system || {};
(function(){
    "use strict";

    const PlayerCombinationsComponent = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(PlayerCombinationsComponent,createjs.Container);

    p._combinationsRows = null;

    p._init = function () {
        this._combinationsRows = [];
        this._setRows();
    };

    p._setRows = function() {
        const spacing = 76;
        for(let i = 0; i < 6; i++){
            const combination = new system.CombinationRow();
            combination.y = i * spacing;
            this.addChild(combination);
            this._combinationsRows.push(combination);
        }
    };

    p.updateContainCorrectDots = function(rowIndex, numOfCorrect, numOfContain) {
        this._combinationsRows[rowIndex].updateDots(numOfCorrect, numOfContain);
    };

    p.updateRow = function(rowInd, combination) {
        this._combinationsRows[rowInd].setCombination(combination);
    };

    p.clearRows = function() {
        this._combinationsRows.forEach((row)=>{
            row.clearRow();
        });
    };

    system.PlayerCombinationsComponent = createjs.promote(PlayerCombinationsComponent,"Container");
})();


