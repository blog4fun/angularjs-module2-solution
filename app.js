(function () {
    'use strict';

    angular.module('ShoppingListCheckoff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckoffService', ShoppingListCheckoffService);


    ToBuyController.$inject = ['ShoppingListCheckoffService'];
    function ToBuyController(ShoppingListCheckoffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckoffService.getBuyItems();
        toBuy.isEmpty = function () {
            return toBuy.items.length === 0;
        };

        // 'Bought' button click handler.
        toBuy.boughtItem = function (idx) {
            ShoppingListCheckoffService.boughtItem(idx);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckoffService'];
    function AlreadyBoughtController(ShoppingListCheckoffService) {
        var bought = this;

        bought.items = ShoppingListCheckoffService.getBoughtItems();
        bought.nothingYet = function () {
            return bought.items.length === 0;
        }
    }

    function ShoppingListCheckoffService() {
        var service = this;

        // Pre-populated list of items to buy
        var buyList = [
            { name: 'avocados', quantity: 3 },
            { name: 'mangos', quantity: 6 },
            { name: 'bananas', quantity: 6 },
            { name: 'apples', quantity: 3 },
            { name: 'oranges', quantity: 2 }
        ];

        // List of already bought items, initially empty.
        var boughtList = [];

        service.getBuyItems = function () {
            return buyList;
        };

        service.getBoughtItems = function () {
            return boughtList;
        };

        // Remove the item from the buy-list and add it to the bought-list.
        service.boughtItem = function (idx) {
            var item = buyList[idx];
            buyList.splice(idx, 1);
            boughtList.push(item);
        };
    }

})();