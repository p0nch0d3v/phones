import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";


function PhoneNumberInput({ phoneNumber, set_phoneNumber, onGoClick }) {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex' }} >
                    <TextField fullWidth
                               label="Phone number" 
                               inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                               value={phoneNumber}
                               onChange={(e)=> { set_phoneNumber(e.target.value); }} />   
                    <Button 
                        variant="outlined" 
                        color="primary" 
                        disabled={!phoneNumber}
                        onClick={onGoClick} >Go</Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default PhoneNumberInput;