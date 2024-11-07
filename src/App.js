import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";
import { DefaultLayout } from "./components/Layout";

import AdminLayout from "./components/Layout/AdminLayout/AdminLayout";
import AdminUserList from "./pages/admin/user/AdminUserList";
import AdminUserDetail from "./pages/admin/user/AdminUserDetail";

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                <Route path='/admin/' element={<AdminLayout />}>
                    <Route index element={<AdminUserList />} />
                    {/* ADMIN USER */}
                    <Route path='/admin/user' element={<AdminUserList />} />
                    <Route
                        path='/admin/user/:id'
                        element={<AdminUserDetail />}
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
