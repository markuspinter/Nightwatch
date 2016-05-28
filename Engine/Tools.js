/**
 * Created by Markus on 5/14/2016.
 */

function N_typeof(object)
{
    if (typeof(object) != "undefined")
    {
        return object.constructor.name;
    }
}

function N_nameof(object)
{
    if (typeof(object) != "undefined")
    {
        return object.constructor.name;
    }
}

function N_array(num)
{
    return Array.apply(null, Array(num)).map(Number.prototype.valueOf,0);
}

/*Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
            if( this[ prop ] === value )
                return prop;
        }
    }
}*/