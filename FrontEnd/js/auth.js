const API_URL = 'https://foodiehub-6e1i.onrender.com/api';

const Auth = {
  getToken() {
    return localStorage.getItem('token');
  },

  setToken(token) {
    localStorage.setItem('token', token);
  },

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  logout() {
    this.removeToken();
    window.location.href = 'index.html';
  },

  async apiCall(endpoint, method = 'GET', body = null) {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);

    const res = await fetch(`${API_URL}${endpoint}`, config);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  async register(userData) {
    const data = await this.apiCall('/auth/register', 'POST', userData);
    this.setToken(data.token);
    this.setUser(data.user);
    return data;
  },

  async login(email, password) {
    const data = await this.apiCall('/auth/login', 'POST', { email, password });
    this.setToken(data.token);
    this.setUser(data.user);
    return data;
  },

  async getProfile() {
    const data = await this.apiCall('/auth/profile');
    this.setUser(data.user);
    return data;
  },

  async updateProfile(profileData) {
    const data = await this.apiCall('/auth/profile', 'PUT', profileData);
    this.setUser(data.user);
    return data;
  },

  async changePassword(currentPassword, newPassword) {
    return await this.apiCall('/auth/change-password', 'PUT', { currentPassword, newPassword });
  },

  async forgotPassword(email) {
    return await this.apiCall('/auth/forgot-password', 'POST', { email });
  },

  async resetPassword(token, password) {
    return await this.apiCall(`/auth/reset-password/${token}`, 'POST', { password });
  },
};
