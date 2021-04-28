let app = angular.module("myApp", []);

// app.directive("anchor", [
//   function () {
//     return {
//       replace: true,
//       restrict: "E",
//       transclude: true,
//       scope: {
//         name: "=",
//       },
//       template: "<p >{{name}}</p>",
//     };
//   },
// ]);


app.service("testService", function () {
  this.callme = (value) => {
    alert(value);
  };
});

app.service("github", function ($http) {
  let url = "https://api.github.com/events?callback";
  this.getGit = function () {
    return $http.get(url);
  };
});


app.run(($templateCache) => {
  $templateCache.put("name.html", "Test");
});

app.factory('fakeApiCall',function($q){

    var factory={}
    factory.call=function(){

        let fake=$q.defer();

        setTimeout(()=>{

             fake.resolve('Responsed');
               
        
        },1000)

        return fake.promise;

    }
    return factory;
})


app.controller("myAppController", [

  "$scope",
  "$templateCache",
  "$log",
  "testService",
  "github",
  "$http",
  '$q',
  'fakeApiCall',

  function ($scope, $templateCache, $log, testService, github,$http,$q,fakeApiCall) {

   $http.get('https://fakestoreapi.com/products').then(el=>console.log(el)).catch(el=>console.log(el))
    l = "m";
    $scope.data = $templateCache.get("name.html");
    $scope.votes = 5;
    $scope.githubData = [];
    $scope.flickerData=[]
    $scope.callService = testService;
    $log.log($scope.data);

    $scope.fakeApiCall= function(){

        fakeApiCall.call('ojk').then(el=>alert(el)).catch(el=>alert(el));
    }
    

    $scope.getApiViaService = function () {
      github
        .getGit()
        .then((el) => ($scope.githubData = el.data))
        .catch((el) => console.log(el));
    };

    $scope.arr = [1, 2, 3, 4, 5, 6];
    $scope.val = [
      {
        comment: "I really like cheese",
        votes: 10,
      },
      {
        comment: "I'm not so sure about edam though",
        votes: 2,
      },
      {
        comment: "Gouda properly rocks!",
        votes: 4,
      },
      {
        comment: "I quite like a bit of mild cheddar",
        votes: 19,
      },
      {
        comment: "Cheese is just old milk",
        votes: 8,
      },
      {
        comment: "Cheese not good",
        votes: 10,
      },
    ];
  },
]);

app.filter("getFirst", function () {
  return function (data) {
    console.log(data[0]);
  };
});

app.filter("arr", function () {
  return function (data, votes) {
    data = data.filter((el) => el.votes >= votes);

    return data;
  };
});

app.filter("reverse", function () {
  return function (data) {
    return data.split("").reverse().join("");
  };
});



// app.filter('twitter',function(){

//    return function (data) {
//       newlink = angular.element('a');
//       newlink.attr('href', `http://twitter.com/"data"`);
//       return newlink;

//    }
// })
