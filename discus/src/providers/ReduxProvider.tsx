import ScrollTop from "@src/layout/ScrollTop";
import SnackbarSetup from "@src/layout/SnackbarSetup";
import { persistedStore, store } from "@src/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ScrollTop />
        <SnackbarSetup />
        {children}
      </PersistGate>
    </Provider>
  );
}
