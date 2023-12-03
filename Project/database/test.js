import React, { useEffect, useState } from "react";
import { Paper, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/material';
import img from '../image/airline.jpg';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, DateRangePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


export default function Test1() {
   const [value, setValue] = React.useState(0);
   const [flightnumber, setflightnumber] = useState(null);
//   const [from, setFrom]=useState(null);
//   const [fromDate, setFromDate]=useState(null);
//   const [toDate, settoDate]=useState(null);
   const [countries, setCountries] = useState([]);
//   const [departureDate, setDepartureDate]=useState({});
//   const [arrivalDate, setArrivalDate]=useState({});
   const [data1_0, setData1_0] = useState({});
   const [data1_1, setData1_1] = useState({});
   const [data1_2, setData1_2] = useState({});
   const [selected, setSelected] = useState({});
   const navigate = useNavigate();

  useEffect(() => {
    axios.get("/booking/airports").then((response) => {
      console.log(response);

      let data= response.data;
      let countries=[];

      countries= data.map((item)=>{return {value:item.airportcode,
        label:<><p style={{margin:0}}> 
                  <p style={{fontWeight:'bold',margin:0,marginTop:20}}>{item.cityname} - {item.countryname}</p><br/><p style={{fontSize:15,margin:0,marginTop:-20}}>{item.airportname}   {"("+ item.airportcode + ")"}</p></p></>}})
        
      setCountries(countries);
    }
    );
  }, [])

  const columns1_0 = [
    { field: 'flightid', headerName: 'FlightID', width: 80 },
    { field: 'flightnumber', headerName: 'Flight Number', width: 120 },
    { field: 'aircraftid', headerName: 'AircraftID', width: 100 },
    { field: 'DepartureDateTime', headerName: 'Departure Time', width: 250 }];

  const columns1_1 = [
    { field: 'ID', headerName: '#', width: 30 },
    { field: 'seatid', headerName: 'Seat Number', width: 80 },
    { field: 'passengerid', headerName: 'PassengerID', width: 100 },
    { field: 'firstname', headerName: 'First Name', width: 120 },
    { field: 'lastname', headerName: 'Last Name', width: 120 },
    { field: 'passportnumber', headerName: 'Passport Number', width: 150 },
    { field: 'dateofbirth', headerName: 'Date of Birth', width: 120 },
    { field: 'contactnumber', headerName: 'Contact Number', width: 150 } ];
  
    function getFlightData() {
      console.log("flightnumber ", flightnumber);
      
      axios.get("/admin1.0", {
        params: {
          flightnumber: flightnumber
        }
      }).then((response) => {
        console.log("API Response:", response);
        let data1_0 = response.data;
        data1_0.map((item) => {
          item.DepartureDateTime= new Date(item.DepartureDateTime).toDateString().slice(0,10)+ " - "+new Date(item.DepartureDateTime).toLocaleTimeString() +" (IST)";
          return item;
        })
  
        setData1_0(response.data);
      }).catch((error) => {
        console.error("API Error:", error);
      });;
      axios.get("/admin1.1", {
        params: {
          flightnumber: flightnumber
        }
      }).then((response) => {
        console.log("API Response:", response);
        let data1_1 = response.data;
        data1_1.map((item) => {
          item.dateofbirth= new Date(item.dateofbirth).toDateString().slice(4,15);
          item.DepartureDateTime= new Date(item.DepartureDateTime).toDateString().slice(0,10)+ " - "+new Date(item.DepartureDateTime).toLocaleTimeString() +" (IST)";
          return item;
        })
  
        setData1_1(response.data);
      }).catch((error) => {
        console.error("API Error:", error);
      });;
      axios.get("/admin1.2", {
        params: {
          flightnumber: flightnumber
        }
      }).then((response) => {
        console.log("API Response:", response);
        let data1_2 = response.data;
        data1_2.map((item) => {
          item.dateofbirth= new Date(item.dateofbirth).toDateString().slice(4,15);
          item.DepartureDateTime= new Date(item.DepartureDateTime).toDateString().slice(0,10)+ " - "+new Date(item.DepartureDateTime).toLocaleTimeString() +" (IST)";
          return item;
        })
  
        setData1_2(response.data);
      }).catch((error) => {
        console.error("API Error:", error);
      });;
    }
  
  function CustomFooter() {
    return ( null
      // <Button
      


      //   onClick={() => {
      //     navigate("/reportgeneration", {
      //       state: {
      //         flight: selected
      //       }
      //     })
      //   }}>


      //   Book and Continue
      // </Button>
    )
  }
  return (
    <div>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 50,
          width: "60%",
          minHeight: 200,
          borderRadius:'1rem'
        },
        backgroundImage: `url(${img})`,
        backgroundSize:"cover" ,
        backgroundRepeat:"no-repeat" ,
        backgroundPositionY :'center'
      }}
    >
    <Paper elevation={3}>
        <div style={{marginLeft: 300}}>
            <div >
                <TextField onChange={(e) => {
                  setflightnumber(e.target.value)
                  console.log(e.target.value)
                }}
                 id="outlined-select-currency" name="flightnumber" label="Enter Flight no." variant="outlined" /></div></div>  
                <Button onClick={()=>{
                    getFlightData();
                }} style={{marginLeft:700, marginTop:-80}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginBottom:-20}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 200,
              letterSpacing: '.05rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <div>using this feature you can analysis the statistics for the next immediate flight for the given</div> 
            <div style={{marginTop:25, marginLeft:-1110}}>flight no.</div>
          </Typography>
          </Paper>
          {data1_0.length>0 ?  <Paper elevation={3}
               
               style={{marginTop:-250, width: '30%', height: '100px'}}> 
              <Typography variant="h5"><div style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>flight information</div></Typography> 
              <DataGrid

                rows={data1_0.length > 0 ? data1_0 : []}
                columns={columns1_0}
                getRowId={(row) => row.flightid}
                style={{ border: 20, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}
                onRowClick={(e) => {

                  console.log(e.row);
                  setSelected(e.row);
                }}

                slots={{
                  footer: CustomFooter,
                }}
                initialState={{

                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}

                pageSizeOptions={[5, 10]}

              /></Paper> :null}
              {data1_0.length>0 ?   <Paper elevation={3}
               
               style={{marginTop:-250, width: '70%', height: '300px'}}> 
              <Typography variant="h5"><div style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>passengers over 18 years</div></Typography>
              <DataGrid

                rows={data1_1.length > 0 ? data1_1 : []}
                columns={columns1_1}
                getRowId={(row) => row.ID}
                style={{ border: 20, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}
                onRowClick={(e) => {

                  console.log(e.row);
                  setSelected(e.row);
                }}

                slots={{
                  footer: CustomFooter
                }}
                initialState={{

                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}

                pageSizeOptions={[5, 10]}

              /></Paper> :null}
              {data1_0.length>0 ?  <Paper elevation={3}
               
               style={{marginTop:-250, width: '70%', height: '250px'}}>
              <Typography variant="h5"><div style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>passengers under 18 years</div></Typography>
              <DataGrid

                rows={data1_2.length > 0 ? data1_2 : []}
                columns={columns1_1}
                getRowId={(row) => row.ID}
                style={{ border: 20, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}
                onRowClick={(e) => {

                  console.log(e.row);
                  setSelected(e.row);
                }}

                slots={{
                  footer: CustomFooter,
                }}
                initialState={{

                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}

                pageSizeOptions={[5, 10]}

                /></Paper> :null}
      </Box>
    </div>
  );
}