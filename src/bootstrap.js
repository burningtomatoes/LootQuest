$(document).ready(function() {
    // This is a badass ASCII banner. It looks better in your console. :-)
    console.log('    .____                  __  ________                          __   ');
    console.log('    |    |    ____   _____/  |_\\_____  \\  __ __   ____   _______/  |_');
    console.log('    |    |   /  _ \\ /  _ \\   __\\/  / \\  \\|  |  \\_/ __ \\ /  ___/\\   __\\');
    console.log('    |    |__(  <_> |  <_> )  | /   \\_/.  \\  |  /\\  ___/ \\___ \\  |  |');
    console.log('    |_______ \\____/ \\____/|__| \\_____\\ \\_/____/  \\___  >____  > |__|  ');
    console.log('            \\/                        \\__>           \\/     \\/        ');
    console.log('');

    // Initialize canvas rendering
    Game.initialize();

    // Show boot logo (a burning tomato) if it is enabled, then start the game
    var startGame = function () {
        Game.start();
    };

    if (!Settings.skipBootLogo) {
        BootLogo.show(startGame);
    } else {
        startGame();
    }
});