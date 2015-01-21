var Chest = Container.extend({
    init: function() {
        this._super();

        this.spriteNormal = Gfx.load('chest_closed');
        this.spriteDestroyed = Gfx.load('chest_open');
        this.sprite = this.spriteNormal;
        this.width = 48;
        this.height = 32;

        this.generateHurtSprite();
    },

    damage: function (value) {
        if (value === 0) {
            // This chest can be opened w/o a weapon as well. Zero damage is fine by us.
            value++;
        }

        this._super(value);
    }
});