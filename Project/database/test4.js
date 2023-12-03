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
import { format } from 'date-fns';

export default function Test4() {
    const [value, setValue] = React.useState(0);
    const [Origin, setOrigin] = useState(null);
    const [Destination, setDestination]=useState(null);
    const [fromDate, setFromDate]=useState(null);
    const [toDate, setToDate]=useState(null);
    const [countries, setCountries] = useState([]);
    const [totalPassengers, setTotalPassengers] = useState(' ');
    const [selected, setSelected] = useState({});
    const navigate = useNavigate();
    const [data4_1, setData4_1] = useState({});
    const [data4_2, setData4_2] = useState({});
    const [data4_3, setData4_3] = useState({});

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      const columns4_1 = [
        { field: 'flightid', headerName: 'FlightID', width: 100 },
        { field: 'aircraftid', headerName: 'AircraftID', width: 100 },   
        { field: 'DepartureDateTime', headerName: 'Departure Time', width: 300 },   
        { field: 'ArrivalDateTime', headerName: 'Arrival Time', width: 300 },
        { field: 'PassengerCount', headerName: 'Passenger Count', width: 130 }];

      const columns4_2 = [
        { field: 'flightnumber', headerName: 'Flight Nummber', width: 200},
        { field: 'duration', headerName: 'Duration', width: 200}
      ];

      const columns4_3 = [
        { field: 'totalcount', headerName: 'Total Passenger Count', width: 200}
      ];

        function getRouteData() {
            console.log("Origin", Origin, "Destination ", Destination);
            axios.get("/admin4.1", {
              params: {
                Origin: Origin,
                Destination: Destination
              }
            }).then((response) => {
              console.log("API Response:", response);
              let data4_1 = response.data;
              data4_1.map((item) => {
                item.DepartureDateTime= new Date(item.DepartureDateTime).toDateString().slice(0,10)+ " - "+new Date(item.DepartureDateTime).toLocaleTimeString() +" (IST)";
                item.ArrivalDateTime= new Date(item.ArrivalDateTime).toDateString().slice(0,10)+ " - "+new Date(item.ArrivalDateTime).toLocaleTimeString() +" (IST)";
                return item;
              })
        
              setData4_1(response.data);
            }).catch((error) => {
              console.error("API Error:", error);
            });
            axios.get("/admin4.2", {
                params: {
                  Origin: Origin,
                  Destination: Destination
                }
              }).then((response) => {
                console.log("API Response:", response);
                setData4_2(response.data);
              }).catch((error) => {
                console.error("API Error:", error);
              });
              axios.get("/admin4.3", {
                params: {
                  Origin: Origin,
                  Destination: Destination
                }
              }).then((response) => {
                console.log("API Response:", response);
                setData4_3(response.data);
              }).catch((error) => {
                console.error("API Error:", error);
              });
        }
    
        function CustomFooter() {
            return ( null
              // <Button
              
        
        
              //   onClick={() => {
              //     navigate("/passengerDetails", {
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
    <div style={{marginLeft: 200}}>
            <div >
            <TextField
                sx={{ marginLeft: 2 }}
                id="outlined-select-currency"
                select
                onChange={(e) => {
                  setOrigin(e.target.value)
                  console.log(e.target.value)
                }}
                label="from"
                defaultValue="BIA  (Sri Lanka)"
                helperText="select your country"
              >
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
      </div>  
      <div style={{marginLeft: 500, marginTop:-55}}>
            <div >
            <TextField
                sx={{ marginLeft: 2 }}
                id="outlined-select-currency"
                select
                onChange={(e) => {
                  setDestination(e.target.value)
                  console.log(e.target.value)
                }}
                label="from"
                defaultValue="BIA  (Sri Lanka)"
                helperText="select your country"
              >
                {countries.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
      </div> 
                <Button onClick={()=>{
                    getRouteData();
                }} style={{marginLeft:900, marginTop:-80}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
                <div><Typography
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
            using this feature you can access in depth travel statistics for the given route.
          </Typography></div>
    </Paper>
            {data4_1.length>0 ?                
       
              <Paper elevation={3}
              
              style={{marginTop:-250, width: '60%', height: '350px'}}> 
              
             <DataGrid

               rows={data4_1.length > 0 ? data4_1 : []}
               columns={columns4_1}
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

             />
              </Paper>
          :null} 
          {data4_2.length>0 ?                
       
       <Paper elevation={3}
       
       style={{ marginTop: -250, marginLeft: 400, width: '25%', height: '80px' }}> 
       
      <DataGrid

        rows={data4_2.length > 0 ? data4_2 : []}
        columns={columns4_2}
        getRowId={(row) => row.flightnumber}
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

      />
       </Paper>
   :null}
   {data4_3.length>0 ?                
       
       <Paper elevation={3}
       
       style={{ marginTop: -250, marginLeft: 400, width: '15%', height: '80px' }}> 
       
      <DataGrid

        rows={data4_3.length > 0 ? data4_3 : []}
        columns={columns4_3}
        getRowId={(row) => row.totalcount}
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

      />
       </Paper>
   :null}
        </Box>
    </div>
  );
}