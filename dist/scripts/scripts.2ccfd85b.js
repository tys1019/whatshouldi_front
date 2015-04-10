"use strict";function loginController(a,b,c,d,e){var f=this;f.$modalInstance=c,f.hasErrors=!1,f.login=function(a){b.login(a).success(function(a){f.$modalInstance.close(a),f.credentials={},d.getPlaylist(b.user.playlist_id)}).error(function(){f.hasErrors=!0})}}function navbarController(a,b,c){var d=this;d.user=a.user,d.logout=function(){a.logout().then(function(){c.path("/")})},d.search=function(){b.search(d.search_params).then(function(a){d.$modalInstance.close(a)})},d.isLoggedIn=function(){return a.isAuthenticated()}}function signUpController(a,b,c,d,e){var f=this;f.$modalInstance=c,f.signUp=function(a){b.signUp(a).success(function(a){f.$modalInstance.close(a),f.credentials={},d.getPlaylistByUser(b.user)})}}function movieController(a,b,c){var d=this;d.movies=a.movies,a.getMovies()}function searchController(a,b,c){var d=this;d.results=a.results,d.search_params={media_type:"Movie"},c&&(d.$modalInstance=c),d.search=function(){a.search(d.search_params).then(function(a){d.$modalInstance.close(a)})},$(".main-content").on("click",function(){$("#navbar-collapse-1").hasClass("in")&&$(".navbar-toggle").click()})}function searchResultsController(a,b){var c=this;c.results=a.results,$(".main-content").on("click",function(){$("#navbar-collapse-1").hasClass("in")&&$(".navbar-toggle").click()})}function movieDetailsController(a,b,c,d,e,f,g){var h=this;h.movie=a.movie,h.isAuthenticated=function(){return f.isAuthenticated()},h.updatePlaylist=function(){var a=JSON.parse(d.localStorage.getItem("ga-user"));e.updatePlaylist(a,this.movie)},h.isInPlaylist=function(){return f.isAuthenticated()&&e.isInPlaylist(h.movie)?!0:!1},h.hasStreamingLinks=function(){return!h.movie.title||0===h.movie.subscription_web_sources.length&&!h.movie.netflixLink?!1:!0},h.hasPurchaseLinks=function(){return h.movie.title&&0!==h.movie.purchase_web_sources.length?!0:!1},h.hasFreeLinks=function(){return h.movie.title&&0!==h.movie.free_web_sources.length?!0:!1},h.getMovieRatings=function(){h.movie.rt_ratings||a.getMovieRatings(h.movie.rottentomatoes_id)},h.getMovieReviews=function(){h.movie.rt_reviews||a.getMovieReviews(h.movie.rottentomatoes_id)},h.getNetflixLink=function(){a.getNetflixLink(h.movie)},a.getMovieDetails(c.guideboxId).then(h.getMovieRatings).then(h.getMovieReviews).then(h.getNetflixLink),$(".main-content").on("click",function(){$("#navbar-collapse-1").hasClass("in")&&$(".navbar-toggle").click()})}function modalController(a){var b=this;b.openLogin=function(){a.open({templateUrl:"views/login-form.html",controller:"LoginController as loginController"})},b.openSignUp=function(){a.open({templateUrl:"views/sign-up-form.html",controller:"SignUpController as signUpController"})},b.openSearch=function(){a.open({templateUrl:"views/search-form.html",controller:"SearchController as searchController"})}}function playlistController(a,b,c,d){var e=this;e.playlist=a.playlist,a.getPlaylist(c.playlistId),$(".main-content").on("click",function(){$("#navbar-collapse-1").hasClass("in")&&$(".navbar-toggle").click()})}angular.module("whatshouldiApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","MainController","MainDirective","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MovieController",controllerAs:"movieController"}).when("/movie/:guideboxId",{templateUrl:"views/movie-details.html",controller:"MovieDetailsController",controllerAs:"movieDetailsController"}).when("/playlists/:playlistId",{templateUrl:"views/playlist.html",controller:"PlaylistController",controllerAs:"playlistController"}).when("/search",{templateUrl:"views/search-results.html",controller:"SearchResultsController",controllerAs:"searchResultsController"}).otherwise({redirectTo:"/"})}]).filter("trustUrl",["$sce",function(a){return function(b){return a.trustAsResourceUrl(b)}}]).run(["MovieFactory","AuthFactory","PlaylistFactory","$rootScope","$timeout","$window",function(a,b,c,d,e,f){a.getMovies(),b.user.playlist_id&&c.getPlaylist(b.user.playlist_id)}]),angular.module("whatshouldiApp").constant("ServerUrl","https://whatshouldi-api.herokuapp.com"),angular.module("whatshouldiApp").factory("AuthFactory",["$http","$window","ServerUrl","PlaylistFactory",function(a,b,c){var d=JSON.parse(b.localStorage.getItem("ga-user"))||{},e=function(b,e){return a.post(c+"/login",b).success(function(a){i(a),angular.copy(a,d)})},f=function(){return a.get(c+"/logout").success(function(){b.localStorage.removeItem("ga-user"),b.localStorage.removeItem("ga-playlist"),d={}})},g=function(b){return a.post(c+"/sign-up",b).success(function(a){i(a)})},h=function(){var a=JSON.parse(b.localStorage.getItem("ga-user"));return a?!!a.token:!1},i=function(c){b.localStorage.setItem("ga-user",JSON.stringify(c)),a.defaults.headers.common.Authorization="Token token="+c.token};return{user:d,login:e,signUp:g,logout:f,isAuthenticated:h}}]),angular.module("whatshouldiApp").factory("MovieFactory",["$http","$window","ServerUrl",function(a,b,c){var d=[],e={},f=function(){angular.copy([],d),a.get(c+"/movies").success(function(a){angular.copy(a,d)}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})},g=function(b){return angular.copy({},e),a.post(c+"/search",{guidebox_id:b,media_type:"Movie"}).success(function(a){angular.copy(a.movie,e),k()}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})},h=function(b){return a.post(c+"/search",{rottentomatoes_id:b,search_type:"rt_ratings"}).success(function(a){e.rt_ratings=JSON.parse(a.movie.rt_ratings)}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})},i=function(b){return a.post(c+"/search",{rottentomatoes_id:b,search_type:"rt_reviews"}).success(function(a){e.rt_reviews=JSON.parse(a.movie.rt_reviews)}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})},j=function(b){return a.get("http://netflixroulette.net/api/api.php?title="+b.title).success(function(a){b.netflixLink="http://www.netflix.com/WiMovie/"+a.show_id}).error(function(a,c,d,e){b.netflixLink="http://dvd.netflix.com/Search?v1="+b.title+"&ac_abs_posn=-1&fcld=true&ac_rel_posn=-1&ac_category_type=none"})},k=function(){e.rt_ratings&&(e.rt_ratings=JSON.parse(e.rt_ratings)),e.rt_reviews&&(e.rt_reviews=JSON.parse(e.rt_reviews)),e.purchase_web_sources=JSON.parse(e.purchase_web_sources),e.subscription_web_sources=JSON.parse(e.subscription_web_sources),e.free_web_sources=JSON.parse(e.free_web_sources)};return{movies:d,movie:e,getMovies:f,getMovieDetails:g,getMovieRatings:h,getMovieReviews:i,getNetflixLink:j}}]),angular.module("whatshouldiApp").factory("SearchFactory",["$http","$window","ServerUrl","$location",function(a,b,c,d){var e=[],f=function(b){return a.post(c+"/search",b).success(function(a){angular.copy(a.results,e),d.path("/search")}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})};return{results:e,search:f}}]),angular.module("whatshouldiApp").factory("PlaylistFactory",["$http","$window","ServerUrl","$routeParams","MovieFactory",function(a,b,c,d,e){var f=[],g=JSON.parse(b.localStorage.getItem("ga-playlist"))||{},h=(e.movie,function(b){a.get(c+"/playlists/"+b).success(function(a){angular.copy(a,g),l(a)}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})}),i=function(b){a.get(c+"/users/"+b.id).success(function(a){angular.copy(a,g),l(a)}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})},j=function(b,d){var e={user:b,movie:d};a.put(c+"/playlists/"+b.playlist_id,e).success(function(a){angular.copy(a,g)}).error(function(a,b,c,d){console.log("Youre doing it wrong "+a,b,c,d)})},k=function(a){return g.movies?g.movies.some(function(b){return b.guidebox_id===a.guidebox_id}):!1},l=function(a){b.localStorage.setItem("ga-playlist",JSON.stringify(a))};return{playlists:f,playlist:g,getPlaylist:h,updatePlaylist:j,isInPlaylist:k,getPlaylistByUser:i}}]),angular.module("MainController",[]),angular.module("MainController").controller("LoginController",loginController),loginController.$inject=["$location","AuthFactory","$modalInstance","PlaylistFactory","$route"],angular.module("MainController").controller("NavbarController",navbarController),navbarController.$inject=["AuthFactory","SearchFactory","$location"],angular.module("MainController").controller("SignUpController",signUpController),signUpController.$inject=["$location","AuthFactory","$modalInstance","PlaylistFactory","$route"],angular.module("MainController").controller("MovieController",movieController),movieController.$inject=["MovieFactory","$location","$routeParams"],angular.module("MainController").controller("SearchController",searchController),searchController.$inject=["SearchFactory","$location","$modalInstance"],angular.module("MainController").controller("SearchResultsController",searchResultsController),searchResultsController.$inject=["SearchFactory","$location"],angular.module("MainController").controller("MovieDetailsController",movieDetailsController),movieDetailsController.$inject=["MovieFactory","$location","$routeParams","$window","PlaylistFactory","AuthFactory","$scope"],angular.module("MainController").controller("ModalController",modalController),modalController.$inject=["$modal"],angular.module("MainController").controller("PlaylistController",playlistController),playlistController.$inject=["PlaylistFactory","$location","$routeParams"],angular.module("MainDirective",[]),angular.module("MainDirective").directive("loginForm",[function(){return{restrict:"E",templateUrl:"views/login-form.html",controller:"LoginController",controllerAs:"loginController",bindToController:!0}}]),angular.module("MainDirective").directive("signUpForm",[function(){return{restrict:"E",templateUrl:"views/sign-up-form.html",controller:"SignUpController",controllerAs:"signUpController",bindToController:!0}}]),angular.module("MainDirective").directive("dtSearch",[function(){return{restrict:"EA",templateUrl:"views/search-results.html",controller:"SearchController",controllerAs:"searchController",bindToController:!0}}]),angular.module("MainDirective").directive("selectpicker",["$parse",function(a){return{restrict:"A",link:function(b,c,d){c.selectpicker(a(d.selectpicker)()),c.selectpicker("refresh"),b.$watch(d.ngModel,function(a,e){b.$parent[d.ngModel]=a,b.$evalAsync(function(){(!d.ngOptions||/track by/.test(d.ngOptions))&&c.val(a),c.selectpicker("refresh")})}),b.$on("$destroy",function(){b.$evalAsync(function(){c.selectpicker("destroy")})})}}}]);