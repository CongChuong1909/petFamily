import React from 'react';
import Suggets from './SuggestsFriend/Suggets';
import SuggestGroups from './SuggestGroups/SuggestGroups';
import OnlineFriend from './OnlineFriends/OnlineFriend';

function Rightbar(props) {
    return (
        <div>
            <Suggets/>
            <SuggestGroups/>
        </div>
    );
}

export default Rightbar;