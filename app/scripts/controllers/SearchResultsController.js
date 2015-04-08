'use strict';

angular.module('MainController').controller('SearchResultsController', searchResultsController);

searchResultsController.$inject = ['SearchFactory', '$location'];

function searchResultsController(SearchFactory, $location) {
    var vm = this;

    vm.results = SearchFactory.results;

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

}
