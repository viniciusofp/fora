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
$('#decisoes-outro-input').click(function() {
    $('.decisoes').prop('checked', false);
    $('#decisoes-outro').prop('checked', true);
});
$('#decisoes-outro').click(function() {
    $('#decisoes-outro-input').addClass('animated bounceIn').focus();
});
$('#outro-genero').click(function() {
    $('#outro-genero-input').addClass('animated bounceIn').focus();
});
$('#outra-cor').click(function() {
    $('#outra-cor-input').addClass('animated bounceIn').focus();
});
$('#outra-religiao').click(function() {
    $('#outra-religiao-input').addClass('animated bounceIn').focus();
});
$('#acesso-outro').click(function() {
    $('#acesso-outro-input').addClass('animated bounceIn').focus();
});
$('#oquevive-outro').click(function() {
    $('#oquevive-outro-input').addClass('animated bounceIn').focus();
});
$('#outra-frequencia').click(function() {
    $('#outra-frequencia-input').addClass('animated bounceIn').focus();
});
$('#melhoraespacocasa-outro').click(function() {
    $('#melhoraespacocasa-outro-input').addClass('animated bounceIn').focus();
});
$('#melhoraespacotrabalho-outro').click(function() {
    $('#melhoraespacotrabalho-outro-input').addClass('animated bounceIn').focus();
});
$('#meio-outro').click(function() {
    $('#meio-outro-input').addClass('animated bounceIn').focus();
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
  interval: false,
  keyboard: true
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
    var activeQ = $(e.relatedTarget)
    console.log($(window).innerWidth)
    if (activeQ.hasClass('gender')) {
        $('.img-right-gender').fadeIn();
    } else {
        $('.img-right-gender').fadeOut();
    }
    if (activeQ.hasClass('oqvcfaz')) {
        $('.img-right-oqvcfaz').fadeIn();
    } else {
        $('.img-right-oqvcfaz').fadeOut();
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

$('.arlivre label, .frequencia label').click(function() {
    setTimeout(function(){
        $('#carouselExampleControls').carousel('next')
    }, 600)
})
$('#nenhuma').click(function() {
    $('#check-bar-progress').attr('class', "w0")
})
$('#pouca').click(function() {
    $('#check-bar-progress').attr('class', "w25")
})
$('#media').click(function() {
    $('#check-bar-progress').attr('class', "w50")
})
$('#muita').click(function() {
    $('#check-bar-progress').attr('class', "w75")
})
$('#toda').click(function() {
    $('#check-bar-progress').attr('class', "w100")
})

var cepQ = $('.question-wrapper.cep')






// $('.next-icon').click(function() {
//     if($('#sp-nenhum')[0].checked == true) {
//         quemmora.remove();
//         quemtrabalhaestuda.remove();
//     } else {
//         if ($('.quemmora')) {
//             console.log('ok')
//         }
//         if ($('.quemtrabalhaestuda')) {
//             console.log('ok')
//         }
//     }
// })
var quemmora = $('.quemmora');
var quemtrabalhaestuda = $('.quemtrabalhaestuda');
var quemmoratrabalhaestuda = $('.quemmoratrabalhaestuda');
var quemnenhum = $('.quemnenhum');

$('#sp-nenhum').change(function() {
    if($('#sp-nenhum')[0].checked == true) {
        $('.sp-oquefaz').prop("checked", false);
        quemnenhum.insertAfter('#cep-modal');
    } else if ($('.quemnenhum').length > 0) {
        $('.quemnenhum').remove();
    }
})

$('#moro').change(function() {
    if ($(this).checked == true) {
        quemmora.insertAfter('#cep-modal');
    } else if ($('.quemmora').length > 0) {
        $('.quemmora').remove();
    }
})

$('.sp-oquefaz').change(function() {
    if($(this)[0].checked == true) {
        $('#sp-nenhum').prop("checked", false);
    }
})


$('#carouselExampleControls').on('slide.bs.carousel', function (e) {
    console.log(e)
    if (e.direction == 'left') {
        if ($(e.relatedTarget).hasClass('cep')) {
            $('.quemmora').remove();
            $('.quemtrabalhaestuda').remove();
            $('.quemmoratrabalhaestuda').remove();
            $('.quemnenhum').remove();
            console.log('mudei do quem mora alo alo alo')
            if ($('#sp-nenhum')[0].checked == true) {
                quemnenhum.insertAfter('#cep-modal');
            }
            if ($('#moro')[0].checked == true || $('#trabalho')[0].checked == true || $('#estudo')[0].checked == true) {
                quemmoratrabalhaestuda.insertAfter('#cep-modal');
            }
            if ($('#moro')[0].checked == true) {
                quemmora.insertAfter('#cep-modal');
            }
            if ($('#moro')[0].checked == false) {
                if ($('#trabalho')[0].checked == true || $('#estudo')[0].checked == true) {
                    quemtrabalhaestuda.insertAfter('#cep-modal');
                }
            }
        }
    }
})

// Mapa

    var places = []

    $('path').click(function() {
        $(this).toggleClass('selected');
        if ( places.indexOf($(this).attr('data-name')) > -1) {
            places = places.filter(e => e !== $(this).attr('data-name') );
            $('#circulacao').val(places)
        } else {
            places.push($(this).attr('data-name'))
            $('#circulacao').val(places)
        }
    })
    $('path').hover(function() {
        $('#tail').text($(this).attr('data-name'))
        $('#tail').addClass('popover-visible')
    }).mouseleave(function() {
        $('#tail').text('')
        $('#tail').removeClass('popover-visible')
    })

    $(document).bind('mousemove', function(e){
        $('#tail').css({
           left: e.pageX - $(document).scrollLeft() - $('.question-wrapper.active .question').offset().left,
           top : e.pageY - $(document).scrollTop() - $('.question-wrapper.active .question').offset().top
        });
    });
    $('#circulacao-submit').click(function() {
        $('#circulacao').val(places)
    })
