import React, { SetStateAction, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/authSchemas";
import { useAuth } from "@frontend/context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import styles from './RegisterComponent.module.scss';

interface RegisterComponentProps {
    onTabChange?: (tab: SetStateAction<"login" | "register" | "catalog" | "favorites">) => void;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({ onTabChange }) => {
    const { register: registerUser } = useAuth();
    const { addToast } = useToast();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<{
        name: string
        email: string;
        password: string;
        confirmPassword: string
    }>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const { name, email, password } = data;
            console.log('Name:', name); // Log the name to check its value
            await registerUser(name, email, password);
            addToast("Registration successful!", "success");
        } catch (error) {
            addToast(error as string, "error");
        }
    };

    const passwordValue = watch("password");

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={styles.registerContainer}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.registerForm}
            >
                <h2 className={styles.formTitle}>Create Your Account</h2>

                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>
                        Name
                    </label>
                    <input
                        id="name"
                        {...register("name")}
                        placeholder="Enter your name"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    />
                    {errors.name && (
                        <p className={styles.errorMessage}>
                            {errors.name.message?.toString()}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Email Address
                    </label>
                    <input
                        id="email"
                        {...register("email")}
                        placeholder="Enter your email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    />
                    {errors.email && (
                        <p className={styles.errorMessage}>
                            {errors.email.message?.toString()}
                        </p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <div className={styles.passwordContainer}>
                        <input
                            id="password"
                            {...register("password")}
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Create a password"
                            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={styles.passwordToggle}
                        >
                            {isPasswordVisible ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && (
                        <p className={styles.errorMessage}>
                            {errors.password.message?.toString()}
                        </p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        {...register("confirmPassword")}
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                    />
                    {errors.confirmPassword && (
                        <p className={styles.errorMessage}>
                            {errors.confirmPassword.message?.toString()}
                        </p>
                    )}
                </div>

                <div className={styles.passwordStrength}>
                    <p>Password Strength:
                        <span className={`
              ${passwordValue?.length >= 8 ? styles.strongPassword : styles.weakPassword}
            `}>
                            {passwordValue?.length >= 8 ? 'Strong' : 'Weak'}
                        </span>
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                >
                    {isSubmitting ? 'Registering...' : 'Create Account'}
                </button>

                {onTabChange && (
                    <div className={styles.switchAuthMode}>
                        <p>
                            Already have an account? {" "}
                            <button
                                type="button"
                                onClick={() => onTabChange('login')}
                                className={styles.switchButton}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegisterComponent;