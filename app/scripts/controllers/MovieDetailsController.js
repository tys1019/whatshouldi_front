'use strict';

angular.module('MainController').controller('MovieDetailsController', movieDetailsController);

movieDetailsController.$inject = ['MovieFactory', '$location', '$routeParams', '$window', 'PlaylistFactory'];

function movieDetailsController(MovieFactory, $location, $routeParams, $window, PlaylistFactory) {
    var vm = this;

    vm.movie = MovieFactory.movie;


    vm.updatePlaylist = function(){
        var user = JSON.parse($window.localStorage.getItem('ga-user'));
        PlaylistFactory.updatePlaylist(user, this.movie);
    };


    // vm.isInPlaylist = function(){
    //     var playlist = PlaylistFactory.playlist;
    //     var movie = this.movie;
    //     debugger
    //     return playlist.movies.some(function(m){return m.guidebox_id === movie.guidebox_id});
    // };

    vm.getRatings = function(){

    }

    var getReviews = function(){

    }

    MovieFactory.getMovieDetails($routeParams.guideboxId);

}
