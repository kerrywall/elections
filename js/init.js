// variables

$showing = $('#showing');
$results = $('#results');
$list = $('#list');
$phaseOne = $('.phaseOne');
$phaseTwo = $('.phaseTwo');
$search = $('#search');

// submit the form

$('document').ready(function() {

	//console.log(candidates);

	// hide the dropdown until the user has voluntarily loaded the data

	$phaseOne.hide();
	
	// hide the search box

	$phaseTwo.hide();

	// set the search to elected candidates as a default

	$userScope = "elected";

	// figure out which set of data the people want

	$('.scope').on('click', function() {

		$userScope = $(this).val();

	});

	// initialize the data

	$('.getData').on('click', function() {
		$phaseOne.show();
		return candidates;
		$('.disclaimer').hide();
	});

	// determine what the user wants based on how they use the dropdown menu

	$('#dropdown').on('change', function(d) {
		d.preventDefault();
		$phaseTwo.show();
	    $userWants = "";
	    $('.category:selected').each(function() {
	    	// the user wants this!
	    	$userWants = $(this).text();
	    });
	    
	    // reset the results div and the search text box in case the user wants to start over

	    $results.html("");
	    $list.html("");
	    $('#searchBox').val("");
	    $('#showing').html("");

	});

	$('#search').on('submit', function(e) {
		e.preventDefault();
		console.log(e);
		$searchTerm = $('#searchBox').val();

		$results.html("");
		$list.html("");
		
		for (i = 0; i < candidates.length; i++) {

			var thisCandidate = candidates[i];

			function populate() {
				if (thisCandidate[$userWants] == $searchTerm || thisCandidate[$userWants] == $searchTerm.toUpperCase()) {

					var year = thisCandidate["Election Date"].substring(0,4),
						name = thisCandidate["First Name"] + ' ' + thisCandidate["Last Name"],
						party = thisCandidate["Party"],
						province = thisCandidate["Province"];

					if (party === "Conservative" || party === "Liberal-Conservative" || party === "Progressive Conservative" || party === "Government" || party === "National Government" || party === "Independent Conservative") {
						partyClass = "cpc";
					} else if (party === "Liberal" || party === "Opposition" || party === "Independent Liberal") {
						partyClass = "lib";
					} else if (party === "Co-operative Commonwealth Federation" || party === "NDP") {
						partyClass = "ndp"; 
					} else if (party === "Reform" || party === "Canadian Alliance") {
						partyClass = "reform";
					} else if (party === "Bloc Québécois") {
						partyClass = "bq"; 
					} else if (party === "Green") {
						partyClass = "green"; 
					} else if (party === "Social Credit") {
						partyClass = "soCred";
					} else {
						partyClass = "other";
					}

					$list.append('<li class="names"><span class="name">' + name + '</span><span class="party">' + party + '</span><span class="province">' + province + '</span><span class="year">' + year + '</span></li>');

					$results.append('<div class="hint--bottom candidate ' + partyClass + '" data-hint="' + party + '"></div>');

				}
			}

			if ($userScope === "elected") {
				if (thisCandidate["Elected"] == 1) {
					populate();
			}
			
			} else {
				if (thisCandidate[$userWants] == $searchTerm || thisCandidate[$userWants] == $searchTerm.toUpperCase()) {
					populate();
				}
			}
		}

		$showing.html($userWants + ': <strong>' + $searchTerm + '</strong> (returned <strong>' + $results.children().length + '</strong> results among ' + $userScope + ' candidates).');

	});
});