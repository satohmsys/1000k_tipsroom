
var $w = $( window ),
	$body = $( 'body' ),
	$jsEffect = $('.js-effect'),
	$flag = true,
	$scrollVal = 0,
	$scrollValBottom = 0;

function getScrollVal( callback ){
	var $w = $( window );

	$w.on( 'scroll load', function(){
		var $scrollVal = $w.scrollTop();
			callback( $scrollVal);
	})
} 



/**
* loading anim
*/

$w.on( 'load', function() {
	$body.addClass( '-is-rendered')
});
$( '#logo' ).on( 'transitionend', function( e ){
	e.stopPropagation();
	$body.addClass( '-is-loaded' );		
	
	$( '.loadingAnim' ).on( 'transitionend', function( e ){
		$( this ).remove()
	});
});

// $w.on( 'load', function() {
// 	$body.addClass( '-is-rendered')
// });
// setTimeout( function(){
// 	$body.addClass( '-is-loaded' );		
// }, 1900 );
// $( '#logo' ).on( 'transitionend', function( e ){
// 	e.stopPropagation();
// });
// $( '.loadingAnim' ).on( 'transitionend', function( e ){
// 	$( this ).remove()
// });




/**
* スクロール値を取得する
*/
$w.on( 'scroll load', function() {
	$scrollVal = $w.scrollTop();
	$scrollBottom = $scrollVal + $w.height();


	/**
	* all fadein targets
	*/
	if( $jsEffect ){
		$.each( $jsEffect, function(){
			var $target = $( this );

			if( $target.offset().top < $scrollBottom - 90 ) {
				$target.addClass( '-on' );
			}
		});				
	}

	/**
	* navigation roll Up, Down
	*/
	100 < $scrollVal ? $( 'body' ).addClass( '-is-scrolled' ) : $( 'body' ).removeClass( '-is-scrolled' ) ;
	1000 < $scrollVal ? $( 'body' ).addClass( '-is-scrolling' ) : $( 'body' ).removeClass( '-is-scrolling' ) ;
	// 1000 < $scrollVal ? $( '.backtotop' ).fadeIn( 'slow' ) : $( '.backtotop' ).fadeOut( 'slow' ) ;
} );



/**
* Navigation
*/

var $navToggle = $( '.siteHeader__toggle' );

$navToggle.on( 'click', function(){
	$( 'body' ).toggleClass( '-is-navOpen' );

	if( $('body').hasClass('-is-navOpen') ){
		$w.on( 'touchmove.noscroll', function( e ){
			e.preventDefault()
		})	
	} else {
		$w.off( '.noscroll' );
	}
});



/**
* Scroll
*/

$('a[href^="#"]').click(function( e ){
	e.stopPropagation();
	e.preventDefault();

    var speed = 500,
    	href= $(this).attr("href"),
    	target = $(href == "#" || href == "" ? 'html' : href),
    	position = target.offset().top - $('.siteHeader__logo').height() * 1.5;
    
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
});

$('.backtotop').click(function( e ){
	e.stopPropagation();
	e.preventDefault();

    var speed = 500,
    	position = 0;
    
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
});

