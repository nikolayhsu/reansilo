import angular from 'angular';
import AdminController from './admin.controller';
import template from './admin.html';

const CONTROLLER_NAME = 'AdminController';

const AdminApp = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('admin.module', [])
	.directive('admin', AdminApp)
	.controller(CONTROLLER_NAME, AdminController)
	.name;
