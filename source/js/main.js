$(document).ready(function(){

	// initialize masonrt grid
   	$(".masonry__grid").isotope({
        itemSelector: '.masonry__item',
        masonry:{
	   		gutter: 30
        }
    });

   	// filtre items in portfolio
    $('.masonry-button').on( 'click', function() {
		  var filterValue = $(this).attr('data-filter');
		  $(".masonry__grid").isotope({ filter: filterValue });
	});

    $(".btn-all").toggleClass('is-checked');
    $('.button-group').each(function(i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });


    // hamburger-icon-toggle
    $(".hamburger-icon").on('click', function(){
    	$('.hidden-page').toggleClass('hidden-page-visible');
    	$('.header__nav').toggleClass('opened');
    });

    $(".hidden-page").on('click', function(){
    	$(this).removeClass('hidden-page-visible');
    	$('.header__nav').removeClass('opened');
    });

    var headerH = $(".header").innerHeight();

    // margin for banner
    $(".banner").css({
    	"margin-top" : " "+headerH+"px ",
    });

    // animation to top
	    $(".button-top").click(function(){
	    	$('html, body').animate({scrollTop: 0}, 600);
	    });
  
});