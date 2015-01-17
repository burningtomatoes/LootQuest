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

        console.info('[Map] Loading map', id);

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

    layers: null,
    tileset: null,

    height: 0,
    width: 0,
    heightPx: 0,
    widthPx: 0,
    tilesPerRow: 0,

    processData: function() {
        var tilesetSrc = this.data.tilesets[0].image;
        tilesetSrc = tilesetSrc.replace('../images/', '');
        tilesetSrc = tilesetSrc.replace('.png', '');

        this.height = this.data.height;
        this.width = this.data.width;
        this.heightPx = this.height * Settings.tileSize;
        this.widthPx = this.width * Settings.tileSize;
        this.tileset = Gfx.load(tilesetSrc);
        this.layers = this.data.layers;
        this.tilesPerRow = this.data.tilesets[0].imagewidth / Settings.tileSize;
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
        if (!this.loaded) {
            return;
        }

        this.drawBackground(ctx);
        this.drawEntities(ctx);
    },

    drawBackground: function (ctx) {
        var layerCount = this.layers.length;

        for (var i = 0; i < layerCount; i++) {
            var layer = this.layers[i];
            var layerDataLength = layer.data.length;

            var x = -1;
            var y = 0;

            for (var tileIdx = 0; tileIdx < layerDataLength; tileIdx++) {
                var tid = layer.data[tileIdx];

                x++;

                if (x >= this.width) {
                    y++;
                    x = 0;
                }

                if (tid === 0) {
                    // Invisible (no tile set for this position)
                    continue;
                }

                tid--; // tid is offset by one, for calculation purposes we need it to start at zero

                var fullRows = Math.floor(tid / this.tilesPerRow);

                var srcY = fullRows * Settings.tileSize;
                var srcX = (tid * Settings.tileSize) - (fullRows * this.tilesPerRow * Settings.tileSize);

                var destX = x * Settings.tileSize;
                var destY = y * Settings.tileSize;

                ctx.drawImage(this.tileset, srcX, srcY, Settings.tileSize, Settings.tileSize, destX, destY, Settings.tileSize, Settings.tileSize);
            }
        }
    },

    drawEntities: function (ctx) {
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