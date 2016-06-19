/**
 * Created by Markus on 5/14/2016.
 */

class Game
{
    constructor(ctx, gameBuffers, gameScreen)
    {
        this.renderer = new GameRenderer(ctx, gameBuffers, gameScreen);
        this.globalTimer = new Timer(GAMESPEED);
        this.testLocalTimer = new LocalTimer(this.globalTimer, 1);

        this.running = true;
        this.redAscending = false;
        this.greenAscending = false;
        this.blueAscending = false;
        this.netManager = new NetworkManager();
        this.lvlManager = new LevelManager();
        this.netManager.Connect("PraiseIt", "Sun", ["N_Fortress"], ["Thief", "Guard"], this);


        this.redOffset = 0;
        this.greenOffset = 123;
        this.blueOffset = 254;
    }

    OnLevelLoad(_this, level, role)
    {
        _this.lvlManager.OnLevelLoad(_this.lvlManager, level, role);
    }

    OnPositionGuards(_this, positions)
    {
        _this.lvlManager.OnPositionGuards(_this.lvlManager, positions);
    }

    OnUpdateGameInfo(_this, updateInfo)
    {
        _this.lvlManager.OnUpdateGameInfo(_this.lvlManager, updateInfo);
    }

    UpdateAndRender()
    {
        var lvlObjects = this.lvlManager.LevelObjects;
        var layers = Object.keys(lvlObjects).sort();
        for (var layer in layers)
        {
            var layerObj = lvlObjects[layers[layer]];
            for (var gameObj in layerObj)
            {
                this.renderer.RenderGameObject(this.lvlManager.resManager, layerObj[gameObj]);
            }
        }
        
        let data = new Uint8ClampedArray(4);

        var deltaTime = this.testLocalTimer.DeltaTime;

        if ($("#renderBufferDemo")[0].checked)
        {
            data[0] = this.redOffset %= 255;
            data[1] = this.greenOffset %= 255;
            data[2] = this.blueOffset %= 255;
            data[3] = 255;
        }
        else
        {
            data[0] = 0;
            data[1] = 0;
            data[2] = 0;
            data[3] = 255;
        }

        this.renderer.RenderColor(0,0,
           this.renderer.screen.Width, this.renderer.screen.Height, data);
        //this.renderer.RenderColor(200, 200,
         //   600, 400, data);

        //this.renderer.RenderColor(1200, 400,
        //    600, 400, data);

        if ($("#renderBufferDemo")[0].checked)
        {
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

        this.renderer.MergeBuffers();
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
        return this.renderer.GetScreenBuffer();
    }

    Resize(gameBuffers, newWidth, newHeight)
    {
        this.renderer.screen.Width = newWidth;
        this.renderer.screen.Height = newHeight;

        this.renderer.Resize(gameBuffers);
    }
}