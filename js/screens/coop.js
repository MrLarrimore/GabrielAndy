game.Coop = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //two player screen
    onResetEvent: function() {
        //sets background imaage
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('gold-screen')), -10); // TODO
        //binds keys
        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        //adds text object
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [100, 300, 300, 50]);
                this.font = new me.Font("Arial", 55, "black");


            },
            draw: function(renderer) {
                //draw text
                this.font.draw(renderer.getContext(), "F1 for single player. F2 for co-op", this.pos.x, this.pos.y);

            },
            update: function(dt) {
                return true;
            }
        })));
//creates a handler for key presses
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "F1") {
                //1player
                game.data.twoplayer = false;

               
               
                game.data.playerAttack = 1;
                game.data.playerHealth = 6;
                me.state.change(me.state.SELECT);
            } else if (action === "F2") {
                //two player
                game.data.twoplayer = true;
              
  
                game.data.playerHealth = 8;
                game.data.playerAttack = 1;
                me.state.change(me.state.SELECT);
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

        me.event.unsubscribe(this.handler);
    }
});



