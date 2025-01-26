const profdb = require('../../models/Iship_model/profileModel');

const profile = async (req, res) => {
  try {

    const profiledata = await profdb.aggregate([
      {
        $match: {
          Email: "dedeepyakalavakuri@gmail.com", // Use the email variable here
        },
      },
      {
        $project: {
          _id: 0,
          password: 0,
          access: 0,
          imagepath: 0,
        },
      },
    ]);

    console.log(profiledata);
    res.status(200).json({ profiledata });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.prof=profile;