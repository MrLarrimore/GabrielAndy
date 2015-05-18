game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        //sets backround image
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
        //playing audio tracks
//                me.audio.playTrack("theme");
//                me.audio.resumeTrack("theme");
        me.audio.playTrack("title-music");
        
        

//adds a o object that is text
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //makes text settings
                this._super(me.Renderable, 'init', [425, 375, 200, 100]);
                this.font = new me.Font("Arial", 46, "white");
                //sets click events
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);
            },
            draw: function(renderer) {
                //draws text
                me.game.world.addChild(new me.Sprite(425, 375, me.loader.getImage('start')), -9); // TODO

            },
            update: function(dt) {
                return true;
            },
            newGame: function() {

                me.input.releasePointerEvent('pointerdown', this);
                //set state to new
                me.state.change(me.state.SELECT);

            }
        })));

    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
