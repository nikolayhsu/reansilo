import angular from 'angular';

const UserLevel = {
	SUPER: 9,
	ADMIN: 7,
	VIP: 5,
	GENERAL: 1,
};

export default angular.module('user.level.constant', [])
	.constant('UserLevel', UserLevel)
	.name;
