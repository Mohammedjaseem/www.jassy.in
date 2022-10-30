(function($) {
	
	"use strict";
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(200).fadeOut(500);
		}
	}
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var sticky_header = $('.main-header .sticky-header, .header-style-two .outer-container, .header-style-four .header-lower, .header-style-six .outer-container');
			var scrollLink = $('.scroll-to-top');
			if (windowpos > 55) {
				siteHeader.addClass('fixed-header');
				sticky_header.addClass("animated slideInDown");
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				sticky_header.removeClass("animated slideInDown");
				scrollLink.fadeOut(300);
			}
		}
	}
	
	headerStyle();

		// FLYOUT SEARCH BAR
		$(".header-searchbar i").on("click", function(){
			$("body").toggleClass("flyout-searchbar-active");
		});
		$(".search-close").on("click", function(){
			$("body").removeClass("flyout-searchbar-active");
		});
		// SIDEBAR SEARCH BUTTON CHANGE
		$(".search-form").each(function(){
			$(this).find("input[type=submit]").replaceWith("<button type='submit'><i class='fa fa-search'></i></button>");
		});

	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});

		//Megamenu Toggle
		$('.main-header .main-menu li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('.mega-menu').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
	}


	//Sidenav Two Toggle
	if($('.sidenav-bar, .hidden-bar').length){
		
		//Dropdown Button
		$('.sidenav-bar .navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
			var ParentBox = $(this).parent('li');
			if($(ParentBox).hasClass('active')===true){
				$(ParentBox).removeClass('active');
			}else{
				$('.sidenav-bar .navigation li.dropdown').removeClass('active');
				$(this).parent('li').addClass('active');
			}
		});
	
		$(".sidenav-bar .side-nav .navigation li.dropdown > ul").slideUp();

		//Dropdown Button
		$('.sidenav-bar .side-nav .navigation li.dropdown > a').on('click', function() {
			$(this).next('ul').slideToggle(400);
			$(this).parent().siblings().find("ul").slideUp(400);
		});

		//Show Sidebar Button
		$('.main-header .nav-toggler').on('click', function(e) {
			e.preventDefault();
			$('body').toggleClass('active-side-nav');
		});
		
		//Dropdown Button
		$('.sidenav-bar .cross-icon, .hidden-bar .cross-icon, .form-back-drop').on('click', function(e) {
			e.preventDefault();
			$('body').removeClass('active-side-nav');
		});
	}


	//Product Tabs
	if($('.project-section').length){
		$('.project-section .product-tab-btns .p-tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).hasClass('actve-tab')){
				return false;
			}else{
				$('.project-section .product-tab-btns .p-tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				$('.project-section .p-tabs-content .p-tab').removeClass('active-tab');
				$(target).addClass('active-tab');
			}
		});
	}


	// Image & Thumb Carousel
	if ($('.banner-section .banner-carousel').length && $('.banner-section .thumbs-carousel').length) {

		var $sync1 = $(".banner-section .banner-carousel"),
			$sync2 = $(".banner-section .thumbs-carousel"),
			flag = false,
			duration = 500;

			$sync1
				.owlCarousel({
					loop:true,
					items: 1,
					margin: 0,
					nav: true,
					navText: [ '<span class="fa fa-long-arrow-left"></span> prev', 'next<span class="fa fa-long-arrow-right"></span>' ],
					dots: true,
					autoplay: true,
					autoplayTimeout: 5000
				})
				.on('changed.owl.carousel', function (e) {
					if (!flag) {
						flag = false;
						$sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
						flag = false;
					}
				});

			$sync2
				.owlCarousel({
					loop:true,
					margin: 20,
					items: 1,
					nav: true,
					navText: [ '<i class="flaticon-next"></i> prev', 'next<i class="flaticon-next"></i>' ],
					dots: false,
					center: false,
					autoplay: false,
					autoplayTimeout: 5000,
					responsive: {
						0:{
				            items:1
				        },
				        400:{
				            items:1
				        },
				        600:{
				            items:1,
				        },
				        800:{
				            items:1
				        },
				        1024:{
				            items:1
				        }
				    },
				})
				
		.on('click', '.owl-item', function () {
			$sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
		})
		.on('changed.owl.carousel', function (e) {
			if (!flag) {
				flag = true;		
				$sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
				flag = false;
			}
		});

	}
			


	//Banner Carousel Two
	if ($('.banner-carousel-two').length) {
		$('.banner-carousel-two').owlCarousel({
			animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:false,
			smartSpeed: 15000,
			mouseDrag:false,
			touchDrag:false,
			autoHeight: true,
			autoplay: false,
			autoplayTimeout:10000,
			navText: [ '<span class="fa fa-long-arrow-left"></span> prev', 'next<span class="fa fa-long-arrow-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:1
				},
			}
		});    		
	}

	//Banner Carousel
	if ($('.banner-carousel-three').length) {
		$('.banner-carousel-three').owlCarousel({
			animateOut: 'fadeOut',
		    animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout:10000,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:1
				},
			}
		});    		
	}


	//Services Carousel
	if ($('.services-carousel').length) {
		$('.services-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				767:{
					items:2
				},
				1024:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});    		
	}


	//Testimonial Carousel
	if ($('.testimonial-carousel').length) {
		$('.testimonial-carousel').owlCarousel({
			animateOut: 'slideOutDown',
		    animateIn: 'zoomIn',
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 10000,
			autoHeight: true,
			autoplay: true,
			autoplayTimeout:10000,
			navText: [ '<span class="fa fa-chevron-left"></span>', '<span class="fa fa-chevron-right"></span>' ],
			dots: true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:1
				}
			}
		});     		
	}

	//Testimonial Carousel two
	if ($('.testimonial-carousel-two').length) {
		$('.testimonial-carousel-two').owlCarousel({
			loop:true,
			margin:40,
			dots:true,
			nav:false,
			smartSpeed: 700,
			autoplay: true,
			navText: [ '<span class="fa fa-long-arrow-left"></span> prev', 'next<span class="fa fa-long-arrow-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				768:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:2
				}
			}
		});    		
	}

	//News Carousel
	if ($('.news-carousel').length) {
		$('.news-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			navText: [ '<span class="fa fa-level-up-alt"></span> Prev', 'Next<span class="fa fa-level-down-alt"></span>' ],
			responsive:{
				0:{
					items:1
				},
				767:{
					items:1
				},
				1024:{
					items:2
				}
			}
		});    		
	}

	//News Carousel
	if ($('.news-carousel-two').length) {
		$('.news-carousel-two').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 700,
			autoplay: true,
			navText: [ '<span class="fa fa-level-up-alt"></span> Prev', 'Next<span class="fa fa-level-down-alt"></span>' ],
			responsive:{
				0:{
					items:1
				},
				767:{
					items:1
				},
				1024:{
					items:2
				}
			}
		});    		
	}


	//Products Carousel
	if ($('.blog-carousal').length) {
		$('.blog-carousal').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			items:1,
			center:false,
			smartSpeed: 700,
			autoplay: true,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:1
				}
			}
		});    		
	}
	

	//Projects Carousel
	if ($('.projects-carousel').length) {
		$('.projects-carousel').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: false,
			navText: [ '<span class="fa fa-level-up-alt"></span> Prev', 'Next<span class="fa fa-level-down-alt"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:2
				},
				1024:{
					items:3
				},
				1400:{
					items:3
				}
			}
		});    		
	}


	//Projects Carousel
	if ($('.projects-carousel-three').length) {
		$('.projects-carousel-three').owlCarousel({
			animateOut: 'slideOutDown',
		    animateIn: 'zoomIn',
			loop:true,
			margin:0,
			items:1,
			nav:false,
			smartSpeed: 700,
			autoplay: false,
			navText: [ '<span class="fa fa-level-up-alt"></span> Prev', 'Next<span class="fa fa-level-down-alt"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1400:{
					items:1
				}
			}
		});    		
	}

	//Projects Carousel
	if ($('.recent-portfolio-carousal').length) {
		$('.recent-portfolio-carousal').owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			smartSpeed: 700,
			autoplay: false,
			navText: [ '<span class="fa fa-level-up-alt"></span> Prev', 'Next<span class="fa fa-level-down-alt"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:2
				},
				1400:{
					items:3
				}
			}
		});    		
	}	
	

	//Sponsors Carousel
	if ($('.sponsors-carousel').length) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 950,
			autoplay: true,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				768:{
					items:3
				},
				1024:{
					items:4
				},
				1400:{
					items:5
				},
			}
		});    		
	}

	//Services Carousel
	if ($('.services-carousel-two').length) {
		$('.services-carousel-two').owlCarousel({
			loop:true,
			margin:0,
			nav:false,
			center:true,
			smartSpeed: 700,
			autoplay: true,
			navText: [ '<span class="fa fa-long-arrow-left"></span> prev', 'next<span class="fa fa-long-arrow-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});    		
	}

	//Services Carousel
	if ($('.services-carousel-three').length) {
		$('.services-carousel-three').owlCarousel({
			loop:false,
			margin:0,
			nav:false,
			center:false,
			smartSpeed: 700,
			autoplay: false,
			navText: [ '<span class="fa fa-long-arrow-left"></span> prev', 'next<span class="fa fa-long-arrow-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:2
				},
				1200:{
					items:4
				}
			}
		});    		
	}

	
	//Products Carousel
	if ($('.products-carousel').length) {
		$('.products-carousel').owlCarousel({
			loop:true,
			margin:0,
			dots: true,
			nav:false,
			smartSpeed: 700,
			autoplay: true,
			navText: [ '<span class="fa fa-long-arrow-left"></span> prev', 'next<span class="fa fa-long-arrow-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				1024:{
					items:3
				},
				1200:{
					items:4
				}
			}
		});    		
	}

	
	//Fact Counter + Text Count
	if($('.count-box').length){
		$('.count-box').appear(function(){
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		},{accY: 0});
	}
	
	//Sortable Masonary with Filters
	function enableMasonry() {
		if($('.sortable-masonry').length){
	
			var winDow = $(window);
			// Needed variables
			var $container=$('.sortable-masonry .items-container');
			var $filter=$('.filter-btns');
	
			$container.isotope({
				filter:'*',
				 masonry: {
					columnWidth : '.masonry-item.small-column'
				 },
				animationOptions:{
					duration:500,
					easing:'linear'
				}
			});
			
	
			// Isotope Filter 
			$filter.find('li').on('click', function(){
				var selector = $(this).attr('data-filter');
	
				try {
					$container.isotope({ 
						filter	: selector,
						animationOptions: {
							duration: 500,
							easing	: 'linear',
							queue	: false
						}
					});
				} catch(err) {
	
				}
				return false;
			});
	
	
			winDow.on('resize', function(){
				var selector = $filter.find('li.active').attr('data-filter');

				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 500,
						easing	: 'linear',
						queue	: false
					}
				});
			});
	
	
			var filterItemA	= $('.filter-btns li');
	
			filterItemA.on('click', function(){
				var $this = $(this);
				if ( !$this.hasClass('active')) {
					filterItemA.removeClass('active');
					$this.addClass('active');
				}
			});
		}
	}
	
	enableMasonry();

	//Gallery Filters
	 if($('.filter-list').length){
	 	 $('.filter-list').mixItUp({});
	 }

	 //Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}


	//Progress Bar
	if($('.progress-levels .progress-box .bar-fill').length){
		$(".progress-box .bar-fill").each(function() {
			var progressWidth = $(this).attr('data-percent');
			$(this).css('width',progressWidth+'%');
			$(this).children('.percent').html(progressWidth+'%');
		});
	}
	

	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}

	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}


	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox({
			openEffect  : 'fade',
			closeEffect : 'fade',
			helpers : {
				media : {}
			}
		});
	}
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
				},
				message: {
					required: true
				}
			}
		});
	}

	//Hidden Sidebar
	if ($('.sidenav-bar').length) {
		$('.sidenav-bar').mCustomScrollbar({
		    theme:"dark"
		});
	}

	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       false,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}



/* ==========================================================================
	When document is resize, do
   ========================================================================== */
   $(window).on('resize', function() {
				
	});


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});	

})(window.jQuery);