
this.system = this.system || {};
(function(){
    "use strict";

    const CodeCrackerGame = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(CodeCrackerGame,createjs.Container);

    p._combination = null;
    p._showWinComponent = null;
    p._enterCombinationComponent = null;
    p._playerCombinationsComponent = null;
    p._showCombinationComponent = null;
    p._playerStatsComponent = null;
    p._info = null;
    p._atempt = null;
    p._maxNumOfAtempts = null;
    p._musicIsPlaying = false;

    p._init = function () {
        const back = system.CustomMethods.makeImage('background', false);
        this.addChild(back);

        const info = this._info = system.CustomMethods.makeImage('info', false);
        info.x = 1323;
        info.y = 476;
        info.visible = false;
        this.addChild(info);

        this._addComponents();
        this._addButtons();

        this._enterCombinationComponent.enableComponent(false);
        this._maxNumOfAtempts = 6;

        this._registerSounds();
    };

    p._registerSounds = function() {
        system.SoundManager.registerSound('winSound');
        system.SoundManager.registerSound('newGameSound');
        system.SoundManager.registerSound('clickSound');
        system.SoundManager.registerSound('backgroundMusic');
    };

    p._addComponents = function() {
        let stats = this._playerStatsComponent = new system.PlayerStatsComponent();
        stats.x = 381;
        stats.y = 198;
        this.addChild(stats);

        let enterCompComponent = this._enterCombinationComponent = new system.EnterCombinationComponent(this);
        enterCompComponent.x = 1018;
        enterCompComponent.y = 681;
        this.addChild(enterCompComponent);

        const playerCombinations = this._playerCombinationsComponent = new system.PlayerCombinationsComponent();
        playerCombinations.x = 709+25;//736
        playerCombinations.y = 173+25;//198
        this.addChild(playerCombinations);

        const showWinComponent = this._showWinComponent = new system.ShowWinComponent();
        showWinComponent.x = 706;
        showWinComponent.y = 641;
        const maskShape = new createjs.Shape();
        maskShape.graphics.beginFill("#3240ea").drawRoundRect(706,642,240,211,10);
        showWinComponent.mask = maskShape;
        this.addChild(showWinComponent);

        const showCombination = this._showCombinationComponent = new system.ShowWinCombinationComponent();
        showCombination.x = 860;
        showCombination.y = 879;
        const maskShape2 = new createjs.Shape();
        maskShape2.graphics.beginFill("#3240ea").drawRoundRect(860,879,200,56,5);
        showCombination.mask = maskShape2;
        this.addChild(showCombination);
    };

    p._addButtons = function() {
        let buttoonImage = system.CustomMethods.makeImage('newGameButton', true);
        const newGameButton = new system.Button(buttoonImage);
        newGameButton.x = 1605;
        newGameButton.y = 191;
        newGameButton.on('click', ()=>{
            system.SoundManager.play('newGameSound');
            newGameButton.doScaleAnimation();
            this._onNewGame();
        });
        this.addChild(newGameButton);

        buttoonImage = system.CustomMethods.makeImage('soundButton', true);
        const soundButton = new system.Button(buttoonImage);
        soundButton.x = newGameButton.x;
        soundButton.y = newGameButton.y + 80;
        soundButton.on('click', ()=>{
            soundButton.doScaleAnimation();
            this._onSound();
        });
        this.addChild(soundButton);

        buttoonImage = system.CustomMethods.makeImage('infoButton', true);
        const infoButton = new system.Button(buttoonImage);
        infoButton.x = newGameButton.x;
        infoButton.y = soundButton.y + 80;
        infoButton.on('click', ()=>{
            system.SoundManager.play('clickSound');
            infoButton.doScaleAnimation();
            this._onInfo();
        });
        this.addChild(infoButton);

        buttoonImage = system.CustomMethods.makeImage('fullScreenButton', true);
        const fullScreenButton = new system.Button(buttoonImage);
        fullScreenButton.x = newGameButton.x;
        fullScreenButton.y = infoButton.y + 80;
        fullScreenButton.on('click', ()=>{
            system.SoundManager.play('clickSound');
            fullScreenButton.doScaleAnimation();
            this._onFullScreen();
        });
        this.addChild(fullScreenButton);
    };

    p._onSound = function() {
        system.SoundManager.muteAllSounds();
    };

    p._onFullScreen = function() {
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        }else{
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    p._onInfo = function() {
        this._info.visible = !this._info.visible;
    };

    p._onNewGame = function() {
        this._setCombination();
        this._atempt = 0;
        this._enterCombinationComponent.enableComponent(true);
        this._enterCombinationComponent.clearCombination();
        this._playerCombinationsComponent.clearRows();
        this._showWinComponent.showWin(false);
        this._showCombinationComponent.showCombination(false,this._combination);
        if(this._musicIsPlaying === false) {
            console.log('play');
            this._musicIsPlaying = true;
            system.SoundManager.play('backgroundMusic', 1, -1);
        }
    };

    p._setCombination = function() {
        this._combination = [];
        for(let i = 0; i < 4; i++){
            let num = system.CustomMethods.getRandomNumberFromTo(0,5);
            this._combination.push(num);
        }
    };

    p._gameOver = function(hasWin) {
        this._enterCombinationComponent.enableComponent(false);
        if(hasWin === true){
            system.SoundManager.play('winSound');
            this._showWinAnimation();
            this._playerStatsComponent.updateStats(this._atempt);
        }
        this._showCombinationComponent.showCombination(true);
    };

    p._showWinAnimation = function() {
        const numOfBars = (this._maxNumOfAtempts + 1) - this._atempt;
        this._showWinComponent.setGoldenBars(numOfBars);
        this._showWinComponent.showWin(true);
    };

    p.updateCombination = function(combination) {
        this._playerCombinationsComponent.updateRow(this._atempt, combination);
    };

    p.checkCombination = function(playerCombination) {
        let contain = 0;
        let correct = 0;
        this._enterCombinationComponent.enableComponent(false);
        let combCopy = this._combination.concat();
        // CHECKING CONTAIN AND CORRECT
        for(let i = 0; i < playerCombination.length; i++){
            let numToCheck = playerCombination[i];
            for(let n = 0; n < combCopy.length; n++){
                if(numToCheck === combCopy[n]){
                    combCopy.splice(n,1);
                    contain++;
                    break;
                }
            }
            if(playerCombination[i] === this._combination[i]){
                correct++;
            }
        }
        contain -= correct;

        this._playerCombinationsComponent.updateContainCorrectDots(this._atempt, correct, contain);
        this._atempt++;
        this._enterCombinationComponent.enableComponent(true);

        if(correct === 4 || this._atempt === this._maxNumOfAtempts){
            const hasWin = correct === 4;
            this._gameOver(hasWin);
        }
    };

    p.render = function(e){
        stage.update(e);
    };

    system.CodeCrackerGame = createjs.promote(CodeCrackerGame,"Container");
})();


