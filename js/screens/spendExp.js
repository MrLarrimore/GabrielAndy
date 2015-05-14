game.SpendExp = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        //sets background
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
//binds keys
        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        me.input.bindKey(me.input.KEY.F4, "F4");
        me.input.bindKey(me.input.KEY.F5, "F5");
        //sets up cost variables
        var exp1cost = ((Number(game.data.exp1 + 1)) * 10);
        var exp2cost = ((Number(game.data.exp2 + 1)) * 10);
        var exp3cost = ((Number(game.data.exp3 + 1)) * 10);
        var exp4cost = ((Number(game.data.exp4 + 1)) * 10);
//makes a object that is text
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [100, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");


            },
            draw: function(renderer) {
                //draws text
                this.font.draw(renderer.getContext(), "press f1 to f4 to buy, f5 to skip", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
                this.font.draw(renderer.getContext(), "f1: INCREASE GOLD PRODUCTION || CURRENT LEVEL: " + game.data.exp1.toString() + " || COST: " + exp1cost, this.pos.x, this.pos.y + 100);
                this.font.draw(renderer.getContext(), "f2: ADD STARTING GOLD || CURRENT LEVEL: " + game.data.exp2.toString() + " || COST: " + exp2cost, this.pos.x, this.pos.y + 150);
                this.font.draw(renderer.getContext(), "f3: INCREASE DAMAGE || CURRENT LEVEL: " + game.data.exp3.toString() + " || COST: " + exp3cost, this.pos.x, this.pos.y + 200);
                this.font.draw(renderer.getContext(), "f4: INCREASE START HEALTH || CURRENT LEVEL: " + game.data.exp4.toString() + " || COST: " + exp4cost, this.pos.x, this.pos.y + 250);
            },
            update: function(dt) {
                return true;
            }
        })));
//handler for key presses
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "F1") {
                if (game.data.exp >= exp1cost) {
                    game.data.exp1 += 1;
                    game.data.exp -= exp1cost;

                } else {
                    confirm("not enought experience");
                }

            } else if (action === "F2") {

            } else if (action === "F3") {

            } else if (action === "F4") {

            } else if (action === "F5") {
                me.state.change(me.state.MAP);
            }
        });



    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        //unbinds everything
        me.input.unbindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.input.unbindKey(me.input.KEY.F5, "F5");
        me.event.unsubscribe(this.handler);
    }
});

