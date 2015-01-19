// Global scope repository that will contain all map scripts. Each map script should self-register to this array.
// We need this array because the map data will contain script names as a raw string.
window.mapScripts = [];

/**
 * Abstract base class for all map scripts.
 */
var MapScript = Class.extend({
    map: null,

    init: function(map) {
        this.map = map;
    },

    run: function() {
        // ...
    }
});