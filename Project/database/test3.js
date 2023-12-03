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

export default function Test3() {
    const [value, setValue] = React.useState(0);
    const [flightnumber, setflightnumber] = useState(null);
    const [Destination, setDestination]=useState(null);
    const [fromDate, setFromDate]=useState(null);
    const [toDate, setToDate]=useState(null);
    const [countries, setCountries] = useState([]);
    const [totalPassengers, setTotalPassengers] = useState(' ');
    const [selected, setSelected] = useState({});
    const navigate = useNavigate();
    const [data3_1, setData3_1] = useState({});
    const [data3_2, setData3_2] = useState({});
    const [data3_3, setData3_3] = useState({});
    const [data3_4, setData3_4] = useState({});


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

      const columns3_0 = [
        { field: 'passengerid', headerName: 'PassengerID', width: 100 },
        { field: 'firstname', headerName: 'First Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 100 },   
        { field: 'nationality', headerName: 'Nationality', width: 100 },   
        { field: 'passportnumber', headerName: 'Passport Number', width: 300 }];

      const columns3_1 = [
        { field: 'Gold', headerName: 'Gold', width: 100},
        { field: 'Frequent', headerName: 'Frequent', width: 100},
        { field: 'Guest', headerName: 'Guest', width: 100}
      ];

        function getPassengerData() {
            console.log("FromDate", fromDate, "toDate", toDate);
            let date1 = new Date(fromDate);
            date1.setDate(date1.getDate() + 1);
            let date2 = new Date(toDate);
            date2.setDate(date2.getDate() + 1);
            axios.get("/admin3.1", {
              params: {
                fromDate: date1.toISOString().slice(0, 10),
                toDate: date2.toISOString().slice(0, 10),
              }
            }).then((response) => {
              console.log("API Response:", response);
              setData3_1(response.data);
            }).catch((error) => {
              console.error("API Error:", error);
            });
            axios.get("/admin3.2", {
                params: {
                  fromDate: date1.toISOString().slice(0, 10),
                  toDate: date2.toISOString().slice(0, 10),
                }
              }).then((response) => {
                console.log("API Response:", response);
                setData3_2(response.data);
              }).catch((error) => {
                console.error("API Error:", error);
              });
              axios.get("/admin3.3", {
                params: {
                  fromDate: date1.toISOString().slice(0, 10),
                  toDate: date2.toISOString().slice(0, 10),
                }
              }).then((response) => {
                console.log("API Response:", response);
                setData3_3(response.data);
              }).catch((error) => {
                console.error("API Error:", error);
              });
              axios.get("/admin3.4", {
                params: {
                  fromDate: date1.toISOString().slice(0, 10),
                  toDate: date2.toISOString().slice(0, 10),
                }
              }).then((response) => {
                console.log("API Response:", response);         
                setData3_4(response.data);
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
    <div style={{marginLeft: 0, marginTop: 100}}>
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
                    getPassengerData();
                }} style={{marginLeft:1100, marginTop:-160}} variant="contained" startIcon={<SearchIcon />}>Search</Button></div>
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            style={{marginBottom:-50}}
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
            <div>using this feature you can analysis the booking statistics for different passenger types for the given date range</div>
          </Typography>
    </Paper>
            {data3_1.length>0 ?                
       
              <Paper elevation={3}
              
              style={{marginTop:-250, width: '40%', height: '250px'}}> 
              <Typography variant="h5"><div style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>Gold</div></Typography> 
             <DataGrid

               rows={data3_1.length > 0 ? data3_1 : []}
               columns={columns3_0}
               getRowId={(row) => row.passengerid}
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
          {data3_2.length>0 ?                
       
       <Paper elevation={3}
       
       style={{ marginTop: -250, marginLeft: 400, width: '40%', height: '300px' }}> 
       <Typography variant="h5"><div style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>Frequent</div></Typography> 
      <DataGrid

        rows={data3_2.length > 0 ? data3_2 : []}
        columns={columns3_0}
        getRowId={(row) => row.passengerid}
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
   {data3_3.length>0 ?                
       
       <Paper elevation={3}
       
       style={{ marginTop: -250, marginLeft: 400, width: '40%', height: '80px' }}> 
       <Typography variant="h5"><div style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>Guest</div></Typography> 
      <DataGrid

        rows={data3_3.length > 0 ? data3_3 : []}
        columns={columns3_0}
        getRowId={(row) => row.passengerid}
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
   {data3_4.length>0 ?                
       
       <Paper elevation={3}
       
       style={{ marginTop: -250, marginLeft: 400, width: '20%', height: '80px' }}> 
       <Typography variant="h5"><div style={{ marginTop: 0, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>Summary</div></Typography> 
      <DataGrid

        rows={data3_4.length > 0 ? data3_4 : []}
        columns={columns3_1}
        getRowId={(row) => row.Gold}
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