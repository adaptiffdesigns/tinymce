/**
 * Simple TinyMCE plugin to add keywords for replacement later.
 *
 * @package    Plugins
 * @subpackage Keyword
 * @author     Adaptiff Designs <info@adaptiffdesigns.com.au>
 * @copyright  2017-2017 Adaptiff Designs (ABN 98 535 913 199)
 */

define(
  'tinymce.plugins.keyword.Plugin',
  [
    'tinymce.core.dom.DOMUtils',
    'tinymce.core.PluginManager'
  ],
  function (DOMUtils, PluginManager) {
    PluginManager.add(
      'keyword',
      function (editor, url) {
        // Get our keywords from the editor element.
        var textarea = editor.getElement();
        var keywords = DOMUtils.getAttrib(textarea, 'data-keywords');
        var values = [];

        for (var word in keywords) {
          if (!keywords.hasOwnProperty(word)) {
            continue;
          }

          var value = {
            text: keywords[word],
            value: word
          };

          values.push(value);
        }

        // Add a button that opens a window.
        editor.addButton(
          'keyword',
          {
            text: '%_%',
            icon: 'percent',
            onclick: function () {
              // Open window.
              editor.windowManager.open(
                {
                  title: 'Select a keyword',
                  width : 270,
                  height : 70,
                  body: [
                    {
                      type: 'listbox',
                      name: 'align',
                      label: '',
                      onselect: function (e) {},
                      'values': values
                    }
                  ],
                  onsubmit: function (e) {
                    // Insert content when the window form is submitted.
                    editor.insertContent('%' + e.data.value + '%');
                  }
                }
              );
            }
          }
        );
      }
    );
    return function () {};
  }
);