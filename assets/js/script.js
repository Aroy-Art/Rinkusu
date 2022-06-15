/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});

/* ========================================================================= */
/*	lazy load initialize
/* ========================================================================= */
const observer = lozad(); // lazy loads elements with default selector as ".lozad"
observer.observe();


/* ========================================================================= */
/*	Image Preloader
/* ========================================================================= */
function imgIsLoaded(imgElement) {
	$(imgElement).addClass("loaded");
	$(imgElement).removeClass("unloaded");
}


/* ========================================================================= */
/*	Code Copy Button
/* ========================================================================= */
function createCopyButton(highlightDiv) {
	const button = document.createElement("button");
	button.className = "copy-code-button";
	button.type = "button";
	button.innerText = "Copy";
	button.addEventListener("click", () => copyCodeToClipboard(button, highlightDiv));
	addCopyButtonToDom(button, highlightDiv);
  }
  
  async function copyCodeToClipboard(button, highlightDiv) {
	const codeToCopy = highlightDiv.querySelector(":last-child > .chroma > code").innerText;
	try {
	  result = await navigator.permissions.query({ name: "clipboard-write" });
	  if (result.state == "granted" || result.state == "prompt") {
		await navigator.clipboard.writeText(codeToCopy);
	  } else {
		copyCodeBlockExecCommand(codeToCopy, highlightDiv);
	  }
	} catch (_) {
	  copyCodeBlockExecCommand(codeToCopy, highlightDiv);
	}
	finally {
	  codeWasCopied(button);
	}
  }
  
  function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
	const textArea = document.createElement("textArea");
	textArea.contentEditable = 'true'
	textArea.readOnly = 'false'
	textArea.className = "copyable-text-area";
	textArea.value = codeToCopy;
	highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
	const range = document.createRange()
	range.selectNodeContents(textArea)
	const sel = window.getSelection()
	sel.removeAllRanges()
	sel.addRange(range)
	textArea.setSelectionRange(0, 999999)
	document.execCommand("copy");
	highlightDiv.removeChild(textArea);
  }
  
  function codeWasCopied(button) {
	button.blur();
	button.innerText = "Copied!";
	setTimeout(function() {
	  button.innerText = "Copy";
	}, 2000);
  }
  
  function addCopyButtonToDom(button, highlightDiv) {
	highlightDiv.insertBefore(button, highlightDiv.firstChild);
	const wrapper = document.createElement("div");
	wrapper.className = "highlight-wrapper";
	highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
	wrapper.appendChild(highlightDiv);
  }
  
  document.querySelectorAll(".highlight")
	.forEach(highlightDiv => createCopyButton(highlightDiv));
  

jQuery(function ($) {
	"use strict";

	/* ========================================================================= */
	/*	lazy load initialize
	/* ========================================================================= */

	const observer = lozad(); // lazy loads elements with default selector as ".lozad"
	observer.observe();

	/* ========================================================================= */
	/*	Magnific popup
	/* =========================================================================  */
	$('.image-popup').magnificPopup({
		type: 'image',
		removalDelay: 160, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		closeOnContentClick: true,
		midClick: true,
		fixedContentPos: false,
		fixedBgPos: true
	});

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
	/* =========================================================================  */

	var containerEl = document.querySelector('.shuffle-wrapper');
	if (containerEl) {
		var Shuffle = window.Shuffle;
		var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
			itemSelector: '.shuffle-item',
			buffer: 1
		});

		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			var input = evt.currentTarget;
			if (input.checked) {
				myShuffle.filter(input.value);
			}
		});
	}

	/* ========================================================================= */
	/*	Art Carousel
	/* =========================================================================  */

	$("#ArtCarousel").slick({
		infinite: true,
		arrows:	false,
		autoplay: true,
		autoplaySpeed: 1500,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: 'ondemand',//'progressive',
		centerMode: true,
  		variableWidth: true
	});

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */

	$("#testimonials").slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000
	});

	/* ========================================================================= */
	/*	animation scroll js
	/* ========================================================================= */

	function myFunction(x) {
		if (x.matches) {
			var topOf = 50
		} else {
			var topOf = 350
		}
	}

	var html_body = $('html, body');
	$('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				html_body.animate({
					scrollTop: target.offset().top - 50
				}, 1500, 'easeInOutExpo');
				return false;
			}
		}
	});

	// easeInOutExpo Declaration
	jQuery.extend(jQuery.easing, {
		easeInOutExpo: function (x, t, b, c, d) {
			if (t === 0) {
				return b;
			}
			if (t === d) {
				return b + c;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			}
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	});

	/* ========================================================================= */
	/*	counter up
	/* ========================================================================= */
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	$(window).on('scroll', function () {
		counter();
	});

});