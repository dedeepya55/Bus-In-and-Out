import React, { useEffect, useState, useRef } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin
import '../css_files/home_dashboard.css';

// Register Chart.js components
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const BusDashboard = () => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [chartDataPie, setChartDataPie] = useState({ labels: [], datasets: [] });
    const [loading, setLoading] = useState(true);
    const [bustime, setBustime] = useState([]);
    
    const pdfContentRef = useRef(null); // Declare the ref here

    useEffect(() => {
        const fetchBusData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/homepagedashboard');
                console.log(response.data);
                const formattedData = response.data.formattedData;
                const formattedDataOut = response.data.formattedDataOut;
                const labels = [...new Set([...formattedData.map(item => item.timeline), ...formattedDataOut.map(item => item.timelineout)])].sort(); // Combine unique timelines

                const countsIn = Array(labels.length).fill(0);
                const countsOut = Array(labels.length).fill(36); // Start with 36 buses outside
                formattedData.forEach(item => {
                    const index = labels.indexOf(item.timeline);
                    if (index !== -1) {
                        countsIn[index] += item.count; // Update countsIn based on the timeline
                    }
                });

                // Update countsOut based on countsIn
                for (let i = 0; i < labels.length; i++) {
                    countsOut[i] = 36 - countsIn.slice(0, i + 1).reduce((acc, count) => acc + count, 0);
                }


               // Prepare chart data
               setChartData({
                labels,
                datasets: [
                    {
                        label: 'Buses Inside Campus',
                        data: countsIn,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Buses Outside Campus',
                        data: countsOut,
                        borderColor: 'rgba(255, 105, 180, 1)', // Pink color for "out" status
                        backgroundColor: 'rgba(255, 105, 180, 0.2)',
                        fill: true,
                    },
                ],
            })
                 // Fetch data for pie chart
                 const bustimeData = response.data.aggreresult.map(item => item.CountBus);
                 setBustime(bustimeData);
                 setChartDataPie({
                     labels: ['Inside Campus', 'Outside Campus'],
                     datasets: [
                         {
                             label: 'Bus Status',
                             data: bustimeData,
                             backgroundColor: ['blue', 'red'],
                             borderColor: ['blue', 'red'],
                             borderWidth: 1,
                         },
                     ],
                 });
                 setLoading(false);
                } catch (error) {
                    console.error('Error fetching data', error);
                    setLoading(false);
                }
            };
    
            fetchBusData();
        }, []);
    

    // Handle PDF download
    const handleDownload = () => {
        const pdf = new jsPDF();

        // Check if chartData is defined and has data
        if (chartData.datasets.length > 0 && chartData.datasets[0].data.length > 0) {
            const busArrivalsData = chartData.datasets[0].data; // Extract arrivals data
            const busLabels = chartData.labels; // Extract bus numbers
            const insideBusCount = bustime.length > 1 ? bustime[1] : 0; // Inside campus count
            const outsideBusCount = bustime.length > 0 ? bustime[0] : 0; // Outside campus count

            // Add a title
            pdf.setFontSize(20);
            pdf.text('Bus Arrivals Report', 14, 22);

            // Create table from data
            pdf.autoTable({
                head: [['Bus Number', 'Arrivals']], // Header row
                body: busLabels.map((label, index) => [label, busArrivalsData[index]]), // Data rows
                startY: 30, // Starting Y position
                margin: { horizontal: 10 }, // Horizontal margins
                theme: 'grid', // Optional: theme for the table
            });

            // Add inside and outside bus counts
            pdf.setFontSize(16);
            pdf.text(`Buses Inside Campus: ${insideBusCount}`, 14, pdf.lastAutoTable.finalY + 10);
pdf.text(`Buses Outside Campus: ${outsideBusCount}`, 14, pdf.lastAutoTable.finalY + 20);

        } else {
            // Handle the case where there is no data
            pdf.setFontSize(20);
            pdf.text('No Data Available', 14, 22);
        }

        // Save the PDF
        pdf.save('bus_report.pdf');
    };

    return (
        <div className="container" ref={pdfContentRef}>
            <div className="containerdiv1">
                <div className="card">
                    <h1>Check Out Today's Bus Stats</h1>
                </div>
                <div className="large-card">
                    <h1 className="heading">Explore the Bus Timings</h1>
                    <div className="chart-container">
                        {loading ? (
                            <p>Loading chart data...</p>
                        ) : (
                            <Line data={chartData} />
                        )}
                    </div>
                    <div className="pie">
                        {loading ? (
                            <p>Loading chart data...</p>
                        ) : (
                            <Pie data={chartDataPie} />
                        )}
                    </div>
                </div>

                <div className="card">
                    <h3>Bus Inside The Campus</h3>
                    <p>Know how many buses are inside the campus</p>
                    <h1>{bustime.length > 0 ? bustime[0] : 'No data available'}</h1>
                </div>
                <div className="card">
                    <h3>Bus Outside The Campus</h3>
                    <p>Know how many buses are outside the campus</p>
                    <h1>{bustime.length > 1 ? bustime[1] : 0}</h1>
                </div>
                <div className="card">
                    <h3>Download Reports</h3>
                    <button className='downloadbutton' onClick={handleDownload}>Download</button>
                </div>
            </div>
        </div>
    );
};


export default BusDashboard;
