// Select color input
$('#colorPicker').show();
let selectedColor = '#' + $('#colorPicker').val();
// Select size input

//FUNCTIONS
//function to clear existing grid and make a new grid
function makeGrid(evt) {
  //clears existing table
  $('#pixel_canvas').empty();
  //prevent page from refreshing
  evt.preventDefault();
  //get values for table width and height
  const tableWidth = $('#input_width').val();
  const tableHeight = $('#input_height').val();
  //create tableHeight tr's
  for (let y=0; y<tableHeight; y++){
    $('#pixel_canvas').append('<tr></tr>');
    console.log('have row');
    //create tableWidth td's
    for (let x=0; x<tableWidth; x++){
      //insert cell into html
      $('#pixel_canvas > tr:last').append('<td></td>');
      console.log('have cells');
    }
  }
}

//function to change background
let clicked = false;
function tint(e){
  //stops dragging the colored cells
  e.preventDefault();

  clicked = true;
  selectedColor = '#' + $('#colorPicker').val();
  $(this).css({
    'background-color': selectedColor
  });
  $('#pixel_canvas').on('mouseenter','td', function(){
    if (clicked === true){
      console.log("entered cell");
      $(this).css("background-color",selectedColor);
    };
  });
  $('html').on('mouseup', function(){
    clicked = false;
  });
}

//ACTIONS
//create new grid o button click
$('button').click(makeGrid);

//When a cell is clicked, or mouse is down, change the background color
$('#pixel_canvas').on('mousedown','td', tint);
$('input[type="number"]').on('change',makeGrid);

//TODO:make table change height and width dinamically as the values are changed
//TODO:make a nicer color picker
