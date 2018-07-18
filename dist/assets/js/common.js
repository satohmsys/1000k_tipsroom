
var $w = $( window ),
	$bg = $( '.siteBg' ),
	$jsEffect = $('.js-effect'),
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
