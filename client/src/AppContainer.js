import React from "react";
import App from "./App";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import createAppStore from "./redux/store";
import axios from "axios";
import LoadingArea from "./components/LoadingArea";

const ErrorComponent = ({ errorMessage }) => (
  <div className="text-red-500 font-bold text-center">{errorMessage}</div>
);

const AppContainer = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await axios.get("/server-status");
      } catch (err) {
        setError("Server is down. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkServerStatus();
  }, []);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const appStore = await createAppStore();
        setStore(appStore);
      } catch (err) {
        console.log(err)
        setError(`Error initializing the app: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    initializeStore();
  }, []);

  if (loading || error) {
    return (
      <div className="flex items-center justify-center h-screen">
        {loading ? <LoadingArea/> : <ErrorComponent errorMessage={error} />}
      </div>
    );
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppContainer;
