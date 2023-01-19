import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { useState } from "preact/hooks";

function PhoneItem({
  site_url,
  site_id,
  is_checked,
  onSiteChange,
  onSiteGoClick,
  enabled,
  isMobile,
}) {
  const [hover, setHover] = useState(false);

  if (enabled === false) return <></>;
  if (site_url === "-") return <hr style={{ width: "100%", borderColor: '#808080'}} />;
  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: "flex",
          border: "1px solid #808080",
          paddingLeft: "1rem",
          justifyContent: "space-between",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FormControlLabel
          sx={{ overflowWrap: "break-word", lineBreak: "anywhere" }}
          control={<Checkbox checked={is_checked} onChange={() => onSiteChange(site_id)} />}
          label={site_url}
        />
        {!isMobile && hover && (
          <Button variant="outlined" color="primary" onClick={() => { onSiteGoClick(site_id); }}>
            Go
          </Button>
        )}
      </Box>
    </Grid>
  );
}

export default PhoneItem;
