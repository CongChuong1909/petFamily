import React from 'react';
import Suggets from './SuggestsFriend/Suggets';
import SuggestGroups from './SuggestGroups/SuggestGroups';
import OnlineFriend from './OnlineFriends/OnlineFriend';
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