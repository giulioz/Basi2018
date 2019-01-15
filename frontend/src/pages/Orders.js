import React, { useState } from "react";
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

const aggregate = strings => {
  const arr = [];
  strings.forEach(s => {
    const found = arr.find(f => f.name === s);
    if (found) {
      found.count++;
    } else {
      arr.push({ name: s, count: 1 });
    }
  });
  return arr;
};

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
    currentUser,
    setCurrentUser,
    cart,
    setCart,
    catalogItems,
    setCatalogItems,
    orders,
    setOrders,
    classes
  }) => {
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [toDelete, setToDelete] = useState(null);

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

          {orders.map((order, i) => (
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title={
                  <Row>
                    <div style={{ flexGrow: 1 }}>Ordine</div>
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
                subheader={format(order.date, "d MMMM yyyy", {
                  locale: itLocale
                })}
              />
              <CardContent>
                <List>
                  {order.cart &&
                    aggregate(order.cart.map(p => p.name)).map(pizza => (
                      <ListItem>
                        <Typography variant="subtitle1">
                          {pizza.count}x {pizza.name}
                        </Typography>
                      </ListItem>
                    ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Column>
      </>
    );
  }
);
