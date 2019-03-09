
this.system = this.system || {};
(function(){
    "use strict";

    const PlayerStatsComponent = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(PlayerStatsComponent,createjs.Container);

    p._statsArr = null;
    p._statsTexts = null;

    p._init = function () {
        this._statsTexts = [];
        let stats = JSON.parse(localStorage.getItem("playerStats"));
        if(stats === null){
            stats = [0, 0, 0, 0, 0, 0];
            localStorage.setItem("playerStats" , JSON.stringify(stats));
        }
        this._statsArr = stats;

        for (let i = 0; i < 6; i++) {
            let statTxt = system.CustomMethods.makeText(stats[i], '30px Avengeance', 'white', 'center', 'middle');
            statTxt.y = i * 75;
            this._statsTexts.push(statTxt);
            this.addChild(statTxt);
        }
    };

    p.updateStats = function(attempt) {
        const statsInd = attempt - 1;
        this._statsArr[statsInd]++;
        localStorage.setItem("playerStats" , JSON.stringify(this._statsArr));
        let txtField = this._statsTexts[statsInd];

        createjs.Tween.get(txtField).to({alpha:0}, 800 , createjs.Ease.quadOut).call(()=>{
            txtField.text = this._statsArr[statsInd];
            createjs.Tween.get(txtField).to({alpha:1}, 800, createjs.Ease.quadIn);
        });
    };

    system.PlayerStatsComponent = createjs.promote(PlayerStatsComponent,"Container");
})();


