/**
 * Engine Mapper Utility
 * Maps database engine IDs to human-readable names and styling
 */

export const ENGINE_MAP = {
  2: 'PostgreSQL',
  4: 'MySQL',
  5: 'MongoDB',
  6: 'Redis',
  7: 'SQL Server',
  8: 'Cassandra',
};

// Reverse map: nombre -> ID
const ENGINE_NAME_TO_ID = {
  'PostgreSQL': 2,
  'MySQL': 4,
  'MongoDB': 5,
  'Redis': 6,
  'SQL Server': 7,
  'Cassandra': 8,
};

/**
 * Get engine name from ID or string
 * Handles both numeric IDs and string names from backend
 * @param {number|string} engineIdOrName - Database engine ID or name
 * @returns {string} Engine name
 */
export const getEngineName = (engineIdOrName) => {
  // Si ya es un string (nombre), devolverlo directamente
  if (typeof engineIdOrName === 'string') {
    return engineIdOrName;
  }

  // Si es un número (ID), mapear
  return ENGINE_MAP[engineIdOrName] || 'Unknown';
};

/**
 * Get engine ID from name
 * @param {string} engineName - Database engine name
 * @returns {number} Engine ID
 */
export const getEngineId = (engineName) => {
  return ENGINE_NAME_TO_ID[engineName] || null;
};

/**
 * Get engine icon color class
 * Handles both numeric IDs and string names
 * @param {number|string} engineIdOrName - Database engine ID or name
 * @returns {string} Tailwind color class
 */
export const getEngineColor = (engineIdOrName) => {
  // Convertir nombre a ID si es necesario
  const engineId = typeof engineIdOrName === 'string'
    ? getEngineId(engineIdOrName)
    : engineIdOrName;

  const colors = {
    2: 'text-blue-600',    // PostgreSQL
    4: 'text-amber-600',   // MySQL
    5: 'text-green-600',   // MongoDB
    6: 'text-red-600',     // Redis
    7: 'text-indigo-600',  // SQL Server
    8: 'text-purple-600',  // Cassandra
  };
  return colors[engineId] || 'text-slate-600';
};

/**
 * Get engine background color class
 * Handles both numeric IDs and string names
 * @param {number|string} engineIdOrName - Database engine ID or name
 * @returns {string} Tailwind color class
 */
export const getEngineBgColor = (engineIdOrName) => {
  // Convertir nombre a ID si es necesario
  const engineId = typeof engineIdOrName === 'string'
    ? getEngineId(engineIdOrName)
    : engineIdOrName;

  const bgColors = {
    2: 'bg-blue-50',       // PostgreSQL
    4: 'bg-amber-50',      // MySQL
    5: 'bg-green-50',      // MongoDB
    6: 'bg-red-50',        // Redis
    7: 'bg-indigo-50',     // SQL Server
    8: 'bg-purple-50',     // Cassandra
  };
  return bgColors[engineId] || 'bg-slate-50';
};

/**
 * Normalize instance data from backend response
 * Maps backend field names to frontend expectations
 * @param {object} instance - Raw instance from API
 * @returns {object} Normalized instance
 */
export const normalizeInstance = (instance) => {
  return {
    ...instance,
    // Map containerName to name for display
    name: instance.containerName || `Instance ${instance.id}`,
    // Map databaseEngine ID to engine name
    engine: getEngineName(instance.databaseEngine),
    // Keep all other fields as-is
  };
};

/**
 * Normalize multiple instances
 * @param {array} instances - Array of instances from API
 * @returns {array} Array of normalized instances
 */
export const normalizeInstances = (instances) => {
  return instances.map(normalizeInstance);
};
