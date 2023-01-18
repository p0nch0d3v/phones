import { useMemo, useState, useEffect } from "preact/hooks";

import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import PhoneNumberInput from "./components/phone-number-input";
import SitesList from "./components/sites-list";

import "./app.css";

import data from "./sites.json";

export function App() {
  
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const cleanPhoneNumber = (_phoneNumber) =>
  (_phoneNumber || phoneNumber).replace(/[^\d]/gi, "");

  const setPhoneNumberOnSites = () => {
    return data.map((s, i) => {
      return {
        index: i,
        id: `site_${i}`,
        raw_url: s.name,
        url: s.name.replace("{number}", cleanPhoneNumber()),
        checked: false,
      };
    });
  };

  const [phoneNumber, set_phoneNumber] = useState('');

  const [sites, set_sites] = useState(setPhoneNumberOnSites());

  useEffect(()=> {
    set_sites(setPhoneNumberOnSites());
  }, [phoneNumber]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fluid sx={{ marginTop: '1rem' }}>
        <PhoneNumberInput phoneNumber={phoneNumber} set_phoneNumber={set_phoneNumber} />
        <SitesList sites={sites} />
      </Container>
    </ThemeProvider>
  );
}
