$(document).ready(() => {
  const pageURL = $(location).attr("href");
  const splitPageURL = pageURL.split('/');
  const mapID = splitPageURL[splitPageURL.length - 1];
  // console.log(mapID);

  $.get(`/favourites/${mapID}`, function(data) {
    // console.log(data);
    if (data) {
      $("i").toggle();
    }
  });


  $("#fav-active").click(() => {
    const pageURL = $(location).attr("href");
    const splitPageURL = pageURL.split('/');
    const mapID = splitPageURL[splitPageURL.length - 1];
    // console.log(mapID);

    $.post(`/favourites/${mapID}/delete`, function() {
      $("i").toggle();
    });

  // here
  });

  $("#fav-inactive").click(() => {
    const pageURL = $(location).attr("href");
    const splitPageURL = pageURL.split('/');
    const mapID = splitPageURL[splitPageURL.length - 1];
    // console.log(mapID);

    $.post(`/favourites/${mapID}`, function() {
      $("i").toggle();
    });
  });

});
