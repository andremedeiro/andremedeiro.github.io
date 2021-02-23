var scroll = document.getElementById('scroll');
const doc = document.documentElement;

window.addEventListener('scroll', function() {
	var value = parseInt(100 * doc.scrollTop / (doc.scrollHeight - doc.clientHeight));
	scroll.style.width = value+'%';
});

$('#lista-menu a[href^="#"]').on('click', function(e) {
	e.preventDefault();
	var id = $(this).attr('href'),
			targetOffset = $(id).offset().top;
			
	$('html, body').animate({ 
		scrollTop: targetOffset
	}, 600);
});

var chat = new ZenviaChat('8af8687f5426a6f23ae1ee6ba6019f8b')
.embedded('buttonless')
.height('500px')
.build()