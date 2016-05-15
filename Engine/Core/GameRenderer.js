/**
 * Created by Markus on 5/15/2016.
 */

class GameRenderer
{
    constructor(gameBuffers)
    {
        this.gameBuffers = gameBuffers;
        this.drawBuffer = gameBuffers[0];
        this.screenBuffer = gameBuffers[0];
        this.drawBufferIndex = 0;
    }

    RenderRegion(xOffset, yOffset, width, height, data)
    {
        if (N_typeof(data) == "Uint8ClampedArray")
        {

            for (let y = 0; y < height; y++)
            {
                for (let x = 0; x < width; x+=4)
                {
                    let pixelInDrawBuffer = ((x+xOffset)*4)*(y+yOffset);
                    let pixelInData = (x*4)*y;
                    this.drawBuffer[pixelInDrawBuffer] = data[pixelInData];
                    this.drawBuffer[pixelInDrawBuffer+1] = data[pixelInData+1];
                    this.drawBuffer[pixelInDrawBuffer+2] = data[pixelInData+2];
                    this.drawBuffer[pixelInDrawBuffer+3] = data[pixelInData+3];
                }
            }
        }
        else
        {
            GameDebug.LogError(this, "Can't render data of type: " + N_typeof(data));
        }
    }

    RenderColor(xOffset, yOffset, width, height, data)
    {
        if (N_typeof(data) == "Uint8ClampedArray")
        {
            let r = data[0],
                g = data[1],
                b = data[2],
                a = data[3];

            let buffer = this.drawBuffer.data;

            let absWidth = (xOffset+width)*4;
            let absHeight = yOffset+height;
            let widthDiff = this.drawBuffer.Width*4 - absWidth;
            let heightDiff = this.drawBuffer.Height - absHeight;
            let bufferWidth = this.drawBuffer.Width*4;

            for (let y = yOffset; y < absHeight ; y++)
            {
                for (let x = xOffset; x < absWidth; x+=4)
                {
                    let pixelInDrawBuffer = x+(y*(bufferWidth));
                    buffer[pixelInDrawBuffer] = r;
                    buffer[pixelInDrawBuffer+1] = g;
                    buffer[pixelInDrawBuffer+2] = b;
                    buffer[pixelInDrawBuffer+3] = a;
                }
            }
        }
        else
        {
            GameDebug.LogError(this, "Can't render data of type: " + N_typeof(data));
        }
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

    Resize(gameBuffers)
    {
        this.gameBuffers = gameBuffers;

        this.drawBuffer = gameBuffers[0];
        this.screenBuffer = gameBuffers[0];
    }
}