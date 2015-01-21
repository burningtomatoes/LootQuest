var Inventory = {
    currentWeapon: null,
    coins: 0,

    clear: function () {
        this.setWeapon(null);
        this.coins = 0;
    },

    addCoins: function (amt) {
        this.coins += amt;
    },

    syncUi: function() {
        $('#coins .value').text(this.coins);
    },

    setWeapon: function (weapon) {
        if (Game.map != null && Game.map.player != null) {
            Game.map.player.weapon = weapon;
        }

        this.currentWeapon = weapon;
    }
};

window.setInterval(Inventory.syncUi.bind(Inventory), 250);