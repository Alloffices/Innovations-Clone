var digits = "0123456789";
var phoneNumberDelimiters = "()- ";
var validWorldPhoneChars = phoneNumberDelimiters + "+";
var minDigitsInIPhoneNumber = 10;
var currentDay = null;

var usedTimes = new Array();

var times = new Array();
times[   0] = "Any Time";
times[ 600] =  "6:00am";
times[ 630] =  "6:30am";
times[ 700] =  "7:00am";
times[ 730] =  "7:30am";
times[ 800] =  "8:00am";
times[ 830] =  "8:30am";
times[ 900] =  "9:00am";
times[ 930] =  "9:30am";
times[1000] = "10:00am";
times[1030] = "10:30am";
times[1100] = "11:00am";
times[1130] = "11:30am";
times[1200] = "12:00pm";
times[1230] = "12:30pm";
times[1300] =  "1:00pm";
times[1330] =  "1:30pm";
times[1400] =  "2:00pm";
times[1430] =  "2:30pm";
times[1500] =  "3:00pm";
times[1530] =  "3:30pm";
times[1600] =  "4:00pm";
times[1630] =  "4:30pm";
times[1700] =  "5:00pm";
times[1730] =  "5:30pm";
times[1800] =  "6:00pm";
times[1830] =  "6:30pm";
times[1900] =  "7:00pm";
times[1930] =  "7:30pm";
times[2000] =  "8:00pm";
times[2030] =  "8:30pm";
times[2100] =  "9:00pm";
times[2130] =  "9:30pm";
times[2200] = "10:00pm";
times[2230] = "10:30pm";
times[2300] = "11:00pm";
times[2330] = "11:30pm";
times[2400] = "12:00am";

var days = new Array()
days[0] = "Any Day";
days[1] = "Monday";
days[2] = "Tuesday";
days[3] = "Wednesday";
days[4] = "Thursday";
days[5] = "Friday";
days[6] = "Saturday";
days[7] = "Sunday";

function renderTimeLists() 
{
    document.write( renderTimeList(1)  );
    document.write( renderTimeList(2)  );
    document.write( renderTimeList(3)  );
    document.write( renderTimeList(4)  );
    document.write( renderTimeList(5)  );
    document.write( renderTimeList(6)  );
    document.write( renderTimeList(7)  );
    document.write( renderAnyTimeList() );
    selectCurrentDay("day0");
}

function renderDayList() 
{
    var html = "";
    html += "<input type=\"hidden\" id=\"day\"  name=\"day\" />";
    html += "<input type=\"hidden\" id=\"time\" name=\"time\" value=\"Any Time\"/>";
    html += "<select name=\"daylist\" onchange=\"setDay( this )\">";
    for ( var i=0; i<8; i++ ) {
        if ( ( daytime[i] != null && daytime[i].length > 0 ) || i==0 ) {
            html += ( days[i].length > 0 ? "<option value=\"" + i + "\">" + days[i] + "</option>" : "" );
        }
    }
    html += "</select>";
    document.write( html );
}

function renderTimeList( day ) 
{
    var html = "";
    if ( daytime[day].length > 0 ) {
        html = "<select name=\"day" + day + "\" id=\"day" + day + "\" onchange=\"setTime( this )\" style=\"display:none;\">";
        for (var i=0; i<daytime[day].length; i++) {
            var value = times[ daytime[day][i] ];
            var select = ( i==0 ? "selected" : "" );
            html = html + "<option value=\"" + value + "\" " + select + ">" + value + "</option>\n";
            usedTimes[ daytime[day][i] ] = true;
        }
        html += "</select>";
    }
    return html;
}

function renderAnyTimeList() 
{
    var html = "";
    html = "<select name=\"day0\" id=\"day0\" onchange=\"setTime( this )\" style=\"display:none;\">";
    for ( var t in times ) {
    	if ( usedTimes[t] != null && usedTimes[t] == true  ) {
            var value = times[ t ];
            var first = true;
            var select = ( first ? "selected" : "" ); first=false;
            html = html + "<option value=\"" + value + "\" " + select + ">" + value + "</option>\n";
    	}
    }
    html += "</select>";
    return html;
}

function selectCurrentDay( day ) 
{
    if ( currentDay != null ) {
        document.getElementById( currentDay  ).style.display = "none";
    }
    currentDay = day;
    document.getElementById( currentDay ).style.display = "block";
    
    document.getElementById( currentDay ).value = document.getElementById( "time" ).value    
    if ( document.getElementById( currentDay ).value != document.getElementById( "time" ).value ) {
    	document.getElementById( currentDay ).value = "Any Time";
    	document.getElementById( "time" ).value = "Any Time"
    }
}

function setDay( select )
{
    var day = "day" + select.value;
    document.getElementById( "day" ).value = days[ select.value ];
    selectCurrentDay(day);
}

function setTime( select )
{
    document.getElementById( "time" ).value = select.value;
}

function validateAndSubmit( f ) {
	if ( f.firstname.value == "" ) {
		alert("Please enter your first name.");
		f.firstname.focus();
	} else if ( f.lastname.value == "" ) {
		alert("Please enter your last name.");
		f.lastname.focus();
	} else if ( f.address1.value == "" ) {
		alert("Please enter an address.");
		f.address1.focus();
	} else if ( f.city.value == "" ) {
		alert("Please enter a city.");
		f.city.focus();
	} else if ( f.state.value == "NONE" ) {
		alert("Please select a state.");
		f.zip.focus();
	} else if ( f.zip.value == "" || !checkZipCode( f.zip.value ) ) {
		alert("Please enter a valid zip code.");
		f.zip.focus();
	} else if ( f.phone.value == "" || !checkPhone( f.phone.value ) ) {
		alert("Please enter a valid phone number.");
		f.phone.focus();
	} else if ( f.email.value != "" && !checkEmail( f.email.value ) ) {
		alert("Please enter a valid email address.");
		f.email.focus();
	} else if ( f.day.value == "NONE" ) {
		alert("Please select a preferred day.");
		f.day.focus();
	} else if ( f.time.value == "NONE" ) {
		alert("Please select a preferred time.");
		f.time.focus();
	} else {
		return (true);
	}
	return (false);
}
function checkEmail( address ) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address)) return (true);
	return (false);
}
function checkPhone( number ) {
	s = stripCharsInBag( number, validWorldPhoneChars );
	return ( isInteger(s) && s.length >= minDigitsInIPhoneNumber );
}
function checkZipCode( zip ) {
	return ( isInteger(zip) && zip.length == 5 );
}
function isInteger(s)
{   var i;
	for (i = 0; i < s.length; i++)
	{
		// Check that current character is number.
		var c = s.charAt(i);
		if (((c < "0") || (c > "9"))) return false;
	}
	// All characters are numbers.
	return true;
}

function stripCharsInBag(s, bag)
{   var i;
	var returnString = "";
	for (i = 0; i < s.length; i++)
	{
		// Check that current character is not whitespace.
		var c = s.charAt(i);
		if (bag.indexOf(c) == -1) returnString += c;
	}
	return returnString;
}