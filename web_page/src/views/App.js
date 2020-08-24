import React from "react";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Home} from "./Home";
import {BrowserRouter} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {main: '#1595BD', contrastText: '#FAFAFA'},
    secondary: {main: '#3F51B5'}
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Home/>
      </MuiThemeProvider>
    </BrowserRouter>
  )
};

export default (App);