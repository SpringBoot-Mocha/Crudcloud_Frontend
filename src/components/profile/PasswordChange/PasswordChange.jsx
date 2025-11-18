import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/useAuth';
import userService from '../../../services/userService';

const PasswordChange = () => {
  const { user } = useAuth();
  const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm(
    { currentPassword: '', newPassword: '', confirmPassword: '' },
    async (formValues) => {
      if (formValues.newPassword !== formValues.confirmPassword) {
        throw new Error('Las contraseñas no coinciden');
      }
      if (!user?.id) throw new Error('User ID not found');
      await userService.changePassword(user.id, formValues.currentPassword, formValues.newPassword);
      alert('Contraseña actualizada exitosamente');
      resetForm();
    }
  );

  return (
    <div className="rounded-xl border border-slate-200/50 bg-white overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-slate-100/50 bg-slate-50/30">
        <h2 className="text-lg font-semibold text-slate-900">Cambiar Contraseña</h2>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
        {/* Current Password */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Contraseña Actual
          </label>
          <input
            type="password"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-500 text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-slate-300"
          />
          {errors.currentPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Nueva Contraseña
          </label>
          <input
            type="password"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-500 text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-slate-300"
          />
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-500 text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-slate-300"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-3 rounded-lg bg-red-50/50 border border-red-200/50">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2.5 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
        >
          {isSubmitting ? 'Actualizando...' : 'Cambiar Contraseña'}
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
