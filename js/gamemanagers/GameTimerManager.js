game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        //sets all variables that i went over in Pause screen
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();

        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function() {
        //timers for gold and enemies
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();

        return true;
    },
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
            //adds gold
            game.data.gold += (game.data.exp1 + 1);
            console.log("curent gold: " + game.data.gold);
        }
    },
    creepTimerCheck: function() {
      

    }
});