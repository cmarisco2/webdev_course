/**
 * EXPORT DIRECTORY 
 * */

/**
 * Must be in 'index.js'.
 * Import all (req'd) modules in directory.
 * Place all imports in array.
 * Export the array.
 */
const normalExports = require('./module_data_exports');
const additionalExports = require('./more_exports');

const allExports = [normalExports, additionalExports];

module.exports = allExports;