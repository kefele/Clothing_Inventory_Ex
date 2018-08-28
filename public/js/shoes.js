"use strict"

// create shoes module
const shoes = {
    //when called displays button that retrieves the shoe array info and displays it using a ng-repeat on a list-line in a unordered-list
    //inputs stored using ngmodel and used for update and adding to array objects
    //button to add to array of objects using ngsubmit
    //button to delete and button to edit each shoe
    template: `
    <button ng-click="$ctrl.getShoes();">Get Shoes</button>
    <form ng-submit="$ctrl.postShoe($ctrl.newShoe);">
      <input type="text" ng-model="$ctrl.newShoe.brand" placeholder="Brand">
      <input type="text" ng-model="$ctrl.newShoe.size" placeholder="Size">
      <input type="text" ng-model="$ctrl.newShoe.color" placeholder="Color">
      <input type="text" ng-model="$ctrl.newShoe.price" placeholder="Price">
      <button>Add Shoe</button>
    </form>
    <ul>
    <li ng-repeat="shoe in $ctrl.shoeList track by $index">
    <p>Brand: {{ shoe.brand }}</p>
    <p>Size: {{ shoe.size }}</p>
    <p>Color(s): {{ shoe.color[0] }}, {{ shoe.color[1] }}, {{ shoe.color[2] }}</p>
    <p>Price: {{ shoe.price }}</p>
    
    <button ng-click="$ctrl.updateShoe($ctrl.shoeList[$index].id, $ctrl.newShoe);">Update</button>
    
      <button ng-click="$ctrl.deleteShoe(shoe.id);">X</button>
    </li>
    </ul>
    
  `,
    controller: function($http) {
        const vm = this;
        //function that uses url to access shoes and Get array and then returns shoes
        vm.getShoes = () => {
            $http({
                url: "/api/shop/shoes",
                method: "GET"
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
          //function that uses url to access shoes and Delete item in array and then returns shoes
        vm.deleteShoe = (index) => {
            $http({
                url: "/api/shop/shoes/" + index,
                method: "DELETE"
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
        //function that uses url to access shoes and Put updated data in array and then returns shoes
        vm.updateShoe = (index, newShoe) => {
            $http({
                url: "/api/shop/shoes/" + index,
                method: "PUT",
                data: newShoe
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
         //function that uses url to access shoes and Post new item in array and then returns shoes
        vm.postShoe = (newShoe) => {
            $http({
                url: "/api/shop/shoes/",
                method: "POST",
                data: newShoe
            }).then((response) => {
                vm.shoeList = response.data;
            });
        };
    }
}
//component setup complete
angular
    .module("App")
    .component("shoes", shoes);