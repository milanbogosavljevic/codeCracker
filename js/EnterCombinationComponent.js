
this.system = this.system || {};
(function(){
    "use strict";

    const EnterCombinationComponent = function(game){
        this.Container_constructor();
        this._init(game);
    };

    const p = createjs.extend(EnterCombinationComponent,createjs.Container);
    p._game = null;
    p._combination = null;

    p._init = function (game) {
        this._game = game;
        this._combination = [];
        this._setSymbolButtons();
        this._setEnterDeleteButtons();
    };

    p._setSymbolButtons = function() {
        let yPos = 0;
        let counter = 0;
        let spacing = 79;
        for(let i = 0; i < 6; i++){
            let imgName = `symbol${i}`;
            let img = system.CustomMethods.makeImage(imgName,true);
            let button = new system.Button(img);
            button.x = (spacing * counter);
            button.y = yPos;
            button.on('click', (e)=>{
                system.SoundManager.play('clickSound');
                button.doScaleAnimation();
                this._onSymbolClick(i);
            });
            this.addChild(button);
            counter++;
            if(i === 2){
                counter = 0;
                yPos = 76;
            }
        }
    };

    p._onSymbolClick = function(symbolId) {
        if(this._combination.length < 4){
            this._combination.push(symbolId);
            this._game.updateCombination(this._combination);
        }
    };

    p._onEnterClick = function() {
        if(this._combination.length === 4){
            this._game.checkCombination(this._combination);
            this._combination = [];
        }
    };

    p._onDelClick = function() {
        if(this._combination.length > 0){
            this._combination.pop();
            this._game.updateCombination(this._combination);
        }
    };

    p._setEnterDeleteButtons = function() {
        const enterImg = system.CustomMethods.makeImage('enterButton', true);
        const enterButton = new system.Button(enterImg);
        enterButton.x = 40;
        enterButton.y = 142;
        enterButton.on('click', (e)=>{
            system.SoundManager.play('clickSound');
            enterButton.doScaleAnimation();
            this._onEnterClick();
        });

        const deleteImg = system.CustomMethods.makeImage('deleteButton', true);
        const deleteButton = new system.Button(deleteImg);
        deleteButton.x = 158;
        deleteButton.y = 142;
        deleteButton.on('click', (e)=>{
            system.SoundManager.play('clickSound');
            deleteButton.doScaleAnimation();
            this._onDelClick();
        });

        this.addChild(enterButton,deleteButton);
    };

    p.clearCombination = function() {
        this._combination = [];
    };

    p.enableComponent = function(bool) {
        this.mouseEnabled = bool;
    };

    system.EnterCombinationComponent = createjs.promote(EnterCombinationComponent,"Container");
})();


