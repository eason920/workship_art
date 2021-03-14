const videoUrl = [
	"http://dl5.webmfiles.org/big-buck-bunny_trailer.webm",
	"https://ia800105.us.archive.org/15/items/video_g6/video_g24.webm",
	"http://dl5.webmfiles.org/elephants-dream.webm",
	"./video/pr.webm",
];

let vNo = 1;
if( location.href.match(/[?v=]/) ){
	vNo = location.href.split('?v=')[1];
};

const getScrollLineHeight = function() {
	var r;
	var iframe = document.createElement('iframe');
	iframe.src = '#';
	document.body.appendChild(iframe);
	var iwin = iframe.contentWindow;
	var idoc = iwin.document;
	idoc.open();
	idoc.write('<!DOCTYPE html><html><head></head><body><span>a</span></body></html>');
	idoc.close();
	var span = idoc.body.firstElementChild;
	r = span.offsetHeight;
	document.body.removeChild(iframe);
	return r;
}

// html5 elements
const vid = document.getElementById("v"); // HTML5 video element
const canvas = document.getElementById("c"); // HTML5 canvas element
const context = canvas.getContext('2d'); // Canvas context
const momentum = document.getElementById('m'); // Current momentum display
const delta = document.getElementById('d'); // Current deltaMode display
const lineheight = document.getElementById('l'); // Current deltaMode display

// Preloading videos bar & container
const precarga = document.getElementById("precarga");
const precontr = document.getElementById("precargacontainer");

// Switching set
var cod = {
	"6": [
		document.getElementById("cod6"), // html element
		videoUrl[vNo], // Video source
		1 // Preload=0, No=1
	],
	"24": [
		document.getElementById("cod24"), // html element
		videoUrl[vNo], // Video source
		1 // Preload=0, No=1
	],
};

// global variables
var ch = 400; // canvas with (could be window.innerHeight)
var cw = Math.round(ch * (16 / 9)); // 16/9 proportion width
var targetOffset = 0; // Video offset target position when scrolling

// deltaY to FPS coefficients (for fine tunning)
// Posible mouse scroll wheel 'event.deltaMode'
//	modes are: 0:'pixels', 1:'lines', 2:'page'
var pc = 1000; // 'pixels' deltaY coefficient
var lh = getScrollLineHeight(); // get line-height of deltaMode 'lines'
lineheight.value = lh; // display current document line height
var modeCoefficient = [
	pc, // 'pixels' scrolling
	(pc / lh), // 'lines' scrolling. This corresponds to pixels-coefficient/body-line-height ?
	0, // 'page' scrolling. This is disabled in this example
];
var modes = ['pixels', 'lines', 'page']; // For deltaMode display

// Sets canvas dimentions
canvas.width = cw;
canvas.height = ch;

// Pauses video (this also starts to load the video)
vid.pause();

// Listens video changes time position
vid.addEventListener('seeked', function() {
	// Updates canvas with current video frame
	context.drawImage(vid, 0, 0, cw, ch);
});


// $(window).scroll(function(e){
const heroHeight = $('#hero').innerHeight();
const boxHeight = $('#box').height();
const trackHeight = $('#track').height();
const canvasHeight = $('#c').height();
let scrollTop;
$(window).scroll(function(){
	scrollTop = $(window).scrollTop();
	console.log(scrollTop);
	if( scrollTop >=  heroHeight && scrollTop <= heroHeight + trackHeight + boxHeight ){
		if( scrollTop >= heroHeight + trackHeight && heroHeight + trackHeight + boxHeight ){
			const top = scrollTop - (heroHeight + trackHeight);
			$('#box').attr('style', 'position: sticky; top:-'+top+'px');
		}else{
			$('#box').attr('style', 'position: sticky; top: 0;');
		}
	}else{
		$('#box').removeAttr('style');
	}
});


// Listens mouse scroll wheel
window.addEventListener('wheel', function(e) {
	if( scrollTop >=  heroHeight && scrollTop <= heroHeight + trackHeight + boxHeight ){
		
		// Don't do what scroll wheel normally does
		// e.preventDefault(); //<<<會使 scroll 事件失效
	
		// Changed this to consider deltaMode as partially
		//	 solves browser differences (chrome vs firefox).
		var coefficient = modeCoefficient[e.deltaMode];
		delta.value = modes[e.deltaMode];
		console.log('delta.value is ', delta.value);
	
		// Disable page scrolling, modes[e.deltaMode]=='page'
		if (coefficient <= 0) return false;
	
		// Normally scrolling this should be a substraction 
		//	 not a sum but "I like it like this!"
		targetOffset = targetOffset - (e.deltaY / coefficient); // e.deltaY is the thing!!
		// ^ 用 - 號以正確 scroll 與影片正向推進
	
		// Shows current momentum
		console.log('targetOffset ', targetOffset);
		momentum.value = targetOffset;
	
	}else{
		return false
		// delta.value = 0;
		// momentum.value = -0;
	}
	return false;
}, {
	passive: false
});

// Updates canvas on a loop (both for play or pause state)
var renderLoop = function() {
	requestAnimationFrame(function() {

		// This parts updates canvas when video is paused
		// Needs 'seeked' listener avobe
		if (vid.paused || vid.ended) {

			// Reduce target offset gradually
			targetOffset = targetOffset * 0.9;
			// Show current momentum
			momentum.value = targetOffset.toFixed(2);

			// this part joins start and end of video when scrolling
			// forward & backwards
			var vct = vid.currentTime - targetOffset;
			if (vct < 0) {
				vct = vid.duration + vct;
			} else if (vct > vid.duration) {
				vct = vct - vid.duration;
			}
			vid.currentTime = parseFloat(vct.toFixed(2));

			// This parts updates canvas when video is playing
		} else {
			// update canvas with current video frame
			context.drawImage(vid, 0, 0, cw, ch);
		}

		renderLoop(); // Recursive call to loop
	});
};

// Preload videos
videoPreload = function(iv) {
	if (cod[iv][2] < 1) {
		// Preload video when needed
		precontr.style.visibility = 'visible';
		var xhrReq = new XMLHttpRequest();
		xhrReq.open('GET', cod[iv][1], true);
		xhrReq.responseType = 'blob';
		xhrReq.onload = function() {
			if (this.status === 200) {
				cod[iv][1] = URL.createObjectURL(this.response);
				vid.src = cod[iv][1];
				cod[iv][2] = 1; // Video loaded
			}
		}
		xhrReq.onerror = function() {
			console.log('err', arguments);
		}
		xhrReq.onprogress = function(e) {
			if (e.lengthComputable) {
				var percentComplete = ((e.loaded / e.total) * 100 | 0);
				precarga.value = percentComplete;

				if (percentComplete >= 99) precontr.style.visibility = 'hidden';
			}
		}
		xhrReq.send();
	} else {
		// Preloaded already (or normal loading)
		vid.src = cod[iv][1];
	}
};

// Switching video set
var changeVideoSrc = function(iv) {
	var ps = false;
	var vct = vid.currentTime;
	if (!vid.paused && !vid.ended) {
		vid.pause();
		ps = true;
	}
	videoPreload(iv);
	vid.currentTime = parseFloat(vct.toFixed(2));
	if (ps) vid.play();
};
cod["6"][0].addEventListener('click', function() {
	this.style.background = "#F40";
	cod["24"][0].style.background = "#eee";
	changeVideoSrc("6");
});
cod["24"][0].addEventListener('click', function() {
	this.style.background = "#F40";
	cod["6"][0].style.background = "#eee";
	changeVideoSrc("24");
});
changeVideoSrc("6");
renderLoop(); // Initial call to loop


//==============================================================
const fnCount = function(target, start, end){
	const st = $(window).scrollTop();
	const passing = start - st;
	const p = (end + passing) / end * -100;
	const p2 = 100 + p;
	const style = '--eason-progress:'+p+'%;--eason-progress-2:'+p2+'%';
	console.log( st, passing, p, p2 , );
	target.attr('style', style);
};

$(window).on('load scroll', function(){
	fnCount($('#hero h3'), heroHeight /10  , heroHeight /10 * 5);
});


//==============================================================
