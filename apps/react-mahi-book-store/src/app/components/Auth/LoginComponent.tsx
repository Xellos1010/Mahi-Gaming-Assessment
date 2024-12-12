import React, { SetStateAction } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchemas";
import { useAuth } from "@frontend/context/AuthContext";
import { useToast } from "@frontend/context/ToastContext";
import styles from "./LoginComponent.module.scss";

interface LoginComponentProps {
  onTabChange?: (tab: SetStateAction<"login" | "register" | "catalog" | "favorites">) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onTabChange }) => {
  const { login } = useAuth();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting } // Add isSubmitting here
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await login(data.email, data.password);
      addToast("Successfully logged in", "success");
    } catch (error) {
      addToast("Login failed. Please check your credentials.", "error");
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
          <label className={styles.label}>Email</label>
          <input
            {...register("email")}
            placeholder="Email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          {errors.email && (
            <p className={styles.errorMessage}>
              {errors.email.message?.toString()}
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
          />
          {errors.password && (
            <p className={styles.errorMessage}>
              {errors.password.message?.toString()}
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
              Already have an account? {" "}
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