import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders welcome section with user information', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    expect(screen.getByText('¡Bienvenido, Juan Dev!')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('3 de 5')).toBeInTheDocument();
  });

  it('renders stats cards with correct information', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT - Use more specific queries for stats cards
    const activeInstancesCard = screen.getByText('Instancias Activas', { selector: 'p.text-gray-600.text-sm' });
    expect(activeInstancesCard).toBeInTheDocument();
    expect(screen.getByText('3', { selector: 'p.text-4xl.font-bold' })).toBeInTheDocument();
    expect(screen.getByText('Ejecutándose correctamente')).toBeInTheDocument();

    expect(screen.getByText('Suspendidas')).toBeInTheDocument();
    expect(screen.getByText('1', { selector: 'p.text-4xl.font-bold' })).toBeInTheDocument();
    expect(screen.getByText('En pausa')).toBeInTheDocument();

    expect(screen.getByText('Almacenamiento')).toBeInTheDocument();
    expect(screen.getByText('2.4 GB')).toBeInTheDocument();
    expect(screen.getByText('De 10 GB disponibles')).toBeInTheDocument();
  });

  it('renders instances table with all instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    expect(screen.getByText('Production MySQL')).toBeInTheDocument();
    expect(screen.getByText('Analytics PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Cache Redis')).toBeInTheDocument();
    expect(screen.getByText('Development MongoDB')).toBeInTheDocument();
  });

  it('displays correct status badges for instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    const runningInstances = screen.getAllByText('RUNNING');
    expect(runningInstances).toHaveLength(3);

    const suspendedInstance = screen.getByText('SUSPENDED');
    expect(suspendedInstance).toBeInTheDocument();
  });

  it('shows correct engine types for instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    expect(screen.getByText('MySQL')).toBeInTheDocument();
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });

  it('displays correct host information', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    expect(screen.getByText('mysql-prod.crudcloud.io')).toBeInTheDocument();
    expect(screen.getByText('pg-analytics.crudcloud.io')).toBeInTheDocument();
    expect(screen.getByText('redis-cache.crudcloud.io')).toBeInTheDocument();
    expect(screen.getByText('mongo-dev.crudcloud.io')).toBeInTheDocument();
  });

  it('shows connection counts for instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT - Use more specific queries for connection counts
    // Find all table cells and filter for connection counts
    const allCells = screen.getAllByRole('cell');
    const connectionCells = allCells.filter(cell => {
      const text = cell.textContent?.trim();
      return ['12', '5', '3', '0'].includes(text);
    });

    expect(connectionCells).toHaveLength(4);

    // Verify specific connection counts using getAllByText
    const twelveElements = screen.getAllByText('12');
    expect(twelveElements.length).toBeGreaterThan(0);

    const fiveElements = screen.getAllByText('5');
    expect(fiveElements.length).toBeGreaterThan(0);

    const threeElements = screen.getAllByText('3');
    expect(threeElements.length).toBeGreaterThan(0);

    const zeroElements = screen.getAllByText('0');
    expect(zeroElements.length).toBeGreaterThan(0);
  });

  it('renders action buttons for instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    const pauseButtons = screen.getAllByTitle('Suspender');
    expect(pauseButtons).toHaveLength(3);

    const resumeButtons = screen.getAllByTitle('Reanudar');
    expect(resumeButtons).toHaveLength(1);

    const deleteButtons = screen.getAllByTitle('Eliminar');
    expect(deleteButtons).toHaveLength(4);
  });

  it('renders "New Instance" button', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    expect(screen.getByText('Nueva Instancia')).toBeInTheDocument();
  });

  it('applies correct styling to welcome section', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT - Find the welcome section by its unique gradient classes using querySelector
    const welcomeSection = screen.getByText('¡Bienvenido, Juan Dev!').closest('div.bg-gradient-to-r');
    expect(welcomeSection).toBeInTheDocument();
    expect(welcomeSection).toHaveClass('bg-gradient-to-r', 'from-slate-900', 'via-violet-900', 'to-slate-900');
  });

  it('applies correct grid layout to stats cards', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT - Find the stats container by its unique grid classes
    const statsContainer = screen.getByText('Instancias Activas', { selector: 'p.text-gray-600.text-sm' }).closest('div.grid');
    expect(statsContainer).toBeInTheDocument();
    expect(statsContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-6');
  });

  it('displays correct status colors for instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    const runningStatus = screen.getAllByText('RUNNING')[0];
    expect(runningStatus).toHaveClass('bg-green-100', 'text-green-700');

    const suspendedStatus = screen.getByText('SUSPENDED');
    expect(suspendedStatus).toHaveClass('bg-yellow-100', 'text-yellow-700');
  });

  it('renders table headers correctly', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    expect(screen.getByText('NOMBRE')).toBeInTheDocument();
    expect(screen.getByText('MOTOR')).toBeInTheDocument();
    expect(screen.getByText('HOST')).toBeInTheDocument();
    expect(screen.getByText('ESTADO')).toBeInTheDocument();
    expect(screen.getByText('CONEXIONES')).toBeInTheDocument();
    expect(screen.getByText('ACCIONES')).toBeInTheDocument();
  });

  it('shows creation dates for instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('2024-02-03')).toBeInTheDocument();
    expect(screen.getByText('2024-02-10')).toBeInTheDocument();
    expect(screen.getByText('2024-01-20')).toBeInTheDocument();
  });

  it('renders database icons for instances', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT - Find database icons by their container classes or SVG elements
    const databaseIconContainers = screen.getAllByText('Production MySQL').map(element =>
      element.closest('tr').querySelector('div.w-10.h-10.bg-violet-100')
    ).filter(Boolean);

    expect(databaseIconContainers.length).toBeGreaterThan(0);

    // Alternative approach: check for SVG elements
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('applies hover effects to table rows', () => {
    // ARRANGE
    render(<Dashboard />);

    // ASSERT
    const tableRow = screen.getByText('Production MySQL').closest('tr');
    expect(tableRow).toHaveClass('hover:bg-gray-50');
  });
});