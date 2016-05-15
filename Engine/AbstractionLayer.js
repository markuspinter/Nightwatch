/**
 * Created by Markus on 5/13/2016.
 */

var abstractionLayer;
var lastMilliseconds = new Date();
var buffersUsed = 2;
function gameStep()
{
    if (abstractionLayer.game.running)
    {
        requestAnimationFrame(gameStep);

        var game = abstractionLayer.game;

        abstractionLayer.ctx.clearRect(0, 0,
            abstractionLayer.canvas.width, abstractionLayer.canvas.height);
        game.UpdateAndRender();
        game.SwapBuffers();
        abstractionLayer.ctx.putImageData(game.GetScreenBuffer(), 0, 0);

        //--- Test ---

        let currentMilliseconds = new Date();
        let deltaTime = currentMilliseconds - lastMilliseconds;
        let fps = 1000/deltaTime;
        lastMilliseconds = currentMilliseconds;

        abstractionLayer.ctx.font = "20px SanSerif";
        abstractionLayer.ctx.fillStyle = "white";
        abstractionLayer.ctx.fillText("Elapsed: " + deltaTime.toFixed(2),
            100, 100);
        abstractionLayer.ctx.fillText("FPS:     " + fps.toFixed(0),
            100, 130);

        //console.clear();
        //GameDebug.LogInfo(this, "Elapsed: " +
        //   deltaTime + "\n\tFps: " + fps.toFixed(0));

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

        var gameBuffers = new Array(buffersUsed);

        var bufferData = this.CreateBufferData(gameScreen.Width, gameScreen.Height);

        gameBuffers[0] = new GameBuffer(
            new ImageData(bufferData, gameScreen.Width, gameScreen.Height),
            gameScreen.Width, gameScreen.Height);
        for (let i = 1; i < gameBuffers.length; i++)
        {
            gameBuffers[i] = new GameBuffer(
                new ImageData(bufferData, gameScreen.Width, gameScreen.Height),
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

    CreateBufferData(width, height)
    {
        var buffer = new Uint8ClampedArray(width*height*4);
        for (let i = 0; i < buffer.length; i+=4)
        {
            buffer[i] = 0;
            buffer[i+1] = 0;
            buffer[i+2] = 0;
            buffer[i+3] = 255;
        }
        return buffer;
    }

    CloseRequested()
    {
        abstractionLayer.game.Shutdown();
    }

    Resize()
    {
        let newWidth = window.innerWidth;
        let newHeight = window.innerHeight;

        abstractionLayer.canvas.width = newWidth;
        abstractionLayer.canvas.height = newHeight;

        var gameBuffers = new Array(buffersUsed);

        var bufferData = abstractionLayer.CreateBufferData(
            newWidth,
            newHeight);

        for (let i = 0; i < gameBuffers.length; i++)
        {
            gameBuffers[i] = new GameBuffer(
                new ImageData(bufferData, newWidth, newHeight),
                newWidth,
                newHeight);
        }
        abstractionLayer.game.Resize(gameBuffers, window.innerWidth, window.innerHeight);
    }
}


