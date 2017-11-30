// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()
$(":submit").click(makeGrid);
function makeGrid() {
  //clears existing table
  $("#pixel_canvas").empty();
  //prevent page from refreshing
  event.preventDefault();
  //get values for table width and height
  const tableWidth = $("#input_width").val();
  const tableHeight = $("#input_height").val();
  //create tableHeight tr's
  for (let y=0; y<tableHeight; y++){
    $("#pixel_canvas").append("<tr></tr>");
    console.log("have row");
    //create tableWidth td's
    for (let x=0; x<tableWidth; x++){
      //insert cell into html
      $("#pixel_canvas > tr:last").append("<td></td>");
    }
  }

}
