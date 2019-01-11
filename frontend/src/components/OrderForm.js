import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
  DialogActions,
  withStyles
} from "@material-ui/core";

import config from "../config/config";
import Column from "./Column";
import Row from "./Row";

const styles = theme => ({
  title: {
    minWidth: 600
  },
  field: {
    margin: theme.spacing.unit,
    flexGrow: 1
  }
});

export default withStyles(styles)(({ open, onClose, onLogin, classes }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = e => {
    e && e.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className={classes.root}>
      <form onSubmit={handleSubmit}>
        <DialogTitle className={classes.title}>
          Iscriviti a {config.siteName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Useremo la tua mail solo per informarti di avvisi importanti.
          </DialogContentText>
          <Column>
            <Row>
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
            </Row>
            <Row>
              <TextField
                margin="dense"
                label="Nome"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className={classes.field}
              />
              <TextField
                margin="dense"
                label="Cognome"
                type="text"
                required
                value={surname}
                onChange={e => setSurname(e.target.value)}
                className={classes.field}
              />
            </Row>
            <TextField
              margin="dense"
              label="Indirizzo"
              type="text"
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              className={classes.field}
            />
            <TextField
              margin="dense"
              label="Telefono"
              type="text"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className={classes.field}
            />
          </Column>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Annulla
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Iscriviti
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});