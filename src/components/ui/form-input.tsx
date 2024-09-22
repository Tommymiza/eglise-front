"use client";
import { useState } from "react";
import { useFieldArray, useFormContext, UseFormReturn } from "react-hook-form";
import { Checkbox } from "./checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input, InputProps } from "./input";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type FormInputProps = {
  name: string;
  label: string;
};

export default function FormInput(
  props: InputProps & { label: string; name: string }
) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input type="text" {...field} {...props} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormCheckbox({ name, label }: FormInputProps) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type propsCkeck = {
  name: string;
  label: string;
  onChecked?: boolean;
  besoinId: number;
};

export function CheckBoxForm({ name, label, onChecked, besoinId }: propsCkeck) {
  const { control, getValues } = useFormContext();
  const { append, remove } = useFieldArray({
    control,
    name: "type",
  });
  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: any) => {
    setChecked(event);
    const type = getValues("type");
    if (event) {
      append({ besoin_id: besoinId });
    } else {
      const index = type.findIndex((item: any) => item.besoin_id === besoinId);
      if (index !== -1) {
        remove(index);
      }
    }
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Checkbox
                checked={onChecked ? onChecked : checked}
                onCheckedChange={handleCheckboxChange}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormCheck({ name, label, value }: any) {
  const { control, watch, setValue } = useFormContext();

  const handleCheckboxChange = (value: any) => {
    setValue(name, watch(name) === value ? "" : value);
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Checkbox
                checked={field.value === value}
                onCheckedChange={() => handleCheckboxChange(value)}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export function FormSelect({
  name,
  label,
  options,
  dataKey,
  valueKey,
  form,
  className,
}: FormInputProps & {
  options: any[];
  dataKey: string;
  valueKey: string;
  form: UseFormReturn<any>;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez..." />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option[valueKey].toString()}>
                  {option[dataKey]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FormRadio({
  name,
  label,
  options,
}: FormInputProps & { options: { value: string; label: string }[] }) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row space-x-4"
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
