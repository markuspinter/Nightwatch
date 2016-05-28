/**
 * Created by Markus on 5/27/2016.
 */

var NetworkState =
{
    Connecting :        0,
    Request :           1,
    Response :          2,
    Acknowledgement :   3,
    Error :             4,
    Setup :             5,
    LevelLoadDone :     6,
    Init :              7,
    Verify :            8,
    Update :            9,
    Disconnected :      10
};

function GetNetworkStateByName(netState)
{
    return Object.keys(NetworkState)[netState];
}

class Socket
{
    constructor()
    {
    }

    Connect(hostname, port)
    {
        this.client = new WebSocket('ws://' + hostname + ':' + port + '/', 'NTP');

        var _this = this;

        this.client.onopen = function(event) {_this.OnOpen(_this, event);};
        this.client.onerror = function(event) {_this.OnError(_this, event);};
        this.client.onmessage = function(event) {_this.OnMessage(_this, event);};
        this.client.onclose = function(event) {_this.OnClose(_this, event);};
    }

    OnOpen(_this, event)
    {
        GameDebug.LogInfo(_this, "Connected to server successfully");

    }

    OnError(_this, event)
    {
        GameDebug.LogError(_this, event.data);
    }

    OnMessage(_this, event)
    {
        GameDebug.LogMessage(_this, event.data);

    }

    OnClose(_this, event)
    {
        GameDebug.LogInfo(_this, "Connected to server has been closed");
    }

    Send(message)
    {
        if (this.client !== undefined)
        {
            this.client.send(message);
        }
        else
        {
            GameDebug.LogError(this, "Client not initialized");
        }
    }

    Terminate()
    {
        this.client.terminate();
    }
}

class NetworkManager
{
    constructor()
    {
        this.connState = NetworkState.Disconnected;

        this.socket = new Socket();
    }

    Connect(codename, pwd, levels, roles, game)
    {
        if (N_typeof(levels) == "Array" && N_typeof(roles) == "Array")
        {
            var N_Request =
            {
                N_Request:
                {
                    Codename: codename,
                    Password: pwd,
                    Levels: levels,
                    Roles: roles
                }

            };

            var N_Acknowledgement =
            {
                N_Acknowledgement  :
                {
                    Connection: "Success"
                }
            };

            this.connState = NetworkState.Connecting;
            this.socket.Connect('localhost', 2541);

            var _this = this;
            var isThief = false;

            game.lvlManager.OnLevelLoadDone = function (success)
            {
                _this.OnLevelLoadDone(_this, success);
            };

            game.lvlManager.OnGuardPositionsVerified = function (legit)
            {
                _this.OnGuardPositionsVerified(_this, legit);
            };

            game.lvlManager.OnSendUpdate = function (updateInfo)
            {
                _this.OnSendUpdate(_this, updateInfo);
            };

            this.socket.OnOpen = function (socket, event)
            {
                _this.connState = NetworkState.Request;
                socket.Send(JSON.stringify(N_Request));
            };

            this.socket.OnClose = function (socket, event)
            {
                _this.connState = NetworkState.Disconnected;
            };

            this.socket.OnError = function (socket, event)
            {
                _this.connState = NetworkState.Error;
                GameDebug.LogError(_this, event.data);
            };

            this.socket.OnMessage = function (socket, event)
            {
                try
                {
                    var message = JSON.parse(event.data);
                    GameDebug.LogMessage(_this, event.data);

                    if (message.N_Error)
                    {
                        _this.connState = NetworkState.Error;
                        GameDebug.LogError(_this, N_Response.N_Error.Code + ':' +
                            N_Response.N_Error.Message);

                        //TODO: Treminate connection if error is fatal
                        //TODO: Output Error onto Screen and go back to menu;
                    }
                    else if (_this.connState == NetworkState.Request)
                    {
                        _this.connState = NetworkState.Response;

                        if (message.N_Response)
                        {
                            _this.connState = NetworkState.Acknowledgement;
                            socket.Send(JSON.stringify(N_Acknowledgement));
                            GameDebug.LogInfo(_this, 'Connection established: ' +
                                GetNetworkStateByName(_this.connState));
                            //TODO: Some info to game, so user knows servers searching for fitting game
                        }
                    }
                    else if (_this.connState == NetworkState.Acknowledgement)
                    {
                        if (message.N_Setup)
                        {
                            _this.connState = NetworkState.Setup;

                            if (message.N_Setup.Role.match(/thief/i))
                            {
                                isThief = true;
                            }

                            game.OnLevelLoad(game, message.N_Setup.Level,
                                                    message.N_Setup.Role);
                        }
                    }
                    else if (_this.connState == NetworkState.LevelLoadDone)
                    {
                        if (isThief)
                        {
                            if (message.N_Init)
                            {
                                _this.connState = NetworkState.Init;

                                game.OnPositionGuards(game, message.N_Init.Positions);
                            }
                        }
                        else
                        {
                            if (message.N_Update)
                            {
                                _this.connState = NetworkState.Update;

                                game.OnUpdateGameInfo(game, message.N_Update);
                            }
                        }
                    }
                    else if (_this.connState = NetworkState.Update)
                    {
                        if (message.N_Update)
                        {
                            game.OnUpdateGameInfo(game, message.N_Update);
                        }
                    }
                }
                catch (e)
                {
                    GameDebug.LogError(_this, e.message);
                }

            };
        }
        else
        {
            GameDebug.LogError(this, "Levels and Roles must be Arrays");
        }
    }

    OnLevelLoadDone(_this, success)
    {
        _this.connState = NetworkState.LevelLoadDone;
        var N_LevelLoad = {N_LevelLoad : (success) ? "Success" : "Failed"};

        _this.socket.Send(JSON.stringify(N_LevelLoad));
    }

    OnGuardPositionsVerified(_this, legit)
    {
        _this.connState = NetworkState.Verify;
        var N_Verify = {N_Verify : (legit)?"Accepted":"Rejected"};

        _this.socket.Send(JSON.stringify(N_Verify));
        _this.connState = NetworkState.Update;
    }

    OnSendUpdate(_this, updateInfo)
    {
        var N_Update = {N_Update : updateInfo};

        _this.socket.Send(JSON.stringify(N_Update));
    }

}