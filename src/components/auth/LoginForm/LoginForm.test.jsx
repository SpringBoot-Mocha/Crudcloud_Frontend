import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock hooks
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn().mockResolvedValue({}),
  }),
}));

vi.mock('../../../hooks/useForm', () => ({
  useForm: vi.fn().mockImplementation((initialValues, onSubmit) => ({
    values: initialValues,
    errors: {},
    isSubmitting: false,
    handleChange: vi.fn(),
    handleSubmit: vi.fn((e) => {
      e?.preventDefault?.();
      onSubmit(initialValues);
    }),
  })),
}));

// Mock UI components
vi.mock('../../ui/Button', () => ({
  Button: ({ children, isLoading, ...props }) => (
    <button {...props} disabled={isLoading}>
      {isLoading ? 'Cargando...' : children}
    </button>
  ),
}));

vi.mock('../../ui/Input', () => ({
  Input: ({ label, type, name, value, onChange, error, placeholder, required }) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={`input-${name}`}
      />
      {error && <span data-testid={`error-${name}`}>{error}</span>}
    </div>
  ),
}));

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form with email and password fields', () => {
    // ARRANGE
    render(<LoginForm />);

    // ASSERT
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('shows required fields with proper attributes', () => {
    // ARRANGE
    render(<LoginForm />);

    // ASSERT
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('calls login function when form is submitted with valid credentials', async () => {
    // ARRANGE
    const mockLogin = vi.fn().mockResolvedValue({});
    const mockUseAuth = await import('../../../hooks/useAuth');
    mockUseAuth.useAuth.mockReturnValue({ login: mockLogin });

    const mockOnSuccess = vi.fn();
    render(<LoginForm onSuccess={mockOnSuccess} />);

    // ACT
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    // ASSERT
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('', '');
    });
  });

  it('shows loading state when form is submitting', async () => {
    // ARRANGE
    const mockUseForm = await import('../../../hooks/useForm');
    mockUseForm.useForm.mockReturnValue({
      values: { email: '', password: '' },
      errors: {},
      isSubmitting: true,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<LoginForm />);

    // ASSERT
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('displays error message when there are submit errors', async () => {
    // ARRANGE
    const mockUseForm = await import('../../../hooks/useForm');
    mockUseForm.useForm.mockReturnValue({
      values: { email: '', password: '' },
      errors: { submit: 'Credenciales inválidas' },
      isSubmitting: false,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<LoginForm />);

    // ASSERT
    expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
    expect(screen.getByText('Credenciales inválidas')).toHaveClass('bg-red-50');
  });

  it('calls onSuccess callback when login is successful', async () => {
    // ARRANGE
    const mockLogin = vi.fn().mockResolvedValue({});
    const mockUseAuth = await import('../../../hooks/useAuth');
    mockUseAuth.useAuth.mockReturnValue({ login: mockLogin });

    const mockOnSuccess = vi.fn();
    render(<LoginForm onSuccess={mockOnSuccess} />);

    // ACT
    const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitButton);

    // ASSERT
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('has proper accessibility attributes', () => {
    // ARRANGE
    render(<LoginForm />);

    // ASSERT
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(emailInput).toHaveAttribute('placeholder', 'tu@email.com');
    expect(passwordInput).toHaveAttribute('placeholder', '••••••••');
  });
});