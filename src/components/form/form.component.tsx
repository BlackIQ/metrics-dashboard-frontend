"use client";

import { useForm, SubmitHandler } from "react-hook-form";
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
import forms from "@/core/form/form.config";

type FieldType =
  | "text"
  | "textarea"
  | "color"
  | "file"
  | "select"
  | "selectData"
  | "radio"
  | "checkbox"
  | "checkData";

interface FieldOption {
  value: string;
  label: string;
}

interface SelectDataOption {
  _id: string;
  label: string;
}

interface FormField {
  type: FieldType;
  label: string;
  placeholder?: string;
  secure?: boolean;
  accepts?: string;
  size?: { xs?: number; sm?: number; md?: number; lg?: number }; // responsive
  options?: FieldOption[];
  items?: FieldOption[];
  advanced?: any;
}

interface FormConfig {
  [key: string]: FormField;
}

interface FormProps<
  T extends Record<string, any> = Record<string, string | number | boolean>,
> {
  name: string;
  button?: string;
  btnStyle?: {
    color?: "primary" | "secondary";
    fullWidth?: boolean;
    disabled?: boolean;
  };
  def?: Partial<T>;
  callback: (data: T) => void;
  change?: (data: T) => void;
  selectData?: Record<string, SelectDataOption[]>;
  disables?: string[];
}

interface Option {
  label: string;
  value: string;
}

const fieldComponents: Record<FieldType, React.FC<any>> = {
  radio: ({ field, register, errors, def, onChange, getValues }) => (
    <FormControl fullWidth>
      <FormLabel sx={{ color: "text.primary", fontWeight: 600, mb: 1 }}>
        {field.label}
      </FormLabel>
      <RadioGroup
        row
        defaultValue={def}
        onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      >
        {field.items?.map((item: FieldOption) => (
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
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
          {errors.message}
        </Typography>
      )}
    </FormControl>
  ),

  checkbox: ({ field, register, errors, def, onChange, getValues }) => (
    <FormControlLabel
      sx={{ mt: 1 }}
      label={<Typography>{field.label}</Typography>}
      control={
        <Checkbox
          defaultChecked={def}
          color="primary"
          {...register(field.name, field.advanced)}
          onChange={(e) =>
            onChange?.(field.name, e.target.checked, getValues())
          }
        />
      }
    />
  ),

  checkData: ({
    field,
    register,
    errors,
    def = [],
    selectData,
    onChange,
    getValues,
  }) => (
    <FormControl fullWidth>
      <FormLabel sx={{ color: "text.primary", fontWeight: 600, mb: 1.5 }}>
        {field.label}
      </FormLabel>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
        {selectData?.[field.name]?.map((option: Option) => (
          <FormControlLabel
            key={option.value}
            label={option.label}
            control={
              <Checkbox
                defaultChecked={def.includes(option.value)}
                color="primary"
                {...register(field.name, field.advanced)}
                onChange={(e) => {
                  const current = getValues(field.name) || [];
                  const newValues = e.target.checked
                    ? [...current, option.value]
                    : current.filter((id: string) => id !== option.value);
                  onChange?.(field.name, newValues, getValues());
                }}
              />
            }
          />
        ))}
      </Box>
      {errors && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
          {errors.message}
        </Typography>
      )}
    </FormControl>
  ),

  select: ({ field, register, errors, def, onChange, getValues }) => (
    <FormControl fullWidth>
      <InputLabel>{field.label}</InputLabel>
      <Select
        defaultValue={def || ""}
        label={field.label}
        {...register(field.name, field.advanced)}
        onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      >
        {field.options?.map((option: Option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
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
    <FormControl fullWidth>
      <InputLabel>{field.label}</InputLabel>
      <Select
        defaultValue={def || ""}
        label={field.label}
        {...register(field.name, field.advanced)}
        onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      >
        {selectData?.[field.name]?.map((option: Option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
          {errors.message}
        </Typography>
      )}
    </FormControl>
  ),

  textarea: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      label={field.label}
      placeholder={field.placeholder}
      multiline
      rows={4}
      {...register(field.name, field.advanced)}
      onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      error={!!errors}
      helperText={errors?.message}
    />
  ),

  color: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      label={field.label}
      type="color"
      {...register(field.name, field.advanced)}
      onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      error={!!errors}
      helperText={errors?.message}
    />
  ),

  file: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      label={field.label}
      type="file"
      inputProps={{ accept: field.accepts || "*" }}
      {...register(field.name, field.advanced)}
      onChange={(e) =>
        onChange?.(
          field.name,
          (e.target as HTMLInputElement).files?.[0],
          getValues(),
        )
      }
      error={!!errors}
      helperText={errors?.message}
    />
  ),

  text: ({ field, register, errors, onChange, getValues }) => (
    <TextField
      fullWidth
      label={field.label}
      placeholder={field.placeholder}
      type={field.secure ? "password" : "text"}
      {...register(field.name, field.advanced)}
      onChange={(e) => onChange?.(field.name, e.target.value, getValues())}
      error={!!errors}
      helperText={errors?.message}
    />
  ),
};

// ====================== MAIN COMPONENT ======================

const Form = <
  T extends Record<string, any> = Record<string, string | number | boolean>,
>({
  name,
  button = "Submit",
  btnStyle = {},
  def = {} as Partial<T>,
  callback,
  change,
  selectData = {},
  disables = [],
}: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<T>({ defaultValues: def as any });

  const formConfig: FormConfig = (forms as any)[name];

  const onSubmit: SubmitHandler<T> = (data) => {
    const payload = {} as T;
    Object.keys(formConfig || {}).forEach((key) => {
      if ((data as any)[key] !== undefined) {
        (payload as any)[key] = (data as any)[key];
      }
    });
    callback(payload);
  };

  const handleFieldChange = (fieldName: string, value: any, values: T) => {
    change?.({ ...values, [fieldName]: value } as T);
  };

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2.5}>
          {" "}
          {/* Reduced spacing */}
          {Object.entries(formConfig || {}).map(([fieldName, field]) => {
            const Component =
              fieldComponents[field.type] || fieldComponents.text;
            const isDisabled = disables.includes(fieldName);

            return (
              <Grid key={fieldName} size={field.size ?? { xs: 12 }}>
                <Component
                  field={{ ...field, name: fieldName }}
                  register={register}
                  errors={errors[fieldName]}
                  def={def[fieldName]}
                  selectData={selectData}
                  onChange={handleFieldChange}
                  getValues={getValues}
                  disabled={isDisabled}
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
                borderRadius: 1, // as you wanted
                px: 5,
                py: 1.25,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
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

export default Form;
