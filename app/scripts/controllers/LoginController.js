'use strict';

angular.module('MainController').controller('LoginController', loginController);

loginController.$inject = ['$location', 'AuthFactory', '$modalInstance', 'PlaylistFactory', '$route'];

function loginController($location, AuthFactory, $modalInstance, PlaylistFactory, $route) {
    var vm = this;
    vm.$modalInstance = $modalInstance;
    vm.hasErrors = false;


    vm.login = function(credentials){
        AuthFactory.login(credentials).success(function(response){
            vm.$modalInstance.close(response);
            vm.credentials = {};
            PlaylistFactory.getPlaylist(AuthFactory.user.playlist_id);
        }).error(function(){
            vm.hasErrors = true;
        });
    };



}
