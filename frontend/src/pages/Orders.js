import React, { useState, useEffect } from "react";
import {
  withStyles,
  Card,
  CardHeader,
  IconButton,
  Typography,
  CardContent,
  List,
  ListItem,
  Button,
  DialogTitle,
  DialogActions,
  Dialog
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ChevronLeft";
import CloseIcon from "@material-ui/icons/Close";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Column from "../components/Column";
import Row from "../components/Row";
import { getOrders } from "../api/data";

const styles = theme => ({
  container: {
    width: "100%",
    maxWidth: 600,
    margin: "auto"
  },
  card: {
    marginBottom: theme.spacing.unit * 2
  },
  cardHeader: {
    paddingBottom: 0
  },
  titleContainer: {
    marginBottom: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(
  ({
    token,
    currentUser,
    setCurrentUser,
    cart,
    setCart,
    catalogItems,
    setCatalogItems,
    classes
  }) => {
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [orders, setOrders] = useState([]);

    async function fetchOrders() {
      setOrders(await getOrders(token));
    }
    useEffect(
      () => {
        fetchOrders();
      },
      [token]
    );

    const aggregated = [...new Set(orders.map(p => p.ID_Ordine))].map(o => ({
      ...orders.filter(p => p.ID_Ordine === o)[0],
      Pizze: orders.filter(p => p.ID_Ordine === o)
    }));

    const handleDelete = () => {};

    return (
      <>
        <Dialog
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
        >
          <DialogTitle>{"Sei sicuro di cancellare l'ordine?"}</DialogTitle>
          <DialogActions>
            <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
              Annulla
            </Button>
            <Button
              onClick={() => {
                setDeleteConfirmOpen(false);
                handleDelete();
              }}
              color="primary"
              autoFocus
            >
              Elimina
            </Button>
          </DialogActions>
        </Dialog>

        <Header
          username={currentUser && `${currentUser.name} ${currentUser.surname}`}
          admin={currentUser && currentUser.admin}
          cartQuantity={cart ? cart.length : 0}
          onLogout={() => setCurrentUser(null)}
        />

        <Column className={classes.container}>
          <Row align="center" className={classes.titleContainer}>
            <IconButton component={Link} to="/" color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4">I tuoi ordini</Typography>
          </Row>

          {aggregated.map((order, i) => (
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={
                  <Row>
                    <div style={{ flexGrow: 1 }}>Ordine #{order.ID_Ordine}</div>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        setToDelete(i);
                        setDeleteConfirmOpen(true);
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Row>
                }
                subheader={format(order.Data, "d MMMM yyyy", {
                  locale: itLocale
                })}
              />
              <CardContent>
                <List>
                  {order.Pizze &&
                    order.Pizze.map(
                      pizza =>
                        pizza.Quantita > 0 && (
                          <ListItem>
                            <Typography variant="subtitle1">
                              {pizza.Quantita}x {pizza.NomePizza}
                            </Typography>
                          </ListItem>
                        )
                    )}
                </List>
              </CardContent>
            </Card>
          ))}
        </Column>
      </>
    );
  }
);
