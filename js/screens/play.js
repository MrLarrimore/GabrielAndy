game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        //pauses previous track
        me.audio.pause("turndown");
        //playing audio tracks
//                me.audio.playTrack("theme");
//                me.audio.resumeTrack("theme");
        me.audio.play("eminem", true);
        // reset the score
        game.data.score = 0;
        //uses data from game to figure out which map to use
        if (game.data.map === 1) {
            me.levelDirector.loadLevel('level01');
        } else if (game.data.map === 2) {
            me.levelDirector.loadLevel('level02');
        } else if (game.data.map === 3) {
            me.levelDirector.loadLevel('level03');
        }
        //adds entities

        this.resetPlayer(500, 300, 1000);
        if (game.data.twoplayer === true) {
            var player2 = me.pool.pull("player2", 400, 300, {});
            me.game.world.addChild(player2, 20);
        }

        var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, []);
        me.game.world.addChild(gameTimerManager, 0);

        var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, []);
        me.game.world.addChild(heroDeathManager, 0);

        var experienceManager = me.pool.pull("ExperienceManager", 0, 0, []);
        me.game.world.addChild(experienceManager, 0);

        var spendGold = me.pool.pull("SpendGold", 0, 0, []);
        me.game.world.addChild(spendGold, 0);

        var pauseScreen = me.pool.pull("PauseScreen", 0, 0, []);
        me.game.world.addChild(pauseScreen, 0);


        //player1 controls
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.PAGE_UP, "attack");
        me.input.bindKey(me.input.KEY.ALT, "sprint");
        me.input.bindKey(me.input.KEY.DOWN, "sneak");
        me.input.bindKey(me.input.KEY.PAGE_DOWN, "cheat");
        me.input.bindKey(me.input.KEY.UP, "jump");
        me.input.bindKey(me.input.KEY.ALT, "revive");
        //player2 controls
        me.input.bindKey(me.input.KEY.W, "jump2");
        me.input.bindKey(me.input.KEY.A, "left2");
        me.input.bindKey(me.input.KEY.S, "sneak2");
        me.input.bindKey(me.input.KEY.D, "right2");
        me.input.bindKey(me.input.KEY.CTRL, "cheat2");
        me.input.bindKey(me.input.KEY.Q, "attack2");
        me.input.bindKey(me.input.KEY.SHIFT, "sprint2");
        me.input.bindKey(me.input.KEY.F12, "singleplayer");
        me.input.bindKey(me.input.KEY.E, "revive2");

        me.input.bindKey(me.input.KEY.U, "buy");
        me.input.bindKey(me.input.KEY.P, "pause");
        me.input.bindKey(me.input.KEY.Z, "skill1");
        me.input.bindKey(me.input.KEY.X, "skill2");
        me.input.bindKey(me.input.KEY.C, "skill3");




        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    },
    resetPlayer: function(x, y, z) {

        //makes a function to spawn player
        game.data.player = me.pool.pull("player", x, y, {});
        me.game.world.addChild(game.data.player, 20);
    }
});
