app.controller('CalendarCtrl', ['$scope', '$compile', ($scope, $compile)=>{

  $scope.title = "";

  /**
   * Updates the title of the calendar depending on current date
   * Format: Month Year
   */
  $scope.updateTitle = ()=> {
    var m = $scope.date.getMonth();
    var y = $scope.date.getFullYear();
    $scope.title = $scope.monthNames[m] + ' ' + y;
  };

  /**
   * Updates to the next calendar month
   */
  $scope.incMonth = ()=> {
    $scope.date = new Date($scope.date.getYear()+1900, $scope.date.getMonth()+1);
    $scope.updateTitle();
    $scope.drawCalendar();
  };

  /**
   * Updates to the previous calendar month
   */
  $scope.decMonth = ()=> {
    $scope.date = new Date($scope.date.getYear()+1900, $scope.date.getMonth()-1);
    $scope.updateTitle();
    $scope.drawCalendar();
  }

  /**
   * Updates the html of the calendar table depending on the current date
   */
  $scope.drawCalendar = ()=> {
    $('#calendar').empty();
    // Append common weekday header
    $('#calendar').append("<tr><th><span>MON</span></th><th><span>TUE</span></th><th><span>WED</span></th><th><span>THU</span></th><th><span>FRI</span></th><th><span>SAT</span></th><th><span>SUN</span></th></tr>");   
    
    function drawCells(rows, totalDays, firstDay) {
      var day = 1;
      for (var i = 0; i < rows; i++) {
        var tr = document.createElement('tr');
        var dayStart = day;
        for (var t = 0; t < 7; t++) {
          var td = document.createElement('td');
          if ((day > 1 && day <= totalDays) || (i === 0 && t === firstDay)) {
            td.appendChild(document.createTextNode(day++));
          } 
          tr.appendChild(td);
        }
        var dayEnd = day-1;
        var dateStart = new Date($scope.date.getFullYear(), $scope.date.getMonth(), dayStart).toDateString();
        // Each row, when clicked, will navigate to its corresponding week view
        $(tr).attr("ng-click", "$parent.switchWeekView('" + dateStart + "')");
        // Compile the table row's html to allow ng-click
        var compiledtr = $compile(tr)($scope);
        $('#calendar').append(compiledtr);
      }
    };

    var daysInMonth = new Date($scope.date.getFullYear(), $scope.date.getMonth()+1, 0).getDate();
    var firstDayOfWeek = (new Date($scope.date.getFullYear(), $scope.date.getMonth(), 1).getDay() + 6) % 7;
    var numBlocks = daysInMonth + firstDayOfWeek;
    var numRows = Math.ceil(numBlocks / 7);
    
    drawCells(numRows, daysInMonth, firstDayOfWeek);
  };
}]);