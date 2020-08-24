import React from "react";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Home} from "./Home";
import {BrowserRouter} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {main: '#8b9dc3', contrastText: '#FAFAFA'},
    secondary: {main: '#8b9dc3'}
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