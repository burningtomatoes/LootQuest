var Canvas = {
    $canvas: null,
    canvas: null,
    context: null,

    lastRenderTime: null,

    /**
     * Binds to the canvas element on the page, configures it and begins the update/render loop.
     * NB: This function should normally only be called once (when the game is starting).
     */
    initialize: function() {
        console.info('[Canvas] Game is starting, starting loop.');

        // Find the Canvas element we will be drawing to and retrieve the drawing context
        this.$canvas = $('#game');
        this.canvas = this.$canvas[0];
        this.context = this.canvas.getContext('2d');

        console.info('[Canvas] Canvas render resolution is ' + this.canvas.width + 'x' + this.canvas.height + '.');

        // Try to disable the "smooth" (stretched becomes blurry) scaling on the Canvas element
        // Instead, we want a "pixelated" effect (nearest neighbor scaling)
        this.canvas.mozImageSmoothingEnabled = false;
        this.canvas.webkitImageSmoothingEnabled = false;
        this.canvas.msImageSmoothingEnabled = false;
        this.canvas.imageSmoothingEnabled = false;

        // Begin the loop
        var loop = function() {
            window.requestAnimationFrame(loop);

            Game.draw();
            Game.update(this.context);
        }.bind(this);

        loop();
    }
};