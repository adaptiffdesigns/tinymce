/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains all core logic for the code plugin.
 *
 * @class tinymce.code.Plugin
 * @private
 */
define(
  'tinymce.plugins.ace.Plugin',
  [
    'tinymce.core.dom.DOMUtils',
    'tinymce.core.PluginManager'
  ],
  function (DOMUtils, PluginManager) {
    PluginManager.add(
      'ace',
      function (editor) {
        function showDialog() {
          var win = editor.windowManager.open(
            {
              title: "Code Editor",
              type: "container",
              id: "mce-ace-editor",
              name: "ace",
              width: 800,
              height: 600,
              inline: true,
              buttons:[
                {
                  text: "Ok",
                  classes: "primary",
                  onclick : function () {
                    if (typeof mceEditor !== "undefined") {
                      var html = mceEditor.getValue();
                      editor.focus();
                      editor.undoManager.transact(
                        function () {
                          editor.setContent(html);
                        }
                      );
                      editor.selection.setCursorLocation();
                      editor.nodeChanged();

                      editor.windowManager.close();
                    }
                  }
                },
                {
                  text: "Cancel",
                  onclick: "close"
                }
              ]
            }
          );

          var aceEditor = DOMUtils.DOM.get('mce-ace-editor-body');
          if (aceEditor) {
            DOMUtils.DOM.add(aceEditor, 'div', { id: 'mce-ace-editor-block' });

            // Load editor
            DOMUtils.DOM.setStyles(
              DOMUtils.DOM.get('mce-ace-editor-block'),
              {
                'position': 'absolute',
                'left': '0',
                'right': '0',
                'top': '0',
                'bottom': '0'
              }
            );

            var mceEditor = window.ace.edit('mce-ace-editor-block');
            mceEditor.setTheme('ace/theme/spacegray');
            mceEditor.getSession().setMode('ace/mode/html');
            mceEditor.setOptions(
              {
                showPrintMargin: false,
                showInvisibles: true
              }
            );
            mceEditor.getSession().setUseWrapMode(true);
            mceEditor.getSession().setTabSize(4);
            mceEditor.getSession().setUseSoftTabs(true);

            // Set editor contents
            mceEditor.getSession().setValue(
              editor.getContent(
                {
                  source_view: false
                }
              )
            );
          }

          // TODO:: find better way to do this.
          var countchecks = 0;
          function removeMCEClass() {
            if (countchecks++ == 50) {
              clearTimeout(soddoffloop);
              return;
            }

            var soddoffloop = setTimeout(
              function () {
                if (DOMUtils.DOM.hasClass(DOMUtils.DOM.get('mce-ace-editor'), 'mce-container')) {
                  var mceAceCodeEditor = DOMUtils.DOM.get('mce-ace-editor');
                  DOMUtils.DOM.removeClass(mceAceCodeEditor, 'mce-container');
                }

                removeMCEClass();
              },
              100
            );
          }

          removeMCEClass();

          // Gecko has a major performance issue with textarea
          // contents so we need to set it when all reflows are done
          win.find('#code').value(editor.getContent({ source_view: true }));
        }

        editor.addCommand("mceAceCodeEditor", showDialog);

        editor.addButton(
          'ace',
          {
            icon: 'code',
            tooltip: 'Source code',
            onclick: showDialog
          }
        );

        editor.addMenuItem(
          'ace',
          {
            icon: 'code',
            text: 'Source code',
            context: 'tools',
            onclick: showDialog
          }
        );
      }
    );

    return function () { };
  }
);