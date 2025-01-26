import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 
import '../css_files/dashboard.css';
import { Pie, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import { IoIosSearch } from 'react-icons/io'; // Make sure this line is present
import BusTimeline from './bus_route';
import html2canvas from 'html2canvas';

import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';


// Registering Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Legend
);
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Dashboard() {
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(null);
    const [busNumber, setBusNumber] = useState('');
    const [busData, setBusData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [dateValue, setDateValue] = useState(new Date());
    const [chartData, setChartData] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [graphData, setGraphData] = useState(null);



    const handleInputChange = (e) => {
        setBusNumber(e.target.value);
    };

    const handleSearch = async () => {
        if (!busNumber) {
            setErrorMessage('Please enter a bus number.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:9000/bus', { busNo: busNumber });
            if (response.data) {
                setBusData(response.data);
                setErrorMessage('');
            }
        } catch (error) {
            alert("Bus no not found");
            // setErrorMessage('Bus number not found or server error.');
        }
    };

    useEffect(() => {
        const fetchRoutes = async () => {
            if (!busNumber) {
                setErrorMessage('Please enter a bus number.');
                return;
            }
          try {
            const response = await axios.post('http://localhost:9000/routes', { busNo: busNumber });
            console.log(response);
            console.log(response.data.routes);
            setRoutes(response.data.routes);  // Access the correct part of the response
          } catch (error) {
            console.error('Error fetching routes:', error);
            setError('Failed to fetch routes. Please try again later.');
          }
        };
    
        fetchRoutes();
      }, []);
    const onDateChange = async (date) => {
        setDateValue(date);
        console.log(dateValue)
        const formattedDate1 = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        console.log(formattedDate1);
        setSelectedDate(formattedDate1);
        console.log(selectedDate);

        try {
            const response = await axios.post('http://localhost:9000/bus-calendar', {
                busNo: busNumber,
                date: formattedDate1,
            });
            console.log(busNumber,formattedDate1);
            const { studentsCount, studentPresentCount } = response.data;
            const pieData = {
                labels: ['Present', 'Absent'],
                datasets: [
                    {
                        label: 'Student Attendance',
                        data: [studentPresentCount, studentsCount - studentPresentCount],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                    },
                ],
            };

            setChartData(pieData);
        } catch (err) {
            console.error('Error fetching data:', err);
            setChartData(null);
            setErrorMessage('Error fetching attendance data.');
        }
    };

    useEffect(() => {
        if (busNumber) {
            onDateChange(new Date());
        }
    }, [busNumber]);

    const handleDateClick = async () => {
        const from = prompt("Enter 'From' Date (dd-mm-yyyy):");
        if (from) {
            const fromDateObj = new Date(from.split('-').reverse().join('-'));
            const toDateObj = new Date(fromDateObj);
            toDateObj.setDate(toDateObj.getDate() + 6);
            const to = `${toDateObj.getDate().toString().padStart(2, '0')}-${(
                toDateObj.getMonth() + 1
            )
                .toString()
                .padStart(2, '0')}-${toDateObj.getFullYear()}`;

            setFromDate(from);
            setToDate(to);

            // Fetch graph data
            try {
                const response = await axios.post('http://localhost:9000/bus-graph', {
                    fromDate: from,
                    toDate: to,
                    busNumber: busNumber,
                });
                const { dates, inTime, outTime } = response.data;

                const data = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'In Time',
                            data: inTime,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: false,
                        },
                        {
                            label: 'Out Time',
                            data: outTime,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            fill: false,
                        },
                    ],
                };
                setGraphData(data);
            } catch (err) {
                alert('Data not available for the provided date');
            }
        }
    };

    useEffect(() => {
        console.log(graphData);
    }, [graphData]);

    const handleYearPrompt = async () => {
        const year = prompt("Please enter the year for monthly analysis (yyyy):");
        if (year) {
            await fetchMonthlyData(year);
        }
    };
    const fetchMonthlyData = async (year) => {
        try {
            const response = await axios.post('http://localhost:9000/bus-monthly-analysis', { year, busNumber });
            const { dates, inTime, outTime } = response.data;
    
            if (dates && inTime && outTime) {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthLabels = dates.map(date => monthNames[parseInt(date, 10) - 1]);
    
                const data = {
                    labels: monthLabels,
                    datasets: [
                        {
                            label: 'In Time',
                            data: inTime,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: false,
                        },
                        {
                            label: 'Out Time',
                            data: outTime,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            fill: false,
                        },
                    ],
                };
                setGraphData(data);
            } else {
                setGraphData(null);
            }
        } catch (error) {
            console.error("Error fetching monthly data:", error);
        }
    };

// Ensure to install html2canvas via npm: npm install html2canvas

const handleDownload = async () => {
    if (!busData) {
        alert("No bus data available to download!");
        return;
    }

    const doc = new jsPDF();

    // Styling the title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255); // Blue title
    doc.text("Bus Data Report", 10, 20);

    // Reset to regular text style for content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text

    // Add bus details with some spacing
    const lineSpacing = 6; // Line spacing for readability
    let currentY = 30;

    doc.text(`Bus Number: ${busData.busNo}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Location: ${busData.location}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Driver Name: ${busData.driverName}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Driver Phone Number: ${busData.driverPhoneNumber}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Route: ${busData.route}`, 10, currentY);
    currentY += lineSpacing;
    doc.text(`Total Students: ${busData.studentsCount}`, 10, currentY);
    currentY += lineSpacing;

    // Capture and add the weekly analysis graph, monthly analysis graph, and pie chart
    const chartsToCapture = [
        { id: 'weekly-analysis', title: 'Weekly Analysis Graph' },
        { id: 'monthly-analysis', title: 'Monthly Analysis Graph' },
        { id: 'pie-chart', title: 'Attendance Pie Chart' },
    ];

    for (const chart of chartsToCapture) {
        const element = document.getElementById(chart.id);
        if (element) {
            const canvas = await html2canvas(element);
            const imgData = canvas.toDataURL('image/png');
            currentY += lineSpacing;
            doc.text(chart.title, 10, currentY);
            currentY += lineSpacing;
            doc.addImage(imgData, 'PNG', 10, currentY, 120, 80); // Adjust dimensions as needed
            currentY += 100; // Space after the image
        }
    }

    // Save the PDF
    doc.save(`bus_data_${busData.busNo}.pdf`);
};

    // const [isVisible, setIsVisible] = useState(false);
    // const toggleVisibility = () => {
    //     setIsVisible(!isVisible); 
    // };
    return (
        <div className="app">
            <div className="sidebar">
                {busData ? (
                    <>
                        <div className="busno">{busData.busNo}</div>
                        <div className="busloc">LOCATION: {busData.location}</div>
                        <div className="busloc">DRIVER NAME: {busData.driverName}</div>
                        <div className="busloc">Phone Number: {busData.driverPhoneNumber}</div>
                        {/* <div className="busloc">Bus Route: {busData.route}</div> */}
                        <div className="busloc">TOTAL STUDENTS: {busData.studentsCount}</div>
                    </>
                ) : (
                    <>
                        <div className="busno">
                            <p>N/A</p>
                        </div>
                        <div className="busloc">LOCATION: N/A</div>
                        <div className="busloc">DRIVER NAME: N/A</div>
                        <div className="busloc">Phone Number: N/A</div>
                        <div className="busloc">TOTAL STUDENTS: N/A</div>
                    </>
                )}
            </div>
            <div className="mainContent">
                <div className="topbar">
                    <div className="name">DASHBOARD</div>
                    <div className="topbar1">
                        <div className="searchicon">
                            <IoIosSearch />
                        </div>
                        <input
                            className="searchbar"
                            type="text"
                            placeholder="Enter Bus Number"
                            value={busNumber}
                            onChange={handleInputChange}
                        />
                        <div className="searchbutton" onClick={handleSearch}>
                            SEARCH
                        </div>
                    </div>
                </div>
                <div className="sidebar1">
                {busData ? (
                    <>
                       <div className='busNoNo'><div className="busno">{busData.busNo}</div></div>
                        <div className="busloc">LOCATION: {busData.location}</div>
                        <div className="busloc">DRIVER NAME: {busData.driverName}</div>
                        <div className="busloc">Phone Number: {busData.driverPhoneNumber}</div>
                        {/* <div className="busloc">Bus Route: {busData.route}</div> */}
                        <div className="busloc">TOTAL STUDENTS: {busData.studentsCount}</div>
                    </>
                ) : (
                    <>
                       <div className='busNoNo'> <div className="busno">
                            <p>N/A</p>
                        </div>
                        </div>
                        <div className="busloc">LOCATION: N/A</div>
                        <div className="busloc">DRIVER NAME: N/A</div>
                        <div className="busloc">Phone Number: N/A</div>
                        {/* <div className="busloc">Bus Route: N/A</div> */}
                        <div className="busloc">TOTAL STUDENTS: N/A</div>
                    </>
                )}
            </div>
                <div className="upper">
                    <div className="upperleft">
                        <div className="ul1">
                            <div className="ul1in">IN TIME</div> 
                            
                            <div className='ul1time'>{busData ? busData.inTime:'N/A'}</div> {/* //give css */}

                        </div>
                        <div className="ul1" onClick={handleDateClick}>
                            <div className="ul1in" >
                                WEEKLY ANALYSIS
                            </div>
                        </div>
                        <div className="ul1"  onClick={handleYearPrompt}>
                            <div className="ul1in">MONTHLY ANALYSIS</div>
                        </div>
                        <div className="ul1" onClick={handleDownload}>
                            <div className="ul1in">Download Report</div>
                        </div>
                    </div>
                    <div className="upperright">
                        <div className="uprheading">IN-OUT REPORT</div>
                        <div className="Ingraph" id="weekly-analysis">
                            {graphData ? (
                                <Line
                                    data={graphData}
                                    options={{
                                        scales: {
                                            x: { title: { display: true, text: 'Date/Months' } },
                                            y: {
                                                title: { display: true, text: 'Time (hh:mm)' },
                                                ticks: {
                                                    callback: (value) => {
                                                        const hours = Math.floor(value / 60);
                                                        const minutes = value % 60;
                                                        return `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2, '0')}`;
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            ) : (
                                <Line
                                data={{
                                    labels: [], // No labels for empty graph
                                    datasets: [
                                        {
                                            label: 'No Data',
                                            data: [],
                                            borderColor: 'rgba(0, 0, 0, 0.1)', // Light color for empty state
                                            borderWidth: 1,
                                            pointRadius: 0, // Hide points
                                        },
                                    ],
                                }}
                                options={{
                                    scales: {
                                        x: { title: { display: true, text: 'Dates / Months' } },
                                        y: {
                                            title: { display: true, text: 'Time (hh:mm)' },
                                            ticks: {
                                                callback: (value) => {
                                                    const hours = Math.floor(value / 60);
                                                    const minutes = value % 60;
                                                    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`; // Correct usage of template literals
                                                },
                                            },
                                        },
                                    },
                                    plugins: {
                                        legend: {
                                            display: false, // Hide legend for empty graph
                                        },
                                    },
                                }}
                                
                            />

                            )}
                        </div>
                    </div>
                </div>
                <div className="down">
                    <div className="d1">
                        <Calendar onChange={onDateChange} value={dateValue} />
                    </div>
                    <div className="d2" id="pie-chart">
                        {/* {selectedDate && <p>Selected Date: {selectedDate}</p>} */}
                        {chartData && <Pie data={chartData} />}
                    </div>
                    <div className="d3">
    {busData && busData.route && (
        <div className="routeContainer">
            <h3>Bus Routes</h3>
            <div className="routeLine">
                {busData.route.split(',').map((location, index) => (
                    <div key={index} className="routeDot">
                        {/* Display each location as a bullet point */}
                        <div className="dot" />
                        <span>{location.trim()}</span>
                        {/* Add a connecting line except for the last location */}
                        {index < busData.route.split(',').length - 1 && (
                            <div className="line" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )}
</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
