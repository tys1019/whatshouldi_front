'use strict';

angular.module('MainController').controller('TvSearchResultsController', tvSearchResultsController);

tvSearchResultsController.$inject = ['SearchFactory', '$location'];

function tvSearchResultsController(SearchFactory, $location) {
    var vm = this;

    vm.results = SearchFactory.tvResults;

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

}
