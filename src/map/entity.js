var Entity = Class.extend({
    posX: 0,
    posY: 0,

    init: function() {
        this.posX = 0;
        this.posY = 0;
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
        // ...
    },

    update: function() {
        // ...
    }
});