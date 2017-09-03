class NotFoundController {
	constructor($rootScope) {
		this.$rootScope = $rootScope;
		this.init();
	}

	init() {
		this.$rootScope.$broadcast('updateActiveTab', { activeTab: '' });
	}
}

NotFoundController.$inject = ['$rootScope'];

export default NotFoundController;
