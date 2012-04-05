var Palette = Backbone.Model.extend({
  defaults: function() {
    return {
      name: "Untitled",
      colors: [
        "#d7191c",
        "#fdae61",
        "#ffffbf",
        "#abdda4",
        "#2b83ba"
      ]
    };
  },
});

var defaultPalette = new Palette;

var PaletteList = Backbone.Collection.extend({
  model: Palette,
  localStorage: new Store("palettes-backbone")
});

var PaletteView = Backbone.View.extend({
  tagName: "li",
  template: _.template($('#item-template').html()),
  events: {
    'click': 'setPicker'
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  setPicker: function() {
    defaultPalette.set({
      colors: this.model.get("colors")
    });
  }
});

var PickerView = Backbone.View.extend({
  el: $('#picker'),
  events: {
    "click #create-palette": "createPalette"
  },
  initialize: function() {
    var self = this;
    this.model.bind('change', this.render, this);
    $('input').each(function(i) {
      $(this).on('keyup', function() {
        var colors = _.clone( self.model.get('colors') );
        colors[i] = $(this).val();
        self.model.set('colors', colors);
      });
    });
    this.render();
  },
  render: function() {
    var colors = this.model.get('colors');
    _(colors).each(function(d,i) {
      $('#swatch-' + i).animate({background: d}, 1200);
      // don't update focused input
      if (!$('#color-' + i).is(":focus")) {
        $('#color-' + i).val(d);
      }
    });
  },
  createPalette: function() {
    Palettes.create(this.model.toJSON());
    window.scrollTo( window.scrollX, 0);
  }
});

var PaletteListView = Backbone.View.extend({
  el: $("#palette-list"),
  initialize: function() {
    Palettes.bind('add', this.addOne, this);
    Palettes.bind('reset', this.addAll, this);
  },
  addOne: function(palette) {
    var view = new PaletteView({model: palette});
    $("#palette-list").prepend(view.render().el);
  },
  addAll: function() {
    Palettes.each(this.addOne);
  },
});

var Palettes = new PaletteList;

var pickerView = new PickerView({ model: defaultPalette });
var palettesView = new PaletteListView;

Palettes.fetch();
