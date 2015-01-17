var Game = {
    map: null,

    initialize: function () {
        Canvas.initialize();
    },

    start: function () {
        Canvas.$canvas.hide();
        this.loadMap('dungeon_1');
    },

    loadMap: function (id) {
        var execLoad = function() {
            this.map = new Map();
            this.map.load(id, function () {
                Canvas.$canvas.delay(200).fadeIn('slow');
            });
        }.bind(this);

        if (Canvas.$canvas.is(':visible')) {
            execLoad();
        } else {
            Canvas.$canvas.fadeOut('fast', execLoad);
        }
    },

    draw: function (ctx) {
        if (this.map != null) {
            this.map.draw(ctx);
        }
    },

    update: function () {
        if (this.map != null) {
            this.map.update();
        }
    }
};