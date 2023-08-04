import React from 'react';
import Suggets from './SuggestsFriend/Suggets';
import Category from './Category/Category';

function Rightbar(props) {
    return (
        <div>
            <Suggets/>
            {/* <SuggestGroups/> */}
            <Category/>
        </div>
    );
}

export default Rightbar;