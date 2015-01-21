var Inventory = {
    currentWeapon: null,
    coins: 0,

    clear: function () {
        this.currentWeapon = null;
        this.coins = 0;
    },

    addCoins: function (amt) {
        this.coins += amt;
    },

    syncUi: function() {
        $('#coins .value').text(this.coins);
    }
};

window.setInterval(Inventory.syncUi.bind(Inventory), 250);