import angular from 'angular';
import ContactController from './contact.controller';
import template from './contact.html';

const CONTROLLER_NAME = 'ContactController';

const ContactApp = () => ({
	template,
	controller: CONTROLLER_NAME,
	controllerAs: 'vm',
});

export default angular.module('contact.module', [])
	.directive('contact', ContactApp)
	.controller(CONTROLLER_NAME, ContactController)
	.name;
