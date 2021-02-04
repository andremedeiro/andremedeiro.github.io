var scroll = document.getElementById('scroll');
let doc = document.documentElement;

window.addEventListener('scroll', function() {
	var value = parseInt(100 * doc.scrollTop / (doc.scrollHeight - doc.clientHeight));
	scroll.style.width = value+'%';
});

