import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./AppRoutes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="App">
        <div className="inner-wrapper">
        <AppRoutes /> 
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
           <div className="footer">
            <p> @ Copy right reserved by zubair marriage center | <a target="_blank" href="https://www.upwork.com/freelancers/~01fe666696114ee1da">developed by amjad mehmood</a>  </p>
           </div>

      </div>
    </>

  );
}

export default App;
