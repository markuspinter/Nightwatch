/**
 * Created by Markus on 5/21/2016.
 */

class ResourceManager
{
    constructor()
    {
        
    }


}

class ResourceLoader
{
    constructor()
    {
        
    }

    LoadResource(filePath)
    {
        if (filePath !== undefined && filePath.length >= 2)
        {
            var root = filePath.substr(0,2);
            if (root == "\w:" || root == "/\w")
            {
                GameDebug.LogWarning(this, "You're using an absolute path\n\tconsider" +
                    "using an relative path instead");
            }
            else
            {
                abstractionLayer.ReadFile(filePath, this.OnResourceLoaded);
            }
        }

    }

    OnResourceLoaded(text)
    {
        alert(text);
    }
}