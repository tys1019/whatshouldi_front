'use strict';

angular.module('MainController').controller('ModalController', modalController);

modalController.$inject = ['$modal'];

function modalController($modal) {
     var vm = this;



  vm.openLogin = function () {
    var modalInstance = $modal.open({
      templateUrl: 'views/login-form.html',
      controller: 'LoginController as loginController'
    });
  };

  vm.openSignUp = function () {
    var modalInstance = $modal.open({
      templateUrl: 'views/sign-up-form.html',
      controller: 'SignUpController as signUpController'
    });
  };

  vm.openSearch = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/search-form.html',
      controller: 'SearchController as searchController'
    });
  };
};
