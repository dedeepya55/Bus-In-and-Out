import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './LoginPage'; 
import MainComponent_Iship from './mainComponent';
import Profile from '../components/profile';
import BusDetail from "../components/searchComponent";
import Dashboard from '../components/dashboard_component';
import BusDetails from '../components/location2_componene';
import TrainingForm from "../components/addnewbus";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/Home" element={<MainComponent_Iship />} />
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/search' element={<BusDetail/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/bus-details' element={<BusDetails/>}/>
                <Route path="/add" element={<TrainingForm/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
