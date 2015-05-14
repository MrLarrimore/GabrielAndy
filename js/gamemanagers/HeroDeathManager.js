game.HeroDeathManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
    },
    update: function() {
        //if player is dead than remove it and aadd it again
        if (game.data.playerdead === true && game.data.twoplayer === false) {
            me.game.world.removeChild(game.data.player);
            me.state.current().resetPlayer(10, 0, 1000);
        }
        return true;
    }

});