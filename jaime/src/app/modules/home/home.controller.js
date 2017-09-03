class HomeController {
	constructor($rootScope) {
		this.$rootScope = $rootScope;
		this.init();
	}

	init() {
		this.$rootScope.$broadcast('updateActiveTab', { activeTab: 'home' });
	}
}

HomeController.$inject = ['$rootScope'];

export default HomeController;
