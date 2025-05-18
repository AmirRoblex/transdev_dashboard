document.addEventListener("DOMContentLoaded", function () {
  // Selectors for vertical map tabs
  const verticalTabButtons = document.querySelectorAll(".tab-button");
  const mapSpecificContents = document.querySelectorAll(".map-specific-content");
  const mapsContentWrapper = document.getElementById("mapsContentWrapper"); // Wrapper for all map contents

  // Selectors for header navigation
  const headerNavItems = document.querySelectorAll(".header-nav-item");
  const generalContents = document.querySelectorAll(".general-content"); // Content sections like timetables, team, contact

  // Function to hide all content sections (both map and general)
  function hideAllContent() {
    mapSpecificContents.forEach(content => content.classList.add("hidden"));
    generalContents.forEach(content => content.classList.add("hidden"));
    if (mapsContentWrapper) { // Hide the entire map wrapper if it exists
        mapsContentWrapper.classList.add("hidden");
    }
  }

  // Function to show a specific content section
  function showContent(contentElement) {
    if (contentElement) {
      contentElement.classList.remove("hidden");
    }
  }

  // Event listeners for vertical map tabs
  verticalTabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-tab-target");
      const targetContent = document.querySelector(targetId);

      hideAllContent(); // Hide all general content first

      // Show the map wrapper and the specific map content
      if (mapsContentWrapper) {
          mapsContentWrapper.classList.remove("hidden");
      }
      showContent(targetContent);


      // Update active state for vertical tabs
      verticalTabButtons.forEach((btn) => {
        btn.classList.remove("tab-active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("tab-active");
      button.setAttribute("aria-selected", "true");

      // Deactivate header nav items
      headerNavItems.forEach(item => item.classList.remove("active"));
    });
  });

  // Event listeners for header navigation items
  headerNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetContentId = item.getAttribute("data-target-content");

      hideAllContent(); // Hide all content sections

      if (targetContentId === "mapsContent") {
        // If "Maps" is clicked in header, show the map wrapper and activate the first vertical tab
        if (mapsContentWrapper) {
            mapsContentWrapper.classList.remove("hidden");
        }
        if (verticalTabButtons.length > 0) {
          verticalTabButtons[0].click(); // Simulate click on the first map tab
        }
      } else {
        // For other header items, show their specific general content
        const targetContentElement = document.getElementById(targetContentId);
        showContent(targetContentElement);
        // Deactivate all vertical tabs if a general content section is shown
        verticalTabButtons.forEach(btn => {
            btn.classList.remove("tab-active");
            btn.setAttribute("aria-selected", "false");
        });
      }

      // Update active state for header nav items
      headerNavItems.forEach(navItem => navItem.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // Initialize: Show the first map tab by default
  if (verticalTabButtons.length > 0) {
    // Ensure only map content is visible initially
    generalContents.forEach(content => content.classList.add("hidden"));
    if (mapsContentWrapper) {
        mapsContentWrapper.classList.remove("hidden");
    }
    showContent(document.querySelector(verticalTabButtons[0].getAttribute("data-tab-target")));
    verticalTabButtons[0].classList.add("tab-active");
    verticalTabButtons[0].setAttribute("aria-selected", "true");

    // Also, mark the "Maps" header item as active if maps are shown by default
    headerNavItems.forEach(item => {
        if (item.getAttribute('data-target-content') === 'mapsContent') {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

  } else if (generalContents.length > 0) {
    // Fallback if no map tabs, show first general content (if any header nav exists)
     if (mapsContentWrapper) {
        mapsContentWrapper.classList.add("hidden");
     }
    showContent(generalContents[0]);
    if (headerNavItems.length > 0) {
        headerNavItems[0].classList.add("active");
    }
  }

  // Note: The Leaflet map initialization (initializeMap function) from your original script.js
  // should be included here if those maps ('worldMap', 'regionalMap', 'localMap') are still part of
  // one of these new general content sections. If they are within the iframed maps,
  // then their initialization is handled within those iframe documents.
  // For this example, I'm assuming they are not part of the main page's new sections.
  // Example:
  // const initializeMap = (elementId, options) => { ... your map init code ... };
  // if (document.getElementById('someNewMapContainerInGeneralContent')) {
  //   initializeMap('someNewMapContainerInGeneralContent', { center: [20, 0], zoom: 2 });
  // }
});