import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../styles/profile.css";
import {
  Container,
  Grid,
  Paper,
  Avatar,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import WidgetsIcon from '@mui/icons-material/Widgets';
import VerticalStepper from '../components/verticalstepper';
import Navbar from "../components/navbar";
import {
  AccountCircle,
  LocationOn,
  Phone,
  Email,
  Description,
  Edit
} from "@mui/icons-material";
import RouteGuard from "../components/routeguard";
// import BaseUrl from "../config/config";
import { BASE_API } from "../utils/common";
import baseApi from "../utils/common";
const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setProfilePicFile(null);
  };

  const [profilePicFile, setProfilePicFile] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    baseApi.post("/files?purpose=PROFILE_PIC", formData).then((response) => {
      console.log(response.data);
      setProfilePicFile(response.data.id);
      localStorage.setItem("img", response.data.id);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'profile image updated',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch((error) => {
      console.error(error);
    })
    setProfilePicFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  // Dummy data
  var personalInformation = {
  };

  function ToggleLeftSideBar() {
    const LeftBar = document.getElementById('Left-Bar');
    if (LeftBar.style.transform === "translateX(-200%)") {
      LeftBar.style.transform = "translateX(3%)"
    } else {
      LeftBar.style.transform = "translateX(-200%)"
    }
  }

  function ToggleRightSideBar() {
    const RightBar = document.getElementById('Right-Bar');
    if (RightBar.style.transform === "translateX(200%)") {
      RightBar.style.transform = "translateX(3%)"
    } else {
      RightBar.style.transform = "translateX(200%)"
    }
  }


  const [user, setuser] = useState({});
  const [newValue, setnewValue] = useState({});
  const handleUpdate = () => {
    baseApi.put("/user", newValue).then((response) => {
      console.log(response.data);
      setuser(response.data);
      setOpen(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User Details Updated',
        showConfirmButton: false,
        timer: 1500
      })
    }).catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    baseApi.get("/user").then((response) => {
      console.log(response.data);
      setuser(response.data);
      setnewValue(response.data);
      delete newValue.roles;
      delete newValue.profilePic;
      console.log(newValue);
      // personalInformation = response.data;
      console.log({ "new value": newValue });
      setProfilePicFile(localStorage.getItem("img"));
      console.log(profilePicFile);
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  return (
    <>
      <RouteGuard />
      <Navbar />
      <div className="two-flex">
        <div className="ico" onClick={ToggleLeftSideBar}><MenuOpenIcon /></div>
        <div className="ico" onClick={ToggleRightSideBar}><WidgetsIcon /></div>
      </div>
      <div className="main-dashboard">
        <div className="left-dashboard" id='Left-Bar'>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Your Order</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Your Order"
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <div className="yourOrders"><a href="#">Your Order</a><ArrowForwardIosIcon /></div>
          <Divider sx={{ margin: '1rem 0' }} />
          <VerticalStepper />
        </div>
        <div className="middle-dashboard">
          <div className="Profile">
            <Container maxWidth="md" className="cont-MUI">
              <Paper elevation={3} sx={{ padding: "2rem" }} className="Bg-cont">
                <Grid
                  container
                  spacing={4}
                  alignItems="center"
                  className="BG-profile"
                >
                  <Grid item className="GridProfile-MUI">
                    <Avatar sx={{ width: 150, height: 150 }}>
                      {profilePicFile ? (
                        <img
                          src={`${BASE_API}/files/${profilePicFile}/serve`}
                          alt="Profile"
                        />
                      ) : (
                        <AccountCircle sx={{ width: "100%", height: "100%" }} />
                      )}
                    </Avatar>
                    <input
                      accept="image/*"
                      id="profile-pic-input"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleProfilePicChange}
                    />
                    <label htmlFor="profile-pic-input" className="Picedit">
                      <Edit />
                    </label>
                  </Grid>
                  <Grid item className="GridProfile-MUI">

                    <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                      {user.title} {user.firstName} {user.lastName}
                    </Typography>

                    <Button variant="text" onClick={handleOpen}>
                      Edit Profile
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="model-model-title"
                      aria-describedby="model-model-description"
                    >
                      <Box className="Model-box">
                        <Typography id="model-model-title" variant="h4" component="h2">
                          Edit Profile
                        </Typography>
                        <Divider sx={{ margin: '1rem 0' }} />
                        <form onSubmit={handleSubmit}>
                          <Grid container spacing={2} className="main-body-model">
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.title}
                                onChange={(event) => { newValue.title = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.firstName}
                                onChange={(event) => { newValue.firstName = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.lastName}
                                onChange={(event) => { newValue.lastName = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Middle Name"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.middleName}
                                onChange={(event) => { newValue.middleName = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Gender"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.gender}
                                onChange={(event) => { newValue.gender = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Date of Birth"
                                variant="outlined"
                                fullWidth
                                type="date"
                                defaultValue={user.dob}
                                onChange={(event) => { newValue.dob = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Age"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.ageInYears}
                                onChange={(event) => { newValue.ageInYears = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Height"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.height}
                                onChange={(event) => { newValue.height = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Height Unit"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.heightUnit}
                                onChange={(event) => { newValue.heightUnit = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Weight"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.weight}
                                onChange={(event) => { newValue.weight = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Weight Unit"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.weightUnit}
                                onChange={(event) => { newValue.weightUnit = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Mobile Number"
                                variant="outlined"
                                fullWidth
                                defaultValue={user.mobileNumber}
                                onChange={(event) => { newValue.mobileNumber = event.target.value; setnewValue({ ...newValue }); console.log(newValue) }}
                              />
                            </Grid>
                          </Grid>
                          <Divider sx={{ margin: '0.5rem 0' }} />
                          <Button variant="contained" onClick={handleUpdate} size="medium" color="success" type="submit">
                            Save Changes
                          </Button>
                        </form>
                      </Box>
                    </Modal>

                  </Grid>
                </Grid>
                <Grid container spacing={4} className="Data">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                      Personal Information
                    </Typography>
                    <List disablePadding>
                      {/* <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar>
                            <LocationOn />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Address"
                          secondary="123 Medical Street, City"
                        />
                      </ListItem> */}
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar>
                            <Phone />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Phone"
                          secondary={user.mobileNumber}
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar>
                            <Email />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Email"
                          secondary={user.email}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                      Other Details
                    </Typography>
                    <List disablePadding>
                      <Box>
                        <ListItem disablePadding>
                          <ListItemAvatar>
                            <Avatar>
                              <Description />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Age"
                            secondary={`${user.ageInYears} years`}
                          />
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemAvatar>
                            <Avatar>
                              <Description />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary="Gender"
                            secondary={user.gender}
                          />
                        </ListItem>
                      </Box>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar>
                            <Description />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Height"
                          secondary={`${user.height} ${user.heightUnit}`}
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemAvatar>
                          <Avatar>
                            <Description />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Weight"
                          secondary={`${user.weight} ${user.weightUnit}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </div>
        </div>
        <div className="right-dashboard" id='Right-Bar'>
          Right Bar
        </div>
      </div>
    </>
  );
};

export default Profile;
