import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Form from "./components/form";
const App = () => {
  return (
    <Router>
      <div className="app min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <header className="p-4 bg-blue-600 text-white shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-wide">My Application</h1>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link
                    to="/"
                    className="text-lg hover:text-gray-200 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/form"
                    className="text-lg hover:text-gray-200 transition-colors duration-200"
                  >
                    Verification Form
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow p-6">
          <div className="container mx-auto bg-white shadow rounded-lg p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <h2 className="text-3xl font-semibold text-gray-800">
                    Welcome to the Application
                  </h2>
                }
              />
              <Route path="/form" element={<Form />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center py-4">
          <p className="text-sm">
            © 2024 My Application. All rights reserved.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
