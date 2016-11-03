angular.module('athena', [
    'athena.autoComplete',
    'athena.menuSelector',
    'athena.templates',
    'athena.datePicker',
    'athena.simpleTable',
    'ngSanitize'
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
            itemList: '<',
            popupOnFocus: '<',
            selectedItem: '=',
            keywords: '='
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

    //vm.keywords = vm.selectedItem ? vm.selectedItem[vm.key] : '';
    vm.isPopup = false;

    vm.showPopup = showPopup;
    vm.hidePopup = hidePopup;
    vm.change = change;
    vm.selectItem = selectItem;

    vm.$onInit = function() {
    };

    function change() {
        vm.isPopup = true;
    }

    function showPopup() {
        vm.isPopup = vm.popupOnFocus;
    }

    function hidePopup() {
        vm.isPopup = false;
    }

    function selectItem(item) {
        vm.keywords = item[vm.key];
    }
}

/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.datePicker', [])
    .component('datePicker', {
        templateUrl: 'date-picker.view.html',
        controller: 'DatePickerCtrl',
        controllerAs: 'date',
        bindings: {
            defaultDate: '<'
        }
    })
    // 1-'今天'; 2-'过去7天'; 3-'过去30天'; 4-'指定一天'; 5-'时间段'; 6-'上个月';
    .constant('DATE_PICKER_TYPE', {
        TYPE_TODAY: 1,
        TYPE_7_DAYS_AGO: 2,
        TYPE_30_DAYS_AGO: 3,
        TYPE_DATE: 4,
        TYPE_DATE_RANGE: 5,
        TYPE_LAST_MONTH: 6
    });

/**
 * @author zhangboxuan@thinkerx.com
 */
angular
.module('athena.datePicker')
.controller('DatePickerCtrl', DatePickerCtrl);

DatePickerCtrl.$inject = ['$scope', 'DATE_PICKER_TYPE'];

function DatePickerCtrl($scope, DATE_PICKER_TYPE) {
    var vm = this;
    var delta = 0;
    var datePickerType = DATE_PICKER_TYPE.TYPE_DATE_RANGE;
    var endDate, startDate, date;

    vm.nowDate = new Date();
    vm.dateRange = {
        'startDate': null,
        'endDate': null
    };

    vm.prev = prev;
    vm.next = next;
    vm.selectDateRange = selectDateRange;


    init();

    function init() {
        if(vm.defaultDate.dateStatus === 'range') {
            selectDateRange(5, new Date(vm.defaultDate.startDate), new Date(vm.defaultDate.endDate));
        } else if(vm.defaultDate.dateStatus === 'date') {
            setDateRangeDate(new Date(vm.defaultDate.startDate));
        }
    }

    // 获取上一个月
    function getPrevMonth(date) {
        var year = date.getFullYear(); 
        var month = date.getMonth()+1; 
        var day = date.getDate(); 
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year;
        var month2 = parseInt(month) - 1;
        if (month2 === 0) {
            year2 = parseInt(year2) - 1;
            month2 = 12;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }

    // 获取下一个月
    function getNextMonth(date) {
        var year = date.getFullYear(); 
        var month = date.getMonth()+1; 
        var day = date.getDate(); 
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中的月的天数
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 === 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
    
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
    }

    /**
     * 往前一天 / 一段时间
     */
    function prev() {
        switch (datePickerType) {
            case DATE_PICKER_TYPE.TYPE_TODAY:
            case DATE_PICKER_TYPE.TYPE_DATE:
                delta = 1000 * 60 * 60 * 24;
                var date = new Date(new Date(vm.dateRange.startDate).getTime() - delta);
                setDateRangeDate(date);
                break;
            case DATE_PICKER_TYPE.TYPE_7_DAYS_AGO:
                delta = 1000 * 60 * 60 * 24 * 7;
                var endDate = new Date(new Date(vm.dateRange.endDate).getTime() - delta);
                setDateRangeNDaysAgo(7, endDate);
                break;
            case DATE_PICKER_TYPE.TYPE_30_DAYS_AGO:
                delta = 1000 * 60 * 60 * 24 * 30;
                endDate = new Date(new Date(vm.dateRange.endDate).getTime() - delta);
                setDateRangeNDaysAgo(30, endDate);
                break;
            case DATE_PICKER_TYPE.TYPE_DATE_RANGE:
                var deltaDays = Math.floor((vm.dateRange.endDate - vm.dateRange.startDate) / (1000 * 60 * 60 * 24)); //计算时间差
                setDateRangeNDaysAgo(deltaDays, vm.dateRange.startDate);
                break;
            case DATE_PICKER_TYPE.TYPE_LAST_MONTH:
                var prevMonth = new Date(getPrevMonth(vm.dateRange.endDate));
                days = new Date(prevMonth.getFullYear(), prevMonth.getMonth()+1, 0).getDate()-1;
                date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), days+1);
                setDateRangeNDaysAgo(days, date);
                break;
        }

        query();
    }

    /**
     * 往后一天 / 一段时间
     */
    function next() {
        switch (datePickerType) {
            case DATE_PICKER_TYPE.TYPE_TODAY:
            case DATE_PICKER_TYPE.TYPE_DATE:
                delta = 1000 * 60 * 60 * 24;
                var date = new Date(new Date(vm.dateRange.startDate).getTime() + delta);
                setDateRangeDate(date);
                break;
            case DATE_PICKER_TYPE.TYPE_7_DAYS_AGO:
                delta = 1000 * 60 * 60 * 24 * 7;
                var endDate = new Date(new Date(vm.dateRange.endDate).getTime() + delta);
                setDateRangeNDaysAgo(7, endDate);
                break;
            case DATE_PICKER_TYPE.TYPE_30_DAYS_AGO:
                delta = 1000 * 60 * 60 * 24 * 30;
                endDate = new Date(new Date(vm.dateRange.endDate).getTime() + delta);
                setDateRangeNDaysAgo(30, endDate);
                break;
            case DATE_PICKER_TYPE.TYPE_DATE_RANGE:
                var deltaDays = Math.floor((vm.dateRange.endDate - vm.dateRange.startDate) / (1000 * 60 * 60 * 24)); //计算时间差
                endDate = new Date(new Date(vm.dateRange.endDate).getTime() + 1000 * 60 * 60 * 24 * deltaDays);
                setDateRangeNDaysAgo(deltaDays, endDate);
                break;
            case DATE_PICKER_TYPE.TYPE_LAST_MONTH:
                var nextMonth = new Date(getNextMonth(vm.dateRange.endDate));
                var days = new Date(nextMonth.getFullYear(), nextMonth.getMonth()+1, 0).getDate()-1;
                date = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), days+1);
                setDateRangeNDaysAgo(days, date);
                break;
        }

        query();
    }

    /**
     * 把时间段设置为N天前
     * 
     * @param int days 几天前
     * @param Date date 某一天
     */
    function setDateRangeNDaysAgo(days, date) {
        delta = 1000 * 60 * 60 * 24 * days;
        if (date) {
            vm.dateRange.endDate = date;
        }
        vm.dateRange.startDate = new Date(vm.dateRange.endDate - delta);
    }

    /**
     * 把时间段设置为某一天
     */
    function setDateRangeDate(date) {
        vm.dateRange.startDate = date;
        vm.dateRange.endDate = date;
    }

    function selectDateRange(type, startDate, endDate) {
        datePickerType = type;

        switch (datePickerType) {
            case DATE_PICKER_TYPE.TYPE_TODAY:
                setDateRangeDate(new Date());
                break;
            case DATE_PICKER_TYPE.TYPE_7_DAYS_AGO:
                setDateRangeNDaysAgo(7, vm.nowDate);
                break;
            case DATE_PICKER_TYPE.TYPE_30_DAYS_AGO:
                setDateRangeNDaysAgo(30, vm.nowDate);
                break;
            case DATE_PICKER_TYPE.TYPE_DATE:
                setDateRangeDate(startDate);
                break;
            case DATE_PICKER_TYPE.TYPE_DATE_RANGE:
                vm.dateRange.startDate = startDate;
                vm.dateRange.endDate = endDate;
                var deltaDays = Math.floor((vm.dateRange.endDate - vm.dateRange.startDate) / (1000 * 60 * 60 * 24)); //计算时间差
                setDateRangeNDaysAgo(deltaDays, vm.dateRange.endDate);
                break;
            case DATE_PICKER_TYPE.TYPE_LAST_MONTH:
                var prevMonth = new Date(getPrevMonth(vm.dateRange.endDate));
                var days = new Date(prevMonth.getFullYear(), prevMonth.getMonth()+1, 0).getDate()-1;
                var date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), days+1);
                setDateRangeNDaysAgo(days, date);
                break;
        }

        query();
    }

    function query() {
        $scope.$emit('date_update_timely', vm.dateRange);
    }

}

/**
 * 时间段过滤器
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.datePicker')
    .filter('dateRange', dateRange);

dateRange.$inject = [];

function dateRange() {
    return function(input) {
        return input.startDate == input.endDate ? formatDate(input.startDate) : formatDate(input.startDate) + " 至 " + formatDate(input.endDate);
    };

    function formatDate(date) {
        date = date ? new Date(date) : new Date();

        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
}

/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.simpleTable', [])
    .component('simpleTable',{
        templateUrl: 'simple-table.view.html',
        controller: 'SimpleTable',
        controllerAs: 'table',
        bindings: {
            tableConfig: '<',
            tableData: '<'
        }
    });

/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.simpleTable')
    .controller('SimpleTable', SimpleTable);

SimpleTable.$inject = [];

function SimpleTable() {
    var vm = this;
    
    vm.isShow = false;

    vm.showDetail = showDetail;

    function showDetail(item) {
        item.isShow = !item.isShow;
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
            menuList: '<',  /*下拉树*/
            placeholder: '@', /*输入框提示语*/
            level: '<', /*支持等级-最多3*/
            selectedMenu: '<', /*输入框默认值*/
            isShow: '<', /*下拉树默认是否显示*/
            eventName: '@'
        }
    });

/**
 * @author zhangboxuan@thinkerx.com
 */
angular
    .module('athena.menuSelector')
    .controller('MenuSelector', MenuSelector);

MenuSelector.$inject = ['$scope', '$timeout'];

function MenuSelector($scope, $timeout) {
    var vm = this;
    var level1ScrollTop = 0;
    var level2ScrollTop = 0;

    vm.selectedMenu = [];
    vm.isShow = false;

    vm.selectMenu = selectMenu;
    vm.showSelectedMenu = showSelectedMenu;
    vm.hoverSelectMenu = hoverSelectMenu;

    function selectMenu(menuList1, menuList2, menuList3) {
        if(menuList3 && menuList2) {
            vm.selectedMenu = [menuList1, menuList2, menuList3];
            vm.isShow = false;
        } else if(!menuList3 && menuList2) {
            vm.selectedMenu = [menuList1, menuList2];
            vm.isShow = false;
        } else if(!menuList3 && !menuList2) {
            vm.selectedMenu = [menuList1];
            vm.isShow = false;
        }
        $scope.$emit(vm.eventName, vm.selectedMenu);
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
        var currentTargetTop = $event.currentTarget.offsetTop;
        var level1 = angular.element('.level-1');
        var level2 = angular.element('.level-2');
        var level3 = angular.element('.level-3');

        level1.find('ul').scroll(function(){
            level1ScrollTop = level1.find('ul').scrollTop();
        });
        level2.find('ul').scroll(function(){
            level2ScrollTop = level2.find('ul').scrollTop();
        });

        var className = $event.currentTarget.parentNode.className;
        if(new RegExp('level-1').test(className)) {
            $timeout(function() {
                if(level2.length !== 0) {
                    level2[0].style.marginTop = currentTargetTop - level1ScrollTop - 6 + 'px';
                }
            });
        }
        if(new RegExp('level-2').test(className)) {
            $timeout(function() {
                if(level3.length !== 0) {
                    level3[0].style.marginTop = currentTargetTop - level2ScrollTop - 6 + 'px';
                }
            });
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
            } else if(input[1]) {
                return input[0].name + ' > ' + input[1].name;
            } else if(input[0]) {
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
            key: '<',
            type: '<',
            item: '<',
            onSelect: '&'
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

    function selectResult() {
        if (vm.onSelect) {
            vm.onSelect();
        }
    }
}
