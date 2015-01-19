window.mapScripts['wake_up'] = MapScript.extend({
    run: function() {
        Dialogue.prepare([
            { text: 'What..what is this?', player: true },
            { text: 'Where am I?', player: true }
        ]);
        Dialogue.show();
    }
});