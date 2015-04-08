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

    modalInstance.result.then(function (data) {
      console.log(data);
    });
  };

  vm.openSignUp = function () {
    var modalInstance = $modal.open({
      templateUrl: 'views/sign-up-form.html',
      controller: 'SignUpController as signUpController'
    });

    modalInstance.result.then(function (data) {
      console.log(data);
    });
  };

  vm.openSearch = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/search-form.html',
      controller: 'NavbarController as navbarController'
    });

    modalInstance.result.then(function (data) {
      console.log(data);
    });
  }
};
