import angular from 'angular';
import NotFoundController from './not.found.controller';
import template from './not.found.html';

const CONTROLLER_NAME = 'NotFoundController';

const NotFoundApp = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('not.found.module', [])
	.directive('notFound', NotFoundApp)
	.controller(CONTROLLER_NAME, NotFoundController)
	.name;
