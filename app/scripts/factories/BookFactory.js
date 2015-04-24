'use strict';

angular
    .module('whatshouldiApp')
    .factory('BookFactory', ['$http', '$window', 'ServerUrl', '$location', function($http, $window, ServerUrl, $location){
            var book = {};
            var books = [];

            var getBookDetails = function(googleId){
                angular.copy({}, book);

                return $http.get("https://www.googleapis.com/books/v1/volumes/" + googleId).success(function(response){
                    angular.copy(response, book);
                    _sendToRails();
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }

            var getBooks = function() {
                angular.copy([], books);

                return $http.get(ServerUrl + '/books').success(function(response){
                    angular.copy(response, books);
                    setTimeout(fixHeights, 1000);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            var _sendToRails = function () {
                return $http.post(ServerUrl + '/books', {google_id: book.id, title: book.volumeInfo.title, thumbnail: book.volumeInfo.imageLinks.small || book.volumeInfo.imageLinks.thumbnail});
            }

            var fixHeights = function(){
                var first = $('.main-page-poster:first');
                var books = $('.main-page-book');
                books.each(function(index, element){
                    $(element).height(first.height());
                })
            };

            return {
                book: book,
                books: books,
                getBookDetails: getBookDetails,
                getBooks: getBooks,
                fixHeights: fixHeights
            };
    }]);

