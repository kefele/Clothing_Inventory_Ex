// "use strict"
// const accessories = {

// }

// angular.module("App").component("accessories", accessories);

"use strict"
const accessories = {
    //when called displays button that retrieves the accessories array info and displays it using a ng-repeat on a list-line in a unordered-list
    //inputs stored using ngmodel and used for update and adding to array objects
    //button to add to array of objects using ngsubmit
    //button to delete and button to edit each accessory
    template: `
    <button ng-click="$ctrl.getAccessories();">Get Accessories</button>
    <form ng-submit="$ctrl.postAccessory($ctrl.newAccess);">
      <input type="text" ng-model="$ctrl.newAccess.type" placeholder="Type">
      <input type="text" ng-model="$ctrl.newAccess.size" placeholder="Size">
      <input type="text" ng-model="$ctrl.newAccess.price" placeholder="Price">
      <button>Add Accessory</button>
    </form>
    <ul>
    <li ng-repeat="accessory in $ctrl.accessoriesList track by $index">
        <p> Type:{{ accessory.type }}</p>
        <p> Size:{{ accessory.size }}</p>
        <p> Price:{{ accessory.price }}</p>
        <button ng-click="$ctrl.updateAccessory($ctrl.accessoriesList[$index].id, $ctrl.newAccess);">Update</button>
      <button ng-click="$ctrl.deleteAccessory(accessory.id);">X</button>
    
    </li>

    </ul>
    `,

    controller: function($http) {
        const vm = this;
        //function that uses url to access accessories and Get array and then returns accessories
        vm.getAccessories = () => {
            $http({
                url: "/api/shop/accessories",
                method: "GET"
            }).then((response) => {
                vm.accessoriesList = response.data;
            });
        };
         //function that uses url to access accessories and Put updated data in array and then returns accessories
        vm.updateAccessory = (index, newAccess) => {
            $http({
                url: "/api/shop/accessories/" + index,
                method: "PUT",
                data: newAccess
            }).then((response) => {
                vm.accessoriesList = response.data;
            });
        };
         //function that uses url to access accessories and Delete item in array and then returns accessories
        vm.deleteAccessory = (index) => {
            $http({
                url: "/api/shop/accessories/" + index,
                method: "DELETE"
            }).then((response) => {
                vm.accessoriesList = response.data;
            });
        };

        // vm.updateAccessory = (index, newAccess) => {
        //     $http({
        //         url: "/api/shop/accessories/" + index,
        //         method: "PUT",
        //         data: newAccess
        //     }).then((response) => {
        //         vm.accessoriesList = response.data;
        //     });
        // };
         //function that uses url to access accessories and Post new item in array and then returns accessories
        vm.postAccessory = (newAccess) => {
            $http({
                url: "/api/shop/accessories/",
                method: "POST",
                data: newAccess
            }).then((response) => {
                vm.accessoriesList = response.data;
            });
        };
    }


}
//component setup complete
angular
.module("App")
.component("accessories", accessories);