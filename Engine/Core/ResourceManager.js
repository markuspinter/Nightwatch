/**
 * Created by Markus on 5/21/2016.
 */

class ResourceManager
{
    constructor()
    {
        this.resLoader = new ResourceLoader();
        this.resourceImages = N_array(256);
        
        abstractionLayer.ReadJson(this, RESOURCEFILE, this.OnResourceFileLoaded);
    }

    OnResourceFileLoaded(_this, data)
    {
        GameDebug.LogObject(_this.resourceImages);
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
                            _this.resourceImages[id] = new Sprite(img, elem.Width, elem.Height);
                            for (var i = 1; i < (elem.Width * elem.Height); i++)
                            {
                                _this.resourceImages[id+i] = i;
                            }
                        }
                        else
                        {
                            _this.resourceImages[id] = img;
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
        GameDebug.LogObject(_this.resourceImages);
    }
}

class ResourceLoader
{
    constructor()
    {
        
    }


}