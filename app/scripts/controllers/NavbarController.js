'use strict';

angular.module('MainController').controller('NavbarController', navbarController);

navbarController.$inject = ['AuthFactory', 'SearchFactory', '$location'];

function navbarController(AuthFactory, SearchFactory, $location) {
    var vm = this;

    vm.user = AuthFactory.user;

    vm.logout = function(){
        AuthFactory.logout().then(function(){
            $location.path('/');
        });
    };

    vm.search = function(){
        SearchFactory.search(vm.search_params);
    };


    vm.isLoggedIn = function(){
        return AuthFactory.isAuthenticated();
    };

    vm.results = SearchFactory.results;
    vm.displayResults = false;

    vm.toggleDisplayResults = function(){
        vm.displayResults = !vm.displayResults;
        console.log(vm.displayResults);
    }

}
