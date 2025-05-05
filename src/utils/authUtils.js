/**
 * Utility functions for authentication and authorization
 */

/**
 * Check if the current user has admin role
 * @returns {boolean} True if user has admin role, false otherwise
 */
export const isAdmin = () => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.log('authUtils: No user data found in localStorage');
      return false;
    }

    const user = JSON.parse(userData);
    console.log('authUtils: Checking admin status for user:', user);

    // Check if user has roles and if any role has role_name "Admin"
    const isAdminUser = user &&
           user.roles &&
           Array.isArray(user.roles) &&
           user.roles.some(role => role.role_name === "Admin");

    console.log('authUtils: User is admin:', isAdminUser);
    return isAdminUser;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};

/**
 * Check if the user has a specific permission
 * @param {string} permissionName - The name of the permission to check
 * @returns {boolean} True if user has the permission, false otherwise
 */
export const hasPermission = (permissionName) => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return false;

    const user = JSON.parse(userData);

    // Check if user has roles with permissions
    if (!user || !user.roles || !Array.isArray(user.roles)) return false;

    // Check each role for the permission
    return user.roles.some(role =>
      role.permissions &&
      Array.isArray(role.permissions) &&
      role.permissions.some(permission =>
        permission.permission_name === permissionName
      )
    );
  } catch (error) {
    console.error(`Error checking permission ${permissionName}:`, error);
    return false;
  }
};

/**
 * Get the current authenticated user
 * @returns {Object|null} The user object or null if not authenticated
 */
export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return null;

    return JSON.parse(userData);
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Check if the user is authenticated
 * @returns {boolean} True if user is authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const hasToken = !!localStorage.getItem('access_token');
  const hasUser = !!localStorage.getItem('user');
  const isAuth = hasToken && hasUser;
  console.log('authUtils: Checking authentication - token:', hasToken, 'user:', hasUser, 'authenticated:', isAuth);
  return isAuth;
};
