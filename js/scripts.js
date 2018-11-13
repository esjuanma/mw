
	var presentationSlide = true;

	$(document).ready(function () {

		FirstLoad();
		PageAnim();
		PageShare();
		HeroHeight();
		OpenAbout();
		ProjectExpander();
		FullPage();
		ClassicSlider();
		MagnificPopup();
		Shortcodes();
		ContactForm();
		AboutUsFix();

	});

	$(window).on('resize', function () {
		HeroHeight();
	});

	$(window).scroll(function () {
		HeroParallax();
	});


	/*--------------------------------------------------
	Function Firs tLoad
	---------------------------------------------------*/

	function FirstLoad() {

		$('body').jpreLoader({
			loaderVPos: '0',
			autoClose: false,
		});

		setTimeout(function () {
			$('.loader-overlay').fadeOut();
		}, 1500);

		$('header').removeClass('hidden');

		$('body').waitForImages({
			finished: function () {
				setTimeout(function () {
					$("#hero").removeClass("hidden");
				}, 1000);
			},
			waitForAll: true
		});

	} // End First Load



	/*--------------------------------------------------
	Function Page Animation
	---------------------------------------------------*/


	function PageAnim() {

		$(".animsition").animsition({
			inClass: 'fade-in',
			outClass: 'fade-out',
			inDuration: 150,
			outDuration: 400,
			linkElement: '.animation-link',
			loading: true,
			loadingParentElement: 'body',
			loadingClass: 'animsition-loading',
			loadingInner: '',
			timeout: true,
			timeoutCountdown: 15000,
			onLoadEvent: true,
			browser: ['animation-duration', '-webkit-animation-duration'],
			overlay: false,
			overlayClass: 'animsition-overlay-slide',
			overlayParentElement: 'body',
			transition: function (url) { window.location.href = url; }
		});

	} // End Page Animation



	/*--------------------------------------------------
	Function Page Share
	---------------------------------------------------*/

	function PageShare() {

		$('#page-content').append('<share-button class="share-button"></share-button>');

		setTimeout(function () {
			config = {
				networks: {
					pinterest: {
						enabled: false
					},
					googlePlus: {
						enabled: false
					},
					reddit: {
						enabled: false
					},
					linkedin: {
						enabled: false
					},
					whatsapp: {
						enabled: false,
						url: 'http://google.com/'
					},
					email: {
						enabled: true,
						address: 'monika.a.waszkiewicz@gmail.com',
						subject: '',
						body: ''
					}
				}
			}

			var share = new ShareButton('.share-button', config);

		}, 1000);

	} // End PageShare



	/*--------------------------------------------------
	Function Hero Height
	---------------------------------------------------*/

	function HeroHeight() {

		$('#hero').css('height', window.innerHeight + 'px');

	} // End Hero Height



	/*--------------------------------------------------
	Function Hero Parallax
	---------------------------------------------------*/

	function HeroParallax() {
		// if( block_intro.length > 0 ) var block_intro_top = block_intro.offset().top;	

		// var hero_height = $('#hero-styles').height();

		if ($('#hero-styles').hasClass('parallax-hero')) {
			var block_intro = $('#hero-styles');
			var current_top = $(document).scrollTop();
			block_intro.css('transform', 'translate3d(0, ' + current_top * 0.5 + 'px, 0)');
		}

	} // End Hero Parallax			



	/*--------------------------------------------------
	Function Open About
	---------------------------------------------------*/

	function OpenAbout() {

		function toggle(scroll) {
			$.fn.fullpage.setAllowScrolling(scroll);
			$(".about-open").toggleClass("hidden");
			$(".about-close").toggleClass("hidden");
			$("#about-us").toggleClass("is-active");
		}

		$("li.about-open").on('click', function () {
			toggle(false);
		});

		$("li.about-close").on('click', function () {
			toggle(true);
			$('#about-us').animate({ scrollTop: 0 }, 200);
		});

	} // End Open About



	/*--------------------------------------------------
	Function Progress Bar
	---------------------------------------------------*/

	function ProgressBar() {

		var getMax = function () {
			return $(document).height() - $(window).height();
		}

		var getValue = function () {
			return $(window).scrollTop();
		}

		if ('max' in document.createElement('progress')) {
			var progressBar = $('progress');

			progressBar.attr({ max: getMax() });

			$(document).on('scroll', function () {
				progressBar.attr({ value: getValue() });
			});

			$(window).resize(function () {
				progressBar.attr({ max: getMax(), value: getValue() });
			});
		}
		else {
			var progressBar = $('.progress_bar'),
				max = getMax(),
				value, width;

			var getWidth = function () {
				value = getValue();
				width = (value / max) * 100;
				width = width + '%';
				return width;
			}

			var setWidth = function () {
				progressBar.css({ width: getWidth() });
			}

			$(document).on('scroll', setWidth);
			$(window).on('resize', function () {
				max = getMax();
				setWidth();
			});
		}

		$('#flat').addClass("active");
		$('#progressBar').addClass('flat');

		$('#flat').on('click', function () {
			$('#progressBar').removeClass().addClass('flat');
			$('a').removeClass();
			$(this).addClass('active');
			$(this).preventDefault();
		});


	} // End Progress Bar	



	/*--------------------------------------------------
	Function Show Hide Header
	---------------------------------------------------*/

	var ShowHideHeader = (function() {
		var interval;
		var checkInterval;
		var onScroll;

		ProjectExpander.cleanProjectEvents = function() {
			clearInterval(interval);
			clearInterval(checkInterval);
			$(window).off('scroll', onScroll);
		};

		return function ShowHideHeader () {
			var $header = $('header');
			var $closeButton = $('#project_close');
			var $window = $(window);
	
			var didScroll;
			var lastScrollTop = 0;
			var navbarHeight = $header.outerHeight() - 140;
				
			// Defines callback
			onScroll = function (event) {
				didScroll = true;
	
				var blackHeaderShow = $window.scrollTop() > 100;
				
				$header.toggleClass('black-header', blackHeaderShow);
				$closeButton.toggleClass('black-header', blackHeaderShow);
			};
	
			// Creates interval loop
			interval = setInterval(function () {
				if (didScroll) {
					hasScrolled();
					didScroll = false;
				}
			}, 50);

			checkInterval = setInterval(function () {
				if ($(this).scrollTop() < 20) {
					scrollUp();
				}
			}, 700);
	
			// Add event listener
			$(window).on('scroll', onScroll);
	
			function scrollUp() {
				// Scroll Up
				$header.removeClass('nav-up').addClass('nav-down');
				$closeButton.removeClass('nav-up').addClass('nav-down');
			}

			function scrollDown() {
				// Scroll Down
				$header.removeClass('nav-down nav-up-temp').addClass('nav-up');
				$closeButton.removeClass('nav-down').removeClass('nav-up-temp').addClass('nav-up');
			}

			// Helper fn
			function hasScrolled() {
				var scrollTop = $(this).scrollTop();
				if (scrollTop < 0) {
					scrollTop = 0;
				}
				
				if (Math.abs(lastScrollTop - scrollTop) <= 5 && scrollTop > 5) {
					return;
				}
	
				if(scrollTop === 0) {
					scrollUp();
				} else if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
					scrollDown();
				} else if (scrollTop + $(window).height() < $(document).height()) {
					scrollUp();
				}
	
				lastScrollTop = scrollTop;
			}
	
		}
	}()) // End Show Hide Header



	/*--------------------------------------------------
	Function Project Expander
	---------------------------------------------------*/

	function ProjectExpander() {

		$('#showcase-slider .section .open-project-link').on('click', function () {

			$('#menu').addClass('hidden');
			$('#progressBar').addClass('active');
			$.fn.fullpage.setAllowScrolling(false);

			var myUrl = $(this).find('.open-project').attr("href") + " .item-data";

			$('.disable-section').addClass('active');

			setTimeout(function () {
				$('#loader-line-box').addClass('is-open');
			}, (200));
		
			setTimeout(function () {
				$("#project-page-data").load(myUrl, function (e) {

					$('#project-page-holder').waitForImages({
						finished: function () {
							var $projectNext = $('#project_next');

							///Init scripts here
							if ($projectNext.length) {
								// Since mobile changes the height when URL bar is hidden,
								// we need to use screen.height
								$projectNext.css('height', (
									window.innerWidth < 1024
										? window.screen.height // for mobile
										: window.innerHeight // for desktop / tablet
								) + "px");

								$(".project-link").on({
									mouseenter: function () {
										$projectNext.addClass("hover");
									},
									mouseleave: function () {
										$projectNext.removeClass("hover");
									}
								});

								$("#project_close").on({
									mouseenter: function () {
										$('#menu').addClass("hover");
									},
									mouseleave: function () {
										$('#menu').removeClass("hover");
									}
								});
							}

							ClassicSlider();
							Shortcodes();
							MagnificPopup();

							setTimeout(function () {

								$('#project-page-data').addClass('is-open');
								
								setTimeout(function () {
									$('#project-page-holder, #project-page-data').height($('.project-page').height());
								}, (500));

								setTimeout(function () {
									$('#loader-line-box').removeClass('is-open');
									$('#fp-nav').addClass('hidden');
									$('.section-info').addClass('hidden');
									$('#showcase-nav').addClass('hidden');
									$('.share-button').addClass('hidden');
									$('#showcase-slider').removeClass('delay');
									
									setTimeout(function () {
										$("#project_close").removeClass("hide");
									}, (400));
									
									setTimeout(function () {
										$('html, body').animate({ scrollTop: 400 }, 800);
										$('#project_next').footerReveal({ shadow: false, zIndex: 0 });
										ProgressBar();
										ShowHideHeader();
									}, (1000));
								}, (300));

							}, (500));
						},
						waitForAll: true
					});

				});

			}, (500));

			return false;

		});

		$(document).on('click', '#project_close', function (event) {
			$('#showcase-slider').removeClass('expanded');
			$('html, body').animate({ scrollTop: 0 }, 800);
			$.fn.fullpage.setAllowScrolling(true);
			$('#menu').removeClass('hover');
			$('.section-info').removeClass('hidden');
			
			setTimeout(function () {
				$('.hamburger').removeClass('hidden');
			}, (500));
			
			setTimeout(function () {
				$("#project_close").addClass("hide");
				$('#menu').removeClass('hidden');
				$('#fp-nav').removeClass('hidden');
				$('#showcase-nav').removeClass('hidden');
				$('.share-button').removeClass('hidden');
				$('#showcase-slider').addClass('delay');

				$(".project-page").remove();
				$('#project-page-data').removeClass('is-open');
				$('#project-page-holder, #project-page-data').height('0');
			}, 1100);
			
			setTimeout(function () {
				$('.blog-right').removeClass('active');
			}, 1300);

			setTimeout(function () {
				$('.blog-left').removeClass('inactive');
				$('.disable-section').removeClass('active');

				// Last thing
				ProjectExpander.cleanProjectEvents();
			}, 1550);

			return false;
		});

		$(document).on('click', '.project-link', function (event) {
			$('#showcase-slider').addClass('expanded');

			if(presentationSlide && $('.fp-section.active').is(':last-child')) {
				$.fn.fullpage.moveTo(2);
			} else {
				$.fn.fullpage.moveSectionDown();
			}
			
			$("#project_next").addClass("disabled");
			$('#progressBar').removeClass('active');
			$(".next-project-footer").addClass("disabled");
			setTimeout(function () {
				$('header').addClass('nav-up-temp');
				$('#project_close').addClass('nav-up-temp');
			}, (220));
			$('html, body').animate({ scrollTop: $("#nav-anchor").offset().top }, 200);
			setTimeout(function () { $('html, body').animate({ scrollTop: 0 }, 0); }, (300));
			$("#project_close").removeClass("hide");
			setTimeout(function () { $('#showcase-slider .section.active a.open-project').trigger('click'); }, (600));
			return false;
		});

	} // End Project Expander



	/*--------------------------------------------------
	Function FullPage
	---------------------------------------------------*/

	function FullPage() {

		if (!$('#showcase-slider').length) return;

		$('#showcase-slider').fullpage({
			css3: true,
			navigation: true,
			loopBottom: true,
			loopTop: true,
			navigationPosition: 'right',
			onLeave: function (index, nextIndex, direction) {

				$(window).scroll(function () {
					if(!$(".active").hasClass("video")) return;

					if ($(window).scrollTop() >= $('#hero').height() - 150) {
						video.pause();
					} else {
						video.play();
					}
				});
			}
		});

		$.fn.fullpage.setKeyboardScrolling(false);

		$('.showcase-prev').on('click', function () {
			$.fn.fullpage.moveSectionUp();
		});

		$('.showcase-next').on('click', function () {
			$.fn.fullpage.moveSectionDown();
		});

	} //End FullPage



	/*--------------------------------------------------
	Function Classic Slider
	---------------------------------------------------*/

	function ClassicSlider() {

		$('.classic-slider').flexslider({
			animation: "slide",
			direction: "horizontal",
			animationSpeed: 1000,
			animationLoop: true,
			smoothHeight: false,
			controlNav: false,
			slideshow: false,
		});

	} //End ClassicSlider



	/*--------------------------------------------------
	Function MagnificPopup
	---------------------------------------------------*/

	function MagnificPopup() {

		var mfp = $('.mfp-gallery');
		if (!mfp.length) return;
		mfp.each(function (index, element) {
			$(element).magnificPopup({
				delegate: 'a.mf-zoom',
				type: 'image',
				image: {
					markup: '<div class="mfp-figure">' +
						'<div class="mfp-close"></div>' +
						'<div class="mfp-img"></div>' +
						'</div>' +
						'<div class="mfp-bottom-bar">' +
						'<div class="mfp-title"></div>' +
						'<div class="mfp-counter"></div>' +
						'</div>',

					cursor: 'mfp-zoom-out-cur',

					verticalFit: true, // Fits image in area vertically

					tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
				},
				gallery: {
					enabled: true,
					tCounter: '<span class="mfp-counter">%curr% / %total%</span>' // markup of counter
				},
				mainClass: 'mfp-zoom-in',
				tLoading: '',
				removalDelay: 300, //delay removal by X to allow out-animation
				callbacks: {
					imageLoadComplete: function () {
						var self = this;
						setTimeout(function () {
							self.wrap.addClass('mfp-image-loaded');
						}, 16);
					},
					close: function () {
						this.wrap.removeClass('mfp-image-loaded');
					}
				},
				closeBtnInside: false,
				closeOnContentClick: true,
				midClick: true
			});
		});

	} // End MagnificPopup



	/*--------------------------------------------------
	Function Shortcodes
	---------------------------------------------------*/

	function Shortcodes() {

		//Progress bar animations	
		$('.progress-bar li').each(function (i) {
			$(this).appear(function () {
				var percent = $(this).find('span').attr('data-width');
				var $endNum = parseInt($(this).find('span strong i').text(), 10);
				var $that = $(this);
				$(this).find('span').animate({
					'width': percent + '%'
				}, 1600, function () {
				});
				$(this).find('span strong').animate({
					'opacity': 1
				}, 1400);
				$(this).find('span strong i').countTo({
					from: 0,
					to: $endNum,
					speed: 1200,
					refreshInterval: 30,
					onComplete: function () { }
				});
				if (percent == '100') {
					$that.find('span strong').addClass('full');
				}
			});
		});

		// Milestone counters
		if (jQuery('.clapat-counter').length > 0) {
			$('.clapat-counter').each(function () {
				$(this).appear(function () {
					var $endNum = parseInt($(this).find('.number').text(), 10);
					$(this).find('.number').countTo({
						from: 0,
						to: $endNum,
						speed: 1500,
						refreshInterval: 30
					});
				}, { accX: 0, accY: 0 });
			});
		}

		// Text Carousel
		if ($('.text-carousel').length > 0) {
			$(".text-carousel").owlCarousel({
				loop: true,
				dots: true,
				dotsEach: 1,
				items: 1,
				autoplay: true,
				smartSpeed: 750,
				autoplayHoverPause: true
			});
		}

		// Appear Item Animation
		$('.has-animation').each(function () {
			$(this).appear(function () {
				$(this).delay($(this).attr('data-delay')).queue(function (next) {
					$(this).addClass('animate-in');
					next();
				});
			});

		});

	} //End Shortcodes




	/*--------------------------------------------------
	Function Contact Formular
	---------------------------------------------------*/

	function ContactForm() {

		if (!jQuery('#contact-formular').length) return;

		$('#contactform').submit(function () {
			var action = $(this).attr('action');
			$("#message").slideUp(750, function () {
				$('#message').hide();
				$('#submit').attr('disabled', 'disabled');
				$.post(action, {
					name: $('#name').val(),
					email: $('#email').val(),
					comments: $('#comments').val()
				},
					function (data) {
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow', function () { $(this).remove() });
						$('#submit').removeAttr('disabled');
						if (data.match('success') != null) $('#contactform').slideUp('slow');

					}
				);
			});
			return false;
		});
		
	} // End ContactForm


	/*--------------------------------------------------
	Fix about-us showing up on some devices
	---------------------------------------------------*/

	function AboutUsFix() {

		setTimeout(function() {
			$('#about-us').addClass('ready');
		}, 400);
		
	} // End About us fix
	