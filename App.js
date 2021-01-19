import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";
import NavigationCustom from "./src/navigation/NavigationCustom";

const App = () => {
  return (
    <Provider store={store}>
      <NavigationCustom />
    </Provider>
  );
};

export default App;
