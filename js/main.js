/* Ready Function */
$(function () {
  $(".slick-cards-container").slick({
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          unslick: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
    ],
  });

  $("body").on("click", ".notification-toggle", function (e) {
    $(".notification-widget").fadeIn(300);
    e.preventDefault();
  });
  $("body").on("click", ".notify-header .close-notify", function (e) {
    $(".notification-widget").fadeOut(300);
    e.preventDefault();
  });

  $("body").on("click", function (e) {
    if (
      !$(e.target).is(
        ".notify-wrapper, .notify-wrapper *, .notification-toggle, .notification-toggle *"
      )
    )
      $(".notification-widget").fadeOut(300);
    if (
      !$(e.target).is(".control-panel-wrapper, .control-panel-wrapper *") &&
      $(".control-panel").hasClass("opened")
    )
      $(".control-panel").removeClass("opened");
  });
});

function customAccordion(trigger, type) {
  let content = trigger.parent().find(".accor-content");

  if (content.is(":visible")) {
    content.slideUp(300);
    trigger.closest(".accordion > *").removeClass("expand");
  } else {
    content.slideDown(300);
    trigger.closest(".accordion > *").addClass("expand");
  }
}

// toggle all accordion
function toggleAll(accordion, trigger) {
  if (accordion.find(".accor-content").is(":visible")) {
    $(".accordion .accor-content").slideUp(300);
    $(".accordion > *").removeClass("expand");
    trigger.text("View All");
  } else {
    $(".accordion .accor-content").slideDown(300);
    $(".accordion > *").addClass("expand");
    trigger.text("Close All");
  }
}

// Accordion setup
$(window).width(function () {
  let windowWidth = $(window).width();
  if (windowWidth <= 450) {
    // Slide up all accordion contents which does not have expand CLASS
    $(".accordion > *:not(.expand)").each(function () {
      $(this).find(".accor-content").slideUp(300);
    });
    $("body").on("click", ".accor-trigger", function () {
      customAccordion($(this));
    });
    $("body").on("click", ".accor-toggle-all", function () {
      toggleAll($(".accordion"), $(this));
    });
  }
});

$(window).resize(function () {
  let windowWidth = $(window).width();
  if (windowWidth == 450) {
    // Slide up all accordion contents which does not have expand CLASS
    $(".accordion > *:not(.expand)").each(function (index) {
      $(this).find(".accor-content").slideUp(300);
      console.log(index);
    });
    $("body").on("click", ".accor-trigger", function () {
      customAccordion($(this));
    });
  } else if (windowWidth >= 450) {
    $("body").off("click", ".accor-trigger");
    $(".accordion > *").each(function () {
      $(this).find(".accor-content").slideDown(300);
    });
  }
});

// OneAtTime
// independant

// Control Panel Toggle
$("body").on("click", ".toggle-panel", function (e) {
  e.preventDefault();
  console.log(e.target);
  let controlPanel = $(this).closest(".control-panel");
  if (!controlPanel.hasClass("opened")) controlPanel.addClass("opened");
  else controlPanel.removeClass("opened");
});

customSelect();

// Custom Select dropdown
function customSelect() {
  $(".c-option").each(function () {
    var $this = $(this);
    var $thisText = $this.find("a").html();
    if ($this.hasClass("c-selected")) {
      $this.parent().parent().find(".custom-selected").html($thisText);
    }
  });
  $(document).on("click", ".c-option", function () {
    var that = $(this);
    var $thisText = that.find("a").html();
    that.addClass("c-selected");
    that.siblings().removeClass("c-selected");
    that.parent().parent().find(".custom-selected").html($thisText);
  });
  $("body").on("click", function () {
    $(".custom-options").each(function () {
      if ($(this).css("visibility") == "visible") {
        $(this).removeClass("c-visible");
        $(".select-company-wrapper").css("height", "");
      }
    });
  });
  $("body").on("click", ".custom-select", function () {
    var options = $(this).find(".custom-options");
    if (!options.hasClass("c-visible")) {
      options.addClass("c-visible");
      setTimeout(function () {
        let cVisible = $(".custom-options").height();
        $(".select-company-wrapper").height(cVisible);
      }, 300);
    } else {
      options.removeClass("c-visible");
    }
  });
}

// if HTML DOM Element that contains the map is found...
if (document.getElementById("map-canvas")) {
  // Coordinates to center the map
  var myLatlng = new google.maps.LatLng(52.525595, 13.393085);

  // Other options for the map, pretty much selfexplanatory
  var mapOptions = {
    zoom: 14,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  // Attach a map to the DOM Element, with the defined settings
  var map = new google.maps.Map(
    document.getElementById("map-canvas"),
    mapOptions
  );

  map.data.setControls(["Polygon"]);
}
// tabs js

