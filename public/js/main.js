function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function test(pivot) {
    var output = [0, 0];
    var prec = getRandomInt(2);
    var now = 42;
    var counter = 0;

    for(var i = 0; i < pivot; i++) {
        now = getRandomInt(2);
        if(now == prec) {
            counter++;
            output[now] = Math.max(output[now], counter);
        } else {
            counter = 1;
            prec = now;
        }
    }
    return output;
}

/***
 * DISPLAY & HIDE
 */
function display(elt) {
    elt = $(elt);
	if(elt.length > 0 && elt.hasClass("not-displayed"))
        elt.removeClass("not-displayed");
}
function hide(elt) {
    elt = $(elt);
	if(elt.length > 0 && !elt.hasClass("not-displayed"))
		elt.addClass("not-displayed");
}
function displaySmoothly(elt, speed, callback) {
    elt = $(elt);
	if(elt.length > 0 && elt.hasClass("not-displayed")) {
		elt.removeClass("not-displayed");
		elt.fadeOut(0);
        elt.fadeIn(speed, function() {
            elt.css("display", "");
            if(callback && callback != null)
                callback();
        });
	}
}
function hideSmoothly(elt, speed, callback) {
    elt = $(elt);
	if(elt.length > 0 && !elt.hasClass("not-displayed")) {
        elt.fadeOut(speed, function() {
            elt.addClass("not-displayed");
            elt.css("display", "");
            if(callback && callback != null)
                callback();
        });
	}
}

function displaySliding(elt, speed, callback) {
    elt = $(elt);
	if(elt.length > 0 && elt.hasClass("not-displayed")) {
		elt.removeClass("not-displayed");
		elt.slideUp(0);
		elt.slideDown(speed);
	} else
		return ;

	setTimeout(function() {
		elt.css("display", "");
        if(callback && callback != null)
            callback();
	}, (speed + 10));
}
function hideSliding(elt, speed, callback) {
	if(elt.length > 0 && !elt.hasClass("not-displayed"))
		elt.slideUp(speed);
	else
		return ;

	setTimeout(function() {
		elt.addClass("not-displayed");
		elt.css("display", "");
        if(callback && callback != null)
            callback();
	}, (speed + 10));
}
function displaySmoothlyHidingTrig(currentElt, target, speed, callback) {
    currentElt = $(currentElt);
	currentElt.parent().css('min-height', currentElt.parent().outerHeight());
	hideSmoothly(currentElt, speed);
	setTimeout(function() {
        displaySmoothly(target, speed);
        if(callback && callback != null)
            setTimeout(function() {callback()}, (speed + 20));
    }, (speed + 10));
}
function displaySlidingHidingTrig(currentElt, target, speed) {
    currentElt = $(currentElt);
	currentElt.parent().css('min-height', currentElt.parent().outerHeight());
	hideSmoothly(currentElt, speed);
	setTimeout(function() {displaySliding(target, speed);}, (speed + 50));
}
function returnRightRank(rank, lastRank) {
    rank != lastRank ? rank+1 : 0
	if (rank != lastRank)
		return rank + 1;
	else
		return 0;
}

/***
 * MOVES
 */
function reachByScrolling(target, diff, speed, callback) {
    var y = $(target).offset().top - diff;
    $('html, body').animate({scrollTop:y}, speed);
    setTimeout(function() {
        if(callback && callback != null)
            callback();
    }, (speed + 10));
}



/***
 * HANDLE NB FORMATS
 */
$("document").ready(function() {
    var nbToFormat = $(".nb-to-format");
    if(nbToFormat.length > 0) {
        for(var i = 0; i < nbToFormat.length; i++) {
            $(nbToFormat[i]).html(provideNbFormat(Number($(nbToFormat[i]).text()), $(nbToFormat[i]).attr('data-lang')));
            $(nbToFormat[i]).addClass("keep").removeClass("nb-to-format").removeAttr("data-lang");
        }
    }
    $(".inpt-num").keypress(function(e) {
        return isNb_evt(e);
    });
    $(".inpt-num").bind("paste", function(e) {
        return isNb_txt(e.originalEvent.clipboardData.getData('Text'));
    });
    
    $(".inpt-num-fr").keypress(function(e) {
        return isNb_evt(e);
    });
    $(".inpt-num-fr").keyup(function(e) {
        $(this).val(provideNbFormat(this.value, "fr"));
    });
    $(".inpt-num-fr").bind("paste", function(e) {
        if(!isNb_txt(e.originalEvent.clipboardData.getData('Text')))
            return false;
        
        $(this).val(provideNbFormat(this.value, "fr"));
    });

    $(".inpt-phone").keypress(function(e) {
        return (isNb_evt(e) || (e.originalEvent.key == "+") || (e.originalEvent.key == " "));
    });
    $(".inpt-phone").keyup(function(e) {
        if(isPhone(this.value)) {
            $(this).val(providePhoneFormat(this.value));
            $(this).removeClass("is-invalid");
        }
    });
    $(".inpt-phone").bind("paste", function(e) {
        if(isPhone(e.originalEvent.clipboardData.getData('Text')) == false)
            return false;
        
        $(this).val(providePhoneFormat(this.value));
        $(this).removeClass("is-invalid");
    });

    $(".inpt-date").keypress(function(e) {e.preventDefault();});
    $(".inpt-date").keyup(function(e) {e.preventDefault();});
    $(".inpt-date").bind("paste", function(e) {e.preventDefault();});

    applyCutText();
});
function isNb_evt(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if(charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function isNb_txt(txt) {
    var t = txt.toString();
    for(var i = 0; i < t.length; i++) {
        if(!Number.isInteger(Number(t.charAt(i))))
            return false;
    }
    return true;
}
function provideNbFormat(nb, type) {
    var t = nb.toString().replace(/ /g, "");
    if(!isNb_txt(t.replace(/./g, "").replace(/,/g, "")) || t.length == 0)
        return ;
    
    var t2 = null;
    if(t.split(".").length > 1) {t2 = t.split(".")[1]; t = t.split(".")[0];}
    if(t.split(",").length > 1) {t2 = t.split(",")[1]; t = t.split(",")[0];}

    var rvOutput = "";
    if(type == "fr" || type == "eur" || type == "L" || type == "kg" || type == "kg/m3") {
        for(var i = 0; i <= t.length; i++) {
            rvOutput += t.charAt(t.length - i);
            if(i % 3 == 0 && i != 0)
                rvOutput += " ";
        }
        var output = "";
        for(var j = 0; j <= rvOutput.length; j++)
            output += rvOutput.charAt(rvOutput.length - j);

        output = output.trim()

        if(t2 != null) {output += "," + t2;}
        if(type == "eur") {output += "€";}
        if(type == "L") {output += " L";}
        if(type == "kg") {output += " kg";}
        if(type == "kg/m3") {output += " kg/m³";}

        return output;
    }
    return ;
}

function isPhone(txt) {
    var t = txt.toString().replace(/ /g, "");
    if(t.length == 0)
        return ;

    if(t.charAt(0) == "+" && t.length == 12 && isNb_txt(t.substr(1)) == true)
        return true;
    else if(t.charAt(0) == "0" && t.charAt(1) == "0" && t.charAt(2) == "3" && t.charAt(3) == "3" && t.length == 13 && isNb_txt(t) == true)
        return true;
    else if(t.charAt(0) == "0" && t.length == 10 && isNb_txt(t) == true)
        return true;
    else
        return false;
}
function providePhoneFormat(phone) {
    var t = phone.toString().replace(/ /g, "");
    if(!isPhone(t) || t.length == 0)
        return ;
    
        var rvOutput = "";
    for(var i = 0; i <= 9; i++) {
        rvOutput += t.charAt(t.length - i);
        if(i % 2 == 0 && i != 0)
            rvOutput += " ";
    }
    var output = "";
    for(var j = 0; j <= rvOutput.length; j++)
        output += rvOutput.charAt(rvOutput.length - j);

    output = output.trim();
    output = "+33 " + output;

    return output;
}

function isEmail(email) {
	if(!email || email.replace(/ /g, "").length == 0)
	    return false;

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


/***
 * FORM
 */

function allowElt(elt, b, provideSpinner) {
    var trig = $(elt);
    if(trig.length > 0) {
        trig.prop('disabled', !b);
        if(provideSpinner) {
            if(!b && trig.find(".fa-spin").length == 0)
                trig.append('<i class="fas fa-spinner fa-spin"></i>');
        }
        if(b && trig.find(".fa-spin").length > 0)
            trig.find(".fa-spin").remove();
    }
    return ;
}
function isInputFilled(input) {
    var inpt = $(input);

    if(inpt.length == 0)
        return false;
    if(!inpt.val())
        return false;
    if(inpt.val().length == 0)
        return false;
    return true;
}
function provideConfirmToInput(inpt, isGood) {
    var label = "";
    
    if($(inpt).is(':checkbox') || $(inpt).is(':radio'))
        label = $("label[for='" + $(inpt).attr("name") + "']");
    else
        label = $("label[for='" + $(inpt).attr("id") + "']");

    if(label.length == 0)
        return;

    $(label).find(".inpt-confirmation").remove();
    if(isGood)
        $(label).append('<i class="far fa-check-circle inpt-confirmation text-success ml-2"></i>');
}

function resetUrl(splitter) {
    const windowURL = window.location.href;
    const windowURLTab = windowURL.split(splitter);

    if(windowURLTab.length == 1)
        return ;
    
    window.history.pushState(null, null, windowURLTab[0]);
}


/***
 * BG
 */
$("document").ready(function() {
    const bgContainers = $(".bg-trans-style-1");
    if(bgContainers.length > 0) {
        var bgContainer = '';
        var divClrTarget = '';
        var clrTarget = '';
        var directionTarget = 'to right';
        var htmlContent = '';

        for(var i=0; i < bgContainers.length; i++) {

            bgContainer =  $(bgContainers[i]);
            divClrTarget = bgContainer.parent().find("[data-bg-key='" + bgContainer.attr("data-bg-selector-key") + "']");
            clrTarget = divClrTarget.css("background-color");

            if(bgContainer.attr("data-bg-direction") && bgContainer.attr("data-bg-direction") == 'to left') {directionTarget = 'to left';} else {directionTarget = 'to right';};
            
            htmlContent = '';
            htmlContent += '<div class="col-12" style="height:5px; background-image:linear-gradient(direction top, clr 0%, clr 40%, transparent 50%);"></div>';
            htmlContent += '<div class="col-12" style="margin-top:-3px; height:12px; background-image:linear-gradient(direction top, clr 0%, clr 45%, transparent 52%);"></div>';
            htmlContent += '<div class="col-12" style="height:7px; margin-top:-2px; background-image:linear-gradient(direction top, clr 0%, clr 45%, transparent 50%);"></div>';
            /*htmlContent += '<div class="col-12" style="margin-top:-7px; height:20px; background-image:linear-gradient(direction top, clr 0%, clr 45%, transparent 55%);"></div>';*/
            
            bgContainer.append('<div class="row bg-transitions">' + htmlContent.replace(/clr/g, clrTarget).replace(/direction/g, directionTarget) + '</div>');

            bgContainer.removeAttr("data-bg-selector-key").removeAttr("data-bg-direction;");
            divClrTarget.removeAttr("data-bg-key");
        }
    }
});




/***
 * SIZE TEXT
 */
function cutText(myText, maxCaracters, diplayable) {
	if(myText.length > 0) {
		if(myText.length > maxCaracters) {
			var newText = "";
			var exactCaracters = maxCaracters;
	
			for (var i = 0; i < maxCaracters; i++)
				newText += myText.charAt(i);
	
			var a = newText.length;
			for (var k = 0; k < a; k++) {
				if (newText.charAt(a - k - 1) == " ") {
					newText = newText.substring(0, newText.length - 1);
					exactCaracters -= 1;
					break;
				} else {
					newText = newText.substring(0, newText.length - 1);
					exactCaracters -= 1;
				}
			}
			
			var myTab = newText.split(" "); newText = "";
			
			for(var l = 0; l < myTab.length; l++) {
				if(l == myTab.length - 1)
					newText += '<span class="keep keep-open-it">';
				
				newText += myTab[l] + " ";
			}
			newText = newText.substring(0, newText.length - 1);
			newText += "<span class='open-it-hellip'>&hellip;</span>";
	
			if (diplayable == true) {
                newText += '<span class="open-it-trigger pl-1" onclick="openIt(this)">';
				newText += '<svg class="bi bi-plus-circle" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor">';
                newText += '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>';
                newText += '<path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>';
                newText += '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>';
                newText += '</svg>';
            }

            newText += "</span>";
			newText += "<span class='next-text not-displayed'>";
	
			for (var j = exactCaracters; j < myText.length; j++)
				newText += myText.charAt(j);
	
			newText += "</span>";

			return newText;
		} else
			return myText;
	} else
		return myText;
}
function openIt(trig) {
    var trig = $(trig);
    var p = trig.parent().parent();
    var fText = "";

	trig.remove();
	p.find(".open-it-hellip").remove();

    fText += p.find(".next-text").html();
    p.find(".next-text").remove();

    fText = p.find(".keep-open-it").html() + fText
    p.find(".keep-open-it").remove();

    fText = p.html() + fText
    
    $(p).html(fText);
}
function applyCutText() {
	var eltsToSize = $(".text-to-size");
	var toSize = "";
	var txt = "";
	
	if(eltsToSize.length > 0) {
		for(var i = 0; i < eltsToSize.length; i++) {
            toSize = $(eltsToSize[i]);
			txt = toSize.html();
			var l = Number(toSize.attr('data-length'));
	
			var b = false;
			if(toSize.attr('data-displayable') == "true" || toSize.attr('data-displayable') == true)
				b = true;

			var nwTxt = cutText(txt, l, b);
			
			toSize.removeClass("text-to-size");
			toSize.removeAttr('data-length');
			toSize.removeAttr('data-displayable');
			toSize.html(nwTxt);
		}
	}
}