// Select color input
$('#colorPicker').show();
let selectedColor = '#' + $('#colorPicker').val();






//FUNCTIONS

//function to store current width and height input values
function store(){
  $(this).data('val', $(this).val());
}

//function to add rows
function addRow(){
  $('#pixel_canvas').append('<tr></tr>');
  //create tableWidth td's
  for (let x=0; x<$('#input_width').val(); x++){
    //insert cell into html
    $('#pixel_canvas > tr:last').append('<td></td>');
  }
}

//function to clear existing grid and make a new grid
function makeGrid(evt) {
  //clears existing table
  $('#pixel_canvas').empty();
  //prevent page from refreshing
  evt.preventDefault();
  //get values for height
  const tableHeight = $('#input_height').val();
  //create tableHeight tr's
  for (let y=0; y<tableHeight; y++){
    addRow();
  }
}

//function to add lines and columns dinamically without deleting the content
function addLines() {
  //if the event target is the height
  if(this.id==="input_height"){
    const originalValue = $(this).data('val');
    const newValue = $(this).val();
    //find the difference between the values
    const difference = newValue-originalValue;
    //if number has increased, add rows
    if(difference>0){
      for (let i = 0; i<difference; i++){
        addRow();
      }
      //if number has decreased remove rows
    } else if(difference<0) {
      for (let i = 0; i<Math.sqrt(difference*difference); i++){
        $('#pixel_canvas > tr:last').remove();
      }
    }
  }
  //if the input is the width
  if(this.id==="input_width"){
    const originalValue = $(this).data('val');
    const newValue = $(this).val();
    //find the difference between the values
    const difference = newValue-originalValue;
    //if number has increased, add cells
    if(difference>0){
      //add #difference cells at the bottom of each tr
      for (let i = 1; i<=difference; i++){
        $('#pixel_canvas > tr').append('<td></td>');
      }
      //if number has decreased remove cells
    } else if(difference<0) {
      for (let i = 1; i<=Math.sqrt(difference*difference); i++){
        //find last td of each tr and remove
        $('#pixel_canvas > tr').find('td:last').remove();
      }
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

//function to pick a color used in the table with shift+click
function eyedropper(evt){
  if (evt.shiftKey) {
    console.log("hello");
    $(this).css({
      'cursor': "url('eyedropper.gif')"
    });
  }
  console.log("keydown not registered");
  // selectedColor=$(this).
}
//change cursor to color picker when shift is pressed
//take color of the target td
//make selected color be that color

//function to erase cell cell
function erase(evt){
  evt.preventDefault();
  $(this).css({
    'background-color': '#ffffff'
  });
}



//block manual input on the number input cells

$('input[type="number"]').on('keypress', function(evt){
  evt.preventDefault();
});
$('input[type="number"]').on('scroll', function(evt){
  evt.preventDefault();
});



//ACTIONS
//create new grid o button click
$('button').click(makeGrid);


//When a cell is clicked, or mouse is down, change the background color
$('#pixel_canvas').on('click','td', eyedropper);
$('#pixel_canvas').on('mousedown','td', tint);
$('#pixel_canvas').on('contextmenu', 'td', erase);
$('input[type="number"]').on('mouseenter',store);
$('input[type="number"]').on('mouseup',store);
$('input[type="number"]').on('change',addLines);



//TODO:make a nicer color picker
