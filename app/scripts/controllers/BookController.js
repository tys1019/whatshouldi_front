'use strict';

angular.module('MainController').controller('BookController', bookController);

bookController.$inject = ['BookFactory', '$location', '$routeParams'];

function bookController(BookFactory, $location, $routeParams) {
    var vm = this;

    vm.books = BookFactory.books;




    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

    $(window).resize(BookFactory.fixHeights);

    BookFactory.getBooks();

}
