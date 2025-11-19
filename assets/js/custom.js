(function ($) {
	
	"use strict";

	$(function() {
        $("#tabs").tabs();
    });

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	

	$('.schedule-filter li').on('click', function() {
        var tsfilter = $(this).data('tsfilter');
        $('.schedule-filter li').removeClass('active');
        $(this).addClass('active');
        if (tsfilter == 'all') {
            $('.schedule-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.schedule-table').addClass('filtering');
        }
        $('.ts-item').each(function() {
            $(this).removeClass('show');
            if ($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });


	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	 $(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function() {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}

	// Include Header Navigation
	function loadHeader() {
		fetch('header-nav.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('header-placeholder').innerHTML = data;
				// Set active menu item based on current page
				setActiveMenuItem();
			})
			.catch(error => console.error('Error loading header:', error));
	}

	// Include Footer
	function loadFooter() {
		fetch('footer.html')
			.then(response => response.text())
			.then(data => {
				document.getElementById('footer-placeholder').innerHTML = data;
			})
			.catch(error => console.error('Error loading footer:', error));
	}

	// Set active menu item
	function setActiveMenuItem() {
		var currentPage = window.location.pathname.split('/').pop();
		if (currentPage === '' || currentPage === 'index.html') {
			$('.nav a[href="index.html"]').addClass('active');
		} else if (currentPage === 'jobs.html') {
			$('.nav a[href="jobs.html"]').addClass('active');
		} else if (currentPage === 'contact.html') {
			$('.nav a[href="contact.html"]').addClass('active');
		}
	}

	// Load header when document is ready
	$(document).ready(function() {
		if (document.getElementById('header-placeholder')) {
			loadHeader();
		}
		if (document.getElementById('footer-placeholder')) {
			loadFooter();
		}
	});


	// Job Details Page Functionality
	$(document).ready(function() {
		// Content navigation
		$('.nav-btn').on('click', function() {
			var target = $(this).data('target');
			
			// Update navigation buttons
			$('.nav-btn').removeClass('active');
			$(this).addClass('active');
			
			// Show target content section
			$('.content-section').removeClass('active');
			$('#' + target).addClass('active');
		});

		// Gallery functionality
		$('.thumbnail-item').on('click', function() {
			var imageSrc = $(this).find('img').attr('src');
			
			// Update active thumbnail
			$('.thumbnail-item').removeClass('active');
			$(this).addClass('active');
			
			// Update main image
			$('.main-image img').attr('src', imageSrc);
		});

		// Apply Now button functionality
		$('.apply-now-btn').on('click', function() {
			$('#applicationModal').modal('show');
		});

		// Save job functionality
		$('.save-job-btn').on('click', function() {
			$(this).toggleClass('saved');
			var $icon = $(this).find('i');
			
			if ($(this).hasClass('saved')) {
				$icon.removeClass('fa-heart-o').addClass('fa-heart');
				$(this).find('span').text('Saved');
			} else {
				$icon.removeClass('fa-heart').addClass('fa-heart-o');
				$(this).find('span').text('Save Job');
			}
		});

		// Share functionality
		$('.share-job-btn').on('click', function() {
			if (navigator.share) {
				navigator.share({
					title: 'Senior Medical Practitioner - Metropolitan General Hospital',
					text: 'Check out this job opportunity',
					url: window.location.href
				});
			} else {
				// Fallback for browsers without native sharing
				var url = encodeURIComponent(window.location.href);
				var text = encodeURIComponent('Check out this job opportunity: Senior Medical Practitioner');
				
				$('.job-share-card').slideToggle();
			}
		});

		// Social share buttons
		$('.share-btn.facebook').on('click', function(e) {
			e.preventDefault();
			var url = encodeURIComponent(window.location.href);
			window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank', 'width=600,height=400');
		});

		$('.share-btn.twitter').on('click', function(e) {
			e.preventDefault();
			var url = encodeURIComponent(window.location.href);
			var text = encodeURIComponent('Check out this job opportunity: Senior Medical Practitioner');
			window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, '_blank', 'width=600,height=400');
		});

		$('.share-btn.linkedin').on('click', function(e) {
			e.preventDefault();
			var url = encodeURIComponent(window.location.href);
			window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + url, '_blank', 'width=600,height=400');
		});

		$('.share-btn.email').on('click', function(e) {
			e.preventDefault();
			var subject = encodeURIComponent('Job Opportunity: Senior Medical Practitioner');
			var body = encodeURIComponent('Hi,\n\nI found this job opportunity that might interest you:\n\n' + window.location.href + '\n\nBest regards');
			window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
		});

		// Similar job clicks
		$('.similar-job-item').on('click', function() {
			// In a real application, this would navigate to the specific job
			console.log('Navigate to similar job');
		});

		// Application form validation
		$('#jobApplication').on('submit', function(e) {
			e.preventDefault();
			
			var isValid = true;
			var requiredFields = $(this).find('[required]');
			
			requiredFields.each(function() {
				if (!$(this).val()) {
					isValid = false;
					$(this).addClass('is-invalid');
				} else {
					$(this).removeClass('is-invalid');
				}
			});

			if (isValid) {
				// In a real application, this would submit the form data
				alert('Application submitted successfully!');
				$('#applicationModal').modal('hide');
				$(this)[0].reset();
			} else {
				alert('Please fill in all required fields.');
			}
		});

		// File upload validation
		$('input[type="file"]').on('change', function() {
			var fileSize = this.files[0].size / 1024 / 1024; // Size in MB
			var maxSize = 5; // 5MB limit
			
			if (fileSize > maxSize) {
				alert('File size must be less than ' + maxSize + 'MB');
				$(this).val('');
			}
		});

		// Smooth scroll for anchor links
		$('a[href^="#"]').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('href'));
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top - 100
				}, 500);
			}
		});

		// Scroll animations for elements
		$(window).on('scroll', function() {
			var scrollTop = $(window).scrollTop();
			var windowHeight = $(window).height();

			$('.step-item').each(function() {
				var elementTop = $(this).offset().top;
				if (scrollTop + windowHeight > elementTop + 100) {
					$(this).addClass('animate-in');
				}
			});
		});

		// Initialize AOS with smooth configuration
		AOS.init({
			disable: false,
			startEvent: 'DOMContentLoaded',
			offset: 120,
			delay: 0, 
			duration: 550,
			easing: 'ease-in-out',
			once: true, 
			mirror: false,
			anchorPlacement: 'top-bottom' 
		});
	});

})(window.jQuery);