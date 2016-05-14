/**
 * Created by Markus on 5/13/2016.
 */

var abstractionLayer;
var lastMilliseconds = new Date();
function gameStep()
{
    if (abstractionLayer.game.running)
    {
        requestAnimationFrame(gameStep);

        var game = abstractionLayer.game;

        GameDebug.StartTimer("Game Loop");


        game.UpdateAndRender();
        game.SwapBuffers();
        abstractionLayer.ctx.putImageData((game.screenBuffer.Info), 0, 0);

        //--- Test ---

        let currentMilliseconds = new Date();
        let deltaTime = currentMilliseconds - lastMilliseconds;
        let fps = 1000/deltaTime;
        lastMilliseconds = currentMilliseconds;

        //console.clear();
        //GameDebug.LogInfo(this, "Elapsed: " +
        //   deltaTime + "\n\tFps: " + fps);

    }

}

class AbstractionLayer
{

    //canvas
    //ctx

    LoadContext()
    {
        var canvas = $("#gameCanvas").get(0);
        var ctx = canvas.getContext("2d");

        this.canvas = canvas;
        this.ctx = ctx;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        var gameScreen = new GameScreen(canvas.width, canvas.height);

        var gameBuffers = new Array(2);

        var imageData = ctx.getImageData(0,0,gameScreen.Width,gameScreen.Height);

        gameBuffers[0] = new GameBuffer(imageData, gameScreen.Width, gameScreen.Height);
        for (let i = 1; i < gameBuffers.length; i++)
        {
            gameBuffers[i] = new GameBuffer(
                new ImageData(gameScreen.Width, gameScreen.Height),
                gameScreen.Width,
                gameScreen.Height);
        }
        this.game = new Game(gameBuffers, gameScreen);




        //this.drawBuffer = this.gameBuffers[0];

        //this.DrawBufferTest();

        abstractionLayer = this;
        window.onbeforeunload = abstractionLayer.CloseRequested;
        window.onresize = abstractionLayer.Resize;
        gameStep();
    }

    CloseRequested()
    {
        abstractionLayer.game.CloseRequested();
    }

    Resize()
    {
        abstractionLayer.canvas.width = window.innerWidth;
        abstractionLayer.canvas.height = window.innerHeight;
        abstractionLayer.game.ResizeGame(window.innerWidth, window.innerHeight);
    }
}


