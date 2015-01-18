var Camera = {
    x: 0,
    y: 0,

    yLocked: false,
    xLocked: false,

    translateX: function(x) {
        return x + this.x;
    },

    translateY: function(y) {
        return y + this.y;
    },

    translate: function(x, y) {
        return {
            x: this.translateX(x),
            y: this.translateY(y)
        };
    },

    setPos: function(x, y) {
        this.x = x;
        this.y = y;
    },

    trackingEntity: null,

    centerToMap: function() {
        this.x = Canvas.canvas.width / 2 - Game.map.widthPx / 2;
        this.y = Canvas.canvas.height / 2 - Game.map.heightPx / 2;
        this.xLocked = (Canvas.canvas.width > Game.map.widthPx);
        this.yLocked = (Canvas.canvas.height > Game.map.heightPx);
        this.trackingEntity = null;
    },

    followEntity: function(e) {
        this.trackingEntity = e;
    },

    update: function() {
        if (this.trackingEntity != null) {
            if (!this.xLocked) {
                var desiredX = Canvas.canvas.width / 2 - this.trackingEntity.posX - this.trackingEntity.width / 2;
                var maxXSpace = Game.map.widthPx - Canvas.canvas.width;
                this.x = MathHelper.clamp(desiredX, -maxXSpace, 0);
            }

            if (!this.yLocked) {
                var desiredY = Canvas.canvas.height / 2 - this.trackingEntity.posY - this.trackingEntity.height / 2;
                var maxYSpace = Game.map.heightPx - Canvas.canvas.height;
                this.y = MathHelper.clamp(desiredY, -maxYSpace, 0);
            }
        }
    }
};