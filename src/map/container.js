var Container = Entity.extend({
    isContainer: true,
    isEnemy: false,
    isNpc: true,
    causesDamage: false,
    receivesDamage: true,
    contents: [],
    healthCapacity: 1,
    healthValue: 1,

    spriteNormal: null,
    spriteDestroyed: null,

    init: function () {
        this.contents = [];
        this.spriteNormal = null;
        this.spriteDestroyed = null;
        this.spriteShadow = null;
    },

    sfxHurt: function () {
        Sfx.play('damage_chest.wav');
    },

    die: function () {
        if (this.dead) {
            return;
        }

        this.dead = true;
        this.drewHurtFrame = false;
        this.sprite = this.spriteDestroyed;
        this.sfxHurt();
    },

    open: function () {
        this.damage(this.healthCapacity);
    }
});