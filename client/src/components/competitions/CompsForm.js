import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendCompRequest } from "../../actions/competitionActions";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const moment = require("moment");

const CompsForm = ({ sendCompRequest }) => {
  const [id, setID] = useState("");
  const [date, setDate] = useState(new Date());

  const requestBtn = () => {
    const numMonth = moment(date).format("MM");
    const numYear = moment(date).format("YYYY");
    sendCompRequest({ id, numMonth, numYear });
    setID("");
    setDate(new Date());
  };

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="inline"
          inputVariant="outlined"
          views={["year", "month"]}
          label="Year and Month"
          value={date}
          autoOk="true"
          onChange={(date) =>
            date !== null ? setDate(new Date(date)) : setDate(new Date())
          }
        />
      </MuiPickersUtilsProvider>
      <input
        type="text"
        placeholder="User ID"
        value={id}
        onChange={(e) => setID(e.target.value)}
      />
      <br />
      <button onClick={() => requestBtn()}>Send Competition Request</button>
    </div>
  );
};

CompsForm.propTypes = {
  sendCompRequest: PropTypes.func.isRequired,
};

export default connect(null, { sendCompRequest })(CompsForm);
