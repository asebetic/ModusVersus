$(document).ready(function(){
	var menu = "close";
	$('.menu-btn').click(function(){
		if(menu == "close") {	
			$('.prim-nav').css('transform', 'translate(0,0)');
			$('nav').css('translate', 'all .5s ease');
			$('header i').removeClass('fa-bars');
			$('header i').addClass('fa-times');
			menu = "open";
		}
		else {
			$('.prim-nav').css('transform', 'translate(0,-150%)');
			$('header i').removeClass('fa-times');
			$('header i').addClass('fa-bars');
			menu = "close";
		}
	});
	$('#search-icon').click(function() {
		$('#search-icon').toggleClass('active');
		$('#search').toggle();
	});
	$('.bxslider').bxSlider();
	$('.autoplay').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		prevArrow:'<i class="fa fa-chevron-left"></i>',
		nextArrow:'<i class="fa fa-chevron-right"></i>'
	});

	$('.data-slick').slick({
		prevArrow:'<i class="fa fa-chevron-left"></i>',
		nextArrow:'<i class="fa fa-chevron-right"></i>'
	});

	$('#dg-container').gallery({
		current:0,
		autoplay:true,
		interval:5000
	});
	$('.map-container').click(function(){
			$(this).find('iframe').addClass('clicked')})
	.mouseleave(function(){
			$(this).find('iframe').removeClass('clicked')});
});