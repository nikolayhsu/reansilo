class RegisterController {
	constructor($rootScope, $scope, $http, $location, AuthService) {
		this.$rootScope = $rootScope;
		this.$location = $location;
		this.AuthService = AuthService;
		this.user = {};
		this.result = {
			success: false,
			errorMessage: [],
		};
		this.init();
	}

	init() {
		this.$rootScope.$broadcast('updateActiveTab', { activeTab: '' });
	}

	goToLogin() {
		this.$location.path('/login');
	}

	register() {
		const fields = ['username', 'password', 'confirm_password', 'nickname', 'mobile'];

		fields.forEach((field) => {
			this.form[field].$setDirty();
		});

		if (this.form.$valid) {
			this.AuthService.registerAccount(this.user)
				.then((res) => {
					if (res) {
						this.result = res.data;
					}
				}, (error) => {
					console.error(error);
				});
		}
	}
}

RegisterController.$inject = ['$rootScope', '$scope', '$http', '$location', 'AuthService'];

export default RegisterController;
