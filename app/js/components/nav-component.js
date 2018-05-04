 var NavigationItem = {
    props: ['node'],
    template: '<li class="nav-item"><a class="nav-link border-top" v-bind:href="node.url">{{ node.name }}</a></li>'
  };
