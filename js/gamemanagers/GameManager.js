game.SpendGold = Object.extend({
    init: function(x, y, settings) {
        //same variables that i went over in pause screen
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    update: function() {
        //same as pause sscreen
        this.now = new Date().getTime();
        if (me.input.isKeyPressed("buy") && this.now - this.lastBuy >= 1000) {
            this.lastBuy = this.now;
            if (!this.buying) {
                this.startBuying();
            } else {
                this.stopBuying();
            }
        }
        this.checkBuyKeys();
        return true;
    },
    startBuying: function() {
        //same as pause screen
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
        game.data.buyscreen.updateWhenPaused = true;
        game.data.buyscreen.setOpacity(0.8);
        me.game.world.addChild(game.data.buyscreen, 34);
        game.data.player.body.setVelocity(0, 0);
        //binds keys
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
        this.setBuyText();
    },
    setBuyText: function() {
        game.data.buytext = new (me.Renderable.extend({
            init: function() {
                //same as pause screen
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            draw: function(renderer) {
                //same as pause screen
                this.font.draw(renderer.getContext(), "press f1 to f6 to buy, b to exit", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "CURRENT Gold: " + game.data.gold, this.pos.x, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "f1: INCREASE DAMAGE || CURRENT LEVEL: " + game.data.skill1 + " || COST: " + ((game.data.skill1 + 1) * 10), this.pos.x, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "f2: RUN FASTER || CURRENT LEVEL: " + game.data.skill2 + " || COST: " + ((game.data.skill2 + 1) * 10), this.pos.x, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "f3: INCREASE HEALTH || CURRENT LEVEL: " + game.data.skill3 + " || COST: " + ((game.data.skill3 + 1) * 10), this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "f4: SPTINT || CURRENT LEVEL: " + game.data.ability1 + " || COST: " + ((game.data.ability1 + 1) * 10), this.pos.x, this.pos.y + 250);
                this.font.draw(renderer.getContext(), "f5: EAT YOUR  FOR HEALTH|| CURRENT LEVEL: " + game.data.ability2 + " || COST: " + ((game.data.ability2 + 1) * 10), this.pos.x, this.pos.y + 300);
                this.font.draw(renderer.getContext(), "f6: Throw your spear || CURRENT LEVEL: " + game.data.ability3 + " || COST: " + ((game.data.ability3 + 1) * 10), this.pos.x, this.pos.y + 350);
            },
            update: function(dt) {
                return true;
            }
        }));
        me.game.world.addChild(game.data.buytext, 35);
    },
    stopBuying: function() {
        //undos everything from start buying
        this.buying = false;
        me.state.resume(me.state.PLAY);
        me.game.world.removeChild(game.data.buyscreen);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        me.game.world.removeChild(game.data.buytext);
    },
    ////////////////////////                    
    //SAME AS PAUSE SCREEN//
    ////////////////////////
    checkBuyKeys: function() {
        if (me.input.isKeyPressed("F1")) {
            if (this.checkCost(1)) {
                this.makePurchase(1);
            }
        } else if (me.input.isKeyPressed("F2")) {
            if (this.checkCost(2)) {
                this.makePurchase(2);
            }
        } else if (me.input.isKeyPressed("F3")) {
            if (this.checkCost(3)) {
                this.makePurchase(3);
            }
        } else if (me.input.isKeyPressed("F4")) {
            if (this.checkCost(4)) {
                this.makePurchase(4);
            }
        } else if (me.input.isKeyPressed("F5")) {
            if (this.checkCost(5)) {
                this.makePurchase(5);
            }
        } else if (me.input.isKeyPressed("F6")) {
            if (this.checkCost(6)) {
                this.makePurchase(6);
            }
        }
    },
    checkCost: function(skill) {
        if (skill === 1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))) {
            return true;
        } else if (skill === 2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))) {
            return true;
        } else if (skill === 3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))) {
            return true;
        } else if (skill === 4 && (game.data.gold >= ((game.data.ability1 + 1) * 10))) {
            return true;
        } else if (skill === 5 && (game.data.gold >= ((game.data.ability2 + 1) * 10))) {
            return true;
        } else if (skill === 6 && (game.data.gold >= ((game.data.ability3 + 1) * 10))) {
            return true;
        } else {
            return false;
        }
    },
    makePurchase: function(skill) {
        if (skill === 1) {
            game.data.gold -= ((game.data.skill1 + 1) * 10);
            game.data.skill1 += 1;
            game.data.playerAttack += 1;
        } else if (skill === 2) {
            game.data.gold -= ((game.data.skill2 + 1) * 10);
            game.data.skill2 += 1;
            game.data.playerMoveSpeed += 2;
        } else if (skill === 3) {
            game.data.gold -= ((game.data.skill3 + 1) * 10);
            game.data.skill3 += 1;
            game.data.playerHealth += 5;
        } else if (skill === 4) {
            game.data.gold -= ((game.data.ability1 + 1) * 10);
            game.data.ability1 += 1;
        } else if (skill === 5) {
            game.data.gold -= ((game.data.ability2 + 1) * 10);
            game.data.ability2 += 1;
        } else if (skill === 6) {
            game.data.gold -= ((game.data.ability3 + 1) * 10);
            game.data.ability3 += 1;
        }
    }
});
