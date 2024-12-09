import React, { useState } from 'react';
import UserPanel from './components/UserPanel';
import AdminPanel from './components/AdminPanel';
import './styles.css';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [panel, setPanel] = useState(null); 

    const handleLogin = () => {
        const adminCredentials = { username: 'admin', password: 'admin123' };
        const userCredentials = { username: 'user', password: 'user123' };

        if (username === adminCredentials.username && password === adminCredentials.password) {
            setPanel('admin'); 
            setError('');
        } else if (username === userCredentials.username && password === userCredentials.password) {
            setPanel('user'); 
            setError(''); 
        } else {
            setError('Invalid username or password. Please try again.');
            setPanel(null); 
        }
    };

    const handleLogout = () => {
        setUsername('');
        setPassword('');
        setPanel(null); 
    };

    return (
        <div className="App">
            <div className="login-container">
                <h1>Ice Cream Parlor Cafe</h1>
                {!panel ? (
                    <div className="login-form">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button onClick={handleLogin}>Login</button>
                        {error && <p className="error">{error}</p>}
                    </div>
                ) : (
                    <div className="panel">
                        {panel === 'admin' && <AdminPanel />}
                        {panel === 'user' && <UserPanel />}
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
