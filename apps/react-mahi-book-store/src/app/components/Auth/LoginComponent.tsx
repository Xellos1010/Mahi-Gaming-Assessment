import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchemas";
import styles from "./LoginComponent.module.scss";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import { BaseLoginUserRequestDto } from "@prismaDist/dtos/lib/auth.dto";

interface LoginComponentProps {
    onTabChange?: (tab: SetStateAction<"login" | "register" | "catalog" | "favorites">) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onTabChange }) => {
    const { login } = useAuth();
    const { addToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<BaseLoginUserRequestDto>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit: SubmitHandler<BaseLoginUserRequestDto> = async (credentials) => {
        try {

            await login(credentials);
            addToast("Successfully logged in", "success");
        } catch (error) {
            addToast(error instanceof Error ? error.message : String(error), "error");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.loginForm}
            >
                <h2 className={styles.formTitle}>Login</h2>
                
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        id="email"
                        {...register("email")}
                        placeholder="Email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    />
                    {errors.email && (
                        <p className={styles.errorMessage}>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        placeholder="Password"
                        className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                    />
                    {errors.password && (
                        <p className={styles.errorMessage}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>

                {onTabChange && (
                    <div className={styles.switchAuthMode}>
                        <p>
                            Don't have an account? {" "}
                            <button
                                type="button"
                                onClick={() => onTabChange('register')}
                                className={styles.switchButton}
                            >
                                Register
                            </button>
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default LoginComponent;