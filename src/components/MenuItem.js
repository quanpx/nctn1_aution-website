import React from 'react';
const MenuItem = ({icon,value})=>
{
    const Icon = icon;
    return (
        <div>
            <Icon/>
            &nbsp;
            {value}
        </div>
    )

}
export default MenuItem;