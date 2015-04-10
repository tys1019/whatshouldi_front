'use strict';

angular.module('MainController').controller('TvController', tvController);

tvController.$inject = ['TvFactory', '$location', '$routeParams'];

function tvController(TvFactory, $location, $routeParams) {
    var vm = this;

    vm.shows = TvFactory.shows;

    TvFactory.getShows();
}
