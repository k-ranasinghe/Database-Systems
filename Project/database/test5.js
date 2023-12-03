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

export default function Test5() {
    const [value, setValue] = React.useState(0);
    const [Origin, setOrigin] = useState(null);
    const [Destination, setDestination]=useState(null);
    const [fromDate, setFromDate]=useState(null);
    const [toDate, setToDate]=useState(null);
    const [countries, setCountries] = useState([]);
    const [totalPassengers, setTotalPassengers] = useState(' ');
    const [selected, setSelected] = useState({});
    const navigate = useNavigate();
    const [data5_1, setData5_1] = useState({});
    const [data5_2, setData5_2] = useState({});
    const [data5_3, setData5_3] = useState({});

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

      const columns5_1 = [
        { field: 'Model', headerName: 'Model', width: 100 },
        { field: 'FleetSize', headerName: 'Fleet Size', width: 100 },   
        { field: 'TotalFlights', headerName: 'Total Flights', width: 150 },   
        { field: 'Revenue', headerName: 'Revenue', width: 100 }
      ];

      const columns5_2 = [
        { field: 'TotalFleetSize', headerName: 'Total Fleet Size', width: 150},
        { field: 'TotalFlights', headerName: 'Total Flights', width: 150},
        { field: 'TotalRevenue', headerName: 'Total Revenue', width: 150}
      ];

        function getRevenue() {
            console.log("Origin", Origin, "Destination ", Destination);
            axios.get("/admin5.1").then((response) => {
              console.log("API Response:", response);
              setData5_1(response.data);
            }).catch((error) => {
              console.error("API Error:", error);
            });
            axios.get("/admin5.2").then((response) => {
                console.log("API Response:", response);
                setData5_2(response.data);
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
    <Button onClick={()=>{
        getRevenue();
    }} style={{marginLeft:900, marginTop:-80}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
    
            {data5_1.length>0 ?                
       
              <Paper elevation={3}
              
              style={{marginTop:-250, width: '60%', height: '150px'}}> 
              
             <DataGrid

               rows={data5_1.length > 0 ? data5_1 : []}
               columns={columns5_1}
               getRowId={(row) => row.Model}
               style={{ border: 20, marginLeft: 'auto', marginRight: 'auto', width: 'fit-content'}}
               onRowClick={(e) => {

                 console.log(e.row);
                 setSelected(e.row);
               }}

               slots={{
                 footer: CustomFooter,
               }}
            //    initialState={{

            //      pagination: {
            //        paginationModel: { page: 0, pageSize: 5 },
            //      },
            //    }}
            //    pageSize={data5_1.length}
            //    pageSizeOptions={[5, 10]}
            pagination={false}
             />
              </Paper>
          :null} 
          {data5_2.length>0 ?                
       
       <Paper elevation={3}
       
       style={{ marginTop: -250, marginLeft: 400, width: '40%', height: '80px' }}> 
       
      <DataGrid

        rows={data5_2.length > 0 ? data5_2 : []}
        columns={columns5_2}
        getRowId={(row) => row.TotalFleetSize}
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