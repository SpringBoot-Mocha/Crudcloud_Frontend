import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, id = 'portal' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Crear el contenedor si no existe
    let element = document.getElementById(id);
    if (!element) {
      element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }
  }, [id]);

  if (!mounted) return null;

  const portalElement = document.getElementById(id);
  if (!portalElement) return null;

  return createPortal(children, portalElement);
};

export default Portal;
