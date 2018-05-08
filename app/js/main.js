
// Instead of jquery
document.addEventListener("DOMContentLoaded", function(event) {
  });


function ClickAction() {
};

  var lastValueOfValidTime = "";

  function filterArray (array) {
    var newArray = [];

    for (var i = 0; i <= array.length - 1; i++) {
      
      var item = array[i];

      var itemDate = new Date(item.validTime).toLocaleDateString(),
          itemTime = new Date(item.validTime).toLocaleTimeString();

      item.isActive = false;

      if (lastValueOfValidTime == "") {
        lastValueOfValidTime = itemDate;
        newArray.push([item]);
      }
      else if (itemDate == lastValueOfValidTime) {
        if (newArray && newArray.length > 0) {
          newArray[newArray.length-1].push(item);
        }
      }
      else if (itemDate != lastValueOfValidTime) {
        newArray.push([item]);
        lastValueOfValidTime = itemDate;
      }

    }
    return newArray;
  }