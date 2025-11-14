import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock InstanceCard
vi.mock('../InstanceCard/InstanceCard', () => ({
  default: vi.fn(({ instance }) => (
    <div data-testid="instance-card">
      {instance.name} - {instance.status}
    </div>
  )),
}));

// Mock Spinner
vi.mock('../../ui/Spinner', () => ({
  Spinner: ({ size }) => <div data-testid="spinner" data-size={size}>Loading...</div>,
}));

import InstanceList from './InstanceList';

describe('InstanceList', () => {
  const mockInstances = [
    {
      id: 1,
      name: 'test-database',
      engine: 'postgresql',
      status: 'RUNNING',
      host: 'localhost',
      port: 5432,
      username: 'test_user',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'dev-database',
      engine: 'mysql',
      status: 'SUSPENDED',
      host: 'localhost',
      port: 3306,
      username: 'dev_user',
      createdAt: '2024-01-02T00:00:00Z'
    }
  ];

  const mockOnDelete = vi.fn();
  const mockOnStatusChange = vi.fn();
  const mockOnRotatePassword = vi.fn();

  it('renders loading spinner when loading is true', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={[]}
        loading={true}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toHaveAttribute('data-size', 'lg');
  });

  it('renders empty state when no instances are provided', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={[]}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('No hay instancias todavía')).toBeInTheDocument();
    expect(screen.getByText('Crea tu primera instancia de base de datos para comenzar')).toBeInTheDocument();
    expect(screen.queryByTestId('instance-card')).not.toBeInTheDocument();
  });

  it('renders empty state when instances is null', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={null}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('No hay instancias todavía')).toBeInTheDocument();
  });

  it('renders list of instances when instances are provided', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={mockInstances}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    const instanceCards = screen.getAllByTestId('instance-card');
    expect(instanceCards).toHaveLength(2);
    expect(instanceCards[0]).toHaveTextContent('test-database - RUNNING');
    expect(instanceCards[1]).toHaveTextContent('dev-database - SUSPENDED');
  });

  it('applies correct grid layout for instances', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={mockInstances}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    const gridContainer = screen.getByTestId('instance-card').closest('div');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6');
  });

  it('passes correct props to InstanceCard components', async () => {
    // ARRANGE
    const InstanceCard = vi.mocked(await import('../InstanceCard/InstanceCard'));

    render(
      <InstanceList
        instances={mockInstances}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(InstanceCard.default).toHaveBeenCalledTimes(2);

    // Check first instance
    expect(InstanceCard.default).toHaveBeenCalledWith(
      {
        instance: mockInstances[0],
        onDelete: mockOnDelete,
        onStatusChange: mockOnStatusChange,
        onRotatePassword: mockOnRotatePassword,
      },
      {}
    );

    // Check second instance
    expect(InstanceCard.default).toHaveBeenCalledWith(
      {
        instance: mockInstances[1],
        onDelete: mockOnDelete,
        onStatusChange: mockOnStatusChange,
        onRotatePassword: mockOnRotatePassword,
      },
      {}
    );
  });

  it('does not render loading spinner when loading is false', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={mockInstances}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('renders empty state with correct styling', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={[]}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    const emptyState = screen.getByText('No hay instancias todavía').closest('div');
    expect(emptyState).toHaveClass('rounded-xl', 'border', 'border-slate-200/50', 'bg-white/60', 'backdrop-blur-sm');
  });

  it('handles single instance correctly', () => {
    // ARRANGE
    const singleInstance = [mockInstances[0]];
    render(
      <InstanceList
        instances={singleInstance}
        loading={false}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    const instanceCards = screen.getAllByTestId('instance-card');
    expect(instanceCards).toHaveLength(1);
    expect(instanceCards[0]).toHaveTextContent('test-database - RUNNING');
  });

  it('prioritizes loading state over empty state', () => {
    // ARRANGE
    render(
      <InstanceList
        instances={[]}
        loading={true}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('No hay instancias todavía')).not.toBeInTheDocument();
  });
});