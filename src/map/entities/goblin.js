var Goblin = Entity.extend({
    init: function() {
        this._super();

        this.width = 28;
        this.height = 18;

        this.sprite = Gfx.load('goblin');
        this.spriteShadow = Gfx.load('hero_shadow');

        this.setCoord(9, 9);
    },

    moveDirection: 0,
    canContinue: true,
    attentionSpan: 0,
    restTimer: 0,

    update: function() {
        this._super();

        if (!this.canContinue) {
            this.moveDirection = Math.round(Math.random() * 3) + 1;
            this.attentionSpan = Math.round(Math.random() * 300);
            this.canContinue = true;
        }

        if (this.attentionSpan > 0) {
            this.attentionSpan--;
        }
        if (this.attentionSpan <= 0) {
            this.canContinue = false;
        }

        if (this.restTimer > 0) {
            this.restTimer--;
        }

        this.velocityX = 0;
        this.velocityY = 0;

        if (this.canContinue && this.attentionSpan > 0 && this.restTimer <= 0) {
            switch (this.moveDirection) {
                default:
                case Direction.UP:
                    this.velocityY = -this.movementSpeed;
                    this.direction = Direction.UP;
                    if (!this.canMoveUp()) {
                        this.canContinue = false;
                    }
                    break;
                case Direction.DOWN:
                    this.velocityY = +this.movementSpeed;
                    this.direction = Direction.DOWN;
                    if (!this.canMoveDown()) {
                        this.canContinue = false;
                    }
                    break;
                case Direction.LEFT:
                    this.velocityX = -this.movementSpeed;
                    this.direction = Direction.LEFT;
                    if (!this.canMoveLeft()) {
                        this.canContinue = false;
                    }
                    break;
                case Direction.RIGHT:
                    this.velocityX = +this.movementSpeed;
                    this.direction = Direction.RIGHT;
                    if (!this.canMoveRight()) {
                        this.canContinue = false;
                    }
                    break;
            }
        }

        if (!this.canContinue) {
            this.restTimer = Math.round(Math.random() * 100);
        }
    }
});