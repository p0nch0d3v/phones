import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import PhoneItem from "./phone-item";

function SitesList({ sites, onSiteChange, onSiteGoClick }) {
  const isMobile = false;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <Grid container spacing={1} sx={{marginTop: '1rem'}}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", border: '1px solid gray', paddingLeft: '1rem' }}>
          <FormControlLabel control={<Checkbox />} label="Select All" />
        </Box>
      </Grid>
      {sites.map((s, i) => {
        return (
          <PhoneItem
            site_url={s.url}
            site_id={s.id}
            is_checked={s.checked}
            onSiteChange={onSiteChange}
            onSiteGoClick={onSiteGoClick}
            isMobile={isMobile}
          />
        );
      })}
    </Grid>
  );
}

export default SitesList;
