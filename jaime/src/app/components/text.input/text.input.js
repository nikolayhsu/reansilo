import angular from 'angular';
import template from './text.input.html';

const TextInput = () => ({
	restrict: 'E',
	replace: 'true',
	template,
	require: ['ngModel', '^form'],
	scope: {
		type: '@',
		msId: '@',
		msName: '@',
		msRequired: '@',
		msDisabled: '=',
		mask: '@',
		label: '@',
		placeholder: '@',
		labelLength: '@',
		inputLength: '@',
		ngMaxlength: '=',
		ngMinlength: '=',
		ngModel: '=',
	},
	link: (scope, element, attrs, ctrls) => {
		let regex = '';
		let negRegex = '';
		const ngModelCtrl = ctrls[0];
		const formCtrl = ctrls[1];
		const theScope = scope;

		if (scope.type === undefined) {
			theScope.type = 'text';
		}

		switch (scope.mask) {
		case 'alphanumeric':
			regex = /[0-9a-zA-Z]$/;
			negRegex = /[^0-9a-zA-Z]/g;
			break;
		case 'mobile':
			regex = /[0-9]$/;
			negRegex = /[^0-9]/g;
			break;
		case 'password':
			regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
			negRegex = '';
			break;
		default:
			break;
		}

		function valueInvalid() {
			if (ngModelCtrl.$viewValue === undefined) {
				return false;
			}

			if (scope.ngMaxlength) {
				let value = ngModelCtrl.$viewValue;

				if (angular.isNumber(value)) {
					value = value.toString();
				}

				return value.length === scope.ngMaxlength;
			}

			return false;
		}

		function getErrorMessage(errors) {
			if (!errors) {
				return '';
			}

			return Object.keys(errors).reduce((message, error) => {
				switch (error) {
				case 'required':
					return `${message} The field is required.`;
				case 'minlength':
					return `${message} The field should contain at least ${scope.ngMinlength} characters.`;
				case 'email':
					return `${message} Invalid email.`;
				case 'password':
					return `${message} Invalid password: a password should include at least 1 uppercase character, 1 lowercase character and 1 digit.`;
				case 'confirm':
					return `${message} Mismatched ${scope.msName.split('_')[1]}.`;
				default:
					return message;
				}
			}, '');
		}

		element.bind('keypress', (event) => {
			if (scope.mask === 'password') {
				return;
			}

			const that = {};
			that.event = event;

			const key = String.fromCharCode(that.event.keyCode || that.event.which);

			if ((scope.mask && !regex.test(key)) || valueInvalid()) {
				that.event.returnValue = false;

				if (that.event.preventDefault) {
					that.event.preventDefault();
				}
			}
		});

		element.bind('paste change', (event) => {
			let text = '';

			if (event.type === 'paste') {
				text = event.clipboardData.getData('Text');
			}

			if (event.type === 'change') {
				text = event.srcElement.value;
			}

			if (!text) {
				return;
			}

			let transformedInput = text.replace(negRegex, '');

			if (scope.ngMaxlength) {
				transformedInput = transformedInput.substring(0, scope.ngMaxlength);
			}

			if (transformedInput !== text) {
				ngModelCtrl.$setViewValue(transformedInput);
				ngModelCtrl.$render();

				if (event.preventDefault) {
					event.preventDefault();
				}
			}
		});

		scope.$watch(() => {
			if (scope.mask === 'password') {
				formCtrl[scope.msName].$setValidity('password', !(!regex.test(ngModelCtrl.$viewValue) && formCtrl[scope.msName].$dirty));
			}

			if (scope.msName.split('_').length === 2 && scope.msName.split('_')[0] === 'confirm' && formCtrl[scope.msName].$viewValue !== '') {
				formCtrl[scope.msName].$setValidity('confirm', (formCtrl[scope.msName].$dirty && !(formCtrl[scope.msName].$viewValue !== formCtrl[scope.msName.split('_')[1]].$viewValue)));
			}

			if (formCtrl[scope.msName].$dirty && formCtrl[scope.msName].$error) {
				return Object.keys(formCtrl[scope.msName].$error).length > 0;
			}

			return false;
		}, (invalid) => {
			if (invalid) {
				theScope.error = getErrorMessage(formCtrl[scope.msName].$error);
			} else {
				theScope.error = '';
			}

			element.toggleClass('has-error', invalid);
		});
	},
});

export default angular.module('text.input.module', [])
	.directive('msTextInput', TextInput)
	.name;
