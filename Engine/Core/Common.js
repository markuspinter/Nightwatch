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

class Vec2
{
    constructor(x,y)
    {
        this.x = 0;
        this.y = 0;
        if (N_typeof(x) == "Number")
        {
            this.x = x;
        }
        if (N_typeof(y) == "Number")
        {
            this.y = y;
        }
    }

    Add(other)
    {
        let result;
        if (N_typeof(other) == "Vec2")
        {
            result = new Vec2(this.x+other.x, this.y+other.y);
        }
        else
        {
            GameDebug.LogError(this, "other is no Vec2");
        }
        return result;
    }

    Sub(other)
    {
        let result;
        if (N_typeof(other) == "Vec2")
        {
            result = new Vec2(this.x-other.x, this.y-other.y);
        }
        else
        {
            GameDebug.LogError(this, "other is no Vec2");
        }
        return result;
    }

    Mag()
    {
        return Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2));
    }

    Mul(scalar)
    {
        let result;
        if (N_typeof(other) == "Number")
        {
            result = new Vec2(this.x * scalar, this.y * scalar);
        }
        else
        {
            GameDebug.LogError(this, "scalar is not a number");
        }
        return result;
    }

    Dot(other)
    {
        let result;
        if (N_typeof(other) == "Vec2")
        {
            result = (this.x * other.x) + (this.y * other.y);
        }
        else
        {
            GameDebug.LogError(this, "other is no Vec2");
        }
        return result;
    }
}

class Vec3 extends Vec2
{
    constructor(x,y,z)
    {
        super(x,y);
        this.z = 0;
        if (N_typeof(z) == "Number")
        {
            this.z = z;
        }
    }

    Add(other)
    {
        let result;
        if (N_typeof(other) == "Vec3")
        {
            result = new Vec3(this.x+other.x, this.y+other.y, this.z+other.z);
        }
        else
        {
            GameDebug.LogError(this, "other is no Vec3");
        }
        return result;
    }

    Sub(other)
    {
        let result;
        if (N_typeof(other) == "Vec3")
        {
            result = new Vec3(this.x-other.x, this.y-other.y, this.z-other.z);
        }
        else
        {
            GameDebug.LogError(this, "other is no Vec3");
        }
        return result;
    }

    Mag()
    {
        return Math.sqrt(Math.pow(this.x, 2)+Math.pow(this.y, 2)+Math.pow(this.z, 2));
    }

    Mul(scalar)
    {
        let result;
        if (N_typeof(other) == "Number")
        {
            result = new Vec3(this.x * scalar, this.y * scalar, this.z * scalar);
        }
        else
        {
            GameDebug.LogError(this, "scalar is not a number");
        }
        return result;
    }

    Dot(other)
    {
        let result;
        if (N_typeof(other) == "Vec3")
        {
            result = (this.x * other.x) + (this.y * other.y) + (this.z * other.z);
        }
        else
        {
            GameDebug.LogError(this, "other is no Vec3");
        }
        return result;
    }
}