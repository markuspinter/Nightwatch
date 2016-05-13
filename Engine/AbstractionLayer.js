/**
 * Created by Markus on 5/13/2016.
 */

class GameScreen
{
    consturctor(width, height)
    {
        this.screenWidth = width;
        this.screenHeight = height;
    }

    get ScreenWidth()
    {
        return this.screenWidth;
    }

    set ScreenWidth(width)
    {
        this.screenWidth = width;
    }

    get ScreenHeight()
    {
        return this.screenHeight;
    }

    set ScreenHeight(height)
    {
        this.screenHeight = height;
    }

}

class GameBuffer
{
    consturctor(buffer)
    {

    }
}

function LoadContext()
{
    canvas = $("#gameCanvas");
    ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width);
    console.log(canvas.height);

    var gameScreen = new GameScreen(canvas.width, canvas.height);
}

$(document).ready(function()
{
    console.log("hello");
    LoadContext();
});
