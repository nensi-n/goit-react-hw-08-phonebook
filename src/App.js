import { useEffect, Suspense, lazy } from "react";
import { Switch } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { authOperations, authSelectors } from "./redux/auth";

import PrivateRoute from "./routs/PrivateRoute";
import PublicRoute from "./routs/PublicRoute";

import Container from "./components/Container/Container";
import AppBar from "./components/AppBar/AppBar";
const HomeView = lazy(() => import("./views/HomeView"));
const LoginView = lazy(() => import("./views/LoginView"));
const RegisterView = lazy(() => import("./views/RegisterView"));
const ContactsView = lazy(() => import("./views/ContactsView"));

function App() {
  const dispatch = useDispatch();
  const isFenchingCurrentUser = useSelector(authSelectors.getFetchingUser);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);
  return (
    !isFenchingCurrentUser && (
      <Container>
        <AppBar />
        <Switch>
          <Suspense
            fallback={
              <Loader type="ThreeDots" color="#ffffff" height={35} width={35} />
            }
          >
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute exact path="/login" restricted redirectTo="/contacts">
              <LoginView />
            </PublicRoute>
            <PublicRoute exact path="/register" restricted>
              <RegisterView />
            </PublicRoute>
            <PrivateRoute path="/contacts" redirectTo="/login">
              <ContactsView />
            </PrivateRoute>
          </Suspense>
        </Switch>
      </Container>
    )
  );
}

export default App;
