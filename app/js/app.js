var app = new Vue({
    el: '#app',
    components: {
      'todo-item' : TodoItem,
      'navigation-item' : NavigationItem,
      'skill-item' : SkillItem
    },
    data: {
      headerText: 'erikb.',
      tempUnit: 'C',
      nodes: [
        { id: 1, name: 'Portfolio', url: '/portfolio' },
        { id: 2, name: 'Contact', url: '/contact' }
      ],
      skills: [
        { 
          id: 1, 
          desc: 'Age', 
          firstText: '27', 
          secondText: 'years', 
          colorNo: 'color7', 
          iconType: 'fas', 
          iconName: 'fa-birthday-cake' 
        },
        { 
          id: 2, 
          desc: 'Experience in field', 
          firstText: '3.5', 
          secondText: 'years', 
          colorNo: 'color6', 
          iconType: 'fas', 
          iconName: 'fa-stopwatch' 
        },
        { 
          id: 3, 
          desc: 'Creativity level', 
          firstText: '8', 
          secondText: '/ 10', 
          colorNo: 'color8', 
          iconType: 'fas', 
          iconName: 'fa-paint-brush' 
        },
        { 
          id: 4, 
          desc: 'Passion for design', 
          firstText: '10', 
          secondText: '/ 10', 
          colorNo: 'color5', 
          iconType: 'fas', 
          iconName: 'fa-heart' 
        },
      ],
      classObject: {
        'active': function () { return 1 + 1 == 2; }
      },
      getTemp: '',
      getAddress: '',
      addressSearch: '',
      weekDays: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
      isNewDay: true,
    },    
    computed: {
      getDateYear: {
        get: function () {
          return new Date().getFullYear();
        }
      },
      // getIsNewDay: {
      //   get () {
      //     return this.isNewDay;
      //   },
      //   set (newValue) {
      //     this.isNewDay = newValue;
      //   }
      // }
    },
    created: function () {
      //this.fetchTemp();
    },        
    methods: {
      fetchTemp: function (lng, lat) {
        var vm = this;
          //this.$http.get('api.openweathermap.org/data/2.5/weather?q=Normal&units=imperial&APPID=MYAPPID'),
          this.$http.get('http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/' + lng + '/lat/' + lat + '/data.json')
          .then(response => {
            vm.getTemp = response.data.timeSeries;
         });
      },
      fetchAddress (city) {
        if (typeof(city) != 'undefined' && city !== '') {
          var vm = this;

          this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(city))
          .then(response => {
            vm.getAddress = response.data.results[0];
            
            if (vm.getAddress) {
              var geo = vm.getAddress.geometry;

              var lng = new Number(geo.location.lng).toFixed(4);
              var lat = new Number(geo.location.lat).toFixed(4);

              vm.fetchTemp(lng, lat);
            }
         });
        }
      },
      filterTemperature (array) {
        return array.filter(parameter => parameter.name === 't'); // parameter name 't' is for temperature
      },
      checkIfNewDay (dateString) {
        var date = new Date(dateString).toLocaleDateString();

        var lastDate = this.lastShownDate;

        if (date === lastDate) {
          this.isNewDay = false;
          return false;
        }
        else {
          this.lastShownDate = date;
          this.isNewDay = true;
          return true;
        }
      },
      formatDate (dateString) {
        var date = new Date(dateString);

        return date.toLocaleDateString();
      },
      formatTime (dateString) {
        var date = new Date(dateString);

        return date.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute:'2-digit' 
        });
      }
  }
  });