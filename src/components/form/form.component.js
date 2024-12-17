import { useForm } from "react-hook-form";

import {
  Box,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";

import { forms } from "@/config";

import { useEffect } from "react";

const FormsComponent = ({
  name,
  button,
  btnStyle,
  def,
  callback,
  change,
  disables,
  selectData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: def,
  });

  const form = forms[name];

  const onSubmit = (data) => callback(data);

  useEffect(() => {}, []);

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.entries(form).map(([name, field]) => {
          switch (field.type) {
            case "radio":
              return (
                <Box
                  key={name}
                  sx={{
                    borderRadius: 1,
                  }}
                >
                  <FormControl margin="normal">
                    <FormLabel>{field.label}</FormLabel>
                    <RadioGroup defaultValue={def && def[name]} row>
                      {field.items.map((item) => (
                        <FormControlLabel
                          key={`${name}-${item.value}`}
                          value={item.value}
                          {...register(name, field.advanced)}
                          error={errors[name]}
                          label={item.label}
                          control={<Radio />}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <br />
                </Box>
              );
            case "checkbox":
              return (
                <Box key={name}>
                  <FormControl error={errors[name]}>
                    <FormControlLabel
                      label={field.label}
                      value={name}
                      {...register(name, field.advanced)}
                      control={
                        <Checkbox
                          color={btnStyle.color ? btnStyle.color : "primary"}
                        />
                      }
                    />
                  </FormControl>
                  <br />
                </Box>
              );
            case "checkData":
              return (
                <FormControl
                  sx={{
                    borderRadius: 1,
                  }}
                  color={btnStyle.color ? btnStyle.color : "primary"}
                  margin="normal"
                  key={name}
                  fullWidth
                >
                  <FormLabel>{field.label}</FormLabel>
                  <RadioGroup defaultValue={def && def[name]} row>
                    {selectData[name] &&
                      selectData[name].map((option) => {
                        return (
                          <FormControlLabel
                            key={option._id}
                            value={option._id}
                            {...register(name, field.advanced)}
                            error={errors[name]}
                            label={option.label}
                            control={
                              <Checkbox
                                defaultChecked={
                                  def[name]
                                    ? def[name].includes(option._id)
                                    : [].includes(option._id)
                                }
                                color={
                                  btnStyle.color ? btnStyle.color : "primary"
                                }
                              />
                            }
                          />
                        );
                      })}
                  </RadioGroup>
                </FormControl>
              );
            case "selectData":
              return (
                <FormControl
                  sx={{
                    borderRadius: 1,
                  }}
                  key={name}
                  margin="normal"
                  size="medium"
                  fullWidth
                >
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    defaultValue={def && def[name]}
                    {...register(name, field.advanced)}
                    error={errors[name]}
                    placeholder={field.placeholder}
                    label={field.label}
                  >
                    {selectData[name] &&
                      selectData[name].map((option) => (
                        <MenuItem
                          key={`${name}-${option.value}`}
                          value={option._id}
                        >
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              );
            case "color":
              return (
                <TextField
                  sx={{
                    borderRadius: 1,
                  }}
                  color={btnStyle.color ? btnStyle.color : "primary"}
                  key={name}
                  {...register(name, field.advanced)}
                  error={errors[name]}
                  label={field.label}
                  type="color"
                  size="medium"
                  placeholder={field.placeholder}
                  margin="normal"
                  fullWidth
                />
              );
            case "select":
              return (
                <FormControl
                  key={name}
                  sx={{
                    borderRadius: 1,
                  }}
                  {...register(name, field.advanced)}
                  margin="normal"
                  size="medium"
                  fullWidth
                >
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    defaultValue={def && def[name]}
                    {...register(name, field.advanced)}
                    error={errors[name]}
                    placeholder={field.placeholder}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            case "textarea":
              return (
                <TextField
                  key={name}
                  {...register(name, field.advanced)}
                  error={errors[name]}
                  sx={{
                    borderRadius: 1,
                  }}
                  disabled={field.disabled || disables.includes[name]}
                  label={field.label}
                  type={field.secure ? "password" : field.type}
                  placeholder={field.placeholder}
                  color={btnStyle.color ? btnStyle.color : "primary"}
                  margin="normal"
                  rows={5}
                  fullWidth
                  multiline
                />
              );
            case "tel":
              return (
                <TextField
                  key={name}
                  sx={{
                    borderRadius: 1,
                  }}
                  {...register(name, field.advanced)}
                  onChange={(e) => {
                    setValue(name, e.target.value);
                    change && change(getValues());
                  }}
                  error={errors[name]}
                  size="medium"
                  disabled={field.disabled || disables.includes(name)}
                  label={field.label}
                  color={btnStyle.color ? btnStyle.color : "primary"}
                  type={field.secure ? "password" : field.type}
                  placeholder={field.placeholder}
                  margin="normal"
                  fullWidth
                />
              );
            case "file":
              return (
                <TextField
                  key={name}
                  sx={{
                    borderRadius: 1,
                  }}
                  {...register(name, field.advanced)}
                  error={errors[name]}
                  size="medium"
                  disabled={field.disabled || disables.includes(name)}
                  label={field.label}
                  color={btnStyle.color ? btnStyle.color : "primary"}
                  type="file"
                  placeholder={field.placeholder}
                  margin="normal"
                  inputProps={{
                    accept: field.accepts || "*",
                  }}
                  fullWidth
                />
              );
            default:
              return (
                <TextField
                  key={name}
                  sx={{
                    borderRadius: 1,
                  }}
                  {...register(name, field.advanced)}
                  onChange={(e) => {
                    setValue(name, e.target.value);
                    change && change(getValues());
                  }}
                  error={errors[name]}
                  size="medium"
                  disabled={field.disabled || disables.includes(name)}
                  label={field.label}
                  color={btnStyle.color ? btnStyle.color : "primary"}
                  type={field.secure ? "password" : field.type}
                  placeholder={field.placeholder}
                  margin="normal"
                  fullWidth
                />
              );
          }
        })}
        {button && (
          <Button
            variant="contained"
            color={btnStyle.color ? btnStyle.color : "primary"}
            // size="small"
            type="submit"
            onClick={handleSubmit(onSubmit)}
            sx={{
              color: "white",
              mt: 2,
              p: 1.5,
              borderRadius: 1,
            }}
            fullWidth={btnStyle.fullWidth}
            disabled={btnStyle.disabled}
            disableElevation
          >
            {button}
          </Button>
        )}
      </form>
    </Box>
  );
};

export default FormsComponent;
