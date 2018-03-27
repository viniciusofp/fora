$(function() {
  $("body").prognroll({
    height: 8, //Progress bar height
  });
});

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

$('.question').waypoint(function(direction) {
    if (direction == "down") {
        console.log(this)
        $(this.element).parent().siblings().children().removeClass("focus");
        $(this.element).addClass("focus");
    }
}, {
  offset: '50%'
})
$('.question').waypoint(function(direction) {
    if (direction == "up") {
        console.log(this)
        $(this.element).parent().siblings().children().removeClass("focus");
        $(this.element).addClass("focus");
    }
}, {
  offset: function() {
    return window.innerHeight / 2 - this.element.clientHeight
  }
})