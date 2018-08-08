// moveTheStuff();

function findPseudoElementWidth(el, position, property) {
  let totalInfoWidth = 0;
  position = ":" + position;
  var infoWidth = window.getComputedStyle(
    el, position
  ).getPropertyValue(property);

  infoWidth = parseInt(infoWidth.slice(0,2));
  if (isNaN(infoWidth)) {
    infoWidth = 0;
  } else {
  }

  totalInfoWidth = infoWidth;
  // console.log("position: " + position + " " + totalInfoWidth);
  return totalInfoWidth;
}

function findElementWidth(el) {
  // console.log("FINDING THE ELEMENT WIDTH");
  // console.log(el);
  let liInnerWidth = el.offsetWidth;
  let widthStyle = getComputedStyle(el);
  let marginLeftWidth = parseInt(widthStyle.marginLeft);
  let marginRightWidth = parseInt(widthStyle.marginRight);
  liTotalWidth = 0;
  liTotalWidth += liInnerWidth;
  liTotalWidth += marginLeftWidth;
  liTotalWidth += marginRightWidth;
  // console.log("liInnerTotalWidth = " + liTotalWidth);
  // console.log(" ");
  return liTotalWidth;
}


// function findPseudoElementWidth(el) {
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



function moveTheStuff() {
  let divTicker = document.querySelector(".ticker");
  let liTicker = document.querySelectorAll(".info");
  let ulTicker = document.querySelector(".list-bts-coming-soon");
  let liTotalWidth = 0;
  let tickerWidth = 0;

  // let divTickerInnerWidth = divTicker.offsetWidth;
  // let divTickerStyle = getComputedStyle(divTicker);
  // let divTickerMarginLeftWidth = parseInt(divTickerStyle.marginLeft);
  // let divTickerMarginRightWidth = parseInt(divTickerStyle.marginRight);
  let totalDivTicker = 0;


  let totalLiWidth = 0;
  liTicker.forEach(function(tick){
    let liInnerWidth = tick.offsetWidth;
    let widthStyle = getComputedStyle(tick);
    let marginLeftWidth = parseInt(widthStyle.marginLeft);
    let marginRightWidth = parseInt(widthStyle.marginRight);

    let beforePseudoWidth = findPseudoElementWidth(tick, "before", "width");
    let afterPseudoWidth = findPseudoElementWidth(tick, "after", "width");
    let elWidth = findElementWidth(tick);
    let widthMovement = "";

    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("Total element width: " + (beforePseudoWidth + afterPseudoWidth + elWidth));
    totalLiWidth += beforePseudoWidth + afterPseudoWidth + elWidth;
    console.log("totalLiWidth: " + totalLiWidth);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");



    liTotalWidth = 0;
    // liTotalWidth += totalInfoWidth;
    liTotalWidth += liInnerWidth;
    liTotalWidth += marginLeftWidth;
    liTotalWidth += marginRightWidth;
    console.log("liTotalWidth = " + liTotalWidth);

    tickerWidth += liTotalWidth;
    console.log("tickerWidth = " + tickerWidth);
    console.log(" ");
  });
  widthMovement = "translateX(-" + totalLiWidth + "px)";
  console.log("widthMovement = " + widthMovement);
  let tickerDuration = totalLiWidth * 10;
  console.log("tickerDuration = " + tickerDuration);

  divTicker.animate([
    { transform: 'translateX(100vw)'},
    { transform: widthMovement}
    // { transform: 'translateX(-100000px)'}
  ], {
    duration: tickerDuration,
    iterations: Infinity
  });

}
