var randomColor = function() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
};

var Palette = Backbone.Model.extend({
  defaults: function() {
    return {
      name: "Untitled",
      colors: _.map( _.range(5), randomColor )
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
    "click #create-palette": "createPalette",
    "click #random-palette": "randomPalette"
  },
  initialize: function() {
    var self = this;
    this.model.bind('change', this.render, this);
    _.each(_.range(5), function(i) {
      $('#color-' + i).on('focus', function() {
        // this strange line sets the cursor to the end of text input when focused
        $(this).val( $(this).val() );
      });
      $('#swatch-'+ i).click(function() {
        $('#color-' + i).focus();
      });
    });
    $('#color-pickers input').each(function(i) {
      $(this).on('keyup', function() {
        var colors = _.clone( self.model.get('colors') );
        colors[i] = $(this).val();
        self.model.set('colors', colors, {silent: true});
        $('#swatch-' + i).animate({background: colors[i] }, 400)
      });
    });
    this.render();
  },
  render: function() {
    var colors = this.model.get('colors');
    _(colors).each(function(d,i) {
      $('#swatch-' + i).animate({background: d}, 1200);
      $('#color-' + i).val(d);
    });
  },
  createPalette: function() {
    Palettes.create(this.model.toJSON());
    window.scrollTo( window.scrollX, 0);
  },
  randomPalette: function() {
    this.model.set({colors: _.map( _.range(5), randomColor ) });
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
