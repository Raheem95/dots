$(document).ready(function () {
  let $slider = $(".slider .list");
  let $items = $(".slider .list .item");
  let $next = $("#next");
  let $prev = $("#prev");
  let $dots = $(".slider .dots li");

  let lengthItems = $items.length - 1;
  let active = 0;

  $next.click(function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
  });

  $prev.click(function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
  });

  let refreshInterval = setInterval(() => {
    $next.click();
  }, 3000);

  function reloadSlider() {
    $slider.css(
      "right",
      $items.eq(active).position().left +
        $items.eq(active).outerWidth() -
        $slider.outerWidth() +
        "px"
    );

    $(".slider .dots li.active").removeClass("active");
    $dots.eq(active).addClass("active");

    $(".slider .list .item h1.shineAnimation").removeClass("shineAnimation");
    $items.eq(active).find("h1").addClass("shineAnimation");

    $(".slider .list .item p.shineAnimation").removeClass("shineAnimation");
    $items.eq(active).find("p").addClass("shineAnimation");

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
      $next.click();
    }, 6000);
  }

  $dots.each(function (key) {
    $(this).click(function () {
      active = key;
      reloadSlider();
    });
  });

  $(window).resize(function () {
    reloadSlider();
  });

  let $blog = $(".news-section .blog");
  let $news = $(".news-section .blog .item");
  let currentIndex = 0;

  $("#nextNews").click(function () {
    currentIndex = currentIndex < $news.length - 1 ? currentIndex + 1 : 0;
    autoScroll();
  });

  $("#prevNews").click(function () {
    currentIndex = currentIndex === 0 ? $news.length - 1 : currentIndex - 1;
    autoScroll();
  });

  function autoScroll() {
    $blog.css("transform", `translateX(${currentIndex * 100}vw)`);
  }

  let refreshNewsInterval = setInterval(function () {
    $("#nextNews").click();
  }, 6000);

  $(".news-section .blog .item").hover(
    function () {
      clearInterval(refreshNewsInterval); // Stop sliding when hover starts
    },
    function () {
      refreshNewsInterval = setInterval(function () {
        $("#nextNews").click();
      }, 6000); // Restart sliding when hover ends
    }
  );

  const observerOptions = {
    threshold: 0.5, // Trigger when 50% of the item is in the viewport
  };

  function intersectionCallback(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const $target = $(entry.target);

        if ($target.hasClass("leftRight")) {
          $target.addClass("leftRightAnimation");
        } else if ($target.hasClass("rightLeft")) {
          $target.addClass("rightLeftAnimation");
        } else if ($target.hasClass("shine")) {
          $target.addClass("shineAnimation");
        }

        observer.unobserve(entry.target); // Optional: stop observing after animation
      }
    });
  }

  const observer = new IntersectionObserver(
    intersectionCallback,
    observerOptions
  );

  $(".leftRight, .rightLeft, .shine").each(function () {
    observer.observe(this);
  });
});
$(document).on("click", ".Viewbord", function () {
  $(".model-view").hasClass("model-view-v")
    ? $(".model-view").removeClass("model-view-v")
    : $(".model-view").addClass("model-view-v");
});
$(document).on("click", ".ViewContact", function () {
  $(".contact-model").hasClass("contact-model-view")
    ? $(".contact-model").removeClass("contact-model-view")
    : $(".contact-model").addClass("contact-model-view");
});

// Select all counter elements
const counters = document.querySelectorAll(".counter p");

// Create an Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counterElement = entry.target; // The <p> element being observed
        const targetNumber = parseInt(
          counterElement.getAttribute("data-count")
        ); // Get target number from data attribute
        let count = 0;
        const increment = targetNumber / 100; // Adjust the speed by changing 100

        const updateCounter = () => {
          count += increment;
          if (count < targetNumber) {
            counterElement.textContent = Math.ceil(count);
            setTimeout(updateCounter, 30); // Adjust the speed by changing 30
          } else {
            counterElement.textContent = targetNumber + "+";
          }
        };

        updateCounter();

        // Stop observing once the counter starts
        observer.unobserve(counterElement);
      }
    });
  },
  {
    threshold: 0.5, // Trigger when 50% of the element is in view
  }
);

// Observe each counter element
counters.forEach((counter) => {
  observer.observe(counter);
});
