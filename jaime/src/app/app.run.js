const AppRun = ($http, $rootScope, $location, $cookies, $transitions, AuthService, UserLevel) => {
	const that = {};
	that.$rootScope = $rootScope;
	that.$http = $http;
	that.$rootScope.isFbInitialised = false;
	that.$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;

	AuthService.getLoginStatus()
		.then((res) => {
			AuthService.updateLoginStatus(res.data);
		});

	const match = {
		to: state => (state.data && state.data.secure),
	};

	$transitions.onError({}, () => {
		$location.path('/');
	});

	$transitions.onBefore(match, () => {
		AuthService.getLoginStatus()
			.then((res) => {
				const user = res.data;
				if (!user.isLoggedIn) {
					AuthService.redirectToLogin();
				} else if (user.isLoggedIn && user.userLevel < UserLevel.ADMIN) {
					$location.path('/404');
				}
			});
	});
};

export default AppRun;
