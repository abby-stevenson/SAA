import React from 'react';
import {Link} from "react-router-dom";
import SideBar from '../components/sideBar';

function Home() {
    return (
        <div>
            <SideBar accountName="John Doe"
                     accountMajor="Computer Science" />
        </div>
    );
}
export default Home;