import React from 'react';
import "./index.css";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";

interface AccountHolderInfo {
    accountName: string;
    accountMajor: string;
}

function SideBar({ accountName, accountMajor }: AccountHolderInfo) {
    const links = [
        {
            label: "Profile",
            icon: "/Generic%20avatar.png",
            activeIcon: "/Generic%20avatar-active.png"
        },
        {
            label: "Home",
            icon: "/Home%20Icon.png",
            activeIcon: "/Home%20Icon-active.png"
        },
        {
            label: "Search",
            icon: "/Search%20Icon.png",
            activeIcon: "/search-active.png"
        },
        {
            label: "Discover",
            icon: "/World%20Icon.png",
            activeIcon: "/language-active.png"
        }
    ];
    const { pathname } = useLocation();
    return (
        <ul className="sidebar-base">
            {links.map((link, index) => {
                const isActive = pathname.includes(link.label);
                return (
                    <li key={index} className={isActive ? "wd-active" : ""}>
                        <Link to={`/SAA/${link.label}`}>
                            <img
                                src={link.label === "Profile" ? link.icon : (isActive ? link.activeIcon : link.icon)}
                                alt={link.label}
                                className="fs-2"
                            />
                            <div>
                                {link.label === "Profile" ?
                                    (<div className="sidebar-account-info">
                                        {accountName} <div>{accountMajor}</div>
                                    </div>) : (link.label)}
                            </div>
                        </Link>
                        <div className="sidebar-base-hr"><hr/></div>
                    </li>
                );
            })}
        </ul>
    );
}

export default SideBar;