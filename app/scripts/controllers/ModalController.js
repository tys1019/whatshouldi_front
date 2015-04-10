'use strict';

angular.module('MainController').controller('ModalController', modalController);

modalController.$inject = ['$modal', 'TvFactory'];

function modalController($modal, TvFactory) {
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

  vm.openEpisode = function(selected) {
    TvFactory.setEpisode(selected);
    var modalInstance = $modal.open({
      templateUrl: 'views/episode-details.html',
      controller: 'EpisodeController as episodeController'
    });
  };
};
