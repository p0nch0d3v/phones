import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import PhoneItem from "./phone-item";

function SitesList({
  sites,
  onSiteChange,
  onSiteGoClick,
  onSelectAllChange,
  isMobile,
}) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Grid container spacing={1} sx={{ marginTop: "1rem" }}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #808080",
            paddingLeft: "1rem",
          }}
        >
          <FormControlLabel
            control={<Checkbox onChange={onSelectAllChange} />}
            label="Select All"
          />
        </Box>
      </Grid>
      {sites.map((s, i) => {
        return (
          <>
            <PhoneItem
              site_url={s.url}
              site_id={s.id}
              is_checked={s.checked}
              onSiteChange={onSiteChange}
              onSiteGoClick={onSiteGoClick}
              isMobile={isMobile}
              enabled={s.enabled}
            />
            {false && (
              <pre
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {JSON.stringify(s)}
              </pre>
            )}
          </>
        );
      })}
    </Grid>
  );
}

export default SitesList;
