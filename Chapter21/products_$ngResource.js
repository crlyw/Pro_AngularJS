angular.module("exampleApp", ["increment", "ngResource"])
    .constant("baseUrl", "http://localhost:5500/products/")
    .controller("defaultCtrl", function($scope, $http, $resource, baseUrl){
        
        $scope.displayMode = "list";
        $scope.currentProduct = null;
    
        $scope.productsResource = $resource(baseUrl + ":id", {id: "@id"});
        
    })