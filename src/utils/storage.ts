'use client';

import { deleteCookie } from 'cookies-next';

const clearToken = () => {
  deleteCookie('ascent_u_refresh_token');
  deleteCookie('ascent_u_access_token');
};

export { clearToken };
