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

        abstractionLayer.ClearBuffer();
        if ($("#render")[0].checked)
        {
            game.UpdateAndRender();
            game.SwapBuffers();

        }


        //--- Test ---

        let currentMilliseconds = new Date();
        let deltaTime = currentMilliseconds - lastMilliseconds;
        let fps = 1000/deltaTime;
        lastMilliseconds = currentMilliseconds;

        game.globalTimer.Step(deltaTime.toFixed(3)/1000);
        game.testLocalTimer.Step();


        abstractionLayer.ctx.font = "18px sans-serif";
        abstractionLayer.ctx.fillStyle = "white";
        abstractionLayer.ctx.fillText("Elapsed: " + deltaTime.toFixed(2) + "ms",
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

        var gameBuffers = new Array(BUFFERING);

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

        window.onbeforeunload = this.CloseRequested;
        window.onresize = this.Resize;
        abstractionLayer = this;

        this.game = new Game(ctx, gameBuffers, gameScreen);
            
        //this.drawBuffer = this.gameBuffers[0];

        //this.DrawBufferTest();

        gameStep();
    }

    ClearBuffer()
    {
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.msImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.putImageData(this.game.GetScreenBuffer(), 0, 0);
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

    ReadJson(caller, filePath, callback)
    {
        try
        {
            $.getJSON(filePath, function (data) {
                callback(caller, data);
            }).fail(function( jqxhr, textStatus, error ) {
                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err )});

        }
        catch (e)
        {
            GameDebug.LogError(this, e.message);
        }
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

        var gameBuffers = new Array(BUFFERING);

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
        abstractionLayer.game.Resize(gameBuffers, newWidth, newHeight);
    }
}


