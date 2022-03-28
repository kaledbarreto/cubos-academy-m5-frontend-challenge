import {
  BrowserRouter as Router, Redirect, Route,
  Switch
} from "react-router-dom";
import { ChargesProvider } from './context/ChargesContext';
import { GlobalProvider } from './context/GlobalContext';
import useGlobal from './hooks/useGlobal';
import Charges from './pages/Charges';
import ClientDetail from "./pages/ClientDetail";
import clientes from "./pages/Clients";
import Home from "./pages/Home";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function ProtectedRoutes(props) {
  const { token } = useGlobal();

  return (
    <Route
      render={() => (token ? props.children : <Redirect to="/sign-in" />)}
    />
  );
}

function Routes() {
  return (
    <div className="routes">
      <Router>
        <Switch>
          <GlobalProvider>
            <Route path={['/', '/sign-in']} exact component={SignIn} />
            <Route path='/sign-up' component={SignUp} />
            <ProtectedRoutes>
              <ChargesProvider>
                <Route path="/home" component={Home} />
                <Route path="/clientes" component={clientes} />
                <Route path="/cobrancas" component={Charges} />
                <Route path="/clientDetail/:id" component={ClientDetail} />
              </ChargesProvider>
            </ProtectedRoutes>
          </GlobalProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;