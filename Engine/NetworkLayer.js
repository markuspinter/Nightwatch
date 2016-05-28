/**
 * Created by Markus on 5/27/2016.
 */

var NetworkState =
{
    Request : 0,
    Response : 1,
    Acknowledgement : 2,
    Error : 3,
    Setup : 4,
    Init : 5,
    Verify : 6,
    Update : 7,
    Disconnected : 8
};

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

}

class NetworkManager
{
    constructor()
    {
        this.connState = NetworkState.Disconnected;

        this.socket = new Socket();
    }

    Connect(codename, pwd, levels, roles)
    {
        if (N_typeof(levels) == "Array" && N_typeof(roles) == "Array")
        {
            var N_Request =
            {
                Codename: codename,
                Password: pwd,
                Levels: levels,
                Roles: roles
            };

            this.socket.Connect('localhost', 2541);
            this.socket.OnOpen = function (_this, event) {
                _this.Send(JSON.stringify(N_Request));
            }
        }
        else
        {
            GameDebug.LogError(this, "Levels and Roles must be Arrays");
        }
    }



}