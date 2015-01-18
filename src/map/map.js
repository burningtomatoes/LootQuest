var Map = Class.extend({
    entities: [],
    paused: false,
    id: null,
    loading: false,
    loaded: false,
    data: null,
    darkness: null,

    init: function () {
        this.clear();

        this.loading = false;
        this.loaded = false;
        this.darkness = Gfx.load('darkness');
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

            .error(function(obj, msg, e) {
                console.error('[Map] A network error occurred while loading the map data.', msg, e);

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
        Music.stopAll();

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

        this.prepareBlockMap();

        Camera.centerToMap();

        if (typeof(this.data.properties) != 'undefined') {
            var props = this.data.properties;

            if (props.ambience) {
                Music.loopSound(this.data.properties.ambience);
            }
        }
    },

    blockedTiles: [],
    blockedRects: [],
    teleRects: [],

    prepareBlockMap: function () {
        this.blockedTiles = [];

        var layerCount = this.layers.length;

        for (var i = 0; i < layerCount; i++) {
            var layer = this.layers[i];
            var layerDataLength = layer.data.length;

            var x = -1;
            var y = 0;

            var isBlocking = typeof(layer.properties) != 'undefined' && layer.properties.blocked == '1';
            var isTeleportingTo = typeof(layer.properties) != 'undefined' && layer.properties.teleport != null ? layer.properties.teleport : null;

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

                var rect = {
                    top: y * Settings.tileSize,
                    left: x * Settings.tileSize,
                    width: Settings.tileSize,
                    height: Settings.tileSize
                };
                rect.bottom = rect.top + rect.height;
                rect.right = rect.left + rect.width;

                if (isBlocking) {
                    this.blockedTiles.push(x);
                    this.blockedTiles.push(y);
                    this.blockedRects.push(rect);
                }

                if (isTeleportingTo != null) {
                    rect.teleportTo = isTeleportingTo;
                    this.teleRects.push(rect);
                }
            }
        }
    },

    isCoordBlocked: function (x, y) {
        // Every even index contains X coord, odd index contains Y coord
        var blockedTilesLength = this.blockedTiles.length;
        for (var i = 0; i < blockedTilesLength; i += 2) {
            var x2 = this.blockedTiles[i];
            var y2 = this.blockedTiles[i + 1];

            if (x == x2 && y == y2) {
                return true;
            }
        }

        return false;
    },

    isRectBlocked: function(rect) {
        var blockedRectsLength = this.blockedRects.length;

        for (var i = 0; i < blockedRectsLength; i++) {
            if (Utils.rectIntersects(rect, this.blockedRects[i])) {
                return true;
            }
        }

        return false;
    },

    getTeleport: function(rect) {
        var teleportsLength = this.teleRects.length;

        for (var i = 0; i < teleportsLength; i++) {
            if (Utils.rectIntersects(rect, this.teleRects[i])) {
                return this.teleRects[i].teleportTo;
            }
        }

        return null;
    },

    clear: function () {
        this.entities = [];
    },

    pause: function () {
        this.paused = true;
        $('#hud').hide();
    },

    resume: function () {
        this.paused = false;
        $('#hud').show();
    },

    player: null,

    add: function (e) {
        this.entities.push(e);
    },

    addPlayer: function (e) {
        this.player = e;
        this.add(e);

        Camera.followEntity(e);
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

        ctx.drawImage(this.darkness, 0, 0, Canvas.canvas.width, Canvas.canvas.height, 0, 0, Canvas.canvas.width, Canvas.canvas.height);
    },

    drawBackground: function (ctx) {
        var layerCount = this.layers.length;

        for (var i = 0; i < layerCount; i++) {
            var layer = this.layers[i];
            var layerDataLength = layer.data.length;

            var x = -1;
            var y = 0;

            var isBlocking = Settings.drawCollisions && typeof(layer.properties) != 'undefined' && layer.properties.blocked == '1';

            if (!Settings.drawCollisions && !layer.visible) {
                continue;
            }

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

                var destX = Camera.translateX(x * Settings.tileSize);
                var destY = Camera.translateY(y * Settings.tileSize);

                ctx.drawImage(this.tileset, srcX, srcY, Settings.tileSize, Settings.tileSize, destX, destY, Settings.tileSize, Settings.tileSize);

                if (isBlocking) {
                    ctx.beginPath();
                    ctx.rect(destX, destY, Settings.tileSize, Settings.tileSize);
                    ctx.strokeStyle = "#FCEB77";
                    ctx.stroke();
                    ctx.closePath();
                }
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