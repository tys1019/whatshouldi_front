'use strict';

angular.module('MainController').controller('SignUpController', signUpController);

signUpController.$inject = ['$location', 'AuthFactory', '$modalInstance'];

function signUpController($location, AuthFactory, $modalInstance) {
    var vm = this;

    vm.$modalInstance = $modalInstance;


    vm.signUp = function(credentials){
        AuthFactory.signUp(credentials).then(function(response){
            vm.$modalInstance.close(response);
            vm.credentials = {};
        });
    };
}
