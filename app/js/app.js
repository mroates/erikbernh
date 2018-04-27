
var app = new Vue({
    el: '#app',
    data: {
      message: 'Vue is live!',
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat!' }
      ],
      rawHtml: '<span class="h2">Large text!</span>',
      someDefaultUrl : '//erikbernhardsson.se',
      firstName: 'Erik',
      lastName: 'Bernh',
      isActive: true,
      hasError: false,
      classObject: {
        'active': function () { return 1 + 1 == 2; },
        'text-danger': false
      },
      type: 'E'
      
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