import { UserProfile } from './user-profile';
import { SimpleClaim } from './simple-claim';

export class AuthContext {
  claims: SimpleClaim[];
  userProfile: UserProfile;

  get isAdmin() {
    return !!this.claims && !!this.claims.find(c =>
      c.type === 'role' && c.value === 'Admin');
  }
  get isUser() {
    return !!this.claims && !!this.claims.find(c =>
      c.type === 'role' && c.value === 'User');
  }
  get isShopUser() {
    return !!this.claims && !!this.claims.find(c =>
      c.type === 'role' && c.value === 'ShopUser');
  }
}