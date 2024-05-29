//importing components
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Episodes from "./components/Episodes";
import Characters from "./components/Characters";
//importing styles
import "./App.css"
//importing react-router-dom
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header/>
        <div className="app__container">
          <Routes>
                <Route path="/" element={<Episodes/>}/>
                <Route path="/characters" element={<Characters/>}/>
          </Routes>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
