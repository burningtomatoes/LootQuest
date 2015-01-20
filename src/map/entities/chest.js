var Chest = Container.extend({
    init: function() {
        this._super();

        this.spriteNormal = Gfx.load('chest_closed');
        this.spriteDestroyed = Gfx.load('chest_open');
        this.sprite = this.spriteNormal;
        this.width = 48;
        this.height = 32;

        this.generateHurtSprite();
    }
});