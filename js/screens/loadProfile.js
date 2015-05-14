game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //loads user
    onResetEvent: function() {
        //sets background image
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO
        //sets buttons to visible
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("load").style.visibility = "visible";
//unbinds all the keys
        me.input.unbindKey(me.input.KEY.F1);
        me.input.unbindKey(me.input.KEY.F2);
        me.input.unbindKey(me.input.KEY.F3);
        me.input.unbindKey(me.input.KEY.F4);
        me.input.unbindKey(me.input.KEY.F5);
        me.input.unbindKey(me.input.KEY.F6);
        me.input.unbindKey(me.input.KEY.RIGHT);
        me.input.unbindKey(me.input.KEY.LEFT);
        me.input.unbindKey(me.input.KEY.PAGE_UP);
        me.input.unbindKey(me.input.KEY.ALT);
        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.PAGE_DOWN);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.ALT);
        me.input.unbindKey(me.input.KEY.W);
        me.input.unbindKey(me.input.KEY.A);
        me.input.unbindKey(me.input.KEY.S);
        me.input.unbindKey(me.input.KEY.D);
        me.input.unbindKey(me.input.KEY.CTRL);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindKey(me.input.KEY.SHIFT);
        me.input.unbindKey(me.input.KEY.F12);
        me.input.unbindKey(me.input.KEY.E);
        me.input.unbindKey(me.input.KEY.U);
        me.input.unbindKey(me.input.KEY.Z);
        me.input.unbindKey(me.input.KEY.X);
        me.input.unbindKey(me.input.KEY.C);
        //adds text object
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [100, 10, 300, 50]);
                this.font = new me.Font("Arial", 26, "white");


            },
            draw: function(renderer) {
                //draws text
                this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD", this.pos.x, this.pos.y);
            },
            update: function(dt) {
                return true;
            }
        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        //hides buttons again
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("load").style.visibility = "hidden";

    }
});