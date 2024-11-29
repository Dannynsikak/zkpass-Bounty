import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Form from "./components/form"; // Import the new Form component
import Upload from "./components/Upload";
const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="p-4 bg-blue-500 text-white">
          <h1 className="text-xl">My Application</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/form" className="text-white hover:text-gray-200">
                  Verification Form
                </Link>
              </li>{" "}
              <li>
                <Link to="/upload" className="text-white hover:text-gray-200">
                  Upload
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<h2>Welcome to the Application</h2>} />
            <Route path="/form" element={<Form />} />{" "}
            {/* Route to the Form component */}
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
