/**
 * Created by Markus on 5/14/2016.
 */

class Game
{
    constructor(gameBuffers, gameScreen)
    {
        this.gameBuffers = gameBuffers;
        this.gameScreen = gameScreen;
        this.drawBuffer = gameBuffers[0];
        this.screenBuffer = gameBuffers[0];
        this.drawBufferIndex = 0;

        this.running = true;

        this.xOffset = 0;
        this.yOffset = 0;
    }
    
    UpdateAndRender()
    {
        let bufferInfo = this.drawBuffer;
        let buffer = bufferInfo.Data;

        for (let pixel = 0; pixel < buffer.length; pixel+=4)
        {

            buffer[pixel]     = 0;
            buffer[pixel + 1] = 123;
            buffer[pixel + 2] = 123;
            buffer[pixel + 3] = 255;


        }

        this.xOffset++;
        this.yOffset++;
    }

    SwapBuffers()
    {
        if (this.drawBufferIndex >= this.gameBuffers.length-1)
        {
            this.drawBufferIndex = 0;
        }
        else
        {
            this.drawBufferIndex++;
        }
        this.screenBuffer = this.drawBuffer;
        this.drawBuffer = this.gameBuffers[this.drawBufferIndex];
    }

    CloseRequested()
    {
        this.running = false;
    }

    ResizeGame(newWidth, newHeight)
    {
        this.gameScreen.Width = newWidth;
        this.gameScreen.Height = newHeight;

        for (let i = 0; i < this.gameBuffers.length; i++)
        {
            this.gameBuffers[i] = new GameBuffer(
                new ImageData(this.gameScreen.Width, this.gameScreen.Height),
                this.gameScreen.Width,
                this.gameScreen.Height);
        }

        this.drawBuffer = this.gameBuffers[0];
        this.screenBuffer = this.gameBuffers[0];
    }
}