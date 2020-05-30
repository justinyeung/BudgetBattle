import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addPurchase } from "../../actions/purchaseActions";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const PurchaseForm = ({ addPurchase }) => {
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const addPurchaseBtn = () => {
    addPurchase({ date, amount, location, category });
    setDate(new Date());
    setAmount(0);
    setLocation("");
    setCategory("");
  };

  return (
    <div>
      <Container maxWidth="lg" className="container-spacing">
        <Box boxShadow={1} className="container-spacing">
          <FormControl fullWidth>
            <Typography variant="h6" id="header-title">
              Add Purchase
            </Typography>
            <Divider />
            <Box display="flex" justifyContent="center">
              <Grid
                id="purchases-form-grid"
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={5}
              >
                <Grid item md={3} sm={5} xs={8}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      id="date-picker-inline"
                      label="Date"
                      inputVariant="outlined"
                      autoOk="true"
                      fullWidth
                      value={date}
                      onChange={(date) =>
                        date !== null
                          ? setDate(new Date(date))
                          : setDate(new Date())
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      onKeyPress={(e) => {
                        e.key === "Enter" && addPurchaseBtn();
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item md={3} sm={5} xs={8}>
                  <TextField
                    id="outlined-basic"
                    autoComplete="off"
                    label="Amount"
                    variant="outlined"
                    fullWidth
                    value={amount}
                    onChange={(amount) => setAmount(amount.target.value)}
                    onKeyPress={(e) => {
                      e.key === "Enter" && addPurchaseBtn();
                    }}
                  />
                </Grid>
                <Grid item md={3} sm={5} xs={8}>
                  <TextField
                    id="outlined-basic"
                    autoComplete="off"
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={location}
                    onChange={(location) => setLocation(location.target.value)}
                    onKeyPress={(e) => {
                      e.key === "Enter" && addPurchaseBtn();
                    }}
                  />
                </Grid>
                <Grid item md={3} sm={5} xs={8}>
                  <TextField
                    id="outlined-basic"
                    autoComplete="off"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    value={category}
                    onChange={(category) => setCategory(category.target.value)}
                    onKeyPress={(e) => {
                      e.key === "Enter" && addPurchaseBtn();
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              id="purchases-form-submit"
              display="flex"
              flexDirection="row-reverse"
            >
              <Toolbar disableGutters={true}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => addPurchaseBtn()}
                >
                  Add Purchase
                </Button>
              </Toolbar>
            </Box>
          </FormControl>
        </Box>
      </Container>
    </div>
  );
};

PurchaseForm.propTypes = {
  addPurchase: PropTypes.func.isRequired,
};

export default connect(null, { addPurchase })(PurchaseForm);
