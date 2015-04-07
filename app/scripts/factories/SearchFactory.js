'use strict';

angular
    .module('whatshouldiApp')
    .factory('SearchFactory', ['$http', '$window', 'ServerUrl', '$location', function($http, $window, ServerUrl, $location){
            var results = [];

            var search = function(search_params) {
                $http.post(ServerUrl + '/search', search_params).success(function(response){
                    angular.copy(response.results, results);
                }).error(function(data,status,headers,config){
                    console.log('Youre doing it wrong ' + data, status, headers, config);
                });
            }

            return {
                results: results,
                search: search
            };
    }]);
