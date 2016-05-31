/**
 * Created by Markus on 5/21/2016.
 */

class ResourceManager
{
    constructor()
    {
        this.resLoader = new ResourceLoader();
        this.textures = N_array(MAXTEXTURES);

        this.voidTexture = new Image();
        this.voidTexture.src = VOIDTEXTURE;

        this.textures[0] = this.voidTexture;
        
        abstractionLayer.ReadJson(this, RESOURCEFILE, this.OnResourceFileLoaded);
    }

    GetTexture(textureId)
    {
        var texture = null;
        if (N_typeof(textureId) == "Number" &&
            textureId >= 0 &&
            textureId < MAXTEXTURES)
        {
            texture = this.textures[textureId];

            if (N_typeof(texture) == "Number")
            {
                if (texture == 0)
                {
                    texture = this.voidTexture;
                }
                else
                {
                    texture = this.textures[textureId-texture];
                }

            }
        }
        else
        {
            GameDebug.LogError(this, "TextureId must be typeof Number.");
        }
        return texture;
    }

    GetTileId(textureId) {
        var tileId = 0;
        var resInfo = this.textures[textureId];
        if (N_typeof(resInfo) == "Number")
        {
            tileId = resInfo;
        }
        return tileId;
    }

    OnResourceFileLoaded(_this, data)
    {
        GameDebug.LogObject(_this.textures);
        if (data.N_Resources)
        {
            var resData = data.N_Resources.Data;

            for (let key in resData)
            {
                let elem = resData[key];
                let id = elem.Id;
                if (id >= 0 && id < 256)
                {
                    let img = new Image();

                    img.onload = function ()
                    {
                        if (elem.Source.match(/\w*.anm/i) || elem.Source.match(/\w*.spr/i))
                        {
                            //NOTE: maybe loading failed because let var img got destroyed
                            _this.textures[id] = new Sprite(img, elem.Width, elem.Height);
                            for (var i = 1; i < (elem.Width * elem.Height); i++)
                            {
                                _this.textures[id+i] = i;
                            }
                        }
                        else
                        {
                            _this.textures[id] = img;
                        }
                    }

                    img.src = elem.Source;

                }
                else
                {
                    GameDebug.LogError(this, "id's above 255 not supported yet");
                }
                
            }
        }
        GameDebug.LogObject(_this.textures);
    }
}

class ResourceLoader
{
    constructor()
    {
        
    }


}