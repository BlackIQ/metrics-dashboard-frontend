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
  Grid,
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
        <Grid container rowSpacing={1} columnSpacing={3}>
          {Object.entries(form).map(([name, field]) => (
            <Grid key={name} item {...field.grid}>
              {(() => {
                switch (field.type) {
                  case "radio":
                    return (
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
                    );
                  case "checkbox":
                    return (
                      <FormControl error={errors[name]}>
                        <FormControlLabel
                          label={field.label}
                          value={name}
                          {...register(name, field.advanced)}
                          control={
                            <Checkbox color={btnStyle.color || "primary"} />
                          }
                        />
                      </FormControl>
                    );
                  case "checkData":
                    return (
                      <FormControl margin="normal" fullWidth>
                        <FormLabel>{field.label}</FormLabel>
                        <RadioGroup defaultValue={def && def[name]} row>
                          {selectData[name]?.map((option) => (
                            <FormControlLabel
                              key={option._id}
                              value={option._id}
                              {...register(name, field.advanced)}
                              error={errors[name]}
                              label={option.label}
                              control={
                                <Checkbox
                                  defaultChecked={def[name]?.includes(
                                    option._id
                                  )}
                                  color={btnStyle.color || "primary"}
                                />
                              }
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    );
                  case "selectData":
                    return (
                      <FormControl margin="normal" fullWidth>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          defaultValue={def && def[name]}
                          {...register(name, field.advanced)}
                          error={errors[name]}
                          label={field.label}
                        >
                          {selectData[name]?.map((option) => (
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
                        color={btnStyle.color || "primary"}
                        {...register(name, field.advanced)}
                        error={errors[name]}
                        label={field.label}
                        type="color"
                        margin="normal"
                        fullWidth
                      />
                    );
                  case "select":
                    return (
                      <FormControl margin="normal" fullWidth>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                          defaultValue={def && def[name]}
                          {...register(name, field.advanced)}
                          error={errors[name]}
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
                        {...register(name, field.advanced)}
                        error={errors[name]}
                        label={field.label}
                        type={field.secure ? "password" : "text"}
                        margin="normal"
                        rows={5}
                        fullWidth
                        multiline
                      />
                    );
                  case "tel":
                    return (
                      <TextField
                        {...register(name, field.advanced)}
                        onChange={(e) => {
                          setValue(name, e.target.value);
                          change && change(getValues());
                        }}
                        error={errors[name]}
                        label={field.label}
                        type={field.secure ? "password" : "tel"}
                        margin="normal"
                        fullWidth
                      />
                    );
                  case "file":
                    return (
                      <TextField
                        {...register(name, field.advanced)}
                        error={errors[name]}
                        label={field.label}
                        type="file"
                        margin="normal"
                        inputProps={{ accept: field.accepts || "*" }}
                        fullWidth
                      />
                    );
                  default:
                    return (
                      <TextField
                        {...register(name, field.advanced)}
                        onChange={(e) => {
                          setValue(name, e.target.value);
                          change && change(getValues());
                        }}
                        error={errors[name]}
                        label={field.label}
                        type={field.secure ? "password" : "text"}
                        margin="normal"
                        fullWidth
                      />
                    );
                }
              })()}
            </Grid>
          ))}
        </Grid>
        {button && (
          <Button
            variant="contained"
            color={btnStyle.color || "primary"}
            type="submit"
            onClick={handleSubmit(onSubmit)}
            sx={{ color: "white", mt: 2, p: 1.5, borderRadius: 1 }}
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
