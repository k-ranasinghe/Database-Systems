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

export default function Test2() {
    const [value, setValue] = React.useState(0);
    const [flightnumber, setflightnumber] = useState(null);
    const [Destination, setDestination]=useState(null);
    const [fromDate, setFromDate]=useState(null);
    const [toDate, setToDate]=useState(null);
    const [countries, setCountries] = useState([]);
    const [totalPassengers, setTotalPassengers] = useState(' ');
    const [selected, setSelected] = useState({});
    const navigate = useNavigate();
    const [data2_0, setData2_0] = useState({});
    const [data2_1, setData2_1] = useState({});


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

      const columns2_0 = [
        { field: 'flightid', headerName: 'FlightID', width: 100 },
        { field: 'flightnumber', headerName: 'Flight Number', width: 130 },
        { field: 'aircraftid', headerName: 'AircraftID', width: 100 },   
        { field: 'passengers', headerName: 'Passengers', width: 100 },   
        { field: 'ArrivalDateTime', headerName: 'Arrival Time', width: 300 }];

      const columns2_1 = [
        { field: 'total_passengers', headerName: 'Total Passengers', width: 200}
      ];

        function getDestinationData() {
            console.log("Destination ", Destination, "FromDate", fromDate, "toDate", toDate);
            let date1 = new Date(fromDate);
            date1.setDate(date1.getDate() + 1);
            let date2 = new Date(toDate);
            date2.setDate(date2.getDate() + 1);
            axios.get("/admin2", {
              params: {
                Destination: Destination,
                fromDate: date1.toISOString().slice(0, 10),
                toDate: date2.toISOString().slice(0, 10),
              }
            }).then((response) => {
              console.log("API Response:", response);
              let data2_0 = response.data;
              data2_0.map((item) => {
                item.ArrivalDateTime= new Date(item.ArrivalDateTime).toDateString().slice(0,10)+ " - "+new Date(item.ArrivalDateTime).toLocaleTimeString() +" (IST)";
                return item;
              })
        
              setData2_0(response.data);
            }).catch((error) => {
              console.error("API Error:", error);
            });;
            axios.get("/admin2.1", {
              params: {
                Destination: Destination,
                fromDate: date1.toISOString().slice(0, 10),
                toDate: date2.toISOString().slice(0, 10),
              }
            }).then((response) => {
              console.log("API Response:", response);
              setData2_1(response.data);
              setTotalPassengers(response.data.total_passengers);
            }).catch((error) => {
              console.error("API Error:", error);
            });;
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
    <div style={{marginLeft: 20, marginTop: 20}}>
                <TextField
                sx={{ marginLeft: 2 }}
                id="outlined-select-currency"
                select
                onChange={(e) => {
                  setDestination(e.target.value)
                  console.log(e.target.value)
                }}
                label="destination"
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
                <DatePicker 
                    value={fromDate}
                    onChange={(e)=>{
                    setFromDate(e);
                    console.log(e)}}
                    sx={{marginRight:10, marginLeft:50, marginTop:-10}} label="Form" />
                <DatePicker
                    value={toDate}
                    onChange={(e)=>{
                    setToDate(e);
                    console.log(e)}}
                    sx={{marginTop:-10}} label="Until" /> 
                <Button onClick={()=>{
                    getDestinationData();
                }} style={{marginLeft:1100, marginTop:-160}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginTop:-23, marginBottom:-50}}
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
            <div>using this feature you can analysis the traveling statistics for the given destination for the given date range</div>
          </Typography>
    </Paper>
            {data2_0.length>0 ?                
       
              <Paper elevation={3}
              
              style={{marginTop:-250, width: '40%', height: '350px'}}> 
              
             <DataGrid

               rows={data2_0.length > 0 ? data2_0 : []}
               columns={columns2_0}
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
          {data2_1.length>0 ?                
       
       <Paper elevation={3}
       
       style={{ marginTop: 250, marginLeft: -1000, width: '15%', height: '80px' }}> 
       
      <DataGrid

        rows={data2_1.length > 0 ? data2_1 : []}
        columns={columns2_1}
        getRowId={(row) => row.total_passengers}
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