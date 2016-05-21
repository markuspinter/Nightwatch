/**
 * Created by Markus on 5/21/2016.
 */

class Timer
{
    constructor(speed)
    {
        this.currentMillis = 0;
        this.deltaTime = 0;
        this.speed = speed;
    }

    Step(deltaTime)
    {
        this.deltaTime = deltaTime*this.speed;
        this.currentMillis+=deltaTime*this.speed;

    }

    get DeltaTime()
    {
        return this.deltaTime;
    }

    get CurrentMillis()
    {
        return this.currentMillis;
    }

    set Speed(speed)
    {
        this.speed = speed;
    }

}

class LocalTimer extends Timer
{
    constructor(parentTimer, speed)
    {
        super(speed, parentTimer.DeltaTime);
        this.parent = parentTimer;
    }

    Step()
    {
        this.deltaTime = this.parent.DeltaTime*this.speed;
        this.currentMillis+=this.parent.DeltaTime*this.speed;

    }
}