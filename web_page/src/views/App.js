import React from "react";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {Home} from "./Home";
import {BrowserRouter} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {main: '#bcbdf6', contrastText: '#FAFAFA'},
    secondary: {main: '#bcbdf6'}
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