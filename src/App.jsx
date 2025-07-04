import React from "react";
import Weather from "./components/Weather";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="app">
      <Weather />
      <Toaster position="top-center" reverseOrder={true} />  
    </div>
    
  )
};

export default App;