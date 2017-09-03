class ContactController {
	constructor($rootScope) {
		this.$rootScope = $rootScope;
		this.init();
	}

	init() {
		this.$rootScope.$broadcast('updateActiveTab', { activeTab: 'contact' });
	}
}

ContactController.$inject = ['$rootScope'];

export default ContactController;
