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
        this.levelLoader = new LevelLoader();
    }

    OnLevelLoad(_this, level, role)
    {
        GameDebug.LogInfo(_this, "LevelLoad invoked: " + level + " : " + role);
        //TODO: Load Level properly;
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