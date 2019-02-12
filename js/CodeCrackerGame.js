
this.system = this.system || {};
(function(){
    "use strict";

    const CodeCrackerGame = function(){
        this.Container_constructor();
        this._init();
    };

    const p = createjs.extend(CodeCrackerGame,createjs.Container);

    p._init = function () {
        const back = system.CustomMethods.makeImage('background', false);
        this.addChild(back);
    };

    p.render = function(e){
        stage.update(e);
    };

    system.CodeCrackerGame = createjs.promote(CodeCrackerGame,"Container");
})();


