/**
 * Created by Markus on 5/28/2016.
 */

class LevelLoader
{
    constructor()
    {

    }
}

class LevelManager
{
    constructor()
    {
        this.lvlLoader = new LevelLoader();
        this.resManager = new ResourceManager();
        this.role = "";

        this.lvlObjects = {};

        //TEST
        this.OnLevelLoad(this, "N_Park", "Thief");
    }

    get LevelObjects()
    {
        return this.lvlObjects;
    }

    AddGameObject(_this, gameObject)
    {
        if (_this.lvlObjects[gameObject.layer] === undefined)
        {
            _this.lvlObjects[gameObject.layer] = [];
        }
        _this.lvlObjects[gameObject.layer].push(gameObject);
    }

    OnLevelLoad(_this, level, role)
    {
        GameDebug.LogInfo(_this, "LevelLoad invoked: " + level + " : " + role);
        //TODO: Load Level properly;
        _this.role = role;

        abstractionLayer.ReadJson(_this, 'Res/'+level+'.lif', _this.OnLevelLoadAssets);

    }

    OnLevelLoadAssets(_this, data)
    {
        GameDebug.LogObject(data);
        GameDebug.LogObject(_this.lvlObjects);

        if (data.N_Level)
        {
            let lvlData = data.N_Level.Data;

            for (let key in lvlData.Static)
            {
                let staticObj = lvlData.Static[key];

                let currGameObj = new GameObject();

                currGameObj.isStatic = true;
                currGameObj.position.x += staticObj.X;
                currGameObj.position.y += staticObj.Y;
                currGameObj.textureId = staticObj.Id;
                currGameObj.layer = staticObj.Layer;
                currGameObj.isSolid = staticObj.Solid;

                //TODO: add children support;

                _this.AddGameObject(_this, currGameObj);
            }

            for (let key in lvlData.Dynamic)
            {
                let dynamicObj = lvlData.Dynamic[key];

                let currGameObj = new GameObject();

                currGameObj.position.x += dynamicObj.X;
                currGameObj.position.y += dynamicObj.Y;
                currGameObj.layer = dynamicObj.Layer;
                currGameObj.textureId = dynamicObj.Id;

                //TODO: add children support;

                _this.AddGameObject(_this, currGameObj);
            }
        }

        _this.OnLevelLoadDone(true);
    }

    OnPositionGuards(_this, positions)
    {
        GameDebug.LogInfo(_this, "PositionGuards invoked");

        //TODO: Check if not cheating and then Position Guards properly;
        _this.OnGuardPositionsVerified(true);
    }

    OnUpdateGameInfo(_this, updateInfo)
    {
        GameDebug.LogInfo(_this, "UpdateGameInfo invoked");
        console.log(updateInfo);

        //TODO: Update game info properly;
    }

    OnSendUpdate(updateInfo)
    {

    }

    OnGuardPositionsVerified(legit)
    {

    }

    OnLevelLoadDone(success)
    {

    }
}