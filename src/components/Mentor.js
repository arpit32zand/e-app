import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

class Mentor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth:true,
      visible: false
    };
    this.handleOut = this.handleOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    
  }

  handleOut(e) {
    e.preventDefault();
    localStorage.removeItem("type");
    window.location.reload(false);
  }

  handleChange(e) {
    this.setState({auth: e.target.checked});
  };

  handleMenu(){
    this.setState({visible: !this.state.visible})
  };

  handleClose(){
    this.setState({anchorEl: null});
  };

  render() {
    const mentorData = localStorage.getItem('mentorData')
    let data =JSON.parse(mentorData)
    
    const classes = {
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: '2px',
        position: 'absolute',
        right: '10px'
      },
      title: {
        flexGrow: 1,
      },
    };

   return (
      <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
           Hi {data.username} !
          </Typography>
          {JSON.parse(localStorage.getItem("type")) === "mentor" ? (
             <div>
             <IconButton
             style={{position:'absolute', right: '25px', top: '20px', padding: '0'}} 
               aria-label="account of current user"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={this.handleMenu}
               color="inherit"
             >
               <AccountCircle />
             </IconButton>
             <Menu
               style={{ right: '25px', top: '20px', padding: '0'}}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={this.state.visible}
               onClose={this.handleClose}
             >
               <MenuItem onClick={this.handleClose}>Edit Profile</MenuItem>
               <MenuItem onClick={this.handleOut}>Logout</MenuItem>
             </Menu>
           </div>
        ) : JSON.parse(localStorage.getItem("type")) === "candidate" ? (
          <div>
            <Redirect to="/candidate" />;
          </div>
        ) : (
          <div>
            <Redirect to="/" />;
          </div>
        )}
        </Toolbar>
      </AppBar>
 
       <table style={{textAlign : 'center',
        fontFamily: 'Calibri',
        borderCollapse: 'collapse',
        border: '3px solid #ddd',
        width: '100%'}}>
          <tr style={{color: '#3f51b5', backgroundColor:'#00000038', border: '1px solid #00000038',padding: '5px'}}>
            <th style={{padding: '15px',borderRight:'3px solid #3f51b5'}}>Course ID</th>
            <th style={{padding: '15px',borderRight:'3px solid #3f51b5'}}>Course Name</th>
            <th style={{padding: '15px',borderRight:'3px solid #3f51b5'}}>Actual Price</th>
            <th style={{padding: '15px',borderRight:'3px solid #3f51b5'}}>Discounted Price</th>
            <th style={{padding: '15px'}}>File type</th>
         </tr>
        {
          data.subject.map((row)=>(
          <tr>
            <td style={{padding: '15px',borderRight:'3px solid #ccc'}}>
              {row.courseId}
            </td>
            <td style={{padding: '15px',borderRight:'3px solid #ccc'}}>
              {row.courseName}
            </td>
            <td style={{padding: '15px',borderRight:'3px solid #ccc'}}>
              {row.actualPrice}
            </td>
            <td style={{padding: '15px',borderRight:'3px solid #ccc'}}>
              {row.discountPrice}
            </td>
            <td style={{padding: '15px'}}>{row.fileType}</td>
          </tr>
          ))
        }
       </table>
 </div>
    );
  }
}

export default Mentor;
