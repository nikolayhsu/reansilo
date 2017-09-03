import angular from 'angular';
import MasterService from './master.service';

class AuthService extends MasterService {
	constructor($http, $location, $rootScope) {
		super();
		this.$http = $http;
		this.$location = $location;
		this.$rootScope = $rootScope;
	}

	get isLoggedIn() {
		return this.user.isLoggedIn;
	}

	set isLoggedIn(value) {
		this.user.isLoggedIn = value;
	}

	logout() {
		return this.$http.get(`${this.serverUrl}/logout`);
	}

	updateLoginStatus(user) {
		this.$rootScope.$broadcast('updateLoginStatus', user);
	}

	getLoginStatus() {
		return this.$http.get(`${this.serverUrl}/getLoginStatus`);
	}

	login(user) {
		return this.$http.post(`${this.serverUrl}/login`, user);
	}

	redirectToLogin() {
		this.$location.path('/login');
	}

	registerAccount(user) {
		return this.$http.post(`${this.serverUrl}/register`, user);
	}
}

AuthService.$inject = ['$http', '$location', '$rootScope'];

export default angular.module('auth.service', [])
	.service('AuthService', AuthService)
	.name;
