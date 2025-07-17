import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './MainPage';  // Add this import

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUser(username);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={
                        !isAuthenticated ? (
                            <Login onLogin={handleLogin} />
                        ) : (
                            <Navigate to="/dashboard" replace />
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        isAuthenticated ? (
                            <div>
                                <div className="p-4 absolute top-0 right-0 z-10">
                                    <span className="mr-2">Welcome, {user}!</span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Logout
                                    </button>
                                </div>
                                <MainPage />
                            </div>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
                <Route
                    path="/"
                    element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;