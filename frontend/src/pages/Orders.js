import React from "react";
import {
  withStyles,
  Card,
  CardHeader,
  IconButton,
  Typography,
  Divider,
  CardContent,
  List,
  ListItem
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ChevronLeft";
import { format } from "date-fns";
import itLocale from "date-fns/locale/it";

import Header from "../components/Header";
import Column from "../components/Column";
import { Link } from "react-router-dom";
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
  divider: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 3
  },
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
    return (
      <>
        <Header
          username={currentUser && `${currentUser.name} ${currentUser.surname}`}
          admin={currentUser && currentUser.admin}
          cartQuantity={cart ? cart.length : 0}
          onLogout={() => setCurrentUser(null)}
        />

        <Column className={classes.container}>
          <Row align="center">
            <IconButton component={Link} to="/" color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" className={classes.title}>
              I tuoi ordini
            </Typography>
          </Row>
          <Divider className={classes.divider} />

          {orders.map(order => (
            <Card className={classes.card}>
              <CardHeader
                className={classes.cardHeader}
                title="Ordine"
                subheader={format(order.date, "d MMMM yyyy", {
                  locale: itLocale
                })}
              />
              <CardContent>
                <List>
                  {order.cart &&
                    aggregate(order.cart.map(p => p.name)).map(pizza => (
                      <ListItem>
                        <Typography>
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
