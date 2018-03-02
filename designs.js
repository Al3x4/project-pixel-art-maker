$(document).ready(function(){

  //declare variables




  // Select color input
  $('#colorPicker').show();
  let selectedColor = '#' + $('#colorPicker').val();
  const pixelCanvas = $('#pixel_canvas');

  //FUNCTIONS

  //function to store current width and height input values
  function store(){
    $(this).data('val', $(this).val());
  }

  //function to add rows
  function addRow(){
    pixelCanvas.append('<tr></tr>');
    //create tableWidth td's
    for (let x=0; x<$('#input_width').val(); x++){
      //insert cell into html
      $('#pixel_canvas > tr:last').append('<td></td>');
    }
  }



  //function to clear existing grid and make a new grid
  function makeGrid(evt) {
    //clears existing table
    pixelCanvas.empty();
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
      console.log('width');
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
    $(this).css({
      'background-color': selectedColor
    });
    pixelCanvas.on('mouseenter','td', function(){
      if (clicked === true){
        console.log("entered cell");
        $(this).css("background-color",selectedColor);
      };
    });
    $('html').on('mouseup', function(){
      clicked = false;
    });
  }

  //function to convert rgb to hex
  function rgbToHex(rgb) {
    const hex = Number(rgb).toString(16);
    if (hex.length < 2) {
         hex = "0" + hex;
    }
    return hex;
  };

  //function to pick a color used in the table with shift+click
  function eyedropper(evt){
      if (evt.shiftKey) {
      evt.preventDefault();
      selectedColor = $(this).css("background-color");
      //add the picked color as the color picker's background
      $('#colorPicker').css('background-color', selectedColor);
      //change the color picker value
      $('#colorPicker').val(rgbToHex(selectedColor).substring(1));
    } else {
      //if it's not shift, then color the cell with the selected color.
      $(this).css('background-color',selectedColor);
      console.log("click");
    }
  }

  //function to erase cell cell
  function erase(evt){
    //stops the appearance of the menu
    evt.preventDefault();
    $(this).css('background-color','#ffffff');
    clicked = true;
    pixelCanvas.on('mouseenter','td', function(){
      if (clicked === true){
        console.log('entered cell');
        $(this).css('background-color','#ffffff');
      };
    });
    $('html').on('mouseup', function(){
      clicked = false;
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
  pixelCanvas.on('click','td', eyedropper);
  pixelCanvas.on('mousedown','td', function(evt){
    switch (evt.which){
      case 1: tint(evt);
        break;
      case 3 : erase(evt);
        break;
      default: console.log("fu");

    }
  });


  pixelCanvas.on('contextmenu', 'td', function(e){
    e.preventDefault();
    $(this).css('background-color','#ffffff');
  });


  // pixelCanvas.on('keydown', 'td', function(){
  //   //change cursor to color picker when shift is pressed
  //   $(this).addClass('eyedropper');
  // });
  //
  // pixelCanvas.on('keyup', 'td', function(){
  //   //change cursor to color picker when shift is released
  //   $(this).removeClass('eyedropper');
  // });

  $('input[type="number"]').on('mouseenter',store);
  $('input[type="number"]').on('mouseup',store);
  $('input[type="number"]').on('change',addLines);
  $('#colorPicker').on('click','td', function(){
    $(this).css('background-color',selectedColor);
  });
  $('#colorPicker').on('change', function(){
    selectedColor = '#' + $('#colorPicker').val();
  });


// TODO: check what doesnt work in chrome for the addLines function
// TODO: use eyedropper cursor when shift key is down
});
