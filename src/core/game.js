var Game = {
    map: null,

    initialize: function() {
        Canvas.initialize();
    },

    start: function() {
        this.loadMap('dungeon_1');
    },

    loadMap: function(id) {
        this.map = new Map();
        this.map.load(id);
    },

    draw: function(ctx) {
        if (this.map != null) {
            this.map.draw(ctx);
        }
    },

    update: function() {
        if (this.map != null) {
            this.map.update();
        }
    }
};