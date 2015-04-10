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

    // vm.hasStreamingLinks = function(){
    //     if (!vm.movie.title || vm.movie.subscription_web_sources.length === 0 && !vm.movie.netflixLink) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // };

    // vm.hasPurchaseLinks = function(){
    //     if (!vm.movie.title || vm.movie.purchase_web_sources.length === 0) {
    //         return false;
    //     } else {
    //         return true;
    //     }

    // };

    // vm.hasFreeLinks = function(){
    //     if (!vm.movie.title || vm.movie.free_web_sources.length === 0) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // };


    // vm.getMovieRatings = function(){
    //     if (!vm.movie.rt_ratings) {
    //         TvFactory.getMovieRatings(vm.movie.rottentomatoes_id);
    //     };
    // };

    // vm.getMovieReviews = function(){

    //     if (!vm.movie.rt_reviews) {
    //         TvFactory.getMovieReviews(vm.movie.rottentomatoes_id);
    //     };
    // };

    // vm.getNetflixLink = function() {
    //     TvFactory.getNetflixLink(vm.movie);
    // };


    TvFactory.getTvShowDetails($routeParams.guideboxId);

    // .then(vm.getMovieRatings).then(vm.getMovieReviews).then(vm.getNetflixLink);

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $('.navbar-toggle').click();
        }
    });
}
