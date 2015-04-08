'use strict';

angular.module('MainController').controller('SearchController', searchController);

searchController.$inject = ['SearchFactory', '$location', '$modalInstance'];

function searchController(SearchFactory, $location, $modalInstance) {
    var vm = this;

    vm.results = SearchFactory.results;

    if ($modalInstance) vm.$modalInstance = $modalInstance;

    vm.search = function(){
        SearchFactory.search(vm.search_params).then(function(response){
            vm.$modalInstance.close(response);
        });
    };



    $('.main-content').on('click', function(){
        if ($('#navbar-collapse-1').hasClass('in')) {
            $(".navbar-toggle").click();
        }
    });

}
