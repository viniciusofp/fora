$(document).ready(function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    },100)

})

// $.scrollify({
//     section : ".question-wrapper",
//     scrollSpeed: 800,
// });


$('#outro_genero_input').click(function() {
    $('.genero').prop('checked', false);
    $('#outro_genero').prop('checked', true);
});

$('#outra_cor_input').click(function() {
    $('.cor').prop('checked', false);
    $('#outra_cor').prop('checked', true);
});
$('#outra_religiao_input').click(function() {
    $('.religiao').prop('checked', false);
    $('#outra_religiao').prop('checked', true);
});
$('input[type=radio].goToNext').click(function() {
    var nextObj = $(this).parent().parent().parent().parent().next();
    setTimeout(function() {
       nextObj.scrollintoview({duration: 1000})
   }, 200)

})


$('input.goToNext').blur(function() {
    var nextObj = $(this).parent().parent().parent().next();
    console.log('lalalala', nextObj)

    nextObj.scrollintoview({duration: 1000})
})

function nasceuBrasil(that) {
    if (that.value == "Brasil") {
        document.getElementById("estado").style.display = "block";
    } else {
        document.getElementById("estado").style.display = "none";
    }
}

$('#carouselExampleControls.carousel.slide').carousel({
  wrap: false,
  ride: false,
  interval: false
})

// $('.question').waypoint(function(direction) {
//     if (direction == "down") {
//         $(this.element).parent().siblings().children().removeClass("focus");
//         $(this.element).addClass("focus");
//     }
// }, {
//   offset: '50%'
// })
// $('.question').waypoint(function(direction) {
//     if (direction == "up") {
//         $(this.element).parent().siblings().children().removeClass("focus");
//         $(this.element).addClass("focus");
//     }
// }, {
//   offset: function() {
//     return window.innerHeight / 2 - this.element.clientHeight
//   }
// })

var app = angular.module('app', ['ngResource']);
app.controller('CEP', ['$scope', '$resource', '$q', function($scope, $resource, $q) {
    $scope.buscaCep = function() {
        var rua = $('#rua-cep').val();
        var cidade = $('#cidade-cep').val();
        var estado = $('#estado-cep').val();
        var urlString = "http://viacep.com.br/ws/" + estado + '/' + cidade + '/' + rua + '/json/'
        var Cep = $resource(urlString).query();
            $q.all([
            Cep.$promise,
        ]).then( function (data) {
            if (data[0][0] != undefined) {
                $('#cep').val(data[0][0].cep)
                $('#cep-modal').modal('hide')
            } else {
                alert('Não foi possível identificar o CEP, verifique se os campos foram digitados corretamente.')
            }


        }, function(reason) {
            alert('Não foi possível identificar o CEP, verifique se os campos foram digitados corretamente.' + reason)
        });
        // console.log(urlString)
    }
}]);
app.controller('Counter', ['$scope', function($scope) {
    $scope.counter = 0;
    $scope.numberOfQuestions = $('.question').length;
    $('.next-icon').click(function() {
        $scope.$apply(function(){
            $scope.counter = $scope.counter + 1
        });
    })
    $('.next-icon').click(function() {
        $scope.$apply(function(){
            $scope.counter = $scope.counter - 1
        });
    })
    // $('.question').waypoint(function(direction) {
    //     if (direction == "down") {
    //         console.log($scope.counter)
    //         $scope.$apply(function(){
    //             $scope.counter = $scope.counter + 1
    //         });
    //     }
    // }, {
    //   offset: '50%'
    // });
    // $('.question').waypoint(function(direction) {
    //     if (direction == "up") {
    //         console.log($scope.counter)
    //         $scope.$apply(function(){
    //             $scope.counter = $scope.counter - 1
    //         });
    //     }
    // }, {
    //   offset: function() {
    //     return window.innerHeight / 2 - this.element.clientHeight
    //   }
    // });
}]);


var questions = $('.question');

$('#carouselExampleControls').on('slide.bs.carousel', function (e) {
  var activeQuestion = $('.active').children()[0];
    console.log($(e.relatedTarget).children()[0].clientHeight)
  if (activeQuestion.clientHeight < window.innerHeight - 180) {
    console.log('menor')
    $(e.relatedTarget).children().addClass('absolute-center')
    $(e.relatedTarget).children().removeClass('question-margin')
  } else {
    $(e.relatedTarget).children().removeClass('absolute-center')
    $(e.relatedTarget).children().addClass('question-margin')
  }
})

$('.carousel').each(function () {
        var $carousel = $(this);
        var hammertime = new Hammer(this, {
            recognizers: [
                [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]
            ]
        });
        hammertime.on('swipeleft', function () {
            $carousel.carousel('next');
        });
        hammertime.on('swiperight', function () {
            $carousel.carousel('prev');
        });
    });