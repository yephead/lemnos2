(function($) {
    "use strict";


    $(window).on("load", function() { // makes sure the whole site is loaded
        //preloader
        $("#status").fadeOut(); // will first fade out the loading animation
        $("#preloader").delay(450).fadeOut("slow"); // will fade out the white DIV that covers the website. 

        //slider homepage setting
        if ($('.home-slider').find('.slide').length > 1) {
            $(".home-slider").owlCarousel({
                navigation: false, // Hide next and prev buttons
                slideSpeed: 300,
                autoplay: true,
                autoHeight: true,
                pagination: true,
                paginationSpeed: 300,
                singleItem: true,
                transitionStyle: "fade"
            });
        }

        //about slider setting
        if ($('.about-slider').find('.slide').length > 1) {
            $(".about-slider").owlCarousel({
                navigation: false, // Hide next and prev buttons
                slideSpeed: 300,
                autoplay: true,
                autoHeight: true,
                pagination: false,
                paginationSpeed: 300,
                singleItem: true,
                transitionStyle: "fade"
            });
        }
        //replace the data-background into background image
        $(".img-bg").each(function() {
            var imG = $(this).data('background');
            $(this).css('background-image', "url('" + imG + "') "

            );
        });

        // script popup image
        $('.popup-img').magnificPopup({
            type: 'image'
        });

        //move to hash after loading
        if (window.location.hash) {
			var menuheigt = $( ".header" ).height();
            $('html, body').stop().animate({
                scrollTop: $(window.location.hash).offset().top - menuheigt
            }, 300, 'linear');
        }

        //google map load
        $('#map_canvas').gmap({
            'center': '-6.94010,107.62575',
            'zoom': 15,
            scrollwheel: false,
            'disableDefaultUI': false,
            'styles': [{
                stylers: [{
                    lightness: 7
                }, {
                    saturation: -100
                }]
            }],
            'callback': function() {
                var self = this;
                self.addMarker({
                        'position': this.get('map').getCenter(),
                        icon: 'images/office-building.png',
                    })
                    .click(function() {
                        self.openInfoWindow({
                            'content': $('.map-content').html()
                        }, this);
                    });
            }
        });
    });

    //create menu for tablet/mobile
    $(".menu-box .navigation").clone(false).find("ul,li").removeAttr("id").remove(".sub-menu").appendTo($(".mobile-menu"));
    $(".mobile-menu .sub-menu").remove();
    $('.mobile-menu').on('show.bs.collapse', function() {
        $('body').on('click', function() {
            $('.mobile-menu').collapse('hide');
        })
    })

    //toggle menu
    $('.menu-btn').on('click', function() {
        $('.mobile-menu').collapse({
            toggle: false
        });
    })

    //menu for tablet/mobile,slider button, about button scrolling
    $('.mobile-menu a,.sl-btn,.ab-btn').on('click', function() {
        var $anchor = $(this);
		var menuheigt = $( ".header" ).height();
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - menuheigt
        }, 800, 'linear');
    });


    //Page scrolling
	var menuheigt = $( ".header" ).height();
    $('.home-section .menu-box .navigation').onePageNav({
        filter: ':not(.external)',
        scrollThreshold: 0.25,
        scrollOffset: menuheigt
    });

    //sticky navigation
    $(".for-sticky").sticky({
        topSpacing: 0
    });

    // Video responsive
    $("body").fitVids();

    //add class on touch device
    if (Modernizr.touch) {
        $('body').addClass('no-para');
    }

    //portfolio ajax & scroll on click
    $('.port-ajax').on('click', function() {
        //portfolio ajax setting
        var toLoad = $(this).attr('data-link') + ' .worksajax > *';
        $('.worksajax').slideUp('slow', loadContent);

        function loadContent() {
            $('.worksajax').load(toLoad, '', showNewContent)
        }

        function showNewContent() {
            $.getScript("js/portfolio.js");
            $('.worksajax').slideDown('slow');
        }
        var $anchor = $('#worksajax');

        //portfolio scrolling
		var menuheigt = $( ".header" ).height();
        $('html, body').stop().animate({
            scrollTop: $($anchor).offset().top - menuheigt
			
        }, 1000, 'linear');
        return false;
    });


	//background ticker (bg2/testimonial)
    $('.big-ticker:has(>div:eq(1))').list_ticker({
        speed: 7000,
        effect: 'fade'
    });

    //isotope setting(portfolio)
    var $container = $('.portfolio-body');
    $container.imagesLoaded(function() {
        $container.isotope();
    });

    // filter items when filter link is clicked
    $('.port-filter a').on('click', function() {
        var selector = $(this).attr('data-filter');
        $container.isotope({
            itemSelector: '.port-item',
            filter: selector
        });
        return false;
    });

    //adding active state to portfolio filtr
    $(".port-filter a").on('click', function() {
        $(".port-filter a").removeClass("active");
        $(this).addClass("active");
    });
	
	//button scroll
	$('.spc-btn').on('click', function (event) {
		var $anchor = $(this);
		var menuheigt = $( ".header" ).height();
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - menuheigt
		}, 800, 'linear');
		event.preventDefault();
	});

})(jQuery);