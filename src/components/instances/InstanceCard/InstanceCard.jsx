import React from 'react';
import { Card, Badge, Button } from '../../ui';

const InstanceCard = ({ instance, onDelete, onStatusChange, onRotatePassword }) => {
  const statusColors = {
    RUNNING: 'success',
    SUSPENDED: 'warning',
    CREATING: 'primary',
    DELETED: 'gray',
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{instance.name}</h3>
          <p className="text-sm text-gray-600">ID: {instance.id}</p>
        </div>
        <Badge variant={statusColors[instance.status] || 'gray'}>
          {instance.status}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-600">Motor</p>
            <p className="font-medium text-gray-900">{instance.engine}</p>
          </div>
          <div>
            <p className="text-gray-600">Host</p>
            <p className="font-medium text-gray-900">{instance.host}</p>
          </div>
          <div>
            <p className="text-gray-600">Puerto</p>
            <p className="font-medium text-gray-900">{instance.port}</p>
          </div>
          <div>
            <p className="text-gray-600">Usuario</p>
            <p className="font-medium text-gray-900">{instance.username}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {instance.status === 'RUNNING' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onStatusChange(instance.id, 'SUSPENDED')}
          >
            Suspender
          </Button>
        )}
        {instance.status === 'SUSPENDED' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onStatusChange(instance.id, 'RUNNING')}
          >
            Reanudar
          </Button>
        )}
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onRotatePassword(instance.id)}
        >
          Rotar Contraseña
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(instance.id)}
        >
          Eliminar
        </Button>
      </div>
    </Card>
  );
};

export default InstanceCard;
