angular.module('athena', [
    'athena.autoComplete',
    'athena.menuSelector',
    'athena.templates'
]);

angular.module('athena.templates', []);

/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete', [])
    .component('autoComplete', {
        templateUrl: 'auto-complete.view.html',
        controller: 'AutoCompleteCtrl',
        controllerAs: 'complete',
        bindings: {
            key: '@',
            type: '@',
            placeholder: '@',
            itemList: '=',
            selectedItem: '='
        }
    });


/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .controller('AutoCompleteCtrl', AutoCompleteCtrl);

AutoCompleteCtrl.$inject = ['$scope'];

function AutoCompleteCtrl($scope) {
    var vm = this;

    vm.keywords = null;
    vm.isPopup = false;

    vm.query = query;

    $scope.$on('get_auto_complete_item', function(event, args) {
        vm.keywords = args[vm.key];
    })

    vm.$onInit = function() {
    };

    function query() {
        var keywords = vm.keywords;
        if(keywords) {
            $scope.$emit('get_complete_keywords', keywords);
        }
        vm.isPopup = keywords ? true : false;
    }
}

/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector', [])
    .component('menuSelector',{
        templateUrl: 'menu-selector.view.html',
        controller: 'MenuSelector',
        controllerAs: 'menu',
        bindings: {
            menuList: '<',
            placeholder: '@'
        }
    });

/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector')
    .controller('MenuSelector', MenuSelector);

MenuSelector.$inject = [];

function MenuSelector() {
    var vm = this;

    vm.selectedMenu = [];
    vm.isShow = false;

    vm.selectMenu = selectMenu;
    vm.showSelectedMenu = showSelectedMenu;
    vm.hoverSelectMenu = hoverSelectMenu;

    init();

    function init() {

    }

    function selectMenu(menuList1, menuList2, menuList3) {
        if(menuList3 && menuList2) {
            vm.selectedMenu = [menuList1, menuList2, menuList3];
            vm.isShow = false;
        } else if(!menuList3 && menuList2 && menuList2.children.length === 0) {
            vm.selectedMenu = [menuList1, menuList2];
            vm.isShow = false;
        } else if(!menuList3 && !menuList2 && menuList1.children.length === 0) {
            vm.selectedMenu = [menuList1];
            vm.isShow = false;
        }
        $scope.$emit('get_selected_menu', vm.selectedMenu);
    }

    function showSelectedMenu() {
        vm.isShow = !vm.isShow;
        vm.menuList1 = vm.selectedMenu[0];
        vm.menuList2 = vm.selectedMenu[1];
        vm.menuList3 = vm.selectedMenu[2];
    }

    function hoverSelectMenu(item) {
        switch(item.level) {
            case 1:
                vm.menuList1 = item;
                break;
            case 2:
                vm.menuList2 = item;
                break;
            case 3:
                vm.menuList3 = item;
                break;
        }
    }    
}

/**
 * 多级菜单过滤器
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector')
    .filter('menuSelector', menuSelector);

menuSelector.$inject = [];

function menuSelector() {
    return function(input) {
        if(input) {
            if(input[2]) {
                return input[0].name + ' > ' + input[1].name + ' > ' + input[2].name;
            } else if(input[1] && input[1].children.length === 0) {
                return input[0].name + ' > ' + input[1].name;
            } else if(input[0] && input[0].children.length === 0) {
                return input[0].name;
            }
        }            
    };
}

/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .component('autoCompleteItem', {
        //templateUrl: function (element, attrs) {
        //    console.log(999,    element.type);
        //    return attrs.templateUrl || 'views/components/cs-auto-complete-' + attrs.type + '.view.html';
        //},
        template: '<div ng-include="getTemplate()"></div>',
        controller: 'AutoCompleteItemCtrl',
        controllerAs: 'complete',
        bindings: {
            type: '<',
            itemList: '=',
            selectedItem: '=',
            isPopup: '='
        }
    });


/**
 * @author changye@thinkerx.com
 */
angular
    .module('athena.autoComplete')
    .controller('AutoCompleteItemCtrl', AutoCompleteItemCtrl);

AutoCompleteItemCtrl.$inject = ['$scope'];

function AutoCompleteItemCtrl($scope) {
    var vm = this;

    vm.selectResult = selectResult;

    $scope.getTemplate = function () {
        return 'auto-complete-' + vm.type +  '.view.html';
    };

    function selectResult(item) {
        vm.selectedItem = item;
        $scope.$emit('get_auto_complete_item', item);
        vm.isPopup = false;
    }

}
