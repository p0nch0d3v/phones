import { useMemo, useState, useEffect } from "preact/hooks";

import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";

import MobileDetect from "mobile-detect";

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

  const md = new MobileDetect(navigator.userAgent);
  const isMobile = md.mobile() || md.phone() || md.tablet();

  const cleanPhoneNumber = (_phoneNumber) =>
    (_phoneNumber || phoneNumber).replace(/[^\d]/gi, "");

  const setPhoneNumberOnSites = () => {
    return data.map((s, i) => {
      return {
        index: i,
        id: `site_${i}`,
        raw_url: s.name,
        url: s.name.replace("{number}", cleanPhoneNumber()),
        cleanUrl: s.name,
        checked: false,
        enabled: s.enabled,
      };
    });
  };

  const [phoneNumber, set_phoneNumber] = useState("");

  const [sites, set_sites] = useState([]);

  const onSiteChange = (e) => {
    let newSites = [...sites];
    const siteIndex = newSites.findIndex((s) => s.id === e);
    newSites[siteIndex].checked = !newSites[siteIndex].checked;
    setTimeout(() => {
      set_sites(newSites);
    }, 1);
  };

  const onSelectAllChange = (e) => {
    const checked = e.target.checked;
    let newSites = [...sites];
    newSites.forEach((s) => {
      if (!(s.enabled === false)) {
        s.checked = checked;
      }
    });
    setTimeout(() => {
      set_sites(newSites);
    }, 1);
  };

  const openSite = (site) => {
    if (site?.url !== "-" && cleanPhoneNumber().length >= 1) {
      setTimeout(() => {
        const url = site?.cleanUrl?.replace("{number}", cleanPhoneNumber());
        window.open(url, "_blank");
      }, 1);
    }
  };

  const onGoClick = () => {
    sites.forEach((site) => {
      if (site.checked === true) {
        openSite(site);
      }
    });
  };

  const onSiteGoClick = (e) => {
    console.debug("e", e);
    const site = sites.find((s) => s.id === e);
    openSite(site);
  };

  useEffect(() => {
    let newSites = [...sites];
    newSites.forEach((s) => {
      s.url = s.cleanUrl.replace("{number}", cleanPhoneNumber());
    });
    setTimeout(() => {
      set_sites(newSites);
    }, 1);
  }, [phoneNumber]);

  useEffect(() => {
    const newSites = setPhoneNumberOnSites();
    setTimeout(() => {
      set_sites(newSites);
    }, 1);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fluid sx={{ marginTop: "1rem" }}>
        <PhoneNumberInput
          phoneNumber={phoneNumber}
          set_phoneNumber={set_phoneNumber}
          onGoClick={onGoClick}
        />
        <SitesList
          sites={sites}
          onSiteChange={onSiteChange}
          onSelectAllChange={onSelectAllChange}
          isMobile={isMobile}
          onSiteGoClick={onSiteGoClick}
        />
      </Container>
    </ThemeProvider>
  );
}
