import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  DialogActions,
  withStyles
} from "@material-ui/core";

import { loginUser } from "../api/user";
import Column from "./Column";

const styles = theme => ({
  title: {
    minWidth: 400
  },
  field: {
    margin: theme.spacing.unit,
    flexGrow: 1
  }
});

export default withStyles(styles)(({ open, onLogin, onClose, classes }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (loginUser(username, password)) {
      onLogin();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className={classes.title}>
          Inserisci le tue Credenziali
        </DialogTitle>
        <DialogContent>
          <Column>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={classes.field}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={classes.field}
            />
          </Column>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Annulla
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Entra
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
});
