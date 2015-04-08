'use strict';

angular.module('MainController').controller('SearchController', searchController);

searchController.$inject = ['SearchFactory', '$location'];

function searchController(SearchFactory, $location) {
    var vm = this;

    vm.results = SearchFactory.results;
    vm.displayResults = false;

    vm.toggleDisplayResults = function(){
        vm.displayResults = !vm.displayResults;
        console.log(vm.displayResults);
    };

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

}
