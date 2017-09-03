class AboutController {
	constructor($rootScope) {
		this.$rootScope = $rootScope;
		this.init();
	}

	init() {
		this.$rootScope.$broadcast('updateActiveTab', { activeTab: 'about' });
	}
}

AboutController.$inject = ['$rootScope'];

export default AboutController;
