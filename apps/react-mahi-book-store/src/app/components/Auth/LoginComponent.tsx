import React, { SetStateAction } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchemas";
import { useAuth } from "@frontend/context/AuthContext";
import { useToast } from "@frontend/context/ToastContext";
import "./LoginComponent.module.scss";

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
    <div className="loginContainer">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="loginForm"
      >
        <h2 className="formTitle">Login</h2>
        <div className="formGroup">
          <label className="label">Email</label>
          <input
            {...register("email")}
            placeholder="Email"
            className={`$input ${errors.email ? "inputError" : ''}`}
          />
          {errors.email && (
            <p className="errorMessage">
              {errors.email.message?.toString()}
            </p>
          )}
        </div>
        <div className="formGroup">
          <label className="label">Password</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`$"input" ${errors.password ? "inputError" : ''}`}
          />
          {errors.password && (
            <p className="errorMessage">
              {errors.password.message?.toString()}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`$"submitButton" ${isSubmitting ? "submitting" : ''}`}
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </button>
        {onTabChange && (
          <div className="switchAuthMode">
            <button
              type="button"
              onClick={() => onTabChange('register')}
              className="switchButton"
            >
              Register
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginComponent;