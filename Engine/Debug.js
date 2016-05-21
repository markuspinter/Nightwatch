/**
 * Created by Markus on 5/14/2016.
 */

class Debug
{
    constructor()
    {

    }

    LogInfo(caller, message)
    {
        if (DEBUG)
        {
            console.info("%cINFO: in " + N_nameof(caller) + "\n\t" + message, "color: #5fa3e7;");
        }
    }

    LogWarning(caller, message)
    {
        if (DEBUG)
        {
            console.warn("%cWARNING: in " + N_nameof(caller) + "\n\t" + message, "color: #d19f07;");
        }
    }

    LogError(caller, message)
    {
        if (DEBUG)
        {
            console.error("%cERROR: in " + N_nameof(caller) + "\n\t" + message + "", "color: #993122;");
        }
    }

    LogMessage(caller, message)
    {
        if (DEBUG)
        {
            console.log(N_nameof(caller) + "\n\t" + message);
        }
    }

    StartTimer(key)
    {
        if (DEBUG)
        {
            this.startMilliseconds = new Date();

            console.time(key);
        }
    }

    EndTimer(key)
    {
        if (DEBUG)
        {
            console.timeEnd(key);
        }
    }

    TimeStamp(key)
    {
        if (DEBUG)
        {
            console.timeStamp(key);
        }
    }

    Break()
    {
        if (DEBUG)
        {
            debugger;
        }
    }
}

var GameDebug = new Debug();