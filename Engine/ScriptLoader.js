/**
 * Created by Markus on 5/14/2016.
 */

var scriptLoadingInfo = [];
var scriptLoadingIndex = 0;

function LoadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    scriptLoadingInfo.push(false);

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function OnLoaded()
{
    scriptLoadingInfo[scriptLoadingIndex] = true;
    scriptLoadingIndex++;


}

$(document).ready(function()
{

    var main = function ()
    {
        var scriptLoadSuccessful = true;

        for (let i = 0; i < scriptLoadingInfo.length; i++)
        {
            if (scriptLoadingInfo[i] === false)
            {
                scriptLoadSuccessful = false;
                break;
            }
        }

        if (scriptLoadSuccessful)
        {
            console.log("Scripts loaded successfully, starting engine...");
            var abstrLayer = new AbstractionLayer();
            abstrLayer.LoadContext();
            
        }
        else
        {
            setTimeout(main, 30);
            console.log("Waiting for scripts being loaded...");
        }


    }

    LoadScript("Engine/Settings.js", OnLoaded);
    LoadScript("Engine/Debug.js", OnLoaded);
    LoadScript("Engine/Tools.js", OnLoaded);
    LoadScript("Engine/NetworkLayer.js", OnLoaded);
    LoadScript("Engine/Core/Common.js", OnLoaded);
    LoadScript("Engine/Core/ResourceManager.js", OnLoaded);
    LoadScript("Engine/Core/Timer.js", OnLoaded);
    LoadScript("Engine/Core/Game.js", OnLoaded);
    LoadScript("Engine/Core/GameRenderer.js", OnLoaded);
    LoadScript("Engine/AbstractionLayer.js", function ()
    {
        OnLoaded();
        main();
    });
});