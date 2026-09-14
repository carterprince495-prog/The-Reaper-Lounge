/* =========================================================
   THE REAPER LOUNGE
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     MOBILE MENU
     ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const siteMenu = document.querySelector("#site-menu");

  if (menuToggle && siteMenu) {

    menuToggle.addEventListener("click", () => {

      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));

      siteMenu.classList.toggle("menu-open", !isOpen);

      menuToggle.textContent = isOpen ? "Menu" : "Close";
    });

    // Close mobile menu after clicking a link
    siteMenu.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        menuToggle.setAttribute("aria-expanded", "false");

        siteMenu.classList.remove("menu-open");

        menuToggle.textContent = "Menu";
      });

    });
  }


  /* =========================================================
     STANDINGS SORTING
     ========================================================= */

  const standingsTable = document.querySelector("#standings-table");
  const sortButtons = document.querySelectorAll("[data-sort]");
  const sortStatus = document.querySelector("#sort-status");

  if (standingsTable && sortButtons.length > 0) {

    const tbody = standingsTable.querySelector("tbody");

    sortButtons.forEach(button => {

      button.addEventListener("click", () => {

        const sortType = button.dataset.sort;

        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort((rowA, rowB) => {

          if (sortType === "rank") {

            const rankA = Number(rowA.children[0].textContent);
            const rankB = Number(rowB.children[0].textContent);

            return rankA - rankB;
          }

          if (sortType === "wins") {

            const winsA = Number(rowA.dataset.wins);
            const winsB = Number(rowB.dataset.wins);

            return winsB - winsA;
          }

          if (sortType === "losses") {

            const lossesA = Number(rowA.dataset.losses);
            const lossesB = Number(rowB.dataset.losses);

            return lossesA - lossesB;
          }

          if (sortType === "diff") {

            const diffA = Number(rowA.dataset.diff);
            const diffB = Number(rowB.dataset.diff);

            return diffB - diffA;
          }

          return 0;
        });


        // Put sorted rows back into table
        rows.forEach(row => {
          tbody.appendChild(row);
        });


        // Update rankings
        rows.forEach((row, index) => {

          const rankCell = row.children[0];

          if (rankCell) {
            rankCell.textContent = index + 1;
          }

        });


        // Update active button
        sortButtons.forEach(btn => {
          btn.classList.remove("active-filter");
        });

        button.classList.add("active-filter");


        // Accessibility status
        if (sortStatus) {

          const labels = {
            rank: "rank",
            wins: "wins",
            losses: "losses",
            diff: "point differential"
          };

          sortStatus.textContent =
            `Standings sorted by ${labels[sortType]}.`;

        }

      });

    });

  }


  /* =========================================================
     SMOOTH SCROLLING
     ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        // Update browser URL without jumping
        history.pushState(null, "", targetId);

      }

    });

  });


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {

    const linkPage =
      link.getAttribute("href")?.split("/").pop();

    if (
      linkPage === currentPage &&
      !link.getAttribute("href").startsWith("#")
    ) {

      link.classList.add("active");

    }

  });


  /* =========================================================
     CLOSE MENU WITH ESCAPE KEY
     ========================================================= */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape" && menuToggle && siteMenu) {

      menuToggle.setAttribute("aria-expanded", "false");

      siteMenu.classList.remove("menu-open");

      menuToggle.textContent = "Menu";

    }

  });


  /* =========================================================
     BUTTON PRESS FEEDBACK
     ========================================================= */

  document.querySelectorAll(".button").forEach(button => {

    button.addEventListener("click", () => {

      button.classList.add("button-clicked");

      setTimeout(() => {
        button.classList.remove("button-clicked");
      }, 250);

    });

  });


  /* =========================================================
     LOG
     ========================================================= */

  console.log("☠️ The Reaper Lounge JavaScript loaded successfully.");

});
