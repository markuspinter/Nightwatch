var WebSocketServer = require('../Lib/ws').Server
    , wss = new WebSocketServer({ port: 2541 });

var connections = [];


wss.on('connection', function connection(ws) {
    var state = 0;

    ws.on('open', function incoming(message) {
        connections.push(ws);
        console.log(connections.length);
    });

    ws.on('close', function incoming(message) {
        connections.splice(connections.indexOf(ws),1);
    });

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        if (state == 0)
        {
            ws.send(JSON.stringify({N_Response : {}}));
            state = 1;
        }
        else if (state == 1)
        {
            ws.send(JSON.stringify({N_Setup :
            {
                Level : "N_Museum",
                Role : "Thief"
            }}));
            state = 2;
        }
        else if (state == 2)
        {
            ws.send(JSON.stringify({N_Init : {Positions : [[0,1],[2,3],[4,5]]}}));
            state = 3;
        }
        else if (state == 3)
        {
            ws.send(JSON.stringify({N_Update : {Direction: "W"}}));
        }

    });

});