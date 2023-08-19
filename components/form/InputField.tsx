import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
    className?: string;
    label: string;
    id: string;
    name: string;
    type?: React.HTMLInputTypeAttribute | undefined;
    value: string;
    onChange?:
        | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    onBlur?:
        | React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
        | undefined;
    helperText?: string;
    error?: boolean;
}
const InputField = ({
    className,
    id,
    name,
    type,
    value,
    onChange,
    onBlur,
    label,
    error,
    helperText,
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <>
            {type === "password" ? (
                <FormControl error={error} variant='outlined'>
                    <InputLabel htmlFor={id}>{label}</InputLabel>
                    <OutlinedInput
                        id={id}
                        type={showPassword ? "text" : "password"}
                        label={label}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleShowPassword}
                                    edge='end'
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
            ) : (
                <FormControl error={error} variant='outlined'>
                    <InputLabel htmlFor={id}>{label}</InputLabel>
                    <OutlinedInput
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        id={id}
                        type={type}
                        label={label}
                    />
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
            )}
        </>
    );
};

export default InputField;
