game.PickPlayer = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    // player selection screen
    onResetEvent: function() {
        //sets background image
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('select-screen')), -10); // TODO
        //shows icon images for charecter selectin
        me.game.world.addChild(new me.Sprite(200, 300, me.loader.getImage('orcIcon')), -9); // TODO
        me.game.world.addChild(new me.Sprite(700, 300, me.loader.getImage('elfIcon')), -9); // TODO
        me.game.world.addChild(new me.Sprite(450, 300, me.loader.getImage('wizardIcon')), -9); // TODO
        //binds keys
        me.input.bindKey(me.input.KEY.F1, "F1");
        me.input.bindKey(me.input.KEY.F2, "F2");
        me.input.bindKey(me.input.KEY.F3, "F3");
        //adds object that is text
        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                //text settings
                this._super(me.Renderable, 'init', [100, 10, 300, 50]);
                this.font = new me.Font("Arial", 55, "black");


            },
            draw: function(renderer) {
                //drawws text
                this.font.draw(renderer.getContext(), "F1-F3 to chose charecter", this.pos.x, this.pos.y);

            },
            update: function(dt) {
                return true;
            }
        })));
//handler to check if keys are pressed
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "F1") {
                //orc
                game.data.select = "player";
                game.data.playerHealth = 8;
                game.data.playerAttack = 2;
                game.data.playerAttackTimer = 1200;
                game.data.playerMoveSpeed = 3;
                me.state.change(me.state.SPENDEXP);
            } else if (action === "F2") {
                //wizard
                game.data.playerHealth = 6;
                game.data.playerAttack = 1;
                game.data.playerAttackTimer = 600;
                game.data.playerMoveSpeed = 5;
                game.data.select = "player2";

                me.state.change(me.state.SPENDEXP);
            } else if (action === "F3") {
                //elf
                game.data.playerHealth = 4;
                game.data.playerAttack = 1;
                game.data.playerAttackTimer = 400;
                game.data.playerMoveSpeed = 7;
                game.data.select = "player3";
                me.state.change(me.state.SPENDEXP);

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

