

$.scrollify({
    section : ".question-wrapper",
    scrollSpeed: 800,
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
$('input[type=radio]:not(#outra_cor, #outra_religiao, #outro_genero)').click(function() {
    var nextObj = $(this).parent().parent().parent().parent().next();
    setTimeout(function() {
       nextObj.scrollintoview({duration: 1000})
   }, 200)

})


$('input').blur(function() {
    var nextObj = $(this).parent().parent().parent().next();
    console.log('lalalala', nextObj)

    nextObj.scrollintoview({duration: 1000})
})