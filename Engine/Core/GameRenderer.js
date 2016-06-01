/**
 * Created by Markus on 5/15/2016.
 */

class GameRenderer
{
    constructor(ctx, gameBuffers)
    {
        this.gameBuffers = gameBuffers;
        this.drawBuffer = gameBuffers[0];
        this.screenBuffer = gameBuffers[0];
        this.ctx = ctx;
        this.drawBufferIndex = 0;
    }

    RenderRegion(xOffset, yOffset, width, height, data)
    {
        if (N_typeof(data) == "Uint8ClampedArray")
        {

            let buffer = this.drawBuffer.data;

            let xStart = xOffset*4;
            let absWidth = (xOffset+width)*4;
            let absHeight = yOffset+height;
            let bufferWidth = this.drawBuffer.Width*4;

            for (var y = yOffset; y < absHeight ; y++)
            {
                var row = (y*(bufferWidth));
                var dataRow = ((y-yOffset)*(width));
                for (var x = xStart; x < absWidth; x+=4)
                {
                    var pixelInDrawBuffer = x+row;
                    var pixelInData = (x-xStart)+dataRow;
                    buffer[pixelInDrawBuffer] = data[pixelInData];
                    buffer[pixelInDrawBuffer+1] = data[pixelInData+1];
                    buffer[pixelInDrawBuffer+2] = data[pixelInData+2];
                    buffer[pixelInDrawBuffer+3] = data[pixelInData+3];
                }
            }
        }
        else
        {
            GameDebug.LogError(this, "Can't render data of type: " + N_typeof(data));
        }
    }

    RenderGameObject(resManager, gameObj)
    {
        if (N_typeof(gameObj) == "GameObject")
        {
            var x = gameObj.position.x;
            var y = gameObj.position.y;
            var texId = gameObj.textureId;

            var texture = resManager.GetTexture(texId);

            if (N_typeof(texture) == "Sprite")
            {
                var img = texture.image;
                var tileId = resManager.GetTileId(texId);
                var tileCoords = texture.GetTileCoord(tileId);

                if (gameObj.isStatic)
                {
                    this.ctx.drawImage(img, tileCoords.x,
                        tileCoords.y,
                        texture.tileWidth,
                        texture.tileHeight,
                        x*texture.tileWidth*SCALE, y*texture.tileWidth*SCALE,
                        texture.tileWidth*SCALE,
                        texture.tileHeight*SCALE);
                }
                else
                {
                    this.ctx.drawImage(img, tileCoords.x,
                        tileCoords.y,
                        texture.tileWidth,
                        texture.tileHeight,
                        x*SCALE, y*SCALE,
                        texture.tileWidth*SCALE,
                        texture.tileHeight*SCALE);
                }

            }
            else if (N_typeof(texture) == "HTMLImageElement")
            {
                if (gameObj.isStatic)
                {
                    this.ctx.drawImage(texture, x*texture.width*SCALE, y*texture.width*SCALE,
                        texture.width*SCALE, texture.height*SCALE);
                }
                else
                {
                    this.ctx.drawImage(texture, x*SCALE, y*SCALE,
                                        texture.width*SCALE, texture.height*SCALE);
                }

            }
            else
            {
                GameDebug.LogError(this, "Object to be drawn not supported: " +
                    N_typeof(texture));
            }


        }
        else
        {
            GameDebug.LogError(this, "Parameter must be of type GameObject");
        }

    }

    RenderColor(xOffset, yOffset, width, height, data)
    {
        //GameDebug.StartTimer("buffer fill");

        if (N_typeof(data) == "Uint8ClampedArray")
        {
            var r = data[0],
                g = data[1],
                b = data[2],
                a = data[3];

            var buffer = this.drawBuffer.data;

            var xStart = xOffset*4;
            var absWidth = (xOffset+width)*4;
            var absHeight = yOffset+height;
            var bufferWidth = this.drawBuffer.Width*4;

            for (var y = yOffset; y < absHeight ; y++)
            {
                var row = (y*(bufferWidth));
                for (var x = xStart; x < absWidth; x+=4)
                {
                    var pixelInDrawBuffer = x+row;
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
        //GameDebug.EndTimer("buffer fill");
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