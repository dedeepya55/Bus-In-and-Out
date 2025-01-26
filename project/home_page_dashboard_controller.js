const ProDb = require('../../models/Iship_model/home_page_dashboardModel');

const project = async (req, res) => {
    try {
        // Aggregation for buses inside the campus
        const busData = await ProDb.aggregate([
            {
                $match: { "status": "in" },
            },
            {
                $group: {
                    _id: "$timeline",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    timeline: "$_id",
                    count: "$count",
                },
            },
            {
                $sort: { timeline: 1 },
            },
        ]);

        // Aggregation for buses outside the campus
        const busDataOut = await ProDb.aggregate([
            {
                $match: { "status": "out" },
            },
            {
                $group: {
                    _id: "$timeline",
                    countout: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    timelineout: "$_id",
                    countout: "$countout",
                },
            },
            {
                $sort: { timeline: 1 },
            },
        ]);

        // Aggregation for bus counts by status
        const busTime = await ProDb.aggregate([
            {
                $group: {
                    _id: "$status",
                    CountBus: { $sum: 1 }, 
                }
            }
        ]);

        // Format data for response
        const formattedData = busData.map(item => ({
            timeline: item.timeline,
            count: item.count,
        }));

        const formattedDataOut = busDataOut.map(item => ({
            timelineout: item.timelineout,
            countout: item.countout,
        }));

        // console.log({ formattedData, formattedDataOut, aggreresult: busTime });

        // Send response
        res.status(200).json({ 
            formattedData,
            formattedDataOut,
            aggreresult: busTime 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.proj = project;