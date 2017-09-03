class NavbarController {
	constructor($scope, AuthService, UserLevel) {
		this.scope = $scope;
		this.AuthService = AuthService;
		this.UserLevel = UserLevel;
		this.activeTab = '';
		this.active = 'active';
		this.isLoggedIn = false;
		this.nickname = '';

		this.init();
	}

	init() {
		this.scope.$on('updateActiveTab', (event, data) => {
			this.activeTab = data.activeTab;
		});

		this.scope.$on('updateLoginStatus', (event, data) => {
			if (data.isLoggedIn !== undefined) {
				this.isLoggedIn = data.isLoggedIn;
			}

			if (data.userLevel !== undefined) {
				this.userLevel = data.userLevel;
			}

			if (data.nickname) {
				this.nickname = data.nickname;
			}
		});
	}

	isAuthorised() {
		return this.isLoggedIn && this.userLevel >= this.UserLevel.ADMIN;
	}

	logout() {
		this.AuthService.logout()
			.then((res) => {
				if (res.data && res.data.isLoggedIn === false) {
					this.AuthService.updateLoginStatus(res.data);
				}
			});
	}
}

NavbarController.$inject = ['$scope', 'AuthService', 'UserLevel'];

export default NavbarController;
