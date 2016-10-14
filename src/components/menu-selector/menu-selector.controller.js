/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector')
    .controller('MenuSelector', MenuSelector);

MenuSelector.$inject = ['$scope', '$timeout'];

function MenuSelector($scope, $timeout) {
    var vm = this;

    vm.selectedMenu = [];
    vm.isShow = false;

    vm.selectMenu = selectMenu;
    vm.showSelectedMenu = showSelectedMenu;
    vm.hoverSelectMenu = hoverSelectMenu;

    function selectMenu(menuList1, menuList2, menuList3) {
        if(menuList3 && menuList2 && vm.level === 3) {
            vm.selectedMenu = [menuList1, menuList2, menuList3];
            vm.isShow = false;
        } else if((!menuList3 && menuList2 && menuList2.children.length === 0) || (vm.level === 2 && menuList2)) {
            vm.selectedMenu = [menuList1, menuList2];
            vm.isShow = false;
        } else if((!menuList3 && !menuList2 && menuList1.children.length === 0) || vm.level === 1) {
            vm.selectedMenu = [menuList1];
            vm.isShow = false;
        }
        $scope.$emit('get_selected_menu', vm.selectedMenu);
    }

    function showSelectedMenu() {
        vm.isShow = !vm.isShow;
        if(vm.selectedMenu) {
            vm.menuList1 = vm.selectedMenu[0];
            vm.menuList2 = vm.selectedMenu[1];
            vm.menuList3 = vm.selectedMenu[2];
        }
    }

    function hoverSelectMenu(item, $event) {
        /*
         * position
         */
        var className = $event.currentTarget.parentNode.className;
        if(new RegExp('level-1').test(className)) {
            $timeout(function() {
                $('.level-2').css({
                    'margin-top': $event.currentTarget.offsetTop-6
                });
            });
        }
        if(new RegExp('level-2').test(className)) {
            $timeout(function() {
                $('.level-3').css({
                    'margin-top': $event.currentTarget.offsetTop-6
                });
            });
        }
    }
}
