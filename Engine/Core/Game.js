/**
 * Created by Markus on 5/14/2016.
 */

class Game
{
    constructor(gameBuffers, gameScreen)
    {
        this.screen = gameScreen;

        this.renderer = new GameRenderer(gameBuffers);

        this.running = true;
        this.redAscending = false;
        this.greenAscending = false;
        this.blueAscending = false;

        this.redOffset = 0;
        this.greenOffset = 123;
        this.blueOffset = 254;
    }
    
    UpdateAndRender()
    {
        let data = new Uint8ClampedArray(4);
        data[0] = this.redOffset;
        data[1] = this.greenOffset;
        data[2] = this.blueOffset;
        data[3] = 255;
        /*for (let pixel = 0; pixel < buffer.length; pixel+=4)
        {

            buffer[pixel]     = this.xOffset;
            buffer[pixel + 1] = 0;
            buffer[pixel + 2] = 0;
            buffer[pixel + 3] = 255;

        }*/

        this.renderer.RenderColor(0,0,
           this.screen.Width, this.screen.Height, data);
        //this.renderer.RenderColor(200, 200,
         //   600, 400, data);

        //this.renderer.RenderColor(1200, 400,
        //    600, 400, data);


        if (this.redOffset >= 249)
        {
            this.redAscending = false;
        }
        else if (this.redOffset <= 5)
        {
            this.redAscending = true;
        }

        if (this.redAscending)
        {
            this.redOffset = (this.redOffset+3) % 255;
        }
        else
        {
            this.redOffset = (this.redOffset-3) % 255;
        }

        if (this.greenOffset >= 249)
        {
            this.greenAscending = false;
        }
        else if (this.greenOffset <= 5)
        {
            this.greenAscending = true;
        }

        if (this.greenAscending)
        {
            this.greenOffset = (this.greenOffset+3) % 255;
        }
        else
        {
            this.greenOffset = (this.greenOffset-3) % 255;
        }

        if (this.blueOffset >= 249)
        {
            this.blueAscending = false;
        }
        else if (this.blueOffset <= 5)
        {
            this.blueAscending = true;
        }

        if (this.blueAscending)
        {
            this.blueOffset = (this.blueOffset+3) % 255;
        }
        else
        {
            this.blueOffset = (this.blueOffset-3) % 255;
        }

    }

    SwapBuffers()
    {
        this.renderer.SwapBuffers();
    }

    Shutdown()
    {
        this.running = false;
    }

    GetScreenBuffer()
    {
        return this.renderer.screenBuffer.Info;
    }

    Resize(gameBuffers, newWidth, newHeight)
    {
        this.screen.Width = newWidth;
        this.screen.Height = newHeight;

        this.renderer.Resize(gameBuffers);
    }
}