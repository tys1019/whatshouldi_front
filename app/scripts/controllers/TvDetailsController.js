'use strict';

angular.module('MainController').controller('TvDetailsController', tvDetailsController);

tvDetailsController.$inject = ['TvFactory', '$location', '$routeParams', '$window', 'PlaylistFactory', 'AuthFactory', '$scope'];

function tvDetailsController(TvFactory, $location, $routeParams, $window, PlaylistFactory, AuthFactory, $scope) {
    var vm = this;

    vm.tvShow = TvFactory.tvShow;

    vm.isAuthenticated = function(){
        return AuthFactory.isAuthenticated();
    };


    vm.updatePlaylist = function(){
        var user = JSON.parse($window.localStorage.getItem('ga-user'));
        PlaylistFactory.updateShowPlaylist(user, this.tvShow);
    };


    vm.isInPlaylist = function(){

        if (AuthFactory.isAuthenticated() && PlaylistFactory.isInTVPlaylist(vm.tvShow)) {
            return true;
        } else {
            return false;
        }
    };

    vm.getEpisodes = function(){
        if (!vm.tvShow.episodes) {
            TvFactory.getEpisodes(vm.tvShow.guidebox_id);
        };
    };

    TvFactory.getTvShowDetails($routeParams.guideboxId).then(vm.getEpisodes);

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $('.navbar-toggle').click();
        }
    });
}
