import allRoutes from "logic/routes";
import { NOT_FOUND_PATH } from "logic/routes/paths";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Provider } from "react-redux";
import { history } from "logic/redux/rootReducer";
import { store as generateStore } from "logic/redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { Creators as ApplicationCreators } from "logic/reducers/application";

import Authentication from "./pages/Authentication";
import { Alert, ErrorBoundary, Footer, Loading, Navbar } from "./components";

const Application = () => {
  const { persistor, store } = generateStore();
  const initApp = () => store.dispatch(ApplicationCreators.persisted());

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter history={history}>
          <PersistGate
            loading={null}
            persistor={persistor}
            onBeforeLift={initApp}
          >
            <Alert />
            <Authentication />
            <Loading />
            <div className="flex flex-col justify-between min-h-screen">
              <div>
                <Navbar />
                <Routes>
                  {allRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.component />}
                    />
                  ))}

                  <Route
                    path="*"
                    element={<Navigate replace to={NOT_FOUND_PATH} />}
                  />
                </Routes>
              </div>
              <Footer />
            </div>
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default Application;
