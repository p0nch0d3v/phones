import { Button, Grid, TextField, InputAdornment } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function PhoneItem({
  site_url,
  site_id,
  is_checked,
  onSiteChange,
  onSiteGoClick,
  isMobile,
}) {
  if (site_url === "-") return <hr style={{ width: '100%' }} />;
  return (
    <Grid item xs={12}>
      <Box
        sx={{ display: "flex", border: "1px solid gray", paddingLeft: "1rem" }}
      >
        <FormControlLabel sx={{ overflowWrap:'break-word', lineBreak: 'anywhere' }} control={<Checkbox />} label={site_url} />
      </Box>
    </Grid>
  );
}

export default PhoneItem;
