import React from "react";
import Casino from "./components/Casino";
import options from "./drizzleOptions";

import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle, generateStore } from "@drizzle/store";

const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

function App() {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => <Casino drizzleContext={drizzleContext}/>}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
