 var SkillItem = {
    props: ['skill'],
    template: 
      '<div>'
        + '<i v-bind:class="[skill.iconType, skill.iconName, skill.colorNo]" class="fa-3x"></i>'
        + '<p class="h6 py-3 my-3 border-top border-bottom text-uppercase text-spaced">{{ skill.desc }}</p>'
        + '<p class="h1 font-heading">{{ skill.firstText }} <span class="h6"> {{ skill.secondText }}</span></p>'
      + '</div>'
  };
