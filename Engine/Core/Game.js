/**
 * Created by Markus on 5/14/2016.
 */

class Game
{
    constructor(gameBuffers, gameScreen)
    {
        this.screen = gameScreen;

        this.renderer = new GameRenderer(gameBuffers);
        this.globalTimer = new Timer(GAMESPEED);
        this.testLocalTimer = new LocalTimer(this.globalTimer, 1);

        this.running = true;
        this.redAscending = false;
        this.greenAscending = false;
        this.blueAscending = false;
        this.netManager = new NetworkManager();
        this.netManager.Connect("PraiseIt", "Sun", ["N_Park"], ["N_Museum"]);

        this.redOffset = 0;
        this.greenOffset = 123;
        this.blueOffset = 254;

        var resourceLoader = new ResourceLoader();
        resourceLoader.LoadResource("README.md");
    }
    
    UpdateAndRender()
    {
        let data = new Uint8ClampedArray(4);

        var deltaTime = this.testLocalTimer.DeltaTime;

        data[0] = this.redOffset %= 255;
        data[1] = this.greenOffset %= 255;
        data[2] = this.blueOffset %= 255;
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

        var speed = 300*deltaTime;

        if (this.redOffset >= 249)
        {
            if (speed < 0)
            {
                this.redAscending = true;
            }
            else
            {
                this.redAscending = false;
            }

        }
        else if (this.redOffset <= 5)
        {
            if (speed < 0)
            {
                this.redAscending = false;
            }
            else
            {
                this.redAscending = true;
            }
        }

        if (this.redAscending)
        {
            this.redOffset = (this.redOffset+speed);
        }
        else
        {
            this.redOffset = (this.redOffset-speed);
        }

        if (this.greenOffset >= 249)
        {
            if (speed < 0)
            {
                this.greenAscending = true;
            }
            else
            {
                this.greenAscending = false;
            }
        }
        else if (this.greenOffset <= 5)
        {
            if (speed < 0)
            {
                this.greenAscending = false;
            }
            else
            {
                this.greenAscending = true;
            }
        }

        if (this.greenAscending)
        {
            this.greenOffset = (this.greenOffset+speed);
        }
        else
        {
            this.greenOffset = (this.greenOffset-speed);
        }

        if (this.blueOffset >= 249)
        {
            if (speed < 0)
            {
                this.blueAscending = true;
            }
            else
            {
                this.blueAscending = false;
            }
        }
        else if (this.blueOffset <= 5)
        {
            if (speed < 0)
            {
                this.blueAscending = false;
            }
            else
            {
                this.blueAscending = true;
            }
        }

        if (this.blueAscending)
        {
            this.blueOffset = (this.blueOffset+speed);
        }
        else
        {
            this.blueOffset = (this.blueOffset-speed);
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