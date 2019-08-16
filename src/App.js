import React from 'react';
import './App.css';
import Head from "./Components/head"
import Footer from "./Components/footer"
import List from "./Components/list"
function App() {
  return (
    <div>
      <Head/>
        <div className="App">
          <br/><br/>
          <List/>
        </div>
      <Footer/>
    </div>
  );
}

export default App;
