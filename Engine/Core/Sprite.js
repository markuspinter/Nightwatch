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
        var x = (index % this.width) * this.tileWidth;
        var y = (index / this.width).toFixed(0) * this.tileHeight;

        return x,y;
    }
}