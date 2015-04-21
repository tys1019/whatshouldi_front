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

    vm.getOrToggleEpisodes = function(season){
        if (!vm.tvShow.seasons[season - 1].episodes) {
            TvFactory.getEpisodes(vm.tvShow.guidebox_id, season);
            vm.tvShow.seasons[season - 1].displayEpisodes = true;
        } else {
            vm.tvShow.seasons[season - 1].displayEpisodes = !vm.tvShow.seasons[season - 1].displayEpisodes;
        }

    };

    vm.getSeasons = function(){
        if (!vm.tvShow.seasons) {
            TvFactory.getSeasons(vm.tvShow.guidebox_id);
        };
    };

    vm.getRelatedShows = function(){
        if (!vm.tvShow.related) {
            TvFactory.getRelatedShows(vm.tvShow.imdb_id);
        };
    };


    TvFactory.getTvShowDetails($routeParams.guideboxId).then(vm.getSeasons).then(vm.getRelatedShows);

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $('.navbar-toggle').click();
        }
    });
}
