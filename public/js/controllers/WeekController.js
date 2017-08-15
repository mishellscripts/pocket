app.controller('WeekCtrl', ['$scope', '$compile', ($scope, $compile)=>{
  $scope.month = $scope.monthNames[$scope.date.getMonth()];
   
  /**
   * Updates to the next calendar week
   */
  $scope.incWeek = ()=> {
    var newDayStart = $scope.dayEnd + 1 <= $scope.daysInMonth ? $scope.dayEnd + 1 : $scope.dayStart;
    var dateStart = new Date($scope.date.getFullYear(), $scope.date.getMonth(), newDayStart).toDateString();
    $scope.switchWeekView(dateStart);
    $scope.drawWeek();
  };

  /**
   * Updates to the previous calendar week
   */
  $scope.decWeek = ()=> {
    var newDayStart = $scope.dayStart > 7 ? $scope.dayStart - 7 : 1
    var dateStart = new Date($scope.date.getFullYear(), $scope.date.getMonth(), newDayStart).toDateString();
    $scope.switchWeekView(dateStart);
    $scope.drawWeek();
  };

  /**
   * Updates the html of the calendar table depending on the current date
   */
  $scope.drawWeek = ()=> {
    $('#week-timetable').empty();
    $scope.month = $scope.monthNames[$scope.date.getMonth()];
    var times = ['6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm', '1 pm', '2 pm', 
      '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm'];

    // Append header
    var header = "<tr><th></th>";
    console.log($scope.dayStart);
    console.log($scope.dayEnd);
    console.log($scope.date.getUTCDay());

    var daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    var dateStart = $scope.dayStart;
    var dowStart = $scope.date.getUTCDay()-1;
    if (dowStart == -1) dowStart = 6;
    
    for (var d = 0; d < 7; d++) {
      header += "<th><span>" + daysOfWeek[d];
      if ($scope.dayStart > 1 || d >= dowStart) {
        header += " (" + dateStart + ")";
        dateStart++;
      }
      header += "</span></th>";
    }
    header += "</tr>";   

    $("#week-timetable").prepend(header);

    // Draw the rest of the cells
    for (var i = 0; i < times.length; i++) {
      var tr = document.createElement('tr');
      for (var t = 0; t < 8; t++) {
        var td = document.createElement('td');
        if (t == 0) {
          td.appendChild(document.createTextNode(times[i]));
        }        
        // Each column, when clicked, will navigate to its corresponding week view
        $(td).attr("ng-click", "$parent.switchDayView('" + new Date().toDateString() + "')");
        // Compile the table entry's html to allow ng-click   
        var compiledtd = $compile(td)($scope);
        tr.appendChild(td);
        }
        $('#week-timetable').append(tr);
      }
    return true;
  };
}]);