'use strict';

angular.module('MainController').controller('PlaylistController', playlistController);

playlistController.$inject = ['PlaylistFactory', '$location', '$routeParams'];

function playlistController(PlaylistFactory, $location, $routeParams, trustUrl) {
    var vm = this;

    vm.playlist = PlaylistFactory.playlist;

    PlaylistFactory.getPlaylist($routeParams.playlistId);


}
