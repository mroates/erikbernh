
// Instead of jquery
document.addEventListener("DOMContentLoaded", function(event) {
  });


function ClickAction() {
  console.log("HEJA HEJA!");
};


  

  var constructicons = [
    // {
    //   time: '10:00',
    //   valueTemp: '9',
    //   validTime: '2018-05-06'
    // },
    // {
    //   time: '11:00',
    //   valueTemp: '9',
    //   validTime: '2018-05-06'
    // },
    // {
    //   time: '11:00',
    //   valueTemp: '15',
    //   validTime: '2018-05-07'
    // },
    // {
    //   time: '12:00',
    //   valueTemp: '10',
    //   validTime: '2018-05-07'
    // },
    
    {
      validTime:	'2018-05-03T11:00:00Z',		
      parameters: [
        {
          name:	't',
          unit:	'c',
          values: [10]
        }
      ],
    },
    {
      validTime:	'2018-05-03T12:00:00Z',		
      parameters: [
        {
          name:	't',
          unit:	'c',
          values: [10]
        }
      ],
    },
    {
      validTime:	'2018-05-04T12:00:00Z',		
      parameters: [
        {
          name:	't',
          unit:	'c',
          values: [10]
        }
      ],
    },
    {
      validTime:	'2018-05-04T13:00:00Z',		
      parameters: [
        {
          name:	't',
          unit:	'c',
          values: [10]
        }
      ],
    }

  ];

  //var test = filterArray(constructicons);

  var lastValueOfValidTime = "";

  function filterArray (array) {
    var newArray = [];

    for (var i = 0; i <= array.length - 1; i++) {
      
      var item = array[i];

      var itemDate = new Date(item.validTime).toLocaleDateString(),
          itemTime = new Date(item.validTime).toLocaleTimeString();

      if (lastValueOfValidTime == "") {
        lastValueOfValidTime = itemDate;
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