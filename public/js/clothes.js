"use strict"
const clothes = {
    //when called displays button that retrieves the clothes array info and displays it using a ng-repeat on a list-line in a unordered-list
    //inputs stored using ngmodel and used for update and adding to array objects
    //button to add to array of objects using ngsubmit
    //button to delete and button to edit each shoe
    template: `
    
    <button ng-click="$ctrl.getClothes();">Get Clothes</button>
    <form ng-submit="$ctrl.postClothing($ctrl.newClothing);">
      <input type="text" ng-model="$ctrl.newClothing.type" placeholder="Type">
      <input type="text" ng-model="$ctrl.newClothing.size" placeholder="Size">
      <input type="text" ng-model="$ctrl.newClothing.gender" placeholder="Gender">
      <input type="text" ng-model="$ctrl.newClothing.color" placeholder="Color">
      <button>Add Clothing</button>
    </form>
    <ul>
    <li ng-repeat="clothing in $ctrl.clothingList track by $index">
        <p>Type: {{ clothing.type }}<p/>
        <p>Size: {{ clothing.size }}<p/>
        <p>Gender: {{ clothing.gender }}<p/>
        <p>Color(s): {{ clothing.color[0] }}, {{ clothing.color[1] }}, {{ clothing.color[2] }} <p/>
        <p>Price: {{ clothing.price }}</p>
        
      <button ng-click="$ctrl.deleteClothing(clothing.id);">X</button>
      <button ng-click="$ctrl.updateClothing($ctrl.clothingList[$index].id, $ctrl.newClothing);">Edit</button>
      
    </li>
    </ul>
  
  `,
    controller: function($http) {
        const vm = this;
         //function that uses url to access clothes and Get array and then returns clothes
        vm.getClothes = () => {
            $http({
                url: "/api/shop/clothes",
                method: "GET"
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
         //function that uses url to access clothes and Delete item in array and then returns clothes
        vm.deleteClothing = (index) => {
            $http({
                url: "/api/shop/clothes/" + index,
                method: "DELETE"
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
        //function that uses url to access clothes and Put updated data in array and then returns clothes
        vm.updateClothing = (index, newClothing) => {
            $http({
                url: "/api/shop/clothes/" + index,
                method: "PUT",
                data: newClothing
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
        //function that uses url to access clothes and Post new item in array and then returns clothes
        vm.postClothing = (newClothing) => {
            $http({
                url: "/api/shop/clothes/",
                method: "POST",
                data: newClothing
            }).then((response) => {
                vm.clothingList = response.data;
            });
        };
    }
}

//component setup complete
angular
 .module("App")
 .component("clothes", clothes);