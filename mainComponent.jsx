import React, { useState, useRef } from "react";
import { useLocation, Routes, Route } from "react-router-dom"; // Import useLocation here
import Header from "../components/header_component";
import Location from "../components/location_comp";
import AboutPage from "../components/about_page_component";
import CounterCompo from "../components/counter_component";
import HelpComponent from "../components/help_component";
import Footer from "../components/footer_component";
import ForHome from "../components/homepagemain";
import BusDashboard from "../components/Home_dashboard";
import Service from "../components/service_componenet";
import BusDetails from "../components/location2_componene";
import Dashboard from "../components/dashboard_component";
import BusDetail from "../components/searchComponent";
import ScrollToTop from "../components/arrow";
import TrainingForm from "../components/addnewbus";
import Profile from "../components/profile";

function MainComponent_Iship() {
    const [dashboard, setDashboard] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [search, setSearch] = useState(null);
    const [addn, setAddn] = useState(null);
    const [profile, setProfile] = useState(null);

    const location = useLocation(); // Use useLocation here
    const access = location.state?.access; // Get access from the location state

    // Create refs for the sections
    const comp1Ref = useRef(null);
    const comp2Ref = useRef(null);
    const comp3Ref = useRef(null);
    const comp4Ref = useRef(null);
    const comp5Ref = useRef(null);

    return (
        <>
            <Header 
                comp1Ref={comp1Ref} 
                comp2Ref={comp2Ref} 
                comp3Ref={comp3Ref} 
                comp4Ref={comp4Ref} 
                comp5Ref={comp5Ref}  
                setAddn={setAddn}
                setSearch={setSearch} 
                setProfile={setProfile}
                access={access} 
            />

            <div ref={comp1Ref}>
                <ForHome />
            </div>
            <div ref={comp2Ref}>
                <BusDashboard />
            </div>
            <div ref={comp3Ref}>
                <Location onLocationClick={setSelectedLocation} />
            </div>
            <Service onServiceClick={setDashboard} />
            <div ref={comp4Ref}>
                <AboutPage />
            </div>
            <CounterCompo />
            <div ref={comp5Ref}>
                <HelpComponent />
            </div>
            <Footer />
            <ScrollToTop />

            <Routes>
                <Route path="/search" element={<BusDetail search={search} />} />
                <Route path="/bus-details" element={<BusDetails selectedLocation={selectedLocation} />} />
                <Route path="/dashboard" element={<Dashboard dashboard={dashboard} />} />
                <Route path="/add" element={<TrainingForm addn={addn} />} />
                <Route path="/profile" element={<Profile profile={profile} />} />
            </Routes>
        </>
    );
}

export default MainComponent_Iship;
