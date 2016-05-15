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
        this.ascending = false;

        this.xOffset = 0;
        this.yOffset = 0;
    }
    
    UpdateAndRender()
    {
        let data = new Uint8ClampedArray(4);
        data[0] = this.xOffset;
        data[1] = 0;
        data[2] = 0;
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