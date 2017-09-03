class LoginController {
	constructor($rootScope, $scope, $http, $location, AuthService) {
		this.$rootScope = $rootScope;
		this.$location = $location;
		this.AuthService = AuthService;
		this.user = {
			username: '',
			password: '',
		};
		this.isErrorShown = false;
		this.hasLoggedIn = false;
		this.isFbEnabled = false;
		this.init();
	}

	init() {
		this.$rootScope.$broadcast('updateActiveTab', { activeTab: '' });
	}

	userLogin() {
		this.AuthService.login(this.user)
			.then((res) => {
				const { data } = res;
				if (data && data.isLoggedIn !== undefined && data.isLoggedIn === true) {
					this.$location.path('/home');
					this.AuthService.updateLoginStatus(data);
				} else {
					this.isErrorShown = true;
				}
			});
	}

	toRegister() {
		this.$location.path('/register');
	}
}

LoginController.$inject = ['$rootScope', '$scope', '$http', '$location', 'AuthService'];

export default LoginController;
