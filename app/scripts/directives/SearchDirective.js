'use strict';

angular.module('MainDirective').directive('dtSearch', [function(){
    return {
        restrict: 'EA',
        templateUrl: 'views/search-results.html',
        controller: 'SearchController',
        controllerAs: 'searchController',
        bindToController: true
    };
}]);
