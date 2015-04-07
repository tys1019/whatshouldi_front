'use strict';

angular.module('MainController').controller('LoginController', loginController);

loginController.$inject = ['$location', 'AuthFactory', '$modalInstance', 'PlaylistFactory', '$route'];

function loginController($location, AuthFactory, $modalInstance, PlaylistFactory, $route) {
    var vm = this;
    vm.$modalInstance = $modalInstance;

    vm.login = function(credentials){
        AuthFactory.login(credentials).then(function(response){
            vm.$modalInstance.close(response);
            vm.credentials = {};
        }).then(function(){
            PlaylistFactory.getPlaylist(AuthFactory.user.playlist_id);
        });
    };


}
