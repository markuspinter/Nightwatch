/**
 * Created by Markus on 5/14/2016.
 */
class GameScreen
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
    }

    get Width()
    {
        return this.width;
    }

    set Width(width)
    {
        this.width = width;
    }

    get Height()
    {
        return this.height;
    }

    set Height(height)
    {
        this.height = height;
    }

}

class GameBuffer
{
    constructor(imageData, bufferWidth, bufferHeight)
    {
        //TODO: clear this mess up ( imageData platform dependent);
        if (N_typeof(imageData) == "ImageData")
        {
            this.width = bufferWidth;
            this.height = bufferHeight;

            this.info = imageData;
            this.data = imageData.data;
        }
        else
        {
            //TODO: Error handling
        }

    }

    get Info()
    {
        return this.info;
    }

    get Data()
    {
        return this.data;
    }

    set Data(data)
    {
        if (N_typeof(data) == "Uint8ClampedArray")
        {
            this.data = data;
        }
        else
        {
            //TODO: Error handling
        }
    }

    get Length()
    {
        return this.width * this.height;
    }

    get Width()
    {
        return this.width;
    }

    set Width(width)
    {
        this.width = width;
    }

    get Height()
    {
        return this.height;
    }

    set Height(height)
    {
        this.height = height;
    }
}