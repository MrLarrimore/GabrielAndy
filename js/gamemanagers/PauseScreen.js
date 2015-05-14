game.PauseScreen = Object.extend({
    init: function(x, y, settings) {
        //sets variables for pausing
        //gets current time
        this.now = new Date().getTime();
        //the last Pause
        this.lastPause = new Date().getTime();
        //if its paused
        this.paused = false;
        //makes shure its updating
        this.alwaysUpdate = true;
        //lets it update when paused
        this.updateWhenPaused = true;
        //old variable that i am leaving for times sake. it shows if the screen
        //is paused or not
        this.buying = false;
    },
    update: function() {
        //updates variable now
        this.now = new Date().getTime();
        //if pause key is pressed more than a second away from previous one. start buying.
        if (me.input.isKeyPressed("pause") && this.now - this.lastPause >= 1000) {
            //sets last pause
            this.lastPause = this.now;
            if (!this.buying) {
                this.startBuying();
            } else {
                this.stopBuying();
            }
        }
        //checks keys
        this.checkBuyKeys();
        return true;
    },
    startBuying: function() {
        //pauses game
        //paused is true
        this.buying = true;
        //pause PLAY state
        me.state.pause(me.state.PLAY);
        //get pause position
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('pause-screen'));
        game.data.pausescreen.updateWhenPaused = true;
        //sets opacity
        game.data.pausescreen.setOpacity(0.8);
        //adds pause screen to world
        me.game.world.addChild(game.data.pausescreen, 34);
        //sets player velocity to 0
        game.data.player.body.setVelocity(0, 0);
        //sets pause text
        this.setPauseText();
    },
    setPauseText: function() {
        game.data.pausetext = new (me.Renderable.extend({
            init: function() {
                //text settings that is always updataing
                this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            draw: function(renderer) {
                //draws text
                this.font.draw(renderer.getContext(), "Controls", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "WASD or arrow keys to move", this.pos.x, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "Q or Page up to attack", this.pos.x, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "E or PageDown to revive", this.pos.x, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "Shift to sprint", this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "down key to sneak ", this.pos.x, this.pos.y + 250);
                this.font.draw(renderer.getContext(), "", this.pos.x, this.pos.y + 300);
                this.font.draw(renderer.getContext(), "", this.pos.x, this.pos.y + 350);
            },
            update: function(dt) {
                return true;
            }
        }));
        //added pause text to world
        me.game.world.addChild(game.data.pausetext, 35);
    },
    stopBuying: function() {
        //removes and undos everything from start buying
        this.buying = false;
        me.state.resume(me.state.PLAY);
        me.game.world.removeChild(game.data.pausescreen);
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        me.game.world.removeChild(game.data.pausetext);
    },
    checkBuyKeys: function() {
        //self expanitory
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
        //Checks cost
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
        //Makes purchases
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
