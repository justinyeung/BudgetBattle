/**
 * @module middleware
 */

/**
 * Checks if user is logged in 
 * 
 * @public
 * @static
 * @function isLoggedIn
 * @param {Object} data - Object returned from backend 
 * @returns {boolean} - Whether user is logged in
 */
export const isLoggedIn = (data) => {
    if (data.msg === 'no user') {
        return false;
    }
    return true;
};