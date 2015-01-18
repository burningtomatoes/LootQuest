var Player = Entity.extend({
    healthValue: 6,
    healthCapacity: 12,
    damageFlash: 0,

    init: function() {
        this._super();

        this.width = 32;
        this.height = 18;

        this.setCoord(9, 2);

        this.sprite = Gfx.load('hero');
        this.spriteShadow = Gfx.load('hero_shadow');

        this.healthCapacity = 12;
        this.healthValue = this.healthCapacity;
        this.syncHealthUi();
    },

    syncHealthUi: function() {
        var $health = $('#health');
        var hearts = Math.ceil(this.healthCapacity / 4);
        var capacityDrawn = 0;

        $health.html('');

        for (var i = 0; i < hearts; i++) {
            var capacityLeft = this.healthValue - capacityDrawn;
            var capacity = capacityLeft > 4 ? 4 : capacityLeft;
            capacityDrawn += capacity;
            capacityLeft = this.healthValue - capacityDrawn;

            var $image = $('<img />')
                .attr('src', 'assets/images/health_' + capacity + '.png')
                .addClass(capacity > 0 ? 'filled' + capacity : 'empty')
                .addClass(capacityLeft == 0 ? 'last' : 'notlast')
                .appendTo($health);
        }
    },

    damage: function (changeValue) {
        if (this.healthValue <= 0) {
            return;
        }

        if (changeValue > 0) {
            this.damageFlash = 1;
        }

        this.healthValue -= changeValue;

        if (this.healthValue <= 0) {
            this.healthValue = 0;
            this.die();
        }

        this.syncHealthUi();
    },

    die: function() {
        alert('u ded');
    },

    update: function() {
        if (Keyboard.isKeyDown(KeyEvent.DOM_VK_LEFT) || Keyboard.isKeyDown(KeyEvent.DOM_VK_A)) {
            this.velocityX = -this.movementSpeed;
            this.direction = Direction.LEFT;
        } else if (Keyboard.isKeyDown(KeyEvent.DOM_VK_RIGHT) || Keyboard.isKeyDown(KeyEvent.DOM_VK_D)) {
            this.velocityX = +this.movementSpeed;
            this.direction = Direction.RIGHT;
        } else {
            this.velocityX = 0;
        }

        if (Keyboard.isKeyDown(KeyEvent.DOM_VK_UP) || Keyboard.isKeyDown(KeyEvent.DOM_VK_W)) {
            this.velocityY = -this.movementSpeed;
            this.direction = Direction.UP;
        } else if (Keyboard.isKeyDown(KeyEvent.DOM_VK_DOWN) || Keyboard.isKeyDown(KeyEvent.DOM_VK_S)) {
            this.velocityY = +this.movementSpeed;
            this.direction = Direction.DOWN;
        } else {
            this.velocityY = 0;
        }

        if (this.damageFlash > 0) {
            this.damageFlash--;
        }

        this._super();
    },

    draw: function(ctx) {
        if (this.damageFlash > 0) {
            ctx.rect(0, 0, Canvas.canvas.width, Canvas.canvas.height);
            ctx.fillStyle = '#ff0000';
            ctx.fill();
        }

        this._super(ctx);
    }
});