import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  DialogActions,
  withStyles,
  DialogContentText
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
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    e && e.preventDefault();

    if (loginUser(username, password)) {
      onLogin(username);
    } else {
      setError(true);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle className={classes.title}>
          Inserisci le tue Credenziali
        </DialogTitle>
        <DialogContent>
          {error && (
            <DialogContentText color="error">
              Credenziali errate! Riprova.
            </DialogContentText>
          )}
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
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Entra
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});
