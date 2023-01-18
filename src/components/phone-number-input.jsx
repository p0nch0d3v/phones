import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import { Box } from "@mui/system";
import { useState } from 'preact/hooks';

function PhoneNumberInput({ phoneNumber, set_phoneNumber }) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }}>
                    <TextField fullWidth
                               label="Phone number" 
                               inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                               value={phoneNumber}
                               onChange={(e)=> { set_phoneNumber(e.target.value); }}
                                />   
                    <Button variant="outlined" color="primary" disabled={!phoneNumber}>Go</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default PhoneNumberInput;