'use strict';

angular.module('MainController').controller('MovieDetailsController', movieDetailsController);

movieDetailsController.$inject = ['MovieFactory', '$location', '$routeParams', '$window', 'PlaylistFactory', 'AuthFactory'];

function movieDetailsController(MovieFactory, $location, $routeParams, $window, PlaylistFactory, AuthFactory) {
    var vm = this;

    vm.movie = MovieFactory.movie;

    vm.isAuthenticated = function(){
        return AuthFactory.isAuthenticated()
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


    vm.getRatings = function(){

    }

    var getReviews = function(){

    }

    MovieFactory.getMovieDetails($routeParams.guideboxId);

}
