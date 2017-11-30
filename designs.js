// Select color input
let selectedColor = $("#colorPicker").val();
// Select size input


//FUNCTIONS
//function to clear existing grid and make a new grid
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

//function to change backgorun
function tint(){
  selectedColor = $("#colorPicker").val();
  $(this).css({
    "background-color": selectedColor,
    "border": "none"
  });
}



//ACTIONS
//create new grid o button click
$(":submit").click(makeGrid);

//When a cell is clicked, or mouse is down, change the background color
$("#pixel_canvas").on("mousedown", "td", tint);
