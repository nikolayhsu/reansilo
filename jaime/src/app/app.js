import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-cookies';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';

import AppConfig from './app.config';
import AppRun from './app.run';
import AuthService from './services/auth.service';
import appTemplate from './app.html';
import constants from './constants';
import components from './components';
import modules from './modules';

const app = () => ({
	template: appTemplate,
});

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router', 'ngCookies', AuthService, ...constants, ...components, ...modules])
	.config(AppConfig)
	.run(['$http', '$rootScope', '$location', '$cookies', '$transitions', 'AuthService', 'UserLevel', AppRun])
	.directive('app', app);

export default MODULE_NAME;
