function longestUniqueSubstring(s) {
    let charIndex = new Map(); // Stores characters and their latest indices
    let start = 0, maxLength = 0, longestSubstring = "";

    // Iterate through the string
    for (let end = 0; end < s.length; end++) {
        // If character is repeated and within the current substring range, update the start index
        if (charIndex.has(s[end]) && charIndex.get(s[end]) >= start) {
            start = charIndex.get(s[end]) + 1; // Move start ahead of the repeating character
        }
        
        // Store/update the character's latest index
        charIndex.set(s[end], end);

        // Update the maximum length and longest substring if a new longest is found
        if (end - start + 1 > maxLength) {
            maxLength = end - start + 1;
            longestSubstring = s.substring(start, end + 1);
        }
    }

    return longestSubstring; // Return the longest substring with unique characters
}

// Example Usage
console.log(longestUniqueSubstring("pwwkew")); // Output: "wke"
