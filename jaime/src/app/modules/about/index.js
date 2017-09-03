import angular from 'angular';
import AboutController from './about.controller';
import template from './about.html';

const CONTROLLER_NAME = 'AboutController';

const AboutApp = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('about.module', [])
	.directive('about', AboutApp)
	.controller(CONTROLLER_NAME, AboutController)
	.name;
