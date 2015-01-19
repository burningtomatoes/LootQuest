var Game = {
    map: null,
    lastMapId: null,

    initialize: function () {
        Canvas.initialize();
        Keyboard.bind();
    },

    start: function () {
        Canvas.$canvas.hide();
        this.loadMap('dungeon_1');
    },

    loadMap: function (id) {
        var execLoad = function() {
            this.map = new Map();
            this.map.load(id, function (okay) {
                if (!okay) {
                    alert('Something went wrong, could not load the next part of the game. Sorry... we let you down.');
                    return;
                }

                Canvas.$canvas.delay(200).fadeIn(this.lastMapId == null ? 2000 : 'fast');
                this.lastMapId = id;
            }.bind(this));
        }.bind(this);

        if (!Canvas.$canvas.is(':visible')) {
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

        Dialogue.update();
        Keyboard.update();
        Camera.update();
    }
};