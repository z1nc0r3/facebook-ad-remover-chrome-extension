function hideIfSponsored(element) {
	// TODO: need to implement logic
}

function onPageChange() {
	const feed = document.querySelector("body"); // Select the parent element of all posts
	if (feed !== null) {
		// Process existing elements on initial load
		const posts = feed.querySelectorAll("div.x1lliihq");
		posts.forEach(hideIfSponsored);

		// Create a MutationObserver to watch for new elements
		const feedObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				mutation.addedNodes.forEach((node) => {
					if (node.nodeType === Node.ELEMENT_NODE && node.matches("div.x1lliihq")) {
						hideIfSponsored();
					}
				});
			});
		});

		feedObserver.observe(feed, {
			childList: true,
			subtree: true,
		});
	}
}

const pageObserver = new MutationObserver(onPageChange);

/**
 * Detect the current page and setup a page change observer.
 * This is because Facebook is using AJAX to load new content.
 *
 * THIS IS THE MAIN ENTRY POINT
 */
function setupPageObserver() {
	onPageChange();

	const content = document.getElementsByTagName("body")[0]; // Observe the body for page changes
	if (content) {
		pageObserver.observe(content, {
			childList: true,
			subtree: true,
		});
	}
}

// Run the setup function when the script loads
setupPageObserver();
