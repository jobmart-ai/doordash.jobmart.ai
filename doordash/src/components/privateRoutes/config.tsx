import Home from "../home/Home";
import Repository from "../repository/Repository"
import Login from "../login/Login";
import Register from "../register/Register";

export const CustomRouteConfigs = [
    {
        name: "Home",
        path: "/",
        component: Home,
        description: "",
        header: true
    },
    {
        name: "Repository",
        path: "/repository",
        component: Repository,
        description: "",
        header: true
    },
    {
        name: "Log In",
        path: "/login",
        component: Login,
        description: "",
        header: false
    },
    {
        name: "Create Account",
        path: "/register",
        component: Register,
        description: "",
        header: false
    },
    {
        name: "Delete Account",
        path: "/deregister",
        component: Repository,
        description: "",
        header: true
    },
    {
        name: "Log Out",
        path: "/logout",
        component: Repository,
        description: "",
        header: true
    },
    {
        name: "PDF to Image",
        path: "/pdf-to-image",
        component: Repository,
        description: "",
        header: true
    }
];