let app = angular.module('pocketApp', []);

app.controller('PocketCtrl', ['$scope', $scope=>{
  /**
   * Variables for updating current view
   */
  $scope.monthView = true;
  $scope.weekView = false;
  $scope.dayView = false;
  $scope.lightTheme = true;
  /**
   * Common variables used for other views
   */
  $scope.dayStart = 0;
  $scope.dayEnd = 0;
  $scope.day = 0;
  $scope.dow = 0;
  $scope.date = new Date();
  $scope.monthNames = ["January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"];
  $scope.month = $scope.monthNames[$scope.date.getMonth()];
  $scope.daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];    
  $scope.daysInMonth = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, 0).getDate();    

  /**
   * Updates the current week timetable depending on the current date
   */
  $scope.switchWeekView = (date)=> {
    // Update the date variable in parent controller
    var switchDate = date;
    if (typeof date == 'string') {
      switchDate = new Date(date);
    }
    $scope.date = switchDate;
    $scope.daysInMonth = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, 0).getDate();

    // Update the day start and day end parent variables
    $scope.dayStart = switchDate.getDate();
    if ($scope.date.getUTCDay() == 0 && $scope.date.getDate == 1) {
       $scope.dayStart = 1;
       $scope.dayEnd = $scope.dayStart + 7;
    } else if ($scope.date.getUTCDay() == 1 && $scope.date.getDate() ==  $scope.daysInMonth) {
       $scope.dayEnd =  $scope.daysInMonth;
       $scope.dayStart = $scope.dayEnd - 7;       
    } else {
      $scope.dayEnd = $scope.dayStart + (7-$scope.date.getUTCDay());
      if ($scope.dayEnd+1 >=  $scope.daysInMonth) $scope.dayEnd =  $scope.daysInMonth;
      if ($scope.dayStart == 2) $scope.dayStart = 1;
    }
    
    // Switch to week view by updating parent boolean variables
    $scope.monthView = false;
    $scope.weekView = true;
    $scope.dayView = false;
  };

  /**
   * Switches to month view by updating parent boolean variables
   */
  $scope.switchMonthView = ()=> {
    $scope.monthView = true;
    $scope.weekView = false;
    $scope.dayView = false;    
  }

  /**
   * Switches to day view by updating parent boolean variables
   */
  $scope.switchDayView = (day)=> {
    var switchDate = new Date($scope.date.getFullYear(), $scope.date.getMonth(), day);
    $scope.date = switchDate;
    $scope.day = $scope.date.getDate();
    var dayIndex = $scope.date.getUTCDay()-1
    if (dayIndex == -1) dayIndex = 6;
    $scope.dow = "(" + $scope.daysOfWeek[dayIndex] + ")";
    $scope.month = $scope.monthNames[$scope.date.getMonth()];

    $scope.monthView = false;
    $scope.weekView = false;
    $scope.dayView = true;    
  }
}]);



