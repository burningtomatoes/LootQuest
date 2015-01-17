var Map = Class.extend({
    entities: [],
    paused: false,
    id: null,
    loading: false,
    loaded: false,
    data: null,

    init: function () {
        this.clear();

        this.loading = false;
        this.loaded = false;
    },

    load: function (id, callback) {
        if (this.loading) {
            return;
        }

        if (callback == null) {
            callback = function() { };
        }

        this.id = id;
        this.loading = true;

        $.get('assets/maps/' + id + '.json')

        .success(function(data) {
            this.data = data;
            this.processData();

            this.loading = false;
            this.loaded = true;

            callback(true);
        }.bind(this))

        .error(function() {
            this.loading = false;
            this.loaded = false;

            callback(false);
        }.bind(this));
    },

    tileset: null,

    processData: function() {
        var tilesetSrc = this.data.tilesets[0].image;
        tilesetSrc = tilesetSrc.replace('../images/', '');
        tilesetSrc = tilesetSrc.replace('.png', '');

        this.tileset = Gfx.load(tilesetSrc);
    },

    clear: function () {
        this.entities = [];
    },

    pause: function () {
        this.paused = true;
    },

    resume: function () {
        this.paused = false;
    },

    add: function (e) {
        this.entities.add(e);
    },

    remove: function (e) {
        var idx = this.entities.indexOf(e);

        if (idx > 0) {
            this.entities.splice(idx, 1);
            return true;
        }

        return false;
    },

    draw: function (ctx) {
        var entityCount = this.entities.length;

        for (var i = 0; i < entityCount; i++) {
            this.entities[i].draw(ctx);
        }
    },

    update: function () {
        if (this.paused) {
            return;
        }

        var entityCount = this.entities.length;

        for (var i = 0; i < entityCount; i++) {
            this.entities[i].update();
        }
    }
});