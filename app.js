(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
// .provider('ShoppingList', ShoppingListProvider)
// .config(Config);

// Config.$inject = ['ShoppingListProvider'];
// function Config(ShoppingListProvider) {
//   ShoppingListProvider.defaults.maxItems = 5;
// }

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.items = ShoppingListCheckOffService.getItems1();

  list1.itemName = "";
  list1.itemQuantity = "";


  list1.removeItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.removeItem(itemIndex);
    } catch (error) {
      list1.errorMessage = error.message;
    }

  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items = ShoppingListCheckOffService.getItems2();

  // list2.itemName = "";
  // list2.itemQuantity = "";
  //
  // list2.addItem = function () {
  //   try {
  //     ShoppingListCheckOffService.addItem(list2.itemName, list2.itemQuantity);
  //   } catch (error) {
  //     list2.errorMessage = error.message;
  //   }
  // };


}


// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items1 = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "Bread",
      quantity: "18"
    }
  ];
var items2 = [];


  service.addItem = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items2.push(item);
  };

  service.removeItem = function (itemIndex) {

    var item = {
       name: items1[itemIndex].name,
       quantity: items1[itemIndex].quantity
     };
     items1.splice(itemIndex, 1);
     try {
         items2.push(item);
     } catch (e) {
       service.errorMessage = e.message;

     } finally {

     }



  };

  service.getItems1 = function () {
    return items1;
  };
  service.getItems2 = function () {
    return items2;
  };

}


})();
