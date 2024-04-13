import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import AddressApi from './AddressApi';

export default function InfoVerterinarian(props) {
    const {setInfo, setAddress1, setAddress2} = props;
    const [addressApi, setAddressApi] = useState('');
    const [address2Api, setAddress2Api] = useState('');
    const [addressText1, setAddressText1] = useState('');
    const [addressText2, setAddressText2] = useState('');


    useEffect(()=>{
        setAddress1(addressText1+'/'+ addressApi)
        setAddress2(addressText2+ '/'+ address2Api)
    }, [addressApi, addressText1, address2Api, addressText2])
    const handleChange = (e) =>{
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      Thông tin bác sĩ/ Phòng khám
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Họ"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Tên"
            fullWidth
            autoComplete="family-name"
            onChange={handleChange}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNumber1"
            name="phoneNumber1"
            label="Số điện thoại 1"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="phoneNumber2"
            name="phoneNumber2"
            label="Số điện thoại 2"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="address1"
            name="address1"
            label="Địa chỉ 1"
            fullWidth
            variant="standard"
            onChange={(e)=>setAddressText1(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
            <AddressApi number = {1} setAddressApi = {setAddressApi}/>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Địa chỉ 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={(e)=>setAddressText2(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
            <AddressApi number = {2} setAddress2Api = {setAddress2Api}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}