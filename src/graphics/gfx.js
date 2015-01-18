var Gfx = {
    data: {},

    clear: function () {
        this.data = {};
    },

    load: function (fileName) {
        fileName = 'assets/images/' + fileName + '.png';

        if (typeof this.data[fileName] === 'undefined') {
            this.data[fileName] = new Image();
            this.data[fileName].src = fileName;
        }

        return this.data[fileName];
    },

    preload: function () {
        this.load('map_dungeon');

        this.load('hero');
        this.load('hero_shadow');

        this.load('darkness');
    }
};