import React, {useEffect} from 'react';
import "./sideBar.css";
import {Link} from "react-router-dom";
import {useLocation} from "react-router";
import {useUser} from "../../context/UserContext";

function SideBar() {
    const links = [
        {
            label: "Profile",
            icon: "/Ian avatar.png",
            activeIcon: "/Ian avatar.png"
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
    const { user, email, fetchUser, setLogoutMessage, logoutMessage } = useUser();

    // Fetch user data when component mounts or email changes
    useEffect(() => {
        if (email) {
            fetchUser(email).catch(error => {
                setLogoutMessage(true); 
                console.error('Failed to fetch user in sidebar:', error);
            });
        }
    }, [email]);

    function handleReset(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "/login";
    }


    return (
        <ul className="sidebar-base">
             {logoutMessage && (
                <div className="logout-message">
                    Logging out...
                </div>
            )}
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
                                        {user?.name || "Loading..."}
                                        <div>{user?.major || "Loading..."}</div>
                                    </div>) :
                                    (link.label)}
                            </div>
                        </Link>
                        <div className="sidebar-base-hr"><hr/></div>
                    </li>

                );
            })}
            <button className="logout-button" onClick={handleReset}>Log Out</button>
        </ul>
    );
}

export default SideBar;