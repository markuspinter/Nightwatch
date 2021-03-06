﻿var WebSocketServer = require('../Lib/ws').Server
  , wss = new WebSocketServer({ port: 2541 });

var global_counter = 0;
var all_active_connections = [];
var match = [];
var partners = [];

wss.on('connection', function connection(ws) {
        
        var id = global_counter++;
        all_active_connections[id] = ws;
        ws.id = id;
        ws.state = 0;
        ws.loaded = false;

        this.rdata;
        var connecttimeout;
        ws.on('message', function incoming(message) {
            var data = JSON.parse(message);

            if (ws.state == 0 && data.N_Request) {
                this.rdata = data;

                ws.send(JSON.stringify({
                    N_Response: {}
                }));

                connecttimeout = setTimeout(function () { 
				console.log('Connection to client ' + ws.id + ' could not be established.');
				ws.terminate();
				}, 10000);
            }else if (ws.state == 0 && data.N_Acknowledgement) {
                clearTimeout(connecttimeout);
				if(data.N_Acknowledgement.Connection == "Success")
				{
					var level;
					var yourrole;
					var otherrole;
					var comrade;
					var con = false;
					console.log('Starting Matchmaking for %d with the message %s', ws.id, this.rdata.N_Request.Codename);
					for (m in match) {
						if(!con)
						{

							if (match[m].N_Request.Codename == this.rdata.N_Request.Codename && match[m].N_Request.Password == this.rdata.N_Request.Password) {
							//Best Hardcode EU
								for (i in this.rdata.N_Request.Levels) {
									for (j in match[m].N_Request.Levels) {
										if (this.rdata.N_Request.Levels[i] == match[m].N_Request.Levels[j]) {
											level = this.rdata.N_Request.Levels[i];
											con = true;
										}
									}
								}
								if (con) {
									con = false;
									for (i in this.rdata.N_Request.Roles) {
										for (j in match[m].N_Request.Roles) {
											if (this.rdata.N_Request.Roles[i] != match[m].N_Request.Roles[j]) {
												yourrole = this.rdata.N_Request.Roles[i];
												otherrole = match[m].N_Request.Roles[j];
												con = true;
											}
										}
									}
								}
							}
							comrade = m;
						}
					}
					if (!con) {
						match[ws.id] = this.rdata;
						setTimeout(function () {
							if (ws.state == 0) {
								ws.send(JSON.stringify({
									N_Error: {
										Code: 134,
										Message: "Timeout: No matching player has been found."
									}
								}));
								console.log('Client ' + ws.id + ' timed out because no match was found.')
								delete match[ws.id];
							}
						},20000);
					} else {
						partners[id] = m;
						partners[m] = id;
						ws.state = 1;
						delete match[comrade];
						all_active_connections[comrade].state = 1;
						all_active_connections[comrade].send(JSON.stringify(
					{
						N_Setup:
						{
							Level: level,
							Role: otherrole
						}
					}));

						ws.send(JSON.stringify(
					{
						N_Setup:
						{
							Level: level,
							Role: yourrole
						}
					}));
						console.log("Match found.");
					}
				}else{
					ws.terminate();
				}
            } else if (ws.state == 1 && data.N_LevelLoad) {
                console.log("Starting Level loading.");
                if (data.N_LevelLoad == 'Success') {
                    ws.loaded = true;
                    ws.state = 2;
					console.log('Level Loading succeeded.');
                    /* setTimeout(function () {
                        if (all_active_connections[partners[ws.id]].loaded && ws.state==2) {
                            ws.send(JSON.stringify({
                               N_Force: true 
                            }));
                        }
                    },30000); */

                    
                } else {
                    ws.state = 0;
                    all_active_connections[partners[id]].state = 0;
                    console.log('Connection has been terminated');
                }
                
            // } else if (ws.state == 2 && data.N_Init) {
				
                // all_active_connections[partners[id]].send(JSON.stringify(data));
                // ws.state = 3;
                // all_active_connections[partners[id]].state = 3;

            } else if (ws.state = 2 && data.N_Update) {
				console.log('Received update message from ' + ws.id + " to go " + data.N_Update.Direction );
                all_active_connections[partners[id]].send(JSON.stringify(data));
                if (data.N_Update.Escaped == true || data.N_Update.Caught == true) {
                    ws.state = 0;
                    ll_active_connections[partners[id]].state = 0;
                }
            }
        });

        ws.on('close', function incoming(message) {
            delete match[ws.id];
            delete all_active_connections[ws.id];
            delete partners[ws.id];
        });
    

});