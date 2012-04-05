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

  var PaletteList = Backbone.Collection.extend({
    model: Palette,
    localStorage: new Store("palettes-backbone")
  });

  var PickerView = Backbone.View.extend({
    el: $('#picker'),
    events: {
      "click #createPalette": "createPalette"
    },
    selected: 0,
    initialize: function() {
      var colors = this.model.get('colors');
      _(colors).each(function(d,i) {
        $('#swatch-' + i).animate({background: d}, 1200);
      });
      $('#swatch-' + this.selected).addClass('selected');
    },
    createPalette: function() {
      Palettes.create(this.model.attributes);
    }
  });

  var defaultPalette = new Palette;
  var Palettes = new PaletteList;

  var Picker = new PickerView({ model: defaultPalette });

  Palettes.fetch();
