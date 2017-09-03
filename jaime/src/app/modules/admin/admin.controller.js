class AdminController {
	constructor($rootScope) {
		this.$rootScope = $rootScope;
		this.init();
	}

	init() {
		this.$rootScope.$broadcast('updateActiveTab', { activeTab: 'admin' });
	}
}

AdminController.$inject = ['$rootScope'];

export default AdminController;
