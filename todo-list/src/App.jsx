import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';

function App() {

    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
        </Routes>
    )
}

export default App
