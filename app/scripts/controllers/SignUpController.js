'use strict';

angular.module('MainController').controller('SignUpController', signUpController);

signUpController.$inject = ['$location', 'AuthFactory', '$modalInstance', 'PlaylistFactory', '$route'];

function signUpController($location, AuthFactory, $modalInstance, PlaylistFactory, $route) {
    var vm = this;

    vm.$modalInstance = $modalInstance;


    vm.signUp = function(credentials){
        AuthFactory.signUp(credentials).success(function(response){
            vm.$modalInstance.close(response);
            vm.credentials = {};
            PlaylistFactory.getPlaylistByUser(AuthFactory.user);
        });
    };
}
