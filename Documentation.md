
> Written with [StackEdit](https://stackedit.io/).

##Nightwatch

>Game and Engine written in JavaScript

[TOC]

---

###Introduction

As you will see, in every document there's some way to define which in **Version** the document currently is.
This give's the opportunity to use older versions for testing purposes if newer ones don't work anymore.

---

###Resource Definition

For simple usage with JavaScript and the relatively small
game content we chose to use JSON for resource management

To be able to change textures and sprite sheets, each element in the game is
assigned to an unique number (id).  

When the engine has stated up successfully, it needs to load all resources
for the game into Memory. So we have to specify where each resource is located on the disk.

The sturcture of the Nightwatch Resource Definition File `.rdf` 
looks as following:

	"N_Resources" :
	{
		"Version" : 1.0,
		
		"Data" : 
		{
			"Museum" :
			{
				"Id" : 16,                    //Id of the first texture in spritesheet
				"Source" : "res/museum.spr"
			},
			"Thief" : 
			{
				"Id" : 12,
				"Source" : "res/thief.anm" 
			},
			"Guard" : 
			{
				"Id" : 13, 
				"Source" : "res/guard.anm"
			},
			"Mona Lisa" :
			{
				"Id" : 200,
				"Source" : "res/monalisa.png
			}
		}
	}

If it's a spritesheet the `Id` means the id of the first texture in it. It is recognized by the file extension `.spr`
An animation is considered as a single texture, although it changes over time.

You can find the Table of all game elements [here][1]:

---

###Level Design

For Level information we use the JSON format as well

The Level Information File `.lif` can be declared as following:

    "N_Level" : 
    {
	    "Version" : 1.0,
	    "Name" : "Park",
	    
	    "Data" : 
	    {
		    
		}
    }

Beginning with `N_Level` tells the Game to be treated as level information

Inside the Data section there will be all the content of the level itself

> NOTE:  There have to be two different kinds of objects:

 >-  Static	
 >-  Dynamic

Where dynamic objects change during their lifetime,
static objects don't

Here's an example of how it could look like in the JSON object:


	"N_Level" : 
    {
	    "Version" : 1.0,
	    "Name" : "Park",
	    
	    "Data" : 
	    {
		    "Static" :
		    [
			    {
					"Id" : 1,        //this is the id of the object
					"X" : 10,        //--this is the upper left corner
					"Y" : 10,        //---of the tile for simpler positioning
					"Layer" : 3,     //----layer to be drawn on 
					"Solid" : false, //specifies if player should collide with this tile
					"Children" : 
					{
						//Here can be any static object where its 
						//reference point is the top left corner of the parent object
					}
				}
			],
			"Dynamic" :
			[
				{
					"Id" : 12,
					"X" : 20,
					"Y" : 20,
					"Direction" : "N",
				}
			]
		}
    }

---

###Nightwatch Transfer Protocol

To be able to provide Multiplayer over Network, we need a way to communicate 
between the clients.

We use for this purpose a simple Client - Server connection, where the Server acts as both Matchmaking and Game level server. As soon as two clients connect to the server a game automatically starts.

	"N_Request" :
	{
		"Codename" : "PraiseTheSun",
		"Password" : "someHash",
		"Levels" : ["N_Park", "N_Museum", "N_Prison"],
		"Roles" : ["Thief", "Guard"]
	}

	"N_Response" :
	{
		
	}
	
	"N_Acknowledgement" :
	{
		"Connection" : "Success"
	}

Eventually the client sends an `N_Acknowledgement` message to establish the connection. 

Then the server waits until two clients have been found. If no second client could be found after a certain time the client already connected receives an timeout message.

The server decides which level and role each player will play based on the information each player will   provide in the N_Request message. 
After that both clients receive the level and their role from the server.

	"N_Error" : 
	{
		"Code" : 134             //Error code of network protocol
		"Message" : "Timeout: No matching player has been found."  
	}

Such a message can be sent by the server all the time if a problem of the connection occurs.

Else a `N_Setup` message will be sent, so each client can load the level

	"N_Setup" : 
	{
		"Level" : "N_Museum",
		"Role" : "Thief"  
	}
	
As you can probably see the clients also know which role they are chosen to play.

A quick `N_LevelLoad` message is sent to inform server about level loading.

	"N_LevelLoad" : "Success" | "Failed"

if level load failed the connection will be terminated else the game can start as soon as both clients loaded the level successfully.

That's where the fun part starts. They'll directly change to **Preparation Phase**, where the Defender got 30 Seconds to place his guards. 

The server stops time in background as well to avoid cheating. 

When he's done or time's over a `N_Init` Message will be sent to the Server. The server will redirect it to the other client.

	"N_Init" :
	{
		"Positions" : [[x1,y1] , [x2,y2] , [x3,y3]]
	}  

Because the position of the Thief is pre-defined there's no need to send them additionally information.
To prevent hacking, the Attacker (Thief) will quickly check if the positions have proper distance to the Thief.

If the Attacker rejects the positions, the server sends an `N_Error` message to the Defender, the connection will be closed immediately and both player's will be directed back to main menu with an onscreen message like:

>Connection closed because Guards were not positioned legitimately.
>or
>Connection closed because you apparently tried to cheat!

depending on which player's side.

If accepted the game can begin. A countdown starts and after that each player sends its relevant information changes.

The **Attacker** may send following:

	"N_Update" : 
	[
		"Direction" : "N" | "E" | "S" | "W",
		"Speed" : "Idle" | "Walk" | "Run",
		"Pickup" : 2,    //ID of the specific level item 
		"Knockout" : 1,
		"Escaped" : true
	]

There are currently 4 directions supported. 
To make cheating again more difficult, we don't use specific values.
In order to make communication easier, each level item has a unique number to support multiple game items of the same texture. They are automatically synced, because the get numbered by order in the level definition file.
The value of Knockout is also an unique number of the guard, which get's defined by the order of Position coordinates in the N_Init package.
Escaped tells the Defender that the Thief escaped with all items stolen. After that message the game ends for both players. Attacker wins. 

>**Note:** that the Protocol is actually **TCP**, so we don't have to worry about loosing content or different orders. 


The **Defender** may send following:

	"N_Update" : 
	[
		"Direction" : "N" | "E" | "S" | "W",
		"Speed" : "Idle" | "Walk" | "Run",
		"Caught" : true
	]

Currently 4 directions supported as well,
Same thing with the speed,
Caught tells the Attacker if he got caught. After that message the game ends for both players. Defender wins.

>**Note:** Each element in the N_Update message can be sent independently and should only be sent when the specific State changes.   

All these messages will be redirected from the server to the individual client. In the future this method can be used to double check if any cheating happens.

---

>**Note to Developer:** Maybe send a N_Quit message by the Attacker to verify game end.

[1]: https://docs.google.com/spreadsheets/d/17sdnt_RbsdBI8rBWdKXWnRk2ThEUZ6zl0Ec6AsE9o9Y/edit?usp=sharing