import React, { useEffect, useState } from "react";
import { Paper, TextField } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import img from '../image/airline.jpg';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  
  
export default function ReportGeneration() {
  const [value, setValue] = React.useState(0);
  const [flightnumber, setflightnumber] = useState(null);
  const [Origin, setOrigin] = useState(null);
  const [Destination, setDestination]=useState(null);
  const [fromDate, setFromDate]=useState(null);
  const [toDate, setToDate]=useState(null);
  const [totalPassengers, setTotalPassengers] = useState(' ');
  const [countries, setCountries] = useState([]);
  const [from, setFrom] = useState([]);
  const [selected, setSelected] = useState({});
  const navigate = useNavigate();
  const [data1_0, setData1_0] = useState({}); const [data1_1, setData1_1] = useState({}); const [data1_2, setData1_2] = useState({});
  const [data2_0, setData2_0] = useState({}); const [data2_1, setData2_1] = useState({});
  const [data3_1, setData3_1] = useState({}); const [data3_2, setData3_2] = useState({}); const [data3_3, setData3_3] = useState({}); const [data3_4, setData3_4] = useState({});
  const [data4_1, setData4_1] = useState({}); const [data4_2, setData4_2] = useState({}); const [data4_3, setData4_3] = useState({});
  const [data5_1, setData5_1] = useState({}); const [data5_2, setData5_2] = useState({}); const [data5_3, setData5_3] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const columns2_0 = [
    { field: 'flightid', headerName: 'FlightID', width: 120 },
    { field: 'flightnumber', headerName: 'Flight Number', width: 130 },
    { field: 'aircraftid', headerName: 'AircraftID', width: 100 },   
    { field: 'passengers', headerName: 'Passengers', width: 100 },   
    { field: 'ArrivalDateTime', headerName: 'Arrival Time', width: 300 }];

  const columns2_1 = [
    { field: 'total_passengers', headerName: 'Total Passengers', width: 200}];

  const columns3_0 = [
    { field: 'passengerid', headerName: 'PassengerID', width: 100 },
    { field: 'firstname', headerName: 'First Name', width: 130 },
    { field: 'lastname', headerName: 'Last Name', width: 100 },   
    { field: 'nationality', headerName: 'Nationality', width: 100 },   
    { field: 'passportnumber', headerName: 'Passport Number', width: 300 }];

  const columns3_1 = [
    { field: 'Gold', headerName: 'Gold', width: 100},
    { field: 'Frequent', headerName: 'Frequent', width: 100},
    { field: 'Guest', headerName: 'Guest', width: 100}];

  const columns4_1 = [
    { field: 'flightid', headerName: 'FlightID', width: 100 },
    { field: 'aircraftid', headerName: 'AircraftID', width: 100 },   
    { field: 'DepartureDateTime', headerName: 'Departure Time', width: 300 },   
    { field: 'ArrivalDateTime', headerName: 'Arrival Time', width: 300 },
    { field: 'PassengerCount', headerName: 'Passenger Count', width: 130 }];

  const columns4_2 = [
    { field: 'flightnumber', headerName: 'Flight Nummber', width: 200},
    { field: 'duration', headerName: 'Duration', width: 200}];

  const columns4_3 = [
    { field: 'totalcount', headerName: 'Total Passenger Count', width: 200}];

  const columns5_1 = [
    { field: 'Model', headerName: 'Model', width: 100 },
    { field: 'FleetSize', headerName: 'Fleet Size', width: 100 },   
    { field: 'TotalFlights', headerName: 'Total Flights', width: 150 },   
    { field: 'Revenue', headerName: 'Revenue', width: 100 }];

  const columns5_2 = [
    { field: 'TotalFleetSize', headerName: 'Total Fleet Size', width: 150},
    { field: 'TotalFlights', headerName: 'Total Flights', width: 150},
    { field: 'TotalRevenue', headerName: 'Total Revenue', width: 150}];

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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Flight Analysis" {...a11yProps(0)} />
          <Tab label="Destination Analysis" {...a11yProps(1)} />
          <Tab label="Booking Analysis" {...a11yProps(2)} />
          <Tab label="Flight Data" {...a11yProps(3)} />
          <Tab label="Revenue Analysis" {...a11yProps(4)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
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
            <div>using this feature you can analysis the statistics for the next immediate flight for the given flight no.</div> 
          </Typography> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}> 
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
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
          >using this feature you can access in depth travel statistics for the given route.
          </Typography></div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
          <Button onClick={()=>{
            getRevenue();
          }} style={{marginLeft:900, marginTop:-80}} variant="contained" startIcon={<SearchIcon />}>Search</Button>
      </CustomTabPanel>
      </Paper>

      {value === 0 && data1_0.length>0 ?  <Paper elevation={3}
               
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
              {value === 0 && data1_0.length>0 ?   <Paper elevation={3}
               
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
              {value === 0 && data1_0.length>0 ?  <Paper elevation={3}
               
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

      {value === 1 && data2_0.length>0 ?                
              
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
      {value === 1 && data2_1.length>0 ?                

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
          {value === 2 && data3_1.length>0 ?                
              
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
          {value === 2 && data3_2.length>0 ?                

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
        {value === 2 && data3_3.length>0 ?                

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
        {value === 2 && data3_4.length>0 ?                

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
    {value === 3 && data4_1.length>0 ?                
        
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
    {value === 3 && data4_2.length>0 ?                

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
    {value === 3 && data4_3.length>0 ?                

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
    {value === 4 && data5_1.length>0 ?                
       
        <Paper elevation={3}
        
        style={{marginTop:-250, width: '60%', height: '550px'}}> 
        
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
          pagination={false}

        />
        </Paper>
        :null} 
    {value === 4 && data5_2.length>0 ?                

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
