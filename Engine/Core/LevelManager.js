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

        this.staticObjects = [];
        this.dynamicObjects = [];
    }

    OnLevelLoad(_this, level, role)
    {
        GameDebug.LogInfo(_this, "LevelLoad invoked: " + level + " : " + role);
        //TODO: Load Level properly;

        abstractionLayer.ReadJson(_this, level+'.lif', _this.OnLevelLoadAssets);

    }

    OnLevelLoadAssets(_this, data)
    {
        GameDebug.LogObject(data);

        if (data.N_Level)
        {
            let lvlData = data.N_Level.Data;

            for (let key in lvlData.Static)
            {
                let staticObj = lvlData.Static[key];

                
            }

            for (let key in lvlData.Dynamic)
            {
                let elem = lvlData[key];

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