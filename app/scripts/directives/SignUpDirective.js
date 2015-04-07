'use strict';

angular.module('MainDirective').directive('signUpForm', [function(){
    return {
        restrict: 'E',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
        controllerAs: 'signUpController',
        bindToController: true
    };
}]);
