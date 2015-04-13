'use strict';

angular.module('MainController').controller('MovieDetailsController', movieDetailsController);

movieDetailsController.$inject = ['MovieFactory', '$location', '$routeParams', '$window', 'PlaylistFactory', 'AuthFactory', '$scope'];

function movieDetailsController(MovieFactory, $location, $routeParams, $window, PlaylistFactory, AuthFactory, $scope) {
    var vm = this;

    vm.movie = MovieFactory.movie;

    vm.isAuthenticated = function(){
        return AuthFactory.isAuthenticated();
    };


    vm.updatePlaylist = function(){
        var user = JSON.parse($window.localStorage.getItem('ga-user'));
        PlaylistFactory.updatePlaylist(user, this.movie);
    };


    vm.isInPlaylist = function(){

        if (AuthFactory.isAuthenticated() && PlaylistFactory.isInPlaylist(vm.movie)) {
            return true;
        } else {
            return false;
        }
    };

    vm.hasStreamingLinks = function(){
        if (!vm.movie.title || vm.movie.subscription_web_sources.length === 0 && !vm.movie.netflixLink) {
            return false;
        } else {
            return true;
        }
    };

    vm.hasPurchaseLinks = function(){
        if (!vm.movie.title || vm.movie.purchase_web_sources.length === 0) {
            return false;
        } else {
            return true;
        }

    };

    vm.hasFreeLinks = function(){
        if (!vm.movie.title || vm.movie.free_web_sources.length === 0) {
            return false;
        } else {
            return true;
        }
    };


    vm.getMovieRatings = function(){
        if (!vm.movie.rt_ratings) {
            MovieFactory.getMovieRatings(vm.movie.rottentomatoes_id);
        };
    };

    vm.getMovieReviews = function(){
        if (!vm.movie.rt_reviews) {
            MovieFactory.getMovieReviews(vm.movie.rottentomatoes_id);
        };
    };

    vm.getNetflixLink = function() {
        MovieFactory.getNetflixLink(vm.movie);
    };

    vm.getRelatedMovies = function(){
        if (!vm.movie.related) {
            MovieFactory.getRelatedMovies(vm.movie.imdb_id);
        };
    };



    MovieFactory.getMovieDetails($routeParams.guideboxId).then(vm.getMovieRatings).then(vm.getMovieReviews).then(vm.getNetflixLink);
// .then(vm.getRelatedMovies)
    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $('.navbar-toggle').click();
        }
    });
}
