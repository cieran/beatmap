var buttons = 320,
	rows = 20;
var cols = rows;
var wLoaded = false,
	nLoaded = false;

$(document).ready(function() {
	var holder = $('#board .holder'),
		note = $('.note');
	var notes = [];
	
	var sampleList = ['kick', 'snare', 'openHat', 'closedHat'];
	var sampleListCount = 0;

	for (var i = 0; i < rows; i++) {
			
		if(i<=15){
			notes[i] = new Howl({
				urls: ['https://s3-us-west-2.amazonaws.com/s.cdpn.io/380275/' + i + '.mp3',
					'https://s3-us-west-2.amazonaws.com/s.cdpn.io/380275/' + i + '.ogg'
				],
				onload: loadCount(i + 1)
			});
		}else{
			notes[i] = new Howl({
				urls: ['https://dl.dropboxusercontent.com/u/42386473/cp/samples/' + sampleList[sampleListCount] + '.wav',
					'https://dl.dropboxusercontent.com/u/42386473/cp/samples/' + sampleList[sampleListCount] + '.wav'
				],
				onload: loadCount(i + 1)
				});
				sampleListCount++;
				console.log('https://dl.dropboxusercontent.com/u/42386473/cp/samples/' + sampleList[sampleListCount] + '.wav');
		}				
	}

	$(window).load(function() {
		bindUserActions();
		initControls();

		wLoaded = true;
		if (nLoaded)
			$('#board').removeClass('loading').addClass('forward');

		for (var i = 0; i < rows; i++) {
			bindNote(i);
		}
	});

	function loadCount(i) {
		if (i === rows) {
			nLoaded = true;
			if (wLoaded)
				$('#board').removeClass('loading').addClass('forward');
		}
	}

	function bindNote(currNote) {
		var idea =['holder','openHat', 'closedHat', 'snare', 'kick'];
		for(var i = 0; i<idea.length; i++){
			$('#board .'+idea[i]+':nth-child(' + cols + 'n + ' + currNote + ')')
			.on('webkitAnimationIteration mozAnimationIteration animationiteration', 
			function() {
				if ($(this).hasClass('active')) {
					var currNote = $(this).attr('data-note');
					notes[currNote].play();

					$(this).find('.ripple').addClass('huzzar').delay(500).queue(function() {
						$(this).removeClass('huzzar').dequeue();
					});
				}
			});
		}
	}

	function bindUserActions() {
		$(note).mousedown(function() {
			$(this).toggleClass("active");
			$(this).parent().toggleClass("active");
		});
		$(document).mousedown(function() {
			$(note).bind('mouseover', function() {
				$(this).toggleClass("active");
				$(this).parent().toggleClass("active");
			});
		}).mouseup(function() {
			$(note).unbind('mouseover');
		});
	}

	function initControls() {
		$('#reset').on('click', function() {
			$('.active').removeClass('active');
		});
		$('#audio').on('click', function() {
			if ($(this).hasClass("mute"))
				Howler.unmute();
			else
				Howler.mute();
			$(this).toggleClass('mute');
		});
		
	}

});