const AppConfig = ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) => {
	const that = {
		$httpProvider,
	};

	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/404');
	that.$httpProvider.defaults.withCredentials = true;

	$stateProvider
		.state('main', {
			url: '/',
			redirectTo: 'home',
		})
		.state('home', { url: '/home', template: '<home></home>' })
		.state('about', { url: '/about', template: '<about></about>' })
		.state('contact', { url: '/contact', template: '<contact></contact>' })
		.state('login', { url: '/login', template: '<login></login>' })
		.state('register', { url: '/register', template: '<Register></Register>' })
		.state('admin', { url: '/admin', template: '<admin></admin>', data: { secure: true } })
		.state('404', { url: '/404', template: '<not-found></not-found>' });
};

AppConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

export default AppConfig;
