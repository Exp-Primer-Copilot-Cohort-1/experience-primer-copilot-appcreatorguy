function skillsMember() {
  return {
    restrict: 'E',
    templateUrl: 'views/member.html',
    scope: {
      member: '='
    },
    controller: function($scope) {
      $scope.skills = $scope.member.skills;
    }
  };
}