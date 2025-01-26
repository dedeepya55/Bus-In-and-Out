const ProfileData = require('../../models/Iship_model/profileModel'); // Import your ProfileData model

// Define the loginUser function
const loginUser = async (req, res) => {
  const { Email, password } = req.body; // Extract Email and password from request body

  try {
    console.log(Email);
    console.log(password);
    
    // Find user by email using aggregation
    const user = await ProfileData.aggregate([
      {
        $match: {
          Email: Email
        }
      },
      {
        $project: {
          _id: 0,
          password: 1,
          access: 1
        }
      }
    ]);
    console.log(user);
    
    // Check if user was found
    // if (user.length === 0) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // // Compare the provided password with the stored password directly
    // if (user[0].password !== password) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // Successful login, respond based on access level
    if (user[0].access === 1) {
      res.status(200).json({ message: 'Login successful', access: 1 });
    } else {
      res.status(200).json({ message: 'Login successful', access: 0 });
    }

  } catch (error) {
    console.error('Error logging in:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Export loginUser function
exports.loginUser = loginUser;
