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
        this.ascending = false;

        this.xOffset = 0;
        this.yOffset = 0;
    }
    
    UpdateAndRender()
    {
        let bufferInfo = this.drawBuffer;
        let buffer = bufferInfo.Data;

        let bufferWidth = bufferInfo.Width;
        let bufferHeight = bufferInfo.Height;

        for (let pixel = 0; pixel < buffer.length; pixel+=4)
        {

            buffer[pixel]     = this.yOffset;
            buffer[pixel + 1] = this.xOffset/2;
            buffer[pixel + 2] = this.yOffset/2;
            buffer[pixel + 3] = 255;

        }
        if (this.xOffset >= 249)
        {
            this.ascending = false;
        }
        else if (this.xOffset <= 5)
        {
            this.ascending = true;
        }

        if (this.ascending)
        {
            this.xOffset = (this.xOffset+7) % 255;
            this.yOffset = (this.yOffset+7) % 255;
        }
        else
        {
            this.xOffset = (this.xOffset-7) % 255;
            this.yOffset = (this.yOffset-7) % 255;
        }

        GameDebug.LogInfo(this, this.xOffset);
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