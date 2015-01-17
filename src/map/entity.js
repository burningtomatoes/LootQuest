var Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
};

var Entity = Class.extend({
    posX: 0,
    posY: 0,

    height: 0,
    width: 0,

    sprite: null,
    spriteShadow: null,

    velocityX: 0,
    velocityY: 0,

    movementSpeed: 2,

    direction: 0,

    init: function() {
        this.width = 32;
        this.height = 32;
        this.direction = Direction.DOWN;
    },

    setPos: function(x, y) {
        this.posX = x;
        this.posY = y;
    },

    getPos: function() {
        return {
            x: this.posX,
            y: this.posY
        };
    },

    draw: function(ctx) {
        ctx.save();
        ctx.translate(this.posX, this.posY);

        // Beware: I just sort of bruteforced these translations until they looked right. So, yeah.
        switch (this.direction) {
            case Direction.UP:
                break;
            case Direction.RIGHT:
                ctx.rotate(90 * Math.PI / 180);
                ctx.translate(-this.height / 2, -this.width + (this.width / 4));
                break;
            case Direction.DOWN:
                ctx.rotate(180 * Math.PI / 180);
                ctx.translate(-this.width, -this.height);
                break;
            case Direction.LEFT:
                ctx.rotate(90 * Math.PI / 180);
                ctx.translate(-this.height / 2, -this.width + (this.width / 4));
                ctx.scale(-1, 1);
                ctx.translate(-(this.width), 0);
                break;
        }

        if (this.spriteShadow != null) {
            ctx.drawImage(this.spriteShadow, 0, 0, this.width, this.height, 1, 1, this.width, this.height);
        }

        if (this.sprite != null) {
            ctx.drawImage(this.sprite, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
        }

        ctx.restore();
    },

    update: function() {
        this.posX += this.velocityX;
        this.posY += this.velocityY;
    }
});