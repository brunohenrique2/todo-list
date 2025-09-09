import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {

    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
        </Routes>
    )
}

export default App
