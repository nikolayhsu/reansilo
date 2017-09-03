import angular from 'angular';
import HomeController from './home.controller';
import template from './home.html';

const CONTROLLER_NAME = 'HomeController';

const HomeApp = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('home.module', [])
	.directive('home', HomeApp)
	.controller(CONTROLLER_NAME, HomeController)
	.name;
