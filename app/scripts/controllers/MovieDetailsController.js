'use strict';

angular.module('MainController').controller('MovieDetailsController', movieDetailsController);

movieDetailsController.$inject = ['MovieFactory', '$location', '$routeParams', '$window', 'PlaylistFactory', 'AuthFactory'];

function movieDetailsController(MovieFactory, $location, $routeParams, $window, PlaylistFactory, AuthFactory) {
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


    vm.getMovieRatings = function(){
        if (!vm.movie.rt_ratings) {
            MovieFactory.getMovieRatings(vm.movie.rottentomatoes_id);
        };
    };

    vm.getMovieReviews = function(){

        if (!vm.movie.rt_reviews) {
            MovieFactory.getMovieReviews(vm.movie.rottentomatoes_id);
        };
    }

    vm.getNetflixLink = function() {
        MovieFactory.getNetflixLink(vm.movie);
    };


    MovieFactory.getMovieDetails($routeParams.guideboxId).then(vm.getMovieRatings).then(vm.getMovieReviews).then(vm.getNetflixLink);

}
