'use strict';

angular.module('MainController').controller('EpisodeController', episodeController);

episodeController.$inject = ['$location', 'AuthFactory', '$modalInstance', 'TvFactory', '$route'];

function episodeController($location, AuthFactory, $modalInstance, TvFactory, $route) {
    var vm = this;

    vm.$modalInstance = $modalInstance;




    vm.parseJSON = function() {

        vm.episode.purchase_web_sources = JSON.parse(vm.episode.purchase_web_sources);
        vm.episode.free_web_sources = JSON.parse(vm.episode.free_web_sources);
        vm.episode.subscription_web_sources = JSON.parse(vm.episode.subscription_web_sources);
        vm.episode.tv_everywhere_web_sources = JSON.parse(vm.episode.tv_everywhere_web_sources);
    };

    vm.episode = TvFactory.episode;
    vm.parseJSON();
}
