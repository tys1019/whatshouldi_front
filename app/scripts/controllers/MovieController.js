'use strict';

angular.module('MainController').controller('MovieController', movieController);

movieController.$inject = ['MovieFactory', '$location', '$routeParams'];

function movieController(MovieFactory, $location, $routeParams) {
    var vm = this;

    vm.movies = MovieFactory.movies;

}
