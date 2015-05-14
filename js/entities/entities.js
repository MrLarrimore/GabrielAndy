var speed;
var age;
var moonWalk = "false";
var speedbar = 100;



game.PlayerEntity = me.Entity.extend({
    init: function(x, y, z, settings) {
        //calls functions to set variables and stets varaibles
        this.setSuper();
        this.setPlayerTimers();
        this.setAttributes();
        this.setFlags();
        this.type = "PlayerEntity";
        this.addAnimation();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.setCurrentAnimation("idle");

    },
    //sets class
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: game.data.select,
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 30, 57)).toPolygon();
                }
            }]);
    },
    //how fast u can attack
    setPlayerTimers: function() {

        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    //health attack and speed
    setAttributes: function() {
        this.body.setVelocity(game.data.playerMoveSpeed, 1);
        this.health = game.data.playerHealth;
        this.atack = game.data.playerAttack;
    },
    //if you are dead faacing right or attacking
    setFlags: function() {
        //keeps track of which direction player is facing
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    //adds animations
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.addAnimation("dead", [264]);
    },
    update: function(delta) {
        //checks if dead
        this.dead = this.checkIfDead();
//only run code if alive
        if (this.health > 0) {
            this.dead = false;
            //sets sprint stamina
            if (speedbar < 100 && !me.input.isKeyPressed("sprint2")) {
                speedbar += .3;
                console.log(speedbar);
            }
            //updates a variabel and calls functions
            this.now = new Date().getTime();
            this.checkKeyPressesAndMove();
            this.setAnimation();
//sprint
            if (me.input.isKeyPressed("sprint2") && speedbar >= 1) {
                this.body.setVelocity(10, 20);
                speedbar--;
                console.log(speedbar);
            }
            else if (me.input.isKeyPressed("sneak2")) {
                this.body.setVelocity(1, 20);
            }
            else if (speed === true) {
                this.body.setVelocity(50, 20);
            }
            else {

                this.body.setVelocity(game.data.playerMoveSpeed, 20);
            }
//cheat
            if (me.input.isKeyPressed("cheat2")) {
                me.input.unbindKey(me.input.KEY.CTRL);
                var age = prompt("whats yor cheat code?");
                if (age == "supersonic speed") {
                    confirm("speed cheat activated.");
                    speed = true;
                }
                if (age == "michael jackson") {
                    confirm("You have activated moonwalking.");
                    moonWalk = "true";
                }
                me.input.bindKey(me.input.KEY.CTRL, "cheat");
            }

//revive

            if (me.input.isKeyPressed("revive2")) {
                this.reviving = true;
            }
            else {
                this.reviving = false;
            }

        }


        me.collision.check(this, true, this.collideHandler.bind(this), true)
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //moves left and right
    checkKeyPressesAndMove: function() {
        if (me.input.isKeyPressed("right2")) {
            this.moveRight();
        }
        else if (me.input.isKeyPressed("left2")) {
            this.moveLeft();
        }
        else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump2") && !this.body.jumping && !this.body.falling) {
            this.Jump();
        }

        this.attacking = me.input.isKeyPressed("attack2");

    },
    //moves right
    moveRight: function() {
        //adds the position of my x by by the velocity defined above in set velocity
        //and multiplying it by me.timer.tick
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        if (moonWalk == "true") {

//flips animation
            this.flipX(false);
        }
        else if (moonWalk == "false") {
            //flips animation
            this.flipX(true);
        }
        this.facing = "right";
    },
    //moves right
    moveLeft: function() {
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        if (moonWalk == "true") {

//flips animation
            this.flipX(true);
        }
        else if (moonWalk == "false") {
            //flips animation
            this.flipX(false);
        }
        this.facing = "left";
    },
    //jumps
    Jump: function() {
        this.body.jumping = true;

        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
    },
    //sets animations
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                console.log("we made it");
                //sets current animation to attack and when its done it 
                //sets it to idle
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that the sequence of animations start over
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }
        else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    //revives player
    revive: function() {
        if (this.health < 20) {
            this.health++;
        }
    },
    //collides checker
    collideHandler: function(response) {
       
        if (response.b.type === 'Player2Entity') {
            if (this.reviving === true) {
                response.b.revive();
            }

        } else {
         
        }

    },
    //makes you loose health
    loseHealth: function(damage) {
        if (this.health > 0) {
            this.health = this.health - damage;
        }
        console.log(this.health);
    },
    //checks if your dead
    checkIfDead: function() {
        if (this.health <= 0) {
            if (game.data.twoplayer === false) {
                game.data.win = false;


            } else if (game.data.twoplayer === true) {
                this.renderable.setCurrentAnimation("dead", "dead");
            }

            this.dead = true;
        }
        return false;
    },
    
  
    //stops player movement
    stopMovement: function(xdif) {
        if (xdif > 0) {
            this.pos.x = this.pos.x + 1;
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            this.pos.x = this.pos.x - 1;
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    //checks attack
    checkAttack: function(xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "right") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            return true;
        }
        return false;
    }

});


////////////////////////////////////
//modified version of PlayerEntity//
////////////////////////////////////
game.Player2Entity = me.Entity.extend({
    init: function(x, y, z, settings) {
        this.setSuper();
        this.setPlayerTimers();
        this.setAttributes();
        this.setFlags();
        this.type = "Player2Entity";
        this.addAnimation();
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.setCurrentAnimation("idle");

    },
    setSuper: function(x, y) {
        this._super(me.Entity, 'init', [x, y, {
                image: game.data.select,
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 30, 57)).toPolygon();
                }
            }]);
    },
    setPlayerTimers: function() {

        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastAttack = new Date().getTime();
    },
    setAttributes: function() {
        this.body.setVelocity(game.data.playerMoveSpeed, 1);
        this.health = game.data.playerHealth;
        this.atack = game.data.playerAttack;
    },
    setFlags: function() {
        //keeps track of which direction player is facing
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        this.renderable.addAnimation("dead", [264]);
    },
    update: function(delta) {
        this.dead = this.checkIfDead();

        if (this.health > 0) {
            this.dead = false;
            if (speedbar < 100 && !me.input.isKeyPressed("sprint")) {
                speedbar += .3;
                console.log(speedbar);
            }
            this.now = new Date().getTime();
            this.checkKeyPressesAndMove();
            this.setAnimation();

            if (me.input.isKeyPressed("sprint") && speedbar >= 1) {
                this.body.setVelocity(10, 20);
                speedbar--;
                console.log(speedbar);
            }
            else if (me.input.isKeyPressed("sneak")) {
                this.body.setVelocity(1, 20);
            }
            else if (speed === true) {
                this.body.setVelocity(50, 20);
            }
            else {

                this.body.setVelocity(game.data.playerMoveSpeed, 20);
            }

            if (me.input.isKeyPressed("cheat")) {
                me.input.unbindKey(me.input.KEY.CTRL);
                var age = prompt("whats yor cheat code?");
                if (age == "supersonic speed") {
                    confirm("speed cheat activated.");
                    speed = true;
                }
                if (age == "michael jackson") {
                    confirm("You have activated moonwalking.");
                    moonWalk = "true";
                }
                me.input.bindKey(me.input.KEY.CTRL, "cheat");
            }



            if (me.input.isKeyPressed("revive")) {
                this.reviving = true;
            }
            else {
                this.reviving = false;
            }

        }


        me.collision.check(this, true, this.collideHandler.bind(this), true)
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkKeyPressesAndMove: function() {
        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        }
        else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        }
        else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
            this.Jump();
        }

        this.attacking = me.input.isKeyPressed("attack");

    },
    moveRight: function() {
        //adds the position of my x by by the velocity defined above in set velocity
        //and multiplying it by me.timer.tick
        //me.timer.tick makes the movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        if (moonWalk == "true") {

//flips animation
            this.flipX(false);
        }
        else if (moonWalk == "false") {
            //flips animation
            this.flipX(true);
        }
        this.facing = "right";
    },
    moveLeft: function() {
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        if (moonWalk == "true") {

//flips animation
            this.flipX(true);
        }
        else if (moonWalk == "false") {
            //flips animation
            this.flipX(false);
        }
        this.facing = "left";
    },
    Jump: function() {
        this.body.jumping = true;

        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
    },
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                console.log("we made it");
                //sets current animation to attack and when its done it 
                //sets it to idle
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so that the sequence of animations start over
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }
        else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    revive: function() {
        if (this.health < 20) {
            this.health++;
        }
    },
    collideHandler: function(response) {
     
     

        if (response.b.type === 'PlayerEntity') {
            if (this.reviving === true) {
                response.b.revive();
            }

        } else {
           
        }

    },
    loseHealth: function(damage) {
        if (this.health > 0) {
            this.health = this.health - damage;
        }
        console.log(this.health);
    },
    checkIfDead: function() {
        if (this.health <= 0) {

            this.renderable.setCurrentAnimation("dead", "dead");


            this.dead = true;
        }
        return false;
    },
    
    
    
    stopMovement: function(xdif) {
        if (xdif > 0) {
            this.pos.x = this.pos.x + 1;
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            this.pos.x = this.pos.x - 1;
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    checkAttack: function(xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "right") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            return true;
        }
        return false;
    }

});


