import React from 'react';
import {Link} from "react-router-dom";
import SideBar from "../../components/sideBar";

function Profile() {
    return (
        <SideBar accountName="John Doe"
                 accountMajor="Computer Science" />
    );
}
export default Profile;