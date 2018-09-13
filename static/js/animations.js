function getPseudoElementWidth(el, position, property) {
  let totalElWidth = 0;
  position = ":" + position;
  var elWidth = window.getComputedStyle(
    el, position
  ).getPropertyValue(property);

  elWidth = parseInt(elWidth.slice(0,2));
  if (isNaN(elWidth)) {
    elWidth = 0;
  } else {
  }

  totalElWidth = elWidth;
  // console.log("position: " + position + " " + totalElWidth);
  return totalElWidth;
}

function getElementWidth(el) {
  // console.log("FINDING THE ELEMENT WIDTH");
  // console.log(el);
  let elInnerWidth = el.offsetWidth;
  let elWidthStyle = getComputedStyle(el);
  let elMarginLeftWidth = parseInt(elWidthStyle.marginLeft);
  let elMarginRightWidth = parseInt(elWidthStyle.marginRight);
  elTotalWidth = 0;
  elTotalWidth += elInnerWidth;
  elTotalWidth += elMarginLeftWidth;
  elTotalWidth += elMarginRightWidth;
  // console.log("elInnerTotalWidth = " + elTotalWidth);
  // console.log(" ");
  return elTotalWidth;
}


// function getPseudoElementWidth(el) {
//   let infoWidthBefore = window.getComputedStyle(
//     el, ":before"
//   ).getPropertyValue("width");
//   let infoWidthAfter = window.getComputedStyle(
//     el, ":after"
//   ).getPropertyValue("width");
//   infoWidthBefore = parseInt(infoWidthBefore.slice(0,2));
//   infoWidthAfter = parseInt(infoWidthAfter.slice(0,2));
//   if (isNaN(infoWidthBefore)) {
//     infoWidthBefore = 0;
//   } else {
//   }
//   if (isNaN(infoWidthAfter)) {
//     infoWidthAfter = 0;
//   } else {
//   }
//   totalInfoWidth = infoWidthBefore + infoWidthAfter;
//   console.log(totalInfoWidth);
// }

// function moveTheStuff() {
//   console.log("************MOVING STUFF ALL OVER**************");
//   // let divTicker = document.querySelector(".ticker");
//   // let liTicker = document.querySelectorAll(".info");
//   // let ulTicker = document.querySelector(".list-bts-coming-soon");
//   let liTotalWidth = 0;
//   let tickerWidth = 0;
//   let totalDivTicker = 0;
//   let totalLiWidth = 0;
//   liTicker.forEach(function(tick){
//     let liInnerWidth = tick.offsetWidth;
//     let widthStyle = getComputedStyle(tick);
//     let marginLeftWidth = parseInt(widthStyle.marginLeft);
//     let marginRightWidth = parseInt(widthStyle.marginRight);
//
//     let beforePseudoWidth = getPseudoElementWidth(tick, "before", "width");
//     let afterPseudoWidth = getPseudoElementWidth(tick, "after", "width");
//     let elWidth = getElementWidth(tick);
//     let widthMovement = "";
//     // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     // console.log("Total element width: " + (beforePseudoWidth + afterPseudoWidth + elWidth));
//     totalLiWidth += beforePseudoWidth + afterPseudoWidth + elWidth;
//     // console.log("totalLiWidth: " + totalLiWidth);
//     // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
//     liTotalWidth = 0;
//     // liTotalWidth += totalInfoWidth;
//     liTotalWidth += liInnerWidth;
//     liTotalWidth += marginLeftWidth;
//     liTotalWidth += marginRightWidth;
//     // console.log("liTotalWidth = " + liTotalWidth);
//     tickerWidth += liTotalWidth;
//     // console.log("tickerWidth = " + tickerWidth);
//     // console.log(" ");
//   });
//   widthMovement = "translateX(-" + totalLiWidth + "px)";
//   // console.log("widthMovement = " + widthMovement);
//   let tickerDuration = totalLiWidth * 10;
//   // console.log("tickerDuration = " + tickerDuration);
//   animateTicker(divTicker, widthMovement, tickerDuration);
//
// }

// let divTicker = document.querySelector(".ticker");
// let infoTicker = document.querySelectorAll(".info");
// let ulTicker = document.querySelector(".list-bts-coming-soon");

// console.log(liTicker);
function getMovement(liTicker) {
  // console.log("************getMovement()**************");
    // let divTicker = document.querySelector(".ticker");
    // console.log(divTicker);
    // let liTicker = document.querySelectorAll(".info");
    // console.log(liTicker);
    // let ulTicker = document.querySelector(".list-bts-coming-soon");
    // console.log(ulTicker);
    let liTotalWidth = 0;
    let tickerWidth = 0;
    let totalDivTicker = 0;
    let totalLiWidth = 0;
    liTicker.forEach(function(tick){
      // console.log(tick);
      // let liInnerWidth = tick.offsetWidth;
      // let widthStyle = getComputedStyle(tick);
      // let marginLeftWidth = parseInt(widthStyle.marginLeft);
      // let marginRightWidth = parseInt(widthStyle.marginRight);
      // liTotalWidth += liInnerWidth;
      // liTotalWidth += marginLeftWidth;
      // liTotalWidth += marginRightWidth;
      // console.log("liTotalWidth = " + liTotalWidth);

      let elWidth = getElementWidth(tick);
      let beforePseudoWidth = getPseudoElementWidth(tick, "before", "width");
      let afterPseudoWidth = getPseudoElementWidth(tick, "after", "width");
      totalLiWidth += beforePseudoWidth + afterPseudoWidth + elWidth;
      //
      //
      // let widthMovement = "";
      // // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // console.log("Total element width: " + (beforePseudoWidth + afterPseudoWidth + elWidth));
      // console.log("totalLiWidth: " + totalLiWidth);
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      // liTotalWidth = 0;
      // // liTotalWidth += totalInfoWidth;
      //
      // tickerWidth += liTotalWidth;
      // console.log("tickerWidth = " + tickerWidth);
      // console.log(" ");
    });
    widthMovement = "translateX(-" + totalLiWidth + "px)";
    // console.log("widthMovement = " + widthMovement);
  return widthMovement;
}

function getDuration(liTicker) {
  // console.log("************getDuration()**************");
      // let divTicker = document.querySelector(".ticker");
      // console.log(divTicker);
      // let liTicker = document.querySelectorAll(".info");
      // console.log(liTicker);
      // let ulTicker = document.querySelector(".list-bts-coming-soon");
      // console.log(ulTicker);
      let liTotalWidth = 0;
      let tickerWidth = 0;
      let totalDivTicker = 0;
      let totalLiWidth = 0;
      liTicker.forEach(function(tick){
        // console.log(tick);
        // let liInnerWidth = tick.offsetWidth;
        // let widthStyle = getComputedStyle(tick);
        // let marginLeftWidth = parseInt(widthStyle.marginLeft);
        // let marginRightWidth = parseInt(widthStyle.marginRight);
        // liTotalWidth += liInnerWidth;
        // liTotalWidth += marginLeftWidth;
        // liTotalWidth += marginRightWidth;
        // console.log("liTotalWidth = " + liTotalWidth);

        let elWidth = getElementWidth(tick);
        let beforePseudoWidth = getPseudoElementWidth(tick, "before", "width");
        let afterPseudoWidth = getPseudoElementWidth(tick, "after", "width");
        totalLiWidth += beforePseudoWidth + afterPseudoWidth + elWidth;
        //
        //
        // let widthMovement = "";
        // // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // console.log("Total element width: " + (beforePseudoWidth + afterPseudoWidth + elWidth));
        // console.log("totalLiWidth: " + totalLiWidth);
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        // liTotalWidth = 0;
        // // liTotalWidth += totalInfoWidth;
        //
        // tickerWidth += liTotalWidth;
        // console.log("tickerWidth = " + tickerWidth);
        // console.log(" ");
      });

  widthMovement = "translateX(-" + totalLiWidth + "px)";
  // console.log("widthMovement = " + widthMovement);
  let tickerDuration = totalLiWidth * 12;
  // console.log("tickerDuration = " + tickerDuration);
  return tickerDuration;
}

// let divTicker = document.querySelector(".ticker");
// let movement = getMovement(infoTicker);
// let duration = getDuration(infoTicker);
// if (divTicker) {
//   animateTicker(divTicker, movement, duration);
// }
function animateTicker(el, movement, duration) {
  el.animate([
    { transform: 'translateX(100vw)'},
    { transform: movement}
  ], {
    duration: duration,
    iterations: Infinity
  });
}
