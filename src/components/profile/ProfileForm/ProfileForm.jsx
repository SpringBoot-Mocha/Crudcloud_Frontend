import React, { useEffect } from 'react';
import { useForm } from '../../../hooks/useForm';
import { useAuth } from '../../../hooks/useAuth';
import userService from '../../../services/userService';

const ProfileForm = () => {
  const { user } = useAuth();
  const { values, errors, isSubmitting, handleChange, handleSubmit, setValues } = useForm(
    { firstName: '', lastName: '', email: '' },
    async (formValues) => {
      if (!user?.id) throw new Error('User ID not found');
      await userService.updateUser(user.id, formValues);
      alert('Perfil actualizado exitosamente');
    }
  );

  useEffect(() => {
    if (user) {
      setValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  return (
    <div className="rounded-xl border border-slate-200/50 bg-white/60 backdrop-blur-sm overflow-hidden">
      {/* Section Header */}
      <div className="px-6 py-5 border-b border-slate-100/50 bg-slate-50/30">
        <h2 className="text-lg font-semibold text-slate-900">Información del Perfil</h2>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Nombre
            </label>
            <input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-500 text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-slate-300"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Apellido
            </label>
            <input
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-500 text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent hover:border-slate-300"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-900 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            disabled
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-600 text-sm cursor-not-allowed"
          />
          <p className="mt-1 text-xs text-slate-500">El email no puede ser modificado</p>
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
          {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
