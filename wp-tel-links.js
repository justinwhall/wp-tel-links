jQuery(document).ready(function($) {
	// This query finds all text nodes with at least 12 non-whitespace characters
	// who are not direct children of an anchor tag
	// Letting XPath apply basic filters dramatically reduces the number of elements
	// we need to process (there are tons of short and/or pure whitespace text nodes
	// in most DOMs)
	var xpr = document.evaluate('descendant-or-self::text()[not(parent::A) and string-length(normalize-space(self::text())) >= 12]',
	                            document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i=0, len=xpr.snapshotLength; i < len; ++i) {
	    var txt = xpr.snapshotItem(i);

	    // Splits with grouping to preserve the text split on
	    // HAVE TO CHECK THIS REGEX WITH AUSSIE NUMBERS!!
	    var numbers = txt.data.split(new RegExp( /([(]?\d{3}[)]?[(\s)?.-]\d{3}[\s.-]\d{4})/));

	    // split will return at least three items on a hit, prefix, split match, and suffix
	    if (numbers.length >= 3) {
	        var parent = txt.parentNode; // Save parent before replacing child

	        // console.log(numbers[1]);
	        // Replace contents of parent with text before first number
	        parent.textContent = numbers[0];

	        // Now explicitly create pairs of anchors and following text nodes
	        for (var index = 1; index < numbers.length; index += 2) {
	            
	            // Operate in pairs; odd index is phone number, even is 
	            // text following that phone number
	            var pNum = numbers[index].replace(/\D+/g, '');
	            
	            // Check for false positives
	            if (numbers[index].length && pNum.length) {
	              var anc = document.createElement('a');
	              anc.href = 'tel:' + numbers[index].replace(/\D+/g, '');
	              anc.textContent = numbers[index];
	              parent.appendChild(anc);
	              parent.appendChild(document.createTextNode(numbers[index+1]));
	            }
	        }
	        parent.normalize(); // Normalize whitespace after rebuilding
	    }
	}
});