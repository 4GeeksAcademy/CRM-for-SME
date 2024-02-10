import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import {UserInfo} from"./pages/UserInfo.jsx";
import { Login } from "./pages/Login.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import {Client} from "./pages/Client.jsx"
import {MainPage} from"./pages/MainPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentCancel from "./pages/PaymentCancel.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Login />} path="/" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<UserInfo />} path="/userinfo" />
                        <Route element={<Client />} path="/client" />
                        <Route element={<MainPage />} path="/home" />   
                        <Route element={<PaymentSuccess />} path="/success" />   
                        <Route element={<PaymentCancel />} path="/cancel" />   
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
