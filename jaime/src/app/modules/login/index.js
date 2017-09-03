import angular from 'angular';
import LoginController from './login.controller';
import template from './login.html';

const CONTROLLER_NAME = 'LoginController';

const LoginApp = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('login.module', [])
	.directive('login', LoginApp)
	.controller(CONTROLLER_NAME, LoginController)
	.name;
