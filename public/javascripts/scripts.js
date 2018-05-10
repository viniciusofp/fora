$(document).ready(function() {

$(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
});

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
    $('#decisoes-outro-input').addClass('animated fadeIn').focus();
});
$('#outro-genero').click(function() {
    $('#outro-genero-input').addClass('animated fadeIn').focus();
});
$('#outra-cor').click(function() {
    $('#outra-cor-input').addClass('animated fadeIn').focus();
});
$('#outra-religiao').click(function() {
    $('#outra-religiao-input').addClass('animated fadeIn').focus();
});
$('#acesso-outro').click(function() {
    $('#acesso-outro-input').addClass('animated fadeIn').focus();
});
$('#oquevive-outro').click(function() {
    $('#oquevive-outro-input').addClass('animated fadeIn').focus();
});
$('#outra-frequencia').click(function() {
    $('#outra-frequencia-input').addClass('animated fadeIn').focus();
});
$('#meio-outro').click(function() {
    $('#meio-outro-input').addClass('animated fadeIn').focus();
});


$('select#pais').change(function() {
    if ( $(this).val() == "Brasil") {
        document.getElementById("estado").style.display = "block";
    } else {
        document.getElementById("estado").style.display = "none";
    }
});

$('#carouselExampleControls.carousel.slide').carousel({
  wrap: false,
  ride: false,
  interval: false,
  keyboard: true
});





var questions = $('.question');

$('#carouselExampleControls').on('slide.bs.carousel', function (e) {
    var activeQ = $(e.relatedTarget)
    var images = [
        'gender',
        'oqvcfaz',
        'intro1',
        'freq',
        'qualoespaco',
        'costumafazer',
        'pqnsai',
        'reflexao'
    ]
    for (var i = images.length - 1; i >= 0; i--) {
        images[i]

        if (activeQ.hasClass(images[i])) {
            $('.img-right-' + images[i]).fadeIn();
        } else {
            $('.img-right-' + images[i]).fadeOut();
        }
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
        if ( window.innerWidth < 767) {
            $carousel.carousel('next');
        }
    });
    hammertime.on('swiperight', function () {
        if ( window.innerWidth < 767) {
            $carousel.carousel('prev');
        }
    });
});

$('.arlivre label, .frequencia label, .goToNext').click(function() {
    setTimeout(function(){
        $('#carouselExampleControls').carousel('next')
    }, 500)
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


var quemmora = $('.quemmora');
var quemtrabalhaestuda = $('.quemtrabalhaestuda');
var quemmoratrabalhaestuda = $('.quemmoratrabalhaestuda');
var quemnenhum = $('.quemnenhum');
var pqnsai = $('.pqnsai');
var costumafazer = $('.costumafazer');

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


$('.quemmora').remove();
$('.quemtrabalhaestuda').remove();
$('.quemmoratrabalhaestuda').remove();
$('.quemnenhum').remove();
$('.pqnsai').remove();
$('.costumafazer').remove();
$('#carouselExampleControls').on('slide.bs.carousel', function (e) {
    if (e.direction == 'left') {

        if ($(e.relatedTarget).hasClass('cep')) {
            $('.quemmora').remove();
            $('.quemtrabalhaestuda').remove();
            $('.quemmoratrabalhaestuda').remove();
            $('.quemnenhum').remove();
            if ($('#sp-nenhum')[0].checked == true) {
                quemnenhum.insertAfter('#cep-modal');
            }
            if ($('#moro')[0].checked == true || $('#trabalho')[0].checked == true || $('#estudo')[0].checked == true) {
                quemmoratrabalhaestuda.insertAfter('#cep-modal');
                $('#cidade-cep').val('São Paulo');
                $('#estado-cep').val('SP');
            }
            if ($('#moro')[0].checked == true) {
                quemmora.insertAfter('#cep-modal');                $('#melhoraespacocasa-outro').click(function() {
                    console.log('oi')
                    $('#melhoraespacocasa-outro-input').addClass('animated fadeIn').focus();
                });
            }
            if ($('#moro')[0].checked == false) {
                if ($('#trabalho')[0].checked == true || $('#estudo')[0].checked == true) {
                    quemtrabalhaestuda.insertAfter('#cep-modal');
                    $('#melhoraespacotrabalho-outro').click(function() {
                        $('#melhoraespacotrabalho-outro-input').addClass('animated fadeIn').focus();
                    });
                }
            }
        }


        if ($(e.relatedTarget).prev().hasClass('freq')) {

            $('.pqnsai').remove();
            $('.costumafazer').remove();
            console.log('takeaction')

            if ($('#quase-todo-dia')[0].checked == true || $('#finais-de-semana')[0].checked == true || $('#saio-pouco')[0].checked == true) {
                costumafazer.insertAfter('.freq').addClass('active');
            }
            if ($('#saio-muito-pouco')[0].checked == true || $('#saio-muito-pouco-mesmo')[0].checked == true) {
                pqnsai.insertAfter('.freq').addClass('active');
            }
        }
    }
})

// Mapa

    var places = []

    $('.map path').click(function() {
        $(this).toggleClass('selected');
        if ( places.indexOf($(this).attr('data-name')) > -1) {
            places = places.filter(e => e !== $(this).attr('data-name') );
            $('#circulacao').val(places)
        } else {
            places.push($(this).attr('data-name'))
            $('#circulacao').val(places)
        }
    })
    $('.map path').hover(function() {
        $('#tail').text($(this).attr('data-name'))
        $('#tail').addClass('popover-visible')
    }).mouseleave(function() {
        $('#tail').text('')
        $('#tail').removeClass('popover-visible')
    })
if ( $('.question-wrapper').length > 0 ) {
    $(document).bind('mousemove', function(e){
        $('#tail').css({
           left: e.pageX - $(document).scrollLeft() - $('.question-wrapper.active .question').offset().left,
           top : e.pageY - $(document).scrollTop() - $('.question-wrapper.active .question').offset().top
        });
    });
    $('#circulacao-submit').click(function() {
        $('#circulacao').val(places)
    })
}




var questions = $('.question');
var questionsLength = questions.length;
var questionsWidth =window.innerWidth / questionsLength;
$('.question-bar').css('width', questionsWidth);

$('#carouselExampleControls').on('slid.bs.carousel', function (e) {

    setTimeout(function() {
        $('.question-wrapper.active:not(.cep) .textinput').focus();

        if (! $('.active').hasClass('not-required')) {
            $('.next-icon').parent().removeAttr( "data-slide" )
        }
    }, 200)

    $('.slider-nav').addClass('totheright');
    if ($(e.relatedTarget).hasClass('abre')) {
        $('.brand').css('fill', 'white')
    }
    if ($(e.relatedTarget).hasClass('contracapa')) {
        $('.brand').css('fill', '#ff00ff')
    }
    var questions = $('.question');
    var questionsLength = questions.length;
    var questionsWidth =window.innerWidth / questionsLength;
    if (e.direction == 'left') {
        $('.progress-bar-q').append('<div class="question-bar"></div>')
        $('.question-bar:last-child').css('width', questionsWidth)
    } else {
        $('.question-bar:last-child').remove();
    }
    $('.question-bar').css('width', questionsWidth)
})



$('.next-icon').hover(function() {
    var thisQ = $('.active .question')
    var qChildren = thisQ.find('input, textarea, select')
    if ($('.active').hasClass('not-required')) {} else {
        if (qChildren.length > 0) {
            var hasAnswer = false ;
            qChildren.each(function(i, el) {
                if ($(el).attr('type') == 'text' || $(el).attr('type') == 'number') {
                    if ($(el).val() != "") {
                        hasAnswer = true;
                    }
                } else if ($(el).attr('type') == 'checkbox' || $(el).attr('type') == 'radio') {
                    if (el.checked == true) {
                        hasAnswer = true;
                    }
                } else if (el.tagName == 'SELECT') {
                    if ($(el).val() != "") {
                        hasAnswer = true;
                    }
                }
            })
            if (! hasAnswer) {
                setTimeout(function() {
                    console.log($('.next-icon'))
                    $('.next-icon').parent().removeAttr( "data-slide" )
                    $('.alert').fadeIn()
                    setTimeout(function() {
                        $('.alert').fadeOut()
                    }, 1000)
                }, 300)
            } else {
                $('.next-icon').parent().attr( "data-slide", 'next' )
            }
        } else {
            console.log('não tem input')
            $('.next-icon').parent().attr( "data-slide", 'next' )
        }
    }
}, function() {
    var thisQ = $('.active .question')
    var qChildren = thisQ.find('input, textarea, select')
    if ($('.active').hasClass('not-required')) {} else {
        if (qChildren.length > 0) {
            var hasAnswer = false ;
            qChildren.each(function(i, el) {
                if ($(el).attr('type') == 'text' || $(el).attr('type') == 'number') {
                    if ($(el).val() != "") {
                        hasAnswer = true;
                    }
                } else if ($(el).attr('type') == 'checkbox' || $(el).attr('type') == 'radio') {
                    if (el.checked == true) {
                        hasAnswer = true;
                    }
                } else if (el.tagName == 'SELECT') {
                    if ($(el).val() != "") {
                        hasAnswer = true;
                    }
                }
            })
            if (! hasAnswer) {
                setTimeout(function() {
                    console.log($('.next-icon'))
                    $('.next-icon').parent().removeAttr( "data-slide" )
                }, 300)
            } else {
                $('.next-icon').parent().attr( "data-slide", 'next' )
            }
        } else {
            console.log('não tem input')
            $('.next-icon').parent().attr( "data-slide", 'next' )
        }
    }
})




}) // document ready

// CEP Angular APP
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