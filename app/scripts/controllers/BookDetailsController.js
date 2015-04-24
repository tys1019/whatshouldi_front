'use strict';

angular.module('MainController').controller('BookDetailsController', bookDetailsController);

bookDetailsController.$inject = ['BookFactory', '$location', '$routeParams'];

function bookDetailsController(BookFactory, $location, $routeParams) {
    var vm = this;

    vm.book = BookFactory.book;

    BookFactory.getBookDetails($routeParams.googleId);

    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

}
