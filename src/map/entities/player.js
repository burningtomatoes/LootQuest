var Player = Entity.extend({
    init: function() {
        this._super();

        this.width = 32;
        this.height = 18;

        this.setCoord(9, 2);

        this.sprite = Gfx.load('hero');
        this.spriteShadow = Gfx.load('hero_shadow');
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

        this._super();
    }
});