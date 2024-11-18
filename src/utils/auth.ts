export const refreshTokenIfNeeded = async (): Promise<boolean> => {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('tokenExpiration');
  
  if (!token || !expiration) {
    return false;
  }

  const expirationTime = parseInt(expiration);
  const currentTime = Date.now();
  
  if (expirationTime - currentTime < 300000) {
    try {
      const response = await fetch('http://localhost:3000/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiration');
        localStorage.removeItem('username');
        return false;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('tokenExpiration', String(Date.now() + data.expiresIn * 1000));
      return true;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return false;
    }
  }

  return true;
};