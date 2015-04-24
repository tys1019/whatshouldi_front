'use strict';

angular.module('MainController').controller('BookSearchResultsController', bookSearchResultsController);

bookSearchResultsController.$inject = ['SearchFactory', '$location'];

function bookSearchResultsController(SearchFactory, $location) {
    var vm = this;

    vm.results = SearchFactory.bookResults;

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

}
