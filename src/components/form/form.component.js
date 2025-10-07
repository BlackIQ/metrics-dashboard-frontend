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
  Typography,
} from "@mui/material";
import { forms } from "@/config";
import { keyframes } from "@mui/system";

// Neon glow animation
const neonGlow = keyframes`
  0% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
  50% { text-shadow: 0 0 8px #00e5ff, 0 0 15px #00e5ff, 0 0 20px #00e5ff; }
  100% { text-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 15px #00e5ff; }
`;

const fieldComponents = {
  radio: ({ field, register, errors, def, onChange, getValues }) => (
    <FormControl fullWidth margin="normal">
      <FormLabel sx={{ color: "primary.main", fontFamily: "Orbitron", mb: 1 }}>
        {field.label}
      </FormLabel>
      <RadioGroup
        row
        defaultValue={def}
        onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      >
        {field.items.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
            label={item.label}
            control={<Radio color="primary" />}
            {...register(field.name, field.advanced)}
          />
        ))}
      </RadioGroup>
      {errors && (
        <Typography variant="caption" color="error.main">
          {errors.message}
        </Typography>
      )}
    </FormControl>
  ),
  checkbox: ({ field, register, errors, def, onChange, getValues }) => (
    <FormControlLabel
      label={
        <Typography
          sx={{
            color: "white",
            "&:hover": { color: "primary.main" },
            fontSize: "0.9rem",
          }}
        >
          {field.label}
        </Typography>
      }
      control={
        <Checkbox
          defaultChecked={def}
          color="primary"
          {...register(field.name, field.advanced)}
          onChange={(e) =>
            onChange?.(field.name, e.target.checked, getValues())
          }
          sx={{
            color: "rgba(0, 255, 255, 0.7)",
            "&.Mui-checked": { color: "primary.main" },
            p: 0,
            mr: 1,
          }}
        />
      }
      sx={{
        m: 0,
        mt: 1,
        display: "flex",
        alignItems: "center",
      }}
    />
  ),
  checkData: ({
    field,
    register,
    errors,
    def,
    selectData,
    onChange,
    getValues,
  }) => (
    <FormControl fullWidth margin="normal">
      <FormLabel sx={{ color: "primary.main", fontFamily: "Orbitron", mb: 1 }}>
        {field.label}
      </FormLabel>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {selectData[field.name]?.map((option) => (
          <FormControlLabel
            key={option._id}
            value={option._id}
            label={option.label}
            control={
              <Checkbox
                defaultChecked={def?.includes(option._id)}
                color="primary"
                {...register(field.name, field.advanced)}
                onChange={(e) => {
                  const currentValues = getValues(field.name) || [];
                  const newValues = e.target.checked
                    ? [...currentValues, option._id]
                    : currentValues.filter((id) => id !== option._id);
                  onChange?.(field.name, newValues, getValues());
                }}
              />
            }
          />
        ))}
      </Box>
      {errors && (
        <Typography variant="caption" color="error.main">
          {errors.message}
        </Typography>
      )}
    </FormControl>
  ),
  selectData: ({
    field,
    register,
    errors,
    def,
    selectData,
    onChange,
    getValues,
  }) => (
    <FormControl fullWidth margin="normal">
      <InputLabel sx={{ color: "primary.main" }}>{field.label}</InputLabel>
      <Select
        defaultValue={def || ""}
        label={field.label}
        {...register(field.name, field.advanced)}
        onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 255, 255, 0.3)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          color: "white",
        }}
      >
        {selectData[field.name]?.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors && (
        <Typography variant="caption" color="error.main">
          {errors.message}
        </Typography>
      )}
    </FormControl>
  ),
  select: ({ field, register, errors, def, onChange, getValues }) => (
    <FormControl fullWidth margin="normal">
      <InputLabel sx={{ color: "primary.main" }}>{field.label}</InputLabel>
      <Select
        defaultValue={def || ""}
        label={field.label}
        {...register(field.name, field.advanced)}
        onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 255, 255, 0.3)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
          },
          color: "white",
        }}
      >
        {field.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors && (
        <Typography variant="caption" color="error.main">
          {errors.message}
        </Typography>
      )}
    </FormControl>
  ),
  textarea: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      margin="normal"
      label={field.label}
      type={field.secure ? "password" : "text"}
      multiline
      rows={5}
      {...register(field.name, field.advanced)}
      onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      error={!!errors}
      helperText={errors?.message}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "rgba(0, 255, 255, 0.3)" },
          "&:hover fieldset": { borderColor: "primary.main" },
          color: "white",
        },
        "& .MuiInputLabel-root": { color: "primary.main" },
      }}
    />
  ),
  color: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      margin="normal"
      label={field.label}
      type="color"
      {...register(field.name, field.advanced)}
      onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      error={!!errors}
      helperText={errors?.message}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "rgba(0, 255, 255, 0.3)" },
          "&:hover fieldset": { borderColor: "primary.main" },
          color: "white",
        },
        "& .MuiInputLabel-root": { color: "primary.main" },
      }}
    />
  ),
  file: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      margin="normal"
      label={field.label}
      type="file"
      inputProps={{ accept: field.accepts || "*" }}
      {...register(field.name, field.advanced)}
      onChange={(e) => onChange?.(field.name, e.target.files[0], getValues())}
      error={!!errors}
      helperText={errors?.message}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "rgba(0, 255, 255, 0.3)" },
          "&:hover fieldset": { borderColor: "primary.main" },
          color: "white",
        },
        "& .MuiInputLabel-root": { color: "primary.main" },
      }}
    />
  ),
  text: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      margin="normal"
      label={field.label}
      type={field.secure ? "password" : "text"}
      placeholder={field.placeholder}
      {...register(field.name, field.advanced)}
      onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      error={!!errors}
      helperText={errors?.message}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "rgba(0, 255, 255, 0.3)" },
          "&:hover fieldset": { borderColor: "primary.main" },
          color: "white",
        },
        "& .MuiInputLabel-root": { color: "primary.main" },
      }}
    />
  ),
};

// FormsComponent remains unchanged
const FormsComponent = ({
  name,
  button,
  btnStyle = {},
  def = {},
  callback,
  change,
  selectData = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ defaultValues: def });

  const form = forms[name];

  const onSubmit = (data) => {
    const payload = {};
    Object.keys(form).forEach((key) => {
      if (data[key] !== undefined) {
        payload[key] = data[key];
      }
    });
    callback(payload);
  };

  const handleChange = (fieldName, value, values) => {
    change?.({ ...values, [fieldName]: value });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container rowSpacing={2} columnSpacing={3}>
          {Object.entries(form).map(([fieldName, field]) => {
            const Component =
              fieldComponents[field.type] || fieldComponents.text;
            return (
              <Grid key={fieldName} item {...field.grid}>
                <Component
                  field={{ ...field, name: fieldName }}
                  register={register}
                  errors={errors[fieldName]}
                  def={def[fieldName]}
                  selectData={selectData}
                  onChange={handleChange}
                  getValues={getValues}
                />
              </Grid>
            );
          })}
        </Grid>
        {button && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color={btnStyle.color || "primary"}
              type="submit"
              fullWidth={btnStyle.fullWidth !== false}
              disabled={btnStyle.disabled}
              disableElevation
              sx={{
                py: 1.5,
                px: 3,
                bgcolor: "primary.main",
                borderRadius: 1,
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                },
              }}
            >
              {button}
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default FormsComponent;
