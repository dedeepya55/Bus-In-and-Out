import React, { useEffect, useState } from "react";
import "../css_files/profile.css";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [updatePro, setUpdatePro] = useState([]);
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    gender: "",
    id: "",
    image: ""
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/profile-api");
        if (response.data.profiledata.length > 0) {
          const item = response.data.profiledata[0];
          setProfile({
            firstname: item.FirstName,
            lastname: item.LastName,
            email: item.Email,
            mobile: item.MobileNo,
            gender: item.Gender,
            id: item.EmplyeeId,
            image: item.imagepath
          });
        }
        setUpdatePro(response.data.profiledata);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchProfileData();
  }, []);

  // Handle profile photo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("empid", profile.id);

      axios
        .post("http://localhost:9000/upload", formData)
        .then((res) => {
          console.log(res.data);
          fetchProfilePhoto();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const fetchProfilePhoto = async () => {
    try {
      const response = await axios.get("http://localhost:9000/profileupload");
      const var1=response.data.profileupdate[0].imagepath;
      console.log(var1);
      setProfilePhoto(`http://localhost:9000/${var1}`);
    } catch (err) {
      console.error("Error fetching profile photo", err);
    }
  };
  return (
    <div className="mainprofilecontainer">
      <div className="dashboard-container">
        <div className="profilephoto">
          <div className="photo">
            <input
              type="file"
              id="fileInput"
              className="file-input"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="file-label">
              {profilePhoto ? (
                <img src={profilePhoto} alt="uploaded photo" className="photoCame" />
              ) : (
                <FaCamera className="camera-icon" />
              )}
            </label>
          </div>
        </div>
        <div className="profilehead">
          <div className="profileheading1">
            First Name
            <div className="firstname">{profile.firstname}</div>
          </div>
          <div className="profileheading2">
            Last Name
            <div className="lastname">{profile.lastname}</div>
          </div>
        </div>
        <div className="profilehead">
          <div className="profileheading1">
            Email
            <div className="firstname">{profile.email}</div>
          </div>
          <div className="profileheading2">
            Mobile
            <div className="lastname">{profile.mobile}</div>
          </div>
        </div>
        <div className="profilehead">
          <div className="profileheading1">
            Gender
            <div className="firstname">{profile.gender}</div>
          </div>
          <div className="profileheading2">
            Employee Id
            <div className="lastname">{profile.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;