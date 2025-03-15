const TestColor = '#d4a024'; // 009CDE

$( document ).ready( function() {
	var texts = [
        'SpringBoot', 'Angular', 'MySQL','Docker', 'Kubernetes', 'Linux', 'Python', 'Golang','MongoDB', 'Ansible', 'Terraform',
		'jenkins', 'GitLab', 'Aws', 'OpenShift','Apache','Nginx', 'ELK', 'Grafana', 'Prometheus', 'VMware', 'OpenStack', 'Selenium',
		'Sonarqube', 'Nexus', 'JMeter'
    ];
    var tc = TagCloud('.cloud', texts,{

		// radius in px
		radius: 300,
		direction:-130
	}
		);

// Hide all member-content sections initially
$('.member-location').hide();

		$('.member-title').click(function(e) {
			console.log("Clicked");
			$(this).next().slideToggle();
			$(this).next().next().next().slideToggle();
		  })
		  

} );





$(document).ready(function()
{



	
image();
  function image(){
 
    $(".site-hero").fadeIn(100000);}

  (function() {
    'use strict';
  

   
  
  
    // navigation
    var OnePageNav = function() {
      var navToggler = $('.navbar-toggler');
      $(".smoothscroll[href^='#'], #pb-navbar ul li a[href^='#']").on('click', function(e) {
         e.preventDefault();
         var hash = this.hash;
           
         $('html, body').animate({
  
          scrollTop: $(hash).offset().top
        }, 700, 'easeInOutExpo', function(){
          window.location.hash = hash;
        });
      });
      $("#pb-navbar ul li a[href^='#']").on('click', function(e){
        if ( navToggler.is(':visible') ) {
          navToggler.click();
        }
      });
  
      $('body').on('activate.bs.scrollspy', function () {
        console.log('nice');
      })
    };
    
  
  
    /*----------------------------------------
      Animate Scroll
    ----------------------------------------*/
  
    let contentWayPoint = function() {
      var i = 0;
      $('.site-animate').waypoint( function( direction ) {
  
        if( direction === 'down' && !$(this.element).hasClass('site-animated') ) {
          
          i++;
  
          $(this.element).addClass('item-animate');
          setTimeout(function(){
  
            $('body .site-animate.item-animate').each(function(k){
              var el = $(this);
              setTimeout( function () {
                var effect = el.data('animate-effect');
                if ( effect === 'fadeIn') {
                  el.addClass('fadeIn site-animated');
                } else if ( effect === 'fadeInLeft') {
                  el.addClass('fadeInLeft site-animated');
                } else if ( effect === 'fadeInRight') {
                  el.addClass('fadeInRight site-animated');
                } else {
                  el.addClass('fadeInUp site-animated');
                }
                el.removeClass('item-animate');
              },  k * 100, 'easeInOutExpo' );
            });
            
          }, 100);
          
        }
  
      } , { offset: '95%' } );
    };
  
    var navbarState = function() {
  
      var lastScrollTop = 0;
      $(window).scroll(function(){
  
        var $this = $(this),
             st = $this.scrollTop(),
             navbar = $('.site-navbar');
  
        if ( st > 200 ) {
          navbar.addClass('scrolled');
        } else {
          navbar.removeClass('scrolled awake');
        }
  
        if ( navbar.hasClass('scrolled') && st > 300 ) {
           if (st > lastScrollTop){
            // if (navbar.hasClass('scrolled')) {
              navbar.removeClass('awake');
              navbar.addClass('sleep');
            // }
           } else {
            // if (navbar.hasClass('scrolled')) {
              navbar.addClass('awake');
              navbar.removeClass('sleep');
            // }
           }
           lastScrollTop = st;
        }
  
      });
  
  
  
      $('.site-navbar')
        .mouseenter(function() {
          var $this = $(this);
          $this.addClass('awake');
          $this.removeClass('sleep');
        })
        .mouseleave(function() {
          var $this = $(this);
          $this.addClass('sleep');
          $this.removeClass('awake');
        });
    };
  
    
    
   
 
  
  
  
    $(function(){
  
      OnePageNav();
  
      contentWayPoint();
      navbarState();
     
      
    });
  
    
  
  
  })();
  
  




	"use strict";

	/* 

	1. Vars and Inits

	*/

	var header = $('.header');
	
	var ctrl = new ScrollMagic.Controller();

	setHeader();

	$(window).on('resize', function()
	{
		setHeader();

	
		setTimeout(function()
		{
			jQuery(".main_content_scroll").mCustomScrollbar("update");
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});


	initLoaders();
	bars();
	initMilestones();
	/* 

	2. Set Header

	*/

	function setHeader()
	{
		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}



	/* 

	4. Init Loaders

	*/

	function initLoaders()
	{
		if($('.loader').length)
		{
			var loaders = $('.loader');

			loaders.each(function()
			{
				var loader = this;
				var endValue = $(loader).data('perc');

				var loaderScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var bar = new ProgressBar.Circle(loader,
					{
						color: '#8583e1',
						// This has to be the same size as the maximum width to
						// prevent clipping
						strokeWidth: 3,
						trailWidth: 2,
						trailColor: '#e6e6e6b3',
						easing: 'easeInOut',
						duration: 1400,
						text:
						{
							autoStyleContainer: false
						},
						from:{ color: 'TestColor', width: 1 },
						to: { color: 'TestColor', width: 3 },
						// Set default step function for all animate calls
						step: function(state, circle)
						{
							circle.path.setAttribute('stroke', state.color);
							circle.path.setAttribute('stroke-width', state.width);

							var value = Math.round(circle.value() * 100);
							if (value < 20)
							{
                circle.setText('A2');
							}
							else 	if (value < 40)
							{
								circle.setText('B1');
              }
              else 	if (value < 60)
							{
								circle.setText('B2');
              }
              else 	if (value < 80)
							{
								circle.setText('C1');
							}
              else 	
							{
								circle.setText('C2');
							}
						}
					});
					bar.text.style.fontFamily = '"Montserrat", sans-serif';
					bar.text.style.fontSize = '200%';
					bar.text.style.fontWeight = '700';
					bar.text.style.color = "#fff";


					bar.animate(endValue);  // Number from 0.0 to 1.0
		    	})
			    .addTo(ctrl);
			});
		}
	}


	/* 

	5. Initialize Milestones

	*/

	function initMilestones()
	{
		if($('.milestone_counter').length)
		{
			var milestoneItems = $('.milestone_counter');

	    	milestoneItems.each(function(i)
	    	{
	    		var ele = $(this);
	    		var endValue = ele.data('end-value');
	    		var eleValue = ele.text();

	    		/* Use data-sign-before and data-sign-after to add signs
	    		infront or behind the counter number (+, k, etc) */
	    		var signBefore = "";
	    		var signAfter = "";

	    		if(ele.attr('data-sign-before'))
	    		{
	    			signBefore = ele.attr('data-sign-before');
	    		}

	    		if(ele.attr('data-sign-after'))
	    		{
	    			signAfter = ele.attr('data-sign-after');
	    		}

	    		var milestoneScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var counter = {value:eleValue};
		    		var counterTween = TweenMax.to(counter, 2,
		    		{
		    			value: endValue,
		    			roundProps:"value", 
						ease: Circ.easeOut, 
						onUpdate:function()
						{
							document.getElementsByClassName('milestone_counter')[i].innerHTML = signBefore + counter.value + signAfter;
						}
		    		});
		    	})
			    .addTo(ctrl);
	    	});
		}
	}

	function bars()
	{
		if($('.skill-bar').length)
		{
			var eles = $('.skill-bar');
			var gradNum = 0;

			eles.each(function(i)
			{

				var ele = $(this);
	    		var elePerc = ele.data('perc');
	    		var eleName = '#'+ele.data('name');
	    		var eleColorStart = ele.data('color-start');
	    		var eleColorEnd = ele.data('color-end');
	    		var eleGradient = 'url(#gradient' + gradNum.toString() +')';
	    		let linearGradient = '<defs><linearGradient id="gradient' + gradNum + '" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse"><stop offset="20%" stop-color="'+ eleColorStart +'"/><stop offset="50%" stop-color="'+ eleColorEnd+'"/></linearGradient></defs>';
	    		
	    		var statsScene = new ScrollMagic.Scene({
		    		triggerElement: this,
		    		triggerHook: 'onEnter',
		    		reverse:false
		    	})
		    	.on('start', function()
		    	{
		    		var pbar = new ProgressBar.Line(eleName, 
		    		{
		    			strokeWidth: 1,
						easing: 'easeInOut',
						duration: 1400,
						color: 'TestColor',
						trailColor: '#e6e6e6b3',
						trailWidth: 0,
						svgStyle: {width: '100%', height: '100%'},
					
		    		});
		    		pbar.animate(elePerc);
					pbar.svg.insertAdjacentHTML('afterBegin', linearGradient);
		    	})
		    	.addTo(ctrl);
		    	gradNum++;
			});
		}	
	}

  $(function(){

    window.sr = ScrollReveal();
  
/* window < 700 */

    if ($(window).width() >700) {

      
      sr.reveal('.left', {
        origin: 'left',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 1000,
      });
  
      sr.reveal('.right', {
        origin: 'right',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 1000,
      });
  
    }
    
  
  
  });
  


});



$(document).ready(function(){

	$('#itemslider').carousel({ interval: 2000 });
	
	$('.carousel-showmanymoveone .item').each(function(){
	var itemToClone = $(this);
	
	for (var i=1;i<6;i++) {
	itemToClone = itemToClone.next();
	
	if (!itemToClone.length) {
	itemToClone = $(this).siblings(':first');
	}
	
	itemToClone.children(':first-child').clone()
	.addClass("cloneditem-"+(i))
	.appendTo($(this));
	}
	});
	});
	

	$(document).ready(function(){
		const images = [
		  "res/supcom.png",
		  "res/enstab.png",
		  "res/esprit.png",
		  "res/klabs.png",
		  "res/clevory.png",
		  "res/ted.png",
		  "res/pass.png",
		  "res/gmc.png",

		];
	  
		const sliderInner = $('.company-slider-inner');
		let sliderContent = '';
		const itemsToShow = 3; // Number of items to show at once
	  
		// Create items with proper width
		images.forEach((image, index) => {
		  sliderContent += `
			<div class="company-slider-item" style="flex: 0 0 ${100/itemsToShow}%">
			  <img src="${image}" alt="Company ${index + 1}">
			</div>
		  `;
		});
	  
		// Duplicate items multiple times to ensure smooth infinite loop
		sliderInner.html(sliderContent + sliderContent + sliderContent);
	  
		// Animate the slider
		let currentIndex = 0;
		const totalItems = images.length;
		
		function slideCompanies() {
		  currentIndex++;
		  const slideWidth = -(100/itemsToShow); // Width of one item
		  const position = currentIndex * slideWidth;
		  
		  sliderInner.css('transform', `translateX(${position}%)`);
		  
		  // Reset when we reach the end of original items
		  if (currentIndex >= totalItems) {
			setTimeout(() => {
			  currentIndex = 0;
			  sliderInner.css('transition', 'none');
			  sliderInner.css('transform', 'translateX(0)');
			  // Force reflow
			  sliderInner[0].offsetHeight;
			  sliderInner.css('transition', 'transform 0.5s ease');
			}, 500); // Should match your CSS transition time
		  }
		}
	  
		// Add CSS transition
		sliderInner.css('transition', 'transform 0.5s ease');
		
		setInterval(slideCompanies, 2000); // Slide every 2 seconds
	});