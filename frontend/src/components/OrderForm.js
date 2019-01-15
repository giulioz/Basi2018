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
import { DatePicker, TimePicker } from "material-ui-pickers";

import Column from "./Column";
import Row from "./Row";
import { order } from "../api/data";

const styles = theme => ({
  title: {
    minWidth: 600
  },
  field: {
    margin: theme.spacing.unit,
    flexGrow: 1
  }
});

export default withStyles(styles)(
  ({
    setCart,
    catalogItems,
    token,
    open,
    user,
    onClose,
    onOrder,
    cart,
    classes
  }) => {
    if (!user) {
      return null;
    }

    const [date, setDate] = useState(new Date());
    const [address, setAddress] = useState(user.address);

    const aggregatedCart = catalogItems.map(item => ({
      ...item,
      count: (cart && cart.filter(ci => ci.name === item.name).length) || 0
    }));

    const handleSubmit = async e => {
      e && e.preventDefault();

      await order(
        {
          Data: date.toISOString(),
          Indirizzo: address || user.address,
          Pizze: aggregatedCart.map(pizza => ({
            NomePizza: pizza.name,
            Quantita: pizza.count
          }))
        },
        token
      );
      setCart([]);
      onClose();
    };

    return (
      <Dialog open={open} onClose={onClose} className={classes.root}>
        <form onSubmit={handleSubmit}>
          <DialogTitle className={classes.title}>
            Inserisci i tuoi dati
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Inserisci l'orario e l'indirizzo a cui inviare la tua pizza.
            </DialogContentText>
            <Column>
              <Row>
                <DatePicker
                  required
                  className={classes.field}
                  value={date}
                  onChange={setDate}
                />
                <TimePicker
                  required
                  className={classes.field}
                  autoOk
                  ampm={false}
                  value={date}
                  onChange={setDate}
                />
              </Row>
              <TextField
                margin="dense"
                // label="Indirizzo"
                placeholder={user && user.address}
                type="text"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                className={classes.field}
              />
            </Column>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Annulla
            </Button>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Ordina
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);
