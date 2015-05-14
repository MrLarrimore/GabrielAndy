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
        me.audio.playTrack("eminem");

//adds a o object that is text
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //makes text settings
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Arial", 46, "white");
                //sets click events
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);
            },
            draw: function(renderer) {
                //draws text
                this.font.draw(renderer.getContext(), "Start a New Game", this.pos.x, this.pos.y);

            },
            update: function(dt) {
                return true;
            },
            newGame: function() {

                me.input.releasePointerEvent('pointerdown', this);
                //set state to new
                me.state.change(me.state.NEW);

            }
        })));


//same as above

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                this.font = new me.Font("Arial", 46, "white");
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);

            },
            update: function(dt) {
                return true;
            },
            newGame: function() {
                me.input.releasePointerEvent('pointerdown', this);
                me.state.change(me.state.LOAD);

            }
        })));
    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {

    }
});
