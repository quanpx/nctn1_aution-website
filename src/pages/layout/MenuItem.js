import React from 'react';
const MenuItem = ({icon,value})=>
{
    const Icon = icon;
    return (
        <div className="nav-item">
            <Icon/>
            <span style={{'color':'white'}}>{value}</span>
        </div>
    )

}
export default MenuItem;