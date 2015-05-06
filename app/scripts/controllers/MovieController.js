'use strict';

angular.module('MainController').controller('MovieController', movieController);

movieController.$inject = ['MovieFactory', '$location', '$routeParams'];

function movieController(MovieFactory, $location, $routeParams) {
    var vm = this;

    vm.movies = MovieFactory.movies;

    MovieFactory.getMovies();


    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

    $(function(){
        $(".typer").typed({
            strings: ["...", "watch?", "binge?", "read?"],
            typeSpeed: 200,
            backSpeed: 200,
            loop: true,
            backDelay: 1000,
        });
    });
}
