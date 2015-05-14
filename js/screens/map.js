game.Map = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //map selection
    onResetEvent: function() {
        //sets background image
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('gold-screen')), -10); // TODO
        //shows map images
        me.game.world.addChild(new me.Sprite(100, 100, me.loader.getImage('map1')), -9); // TODO
        me.game.world.addChild(new me.Sprite(600, 100, me.loader.getImage('map2')), -9); // TODO
        me.game.world.addChild(new me.Sprite(350, 350, me.loader.getImage('map3')), -9); // TODO
        //binds keys

        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");



//adds object thats text
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [100, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");


            },
            draw: function(renderer) {
                //draws text
                this.font.draw(renderer.getContext(), "press f1 to f3 to choose map", this.pos.x, this.pos.y);

            },
            update: function(dt) {
                return true;
            }
        })));
//creates a handler that checks for key presses
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "F1") {
                game.data.map = 1;

                me.state.change(me.state.PLAY);
            } else if (action === "F2") {
                game.data.map = 2;

                me.state.change(me.state.PLAY);
            } else if (action === "F3") {
                game.data.map = 3;
                me.state.change(me.state.PLAY);
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


        me.event.unsubscribe(this.handler);
    }
});



