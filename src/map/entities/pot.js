var Pot = Container.extend({
    init: function () {
        this._super();

        this.spriteNormal = Gfx.load('pot');
        this.spriteDestroyed = Gfx.load('pot_shards');
        this.sprite = this.spriteNormal;
        this.width = 32;
        this.height = 32;

        this.generateHurtSprite();
    },

    sfxHurt: function () {
        Sfx.play('break_pot.wav');
    },

    die: function () {
        this._super();
        // Once we are reduced to shards, you can walk on us.
        this.causesCollision = false;
    }
});