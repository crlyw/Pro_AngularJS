angular.module("exampleApp", ["increment", "ngResource", "ngRoute"])
    .constant("baseUrl", "http://localhost:5500/products/")
    .config(function($routeProvider, $locationProvider){
        
        $locationProvider.html5Mode(true);
        
        $routeProvider.when("/list",{
            templateUrl: "/Chapter22/tableView.html"
        });
        
        $routeProvider.when("/edit/:id",{
            templateUrl: "/Chapter22/editorView.html"
        });
        
        $routeProvider.when("/edit/:id/:data*", {
            templateUrl: "/Chapter22/editorView.html" 
        });
    
        $routeProvider.when("/create", {
            templateUrl: "/Chapter22/editorView.html" 
        });
    
        $routeProvider.otherwise({
            templateUrl: "/Chapter22/tableView.html" 
        });
    })
    .controller("defaultCtrl", function($scope, $http, $resource, $location, $route, $routeParams, baseUrl){
        
        //$scope.displayMode = "list";
        $scope.currentProduct = null;
    
        $scope.$on("$routeChangeSuccess", function(){
            if($location.path().indexOf("/edit/") > -1){
                var id = $routeParams["id"];
                for(var i=0; i<$scope.products.length; i++){
                    if($scope.products[i].id == id){
                        $scope.currentProduct = $scope.products[i];
                        break;
                    }
                }
            } 
        });
    
        $scope.productsResource = $resource(baseUrl + ":id", {id: "@id"});
        
        $scope.listProducts = function(){
            $scope.products = $scope.productsResource.query();
        }
        
        $scope.deleteProduct = function(product){
            product.$delete().then(function(){
                $scope.products.splice($scope.products.indexOf(product), 1);
            });
            //$scope.displayMode = "list";
            $location.path("/list");
        }
        
        $scope.createProduct = function(product){
            new $scope.productsResource(product).$save().then(function(newProduct){
                $scope.products.push(newProduct);
                //$scope.displayMode = "list";
                $location.path("/list");
            });
        }
        
        $scope.updateProduct = function(product){
            product.$save();
            //$scope.displayMode = "list";
            $location.path("/list");
        }
        
        /*$scope.editOrCreateProduct = function(product){
            $scope.currentProduct = product ? product :{};
            //$scope.displayMode = "edit";
            $location.path("/edit");
        }*/
        $scope.editProduct = function(product){
            $scope.currentProduct = product;
            $location.path("/edit");
        }
        
        $scope.saveEdit = function(product){
            if(angular.isDefined(product.id)){
                $scope.updateProduct(product);
            }else{
                $scope.createProduct(product);
            }
        }
        
        $scope.cancelEdit = function(){
            if($scope.currentProduct && $scope.currentProduct.$get){
                $scope.currentProduct.$get();
            }
            $scope.currentProduct = {};
            //$scope.displayMode = "list";
            $location.path("/list");
        }
        
        $scope.listProducts();
    })