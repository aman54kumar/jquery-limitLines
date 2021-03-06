/*
    jQUery LimitLines
    Version: 0.1.0
    Author: Luís Dalmolin
 */

;(function ( $, window, document, undefined ) {
    var pluginName = "limitLines",
        defaults = {
            propertyName: "value"
        };

    function LimitLines(element, options) {
        this.$textarea = $(element);
        this.fetch();
        this.listenEvents();
    }

    LimitLines.prototype = {
        fetch: function() {
            this.maxColsPerLine = this.$textarea.prop('cols');
            this.maxRows        = this.$textarea.prop('rows');
            this.lines          = 1;
        }, 

        listenEvents: function() {
            var self = this;

            self.$textarea.on('keyup', function(e) {
                self.updateLines(e.keyCode);
            });
        }, 

        updateLines: function(code) {
            var lines = this.$textarea.val().split("\n");

            for (var i = 0; i < lines.length; i++) {
                if (lines[i].length <= this.maxColsPerLine) continue;
                var j = 0; space = this.maxColsPerLine;
                
                while (j++ <= this.maxColsPerLine) {
                    if (lines[i].charAt(j) === " ") space = j;
                }
                lines[i + 1] = lines[i].substring(space + 1) + (lines[i + 1] || "");
                lines[i] = lines[i].substring(0, space);
            }
            
            this.$textarea.val(lines.slice(0, this.maxRows).join("\n"));
        }
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function() {
            if ( !$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new LimitLines(this, options));
            }
        });
    };
})(jQuery, window, document);