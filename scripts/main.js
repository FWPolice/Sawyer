$(document).ready(function () {
	// Menu trigger activation
	$('.menu-trigger').on('click', function(){
		$(this).toggleClass('active');
		$('.menu').toggleClass('active');
	});

	// Menu mobile-trigger activation
	$('main').on('click', '.mobile-trigger', function(){
		$(this).toggleClass('active');
		$('.menu').toggleClass('active');
	});

	// Animsition
	$(".animsition").animsition({
		inClass: 'fade-in-down-sm',
		outClass: 'fade-out-down-sm',
		inDuration: 800,
		outDuration: 800,
		linkElement: '.animsition-link',
		// e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
		loading: true,
		loadingParentElement: 'body', //animsition wrapper element
		loadingClass: 'animsition-loading',
		loadingInner: '<img src="images/icons/loading.gif" alt="loading" />', // e.g '<img src="loading.svg" />'
		timeout: false,
		timeoutCountdown: 5000,
		onLoadEvent: true,
		browser: [ 'animation-duration', '-webkit-animation-duration'],
		// "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
		// The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
		overlay : false,
		overlayClass : 'animsition-overlay-slide',
		overlayParentElement : 'body',
		transition: function(url){ window.location.href = url; }
	});

	// Animate skill bars
	$(".skills").addClass("active");
	$(".skills .skill .skill-bar span").each(function() {
		$(this).animate({
		  "width": $(this).parent().attr("data-bar") + "%"
		}, 1000);
		$(this).append('<b>' + $(this).parent().attr("data-bar") + '%</b>');
	});
	setTimeout(function() {
		$(".skills .skill .skill-bar span b").animate({"opacity":"1"},1000);
	}, 2000);

	// Scroll to section
	$(".js-scroll").click(function(event){
		event.preventDefault();
		var dest=0;
		if($(this.hash).offset().top > $(document).height()-$(window).height()){
			 dest=$(document).height()-$(window).height();
		}else{
			 dest=$(this.hash).offset().top;
		}
		//go to destination
		$('html,body').animate({scrollTop:dest}, 1000,'swing');
	});

	var $frameContent = $('.content');
	$('.frame-anchor').click(function() {
		$frameContent.animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top
	}, 1000, 'swing');
	return false;
	});

	// Social share
	$(".share").on('click', function(e) {
		$(".fab").removeClass("no");
		if(e.target != this) return;
		$('.share, .fab').toggleClass("active");
	});

	// Toggle comment form
	$('.add-comment-button').click(function() {
		$('.comment-form').slideToggle('slow');
		$(this).slideToggle('slow');
	});

	// Filter thumbnails
	$('.filter a').click(function(e) {
		e.preventDefault();
		$('.filter a').removeClass('active');
		$(this).addClass('active');

		var a = $(this).attr('href');
		a = a.substr(1);
		$('.portfolio-thumb li').each(function() {
			if (!$(this).hasClass(a) && a != 'all') {
				$(this).addClass('noshow').attr('disabled', true);
			}
			else {
				$(this).removeClass('noshow').attr('disabled', false);
			}
		});
	});

	// Bootstrap carousel
	$('#myCarousel').carousel('pause');

    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
        var id_selector = $(this).attr("id");
        try {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            jQuery('#myCarousel').carousel(parseInt(id));
        } catch (e) {
            console.log('Regex failed!', e);
        }
    });
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
		var id = $('.item.active').data('slide-number');
		$('#carousel-text').html($('#slide-content-'+id).html());
		$('[id^=carousel-selector-]').removeClass('active');
		$('[id=carousel-selector-'+id+']').addClass('active');
    });

	// Google Map
	var	$main_color = '#2d313f',
		$saturation= -20,
		$brightness= 5;

	var style= [
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: $saturation}
			]
		},
	    {	//poi stands for point of interest - don't show these lables on the map
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    },
		{
			//don't show local road lables on the map
			featureType: "road.local",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show arterial road lables on the map
			featureType: "road.arterial",
			elementType: "labels.icon",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		},
		//style different elements on the map
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]

		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		},
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: $main_color },
				{ visibility: "on" },
				{ lightness: $brightness },
				{ saturation: $saturation }
			]
		}
	];

	var $mapWrapper = $('#gmap'), draggableOp;

	if ( $mapWrapper.length > 0 ) {
		var map = new GMaps({
			div: '#gmap',
			lat : 40.710310,
			lng : -74.008456,
			scrollwheel: false,
			draggable: draggableOp,
			zoom: 16,
			disableDefaultUI: true,
			styles : style
		});

		map.addMarker({
			lat : 40.710310,
			lng : -74.0084567,
			icon: 'images/icons/marker.png',
			infoWindow: {
				content: '<p>If you see me, say hello!</p>'
			}
		});
	}
})
