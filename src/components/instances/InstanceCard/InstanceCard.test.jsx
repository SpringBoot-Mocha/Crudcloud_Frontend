import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import InstanceCard from './InstanceCard';

describe('InstanceCard', () => {
  const user = userEvent.setup();
  const mockInstance = {
    id: 1,
    name: 'test-database',
    engine: 'postgresql',
    status: 'RUNNING',
    host: 'localhost',
    port: 5432,
    username: 'test_user',
    createdAt: '2024-01-01T00:00:00Z'
  };

  const mockOnDelete = vi.fn();
  const mockOnStatusChange = vi.fn();
  const mockOnRotatePassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      writable: true,
    });
  });

  it('renders instance card with all information', () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('test-database')).toBeInTheDocument();
    expect(screen.getByText('ID: 1')).toBeInTheDocument();
    expect(screen.getByText('postgresql')).toBeInTheDocument();
    expect(screen.getByText('5432')).toBeInTheDocument();
    expect(screen.getByText('localhost')).toBeInTheDocument();
    expect(screen.getByText('test_user')).toBeInTheDocument();
  });

  it('displays correct status for RUNNING instance', () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('En Ejecución')).toBeInTheDocument();
    expect(screen.getByText('En Ejecución')).toHaveClass('text-emerald-600');
  });

  it('displays correct status for SUSPENDED instance', () => {
    // ARRANGE
    const suspendedInstance = { ...mockInstance, status: 'SUSPENDED' };
    render(
      <InstanceCard
        instance={suspendedInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('Pausada')).toBeInTheDocument();
    expect(screen.getByText('Pausada')).toHaveClass('text-amber-600');
  });

  it('displays correct status for CREATING instance', () => {
    // ARRANGE
    const creatingInstance = { ...mockInstance, status: 'CREATING' };
    render(
      <InstanceCard
        instance={creatingInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('Creando')).toBeInTheDocument();
    expect(screen.getByText('Creando')).toHaveClass('text-blue-600');
  });

  it('shows pause button for RUNNING instance', () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('Pausar')).toBeInTheDocument();
    expect(screen.queryByText('Reanudar')).not.toBeInTheDocument();
  });

  it('shows resume button for SUSPENDED instance', () => {
    // ARRANGE
    const suspendedInstance = { ...mockInstance, status: 'SUSPENDED' };
    render(
      <InstanceCard
        instance={suspendedInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('Reanudar')).toBeInTheDocument();
    expect(screen.queryByText('Pausar')).not.toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', async () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ACT
    const deleteButton = screen.getByText('Eliminar');
    await user.click(deleteButton);

    // ASSERT
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('calls onStatusChange when pause button is clicked', async () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ACT
    const pauseButton = screen.getByText('Pausar');
    await user.click(pauseButton);

    // ASSERT
    expect(mockOnStatusChange).toHaveBeenCalledWith(1, 'SUSPENDED');
  });

  it('calls onStatusChange when resume button is clicked', async () => {
    // ARRANGE
    const suspendedInstance = { ...mockInstance, status: 'SUSPENDED' };
    render(
      <InstanceCard
        instance={suspendedInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ACT
    const resumeButton = screen.getByText('Reanudar');
    await user.click(resumeButton);

    // ASSERT
    expect(mockOnStatusChange).toHaveBeenCalledWith(1, 'RUNNING');
  });

  it('calls onRotatePassword when rotate button is clicked', async () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ACT
    const rotateButton = screen.getByText('Rotar');
    await user.click(rotateButton);

    // ASSERT
    expect(mockOnRotatePassword).toHaveBeenCalledWith(1);
  });

  it('copies host to clipboard when copy button is clicked', async () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ACT
    const copyButton = screen.getByRole('button', { name: /copiar/i });
    await user.click(copyButton);

    // ASSERT
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('localhost');
  });

  it('shows proper grid layout for instance information', () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    const infoGrid = screen.getByText('Motor').closest('div')?.parentElement;
    expect(infoGrid).toHaveClass('grid', 'grid-cols-2', 'gap-4');
  });

  it('handles unknown status gracefully', () => {
    // ARRANGE
    const unknownStatusInstance = { ...mockInstance, status: 'UNKNOWN' };
    render(
      <InstanceCard
        instance={unknownStatusInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('Eliminada')).toBeInTheDocument();
  });

  it('applies correct styling for different statuses', () => {
    // ARRANGE
    const runningInstance = { ...mockInstance, status: 'RUNNING' };
    const { rerender } = render(
      <InstanceCard
        instance={runningInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT for RUNNING
    expect(screen.getByText('En Ejecución')).toHaveClass('text-emerald-600');

    // ARRANGE for SUSPENDED
    const suspendedInstance = { ...mockInstance, status: 'SUSPENDED' };
    rerender(
      <InstanceCard
        instance={suspendedInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT for SUSPENDED
    expect(screen.getByText('Pausada')).toHaveClass('text-amber-600');
  });

  it('displays all action buttons correctly', () => {
    // ARRANGE
    render(
      <InstanceCard
        instance={mockInstance}
        onDelete={mockOnDelete}
        onStatusChange={mockOnStatusChange}
        onRotatePassword={mockOnRotatePassword}
      />
    );

    // ASSERT
    expect(screen.getByText('Pausar')).toBeInTheDocument();
    expect(screen.getByText('Rotar')).toBeInTheDocument();
    expect(screen.getByText('Eliminar')).toBeInTheDocument();
  });
});