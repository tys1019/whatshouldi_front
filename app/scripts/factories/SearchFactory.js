'use strict';

angular
    .module('whatshouldiApp')
    .factory('SearchFactory', ['$http', '$window', 'ServerUrl', '$location', function($http, $window, ServerUrl, $location){
            var results = [];
            var tvResults = [];
            var bookResults = [];

            var search = function(search_params) {
                return $http.post(ServerUrl + '/search', search_params).success(function(response){
                    if (response.search_params.media_type === "TV") {
                        angular.copy(response.results, tvResults);
                        $location.path('/search/tv');
                    } else {
                        angular.copy(response.results, results);
                        $location.path('/search/');
                    };
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            var bookSearch = function(search_query) {
                return $http.get("https://www.googleapis.com/books/v1/volumes?q=" + search_query).success(function(response){
                    angular.copy(response.items, bookResults);
                    $location.path('/search/books');
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            };

            return {
                results: results,
                search: search,
                bookSearch: bookSearch,
                bookResults: bookResults,
                tvResults: tvResults
            };
    }]);
