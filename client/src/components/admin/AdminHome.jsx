// Npm packages and utilities
import React, { useEffect } from "react";
import { Admin, Resource } from "react-admin";
import { useNavigate } from "react-router-dom";
import authProvider from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";
// Components
import Dashboard from "./Dashboard";
import Bottles from "./bottles/Bottles";
import Users from "./users/Users";
// Styles

/**
 * AdminHome Component.
 * Renders a Admin component from react admin tool
 *
 * @returns {div} The AdminHome
 */
function AdminHome({ setBottles, bottles }) {
    // State variables and hooks
    const navigate = useNavigate();

    // Global variables
    const userAdmin = JSON.parse(localStorage.getItem("adminUser")) || null;

    /**
     * Redirect to admin dashboard on reload page
     */
    useEffect(() => {
        const adminUser = localStorage.getItem("adminUser") || null;
        if (window.location.pathname !== "/admin/login" && !adminUser)
            navigate("/admin/login", {});
    }, []);

    return (
        <Admin
            dashboard={Dashboard}
            dataProvider={dataProvider}
            authProvider={authProvider}
            basename="/admin"
        >
            <Resource
                name="bottles"
                list={Bottles}
                options={{
                    setBottles: setBottles,
                    bottles: bottles,
                    userAdmin: userAdmin,
                }}
            />
            <Resource name="users" list={Users} />
        </Admin>
    );
}

export default AdminHome;
