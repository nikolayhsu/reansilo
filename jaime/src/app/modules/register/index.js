import angular from 'angular';
import RegisterController from './register.controller';
import template from './register.html';

const CONTROLLER_NAME = 'RegisterController';

const RegisterApp = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('register.module', [])
	.directive('register', RegisterApp)
	.controller(CONTROLLER_NAME, RegisterController)
	.name;
