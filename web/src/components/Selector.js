import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { MenuProps, useStyles } from "./utils";

function Selector(props) {
  const options = props.options;

  const classes = useStyles();
  const [selected, setSelected] = useState(options);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      props.setVal(
        selected.length === options.length ? [] : options,
        props.internalTitle
      );

      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    props.setVal(value, props.internalTitle);

    setSelected(value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="mutiple-select-label" style={{ color: "#000000", fontWeight: "500" }}>
        {props.title}
      </InputLabel>
      <Select
        labelId="mutiple-select-label"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        className={classes.select}
      >
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : "",
          }}
          style={{ whiteSpace: "normal" }}
        >
          <ListItemIcon style={{ color: "#000000" }}>
            <Checkbox
              style={{ color: "#000000" }}
              classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.selectAllText }}
            primary="Select All"
          />
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option}
            value={option}
            style={{ whiteSpace: "normal" }}
          >
            <ListItemIcon>
              <Checkbox
                checked={selected.indexOf(option) > -1}
                style={{ color: "#000000" }}
              />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Selector;
