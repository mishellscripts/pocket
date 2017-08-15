app.controller('WeekCtrl', ['$scope', $scope=>{
  $scope.month = $scope.monthNames[$scope.date.getMonth()];
   
  /**
   * Updates to the next calendar week
   */
  $scope.incWeek = ()=> {
    var daysInMonth = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, 0).getDate();
    var newDayStart = $scope.dayEnd + 1 <= daysInMonth ? $scope.dayEnd + 1 : $scope.dayStart;
    var dateStart = new Date($scope.date.getFullYear(), $scope.date.getMonth(), newDayStart).toDateString();
    $scope.switchWeekView(dateStart);
  };

  /**
   * Updates to the previous calendar week
   */
  $scope.decWeek = ()=> {
    var newDayStart = $scope.dayStart > 7 ? $scope.dayStart - 7 : 1
    var dateStart = new Date($scope.date.getFullYear(), $scope.date.getMonth(), newDayStart).toDateString();
    $scope.switchWeekView(dateStart);
  };

  /**
   * Updates the html of the calendar table depending on the current date
   */
  $scope.drawWeek = ()=> {
    $('#week-timetable').empty();
    $scope.month = $scope.monthNames[$scope.date.getMonth()];
    $('#week-timetable').append("<tr><th><span>MON</span></th><th><span>TUE</span></th><th><span>WED</span></th><th><span>THU</span></th><th><span>FRI</span></th><th><span>SAT</span></th><th><span>SUN</span></th></tr>");   
    function drawCells(rows, totalDays, firstDay) {
    };
    return true;
  };
}]);