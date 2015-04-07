'use strict';

angular.module('MainController').controller('LoginController', loginController);

loginController.$inject = ['$location', 'AuthFactory', '$modalInstance'];

function loginController($location, AuthFactory, $modalInstance) {
    var vm = this;
    vm.$modalInstance = $modalInstance;

    vm.login = function(credentials){
        AuthFactory.login(credentials).then(function(response){
            vm.$modalInstance.close(response);
            vm.credentials = {};
        });
    };


}
