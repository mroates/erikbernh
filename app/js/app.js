
var app = new Vue({
    el: '#app',
    components: {
      'todo-item' : TodoItem,
      'navigation-item' : NavigationItem
    },
    data: {
      nodes: [
        { id: 1, name: 'Portfolio', url: '/portfolio' },
        { id: 2, name: 'Contact', url: '/contact' }
      ],
      classObject: {
        'active': function () { return 1 + 1 == 2; }
      }
    },    
    computed: {
      fullName: {
        get: function () {
          return this.firstName + ' ' + this.lastName;
        },
        set: function (newValue) {
          var names = newValue.split(' ');
          this.firstName = names[0];
          this.lastName = names[names.length - 1];
        }
      }
    }
  });