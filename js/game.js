
/* Game namespace */
var game = {
    // an object where to store game information
    data: {
        // score
        //sets global variables
        score: 0,
        
        playerHealth: 6,
        playerAttack: 1,
        playerAttackTimer: 1000,
        playerMoveSpeed: 5,
        gameTimerManager: "",
        heroDeathManager: "",
        player: "",
        playerdead: false,
        twoplayer: false,
        exp: 0,
        gold: 0,
        exp1: 0,
        exp2: 0,
        exp3: 0,
        exp4: 0,
        win: "",
        pausePos: "",
        buyscreen: "",
        pausescreen: "",
        pausetext: "",
        buytext: "",
        ability1: 0,
        ability2: 0,
        ability3: 0,
        skill1: 0,
        skill2: 0,
        skill3: 0,
        map: 1,
        select: "player"




    },
    // Run on page load.
    "onload": function() {
        // Initialize the video.
        if (!me.video.init("screen", me.video.CANVAS, 1067, 600, true, '1.0')) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (document.location.hash === "#debug") {
            window.onReady(function() {
                me.plugin.register.defer(this, debugPanel, "debug");
            });
        }


//makes custom states
        me.state.SPENDEXP = 112;
        me.state.MAP = 113;
        me.state.COOP = 114;
        me.state.LOAD = 115;
        me.state.NEW = 116;
        me.state.SELECT = 117;


        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },
    // Run on game resources loaded.
    "loaded": function() {
        //shows game what to load
        me.pool.register("player", game.PlayerEntity, true);
     
        me.pool.register("player2", game.Player2Entity, true);

        me.pool.register("GameTimerManager", game.GameTimerManager);
        me.pool.register("HeroDeathManager", game.HeroDeathManager);
        me.pool.register("ExperienceManager", game.ExperienceManager);
        me.pool.register("SpendGold", game.SpendGold);
        me.pool.register("PauseScreen", game.PauseScreen);
//sets states

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.SPENDEXP, new game.SpendExp());
        me.state.set(me.state.MAP, new game.Map());
        me.state.set(me.state.COOP, new game.Coop());
        me.state.set(me.state.LOAD, new game.LoadProfile());
        me.state.set(me.state.NEW, new game.NewProfile());
        me.state.set(me.state.SELECT, new game.PickPlayer());
        // Start the game.
        me.state.change(me.state.MENU);
    }
};
