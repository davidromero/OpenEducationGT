import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Dashboard} from "@material-ui/icons";
import {Link} from "react-router-dom";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/">
      <ListItemIcon>
        <Dashboard/>
      </ListItemIcon>
      <ListItemText primary="Inicio"/>
    </ListItem>
  </div>
);
