/**
 * Created by Markus on 5/28/2016.
 */

class Sprite
{
    //width: number of tiles in width, number of tiles in height
    constructor(img, width, height)
    {
        this.image = img;
        this.width = width;
        this.height = height;
        this.tileWidth = img.width / width;
        this.tileHeight = img.height / height;
    }

    get Width()
    {
        return this.width;
    }

    get Height()
    {
        return this.height;
    }

    GetTileCoord(index)
    {
        var coords = new Vec2();
        coords.x = (index % this.width) * this.tileWidth;
        coords.y = (Math.trunc(index / this.width)) * this.tileHeight;

        return coords;
    }
}