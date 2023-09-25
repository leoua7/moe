jQuery(document).ready(function () {
  cryoutSliderTitleBreakUp(
    ".cryout",
    ".caption-title > span"
  );

  /* Static Slider Title Letter break */
  function cryoutSliderTitleBreakUp(titleContainer, animatedTitle) {

    /* If title not present on page - exit */
    if (!jQuery(animatedTitle).length) return;

    /* Add class to all containers so the same CSS gets applied */
    jQuery(titleContainer).addClass("animated-title");

    /* And for improved performance, if static slider not in view - no animation */
    jQuery(window).on("scroll", function () {
      var el = jQuery(titleContainer);
      if (!isInViewport(el)) {
        el.removeClass("animated-title");
      } else {
        el.addClass("animated-title");
      }
    });

    var $location = jQuery(animatedTitle),
      oldStr =
        $location.html() /* new string for processing, complete with HTML tags */,
      clearStr = $location
        .text()
        .split(" ")
        .join("") /* text only string for keys */,
      newStr = '<em class="caption-title-word">',
      firsRunDelay = 1000 /*ms*/,
      letterDelay = 0 /*ms*/,
      animatedLetters =
        [] /* array for the random letters that are going to be animated */,
      nrOfAnimatedLetters =
        Math.floor(clearStr.length / 4) > 2
          ? Math.floor(clearStr.length / 4)
          : 2;
    nrOfAnimatedLetters = nrOfAnimatedLetters > 7 ? 7 : nrOfAnimatedLetters;
    var interval =
      3500 + nrOfAnimatedLetters * letterDelay; /* 200 = CSS animation time */

    for (var i = 0; i < oldStr.length; i++) {
      /* If tag starts skip everything until tag ends */
      if (oldStr[i] == "<") {
        var substring = oldStr.substring(i);
        substring = substring.match(/(.*?)(<([^>]+)>)/gi);
        substring = substring[0];
        newStr += substring;
        i += substring.length - 1;

        /* If entity starts skip everything until entity ends */
      } else if (oldStr[i] == "&") {
        var substring = oldStr.substring(i);
        substring = substring.match(/(.*?);/gi);
        substring = substring[0];
        newStr +=
          '<span><span class="cry-single">' +
          substring +
          '</span><span class="cry-double">' +
          substring +
          "</span></span>";
        i += substring.length - 1;

        /* Any plain old single character */
      } else if (oldStr[i] != " ") {
        newStr +=
          '<span><span class="cry-single">' +
          oldStr[i] +
          '</span><span class="cry-double">' +
          oldStr[i] +
          "</span></span>";

        /* Spaces must be inside words for proper flow on new lines */
      } else {
        newStr += '<span>&nbsp;</span></em><em class="caption-title-word">';
      }
    }
    newStr += "</em>";

    /* Out with the old, in with the new... string */
    $location.html(newStr);

    function titleAnimation() {
      jQuery(animatedTitle + " .cry-single, " + animatedTitle + " .cry-double")
        .removeClass("animated-letter")
        .css("animation-delay", "0s");
      for (var i = 0; i < nrOfAnimatedLetters; i++) {
        /* Get a random key from the new array of letters*/
        animatedLetters[i] = Math.floor(Math.random() * clearStr.length);
        jQuery(animatedTitle + " .cry-single")
          .eq(animatedLetters[i])
          .addClass("animated-letter")
          .css("animation-delay", i * letterDelay + "ms");
        jQuery(animatedTitle + " .cry-double")
          .eq(animatedLetters[i])
          .addClass("animated-letter")
          .css("animation-delay", i * letterDelay + "ms");
      }
    }

    /* Run once after delay */
    setTimeout(titleAnimation, firsRunDelay);

    /* Run forever with set interval */
    window.setInterval(titleAnimation, interval);
  } /* cryoutSliderTitleBreakUp() */
}); /* document.ready */
