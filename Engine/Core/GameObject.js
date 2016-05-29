/**
 * Created by Markus on 5/29/2016.
 */

class GameObject
{
    constructor()
    {
        this.position = new Vec2();
        this.rotation = 0;
        this.scale = 0;
        this.layer = 0;
        this.children = [];
    }

    AddChild(gameObj)
    {
        this.children.push(gameObj);
    }
}