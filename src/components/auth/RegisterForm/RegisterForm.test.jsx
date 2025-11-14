import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock hooks
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    register: vi.fn().mockResolvedValue({}),
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

import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders register form with all required fields', () => {
    // ARRANGE
    render(<RegisterForm />);

    // ASSERT
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeInTheDocument();
  });

  it('shows required fields with proper attributes', () => {
    // ARRANGE
    render(<RegisterForm />);

    // ASSERT
    const firstNameInput = screen.getByLabelText(/nombre/i);
    const lastNameInput = screen.getByLabelText(/apellido/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(firstNameInput).toBeRequired();
    expect(lastNameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('calls register function when form is submitted with valid data', async () => {
    // ARRANGE
    const mockRegister = vi.fn().mockResolvedValue({});
    const mockUseAuth = await import('../../../hooks/useAuth');
    mockUseAuth.useAuth.mockReturnValue({ register: mockRegister });

    const mockOnSuccess = vi.fn();
    render(<RegisterForm onSuccess={mockOnSuccess} />);

    // ACT
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    // ASSERT
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('', '', '', '');
    });
  });

  it('shows loading state when form is submitting', async () => {
    // ARRANGE
    const mockUseForm = await import('../../../hooks/useForm');
    mockUseForm.useForm.mockReturnValue({
      values: { email: '', password: '', firstName: '', lastName: '' },
      errors: {},
      isSubmitting: true,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<RegisterForm />);

    // ASSERT
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('displays error message when there are submit errors', async () => {
    // ARRANGE
    const mockUseForm = await import('../../../hooks/useForm');
    mockUseForm.useForm.mockReturnValue({
      values: { email: '', password: '', firstName: '', lastName: '' },
      errors: { submit: 'Error al crear la cuenta' },
      isSubmitting: false,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<RegisterForm />);

    // ASSERT
    expect(screen.getByText('Error al crear la cuenta')).toBeInTheDocument();
    expect(screen.getByText('Error al crear la cuenta')).toHaveClass('bg-red-50');
  });

  it('calls onSuccess callback when registration is successful', async () => {
    // ARRANGE
    const mockRegister = vi.fn().mockResolvedValue({});
    const mockUseAuth = await import('../../../hooks/useAuth');
    mockUseAuth.useAuth.mockReturnValue({ register: mockRegister });

    const mockOnSuccess = vi.fn();
    render(<RegisterForm onSuccess={mockOnSuccess} />);

    // ACT
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitButton);

    // ASSERT
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('has proper accessibility attributes and placeholders', () => {
    // ARRANGE
    render(<RegisterForm />);

    // ASSERT
    const firstNameInput = screen.getByLabelText(/nombre/i);
    const lastNameInput = screen.getByLabelText(/apellido/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(firstNameInput).toHaveAttribute('placeholder', 'Juan');
    expect(lastNameInput).toHaveAttribute('placeholder', 'Pérez');
    expect(emailInput).toHaveAttribute('placeholder', 'tu@email.com');
    expect(passwordInput).toHaveAttribute('placeholder', '••••••••');
  });

  it('renders form with proper grid layout for name fields', () => {
    // ARRANGE
    render(<RegisterForm />);

    // ASSERT
    const nameFieldsContainer = screen.getByLabelText(/nombre/i).closest('div')?.parentElement;
    expect(nameFieldsContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'gap-4');
  });

  it('handles individual field errors correctly', async () => {
    // ARRANGE
    const mockUseForm = await import('../../../hooks/useForm');
    mockUseForm.useForm.mockReturnValue({
      values: { email: '', password: '', firstName: '', lastName: '' },
      errors: {
        firstName: 'El nombre es requerido',
        email: 'Email inválido',
        password: 'La contraseña debe tener al menos 8 caracteres'
      },
      isSubmitting: false,
      handleChange: vi.fn(),
      handleSubmit: vi.fn(),
    });

    render(<RegisterForm />);

    // ASSERT
    expect(screen.getByTestId('error-firstName')).toHaveTextContent('El nombre es requerido');
    expect(screen.getByTestId('error-email')).toHaveTextContent('Email inválido');
    expect(screen.getByTestId('error-password')).toHaveTextContent('La contraseña debe tener al menos 8 caracteres');
  });
});