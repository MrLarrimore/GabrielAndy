game.PickPlayer = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    // player selection screen
    onResetEvent: function() {
        me.audio.pause("title-music");
        me.audio.play("select-char", true, null, .10);
        me.audio.play("select-music", true, null, .08);

        //sets background image
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('select-screen')), -10); // TODO
        me.game.world.addChild(new me.Sprite(75, 20, me.loader.getImage('choos-char')), -9); // TODO
        //shows icon images for charecter selectin
        



        //binds keys
        
        //makes buttons visiible
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("register").style.visibility = "visible";
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

        //adds object that is text
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [200, 300, 58, 63]);
                this.font = new me.Font("Arial", 55, "black");
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);
                game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('orcIcon'));
            },
            draw: function(renderer) {

this.font.draw(renderer.getContext(), "Player 1", 125,400);
            },
            update: function(dt) {
                return true;
            },
            newGame: function() {

                me.input.releasePointerEvent('pointerdown', this);
                me.game.world.addChild(new me.Sprite(125, 450, me.loader.getImage('orcIcon')), -7); // TODO

            }
        })));

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [700, 300, 58, 63]);
                this.font = new me.Font("Arial", 55, "black");
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);
                me.game.world.addChild(new me.Sprite(700, 300, me.loader.getImage('elfIcon')), -9); // TODO
            },
            draw: function(renderer) {


            },
            update: function(dt) {
                return true;
            },
            newGame: function() {

                me.input.releasePointerEvent('pointerdown', this);
                me.game.world.addChild(new me.Sprite(125, 450, me.loader.getImage('elfIcon')), -7); // TODO

            }
        })));

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [450, 300, 58, 63]);
                this.font = new me.Font("Arial", 55, "black");
                me.input.registerPointerEvent("pointerdown", this, this.newGame.bind(this), true);

                var MySprite = me.Sprite.extend({
                    init: function() {
                        this._super(me.Sprite, "init", [450, 300, me.loader.getImage('wizardIcon')]);
                        this.z = 2;
                    }
                });
                me.game.world.addChild(new MySprite());
            },
            draw: function(renderer) {


            },
            update: function(dt) {
                return true;
            },
            newGame: function() {

                me.input.releasePointerEvent('pointerdown', this);

                var MySprite = me.Sprite.extend({
                    init: function() {
                        this._super(me.Sprite, "init", [125, 450, me.loader.getImage('wizardIcon')]);
                        this.z = 2;
                    }
                });
                me.game.world.addChild(new MySprite());

            }
        })));




    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        //unbinds everything
       
        //hides buttons again
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("register").style.visibility = "hidden";
    }
});

