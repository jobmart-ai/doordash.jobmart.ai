import Home from "../home/Home";
import JobWardrobe from "../job-wardrobe/JobWardrobe"
import Login from "../login/Login";

export const CustomRouteConfigs = [
    {
        name: "Home",
        path: "/",
        component: Home,
        description: "",
        auth: true
    },
    {
        name: "Repository",
        path: "/repository",
        component: JobWardrobe,
        description: "",
        auth: true
    },
    {
        name: "Log In",
        path: "/login",
        component: Login,
        description: "",
        auth: false
    },
    {
        name: "Create Account",
        path: "/register",
        component: JobWardrobe,
        description: "",
        auth: false
    },
    {
        name: "Delete Account",
        path: "/deregister",
        component: JobWardrobe,
        description: "",
        auth: true
    },
    {
        name: "Log Out",
        path: "/logout",
        component: JobWardrobe,
        description: "",
        auth: true
    },
    {
        name: "PDF to Image",
        path: "/pdf-to-image",
        component: JobWardrobe,
        description: "",
        auth: true
    }
];