import angular from 'angular';
import NavbarController from './navbar.controller';
import template from './navbar.html';

const CONTROLLER_NAME = 'NavbarController';

const Navbar = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('navbar.module', [])
	.directive('navbar', Navbar)
	.controller(CONTROLLER_NAME, NavbarController)
	.name;
