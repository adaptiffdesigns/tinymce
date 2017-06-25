/**
 * Demo.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*eslint no-console:0 */

define(
  'tinymce.plugins.keyword.demo.Demo',
  [
    'tinymce.core.EditorManager',
    'tinymce.plugins.keyword.Plugin',
    'tinymce.themes.modern.Theme'
  ],
  function (EditorManager, KeywordPlugin, ModernTheme) {
    return function () {
      console.info('here');
      KeywordPlugin();
      ModernTheme();

      EditorManager.init({
        selector: "textarea.tinymce",
        theme: "modern",
        skin_url: "../../../../../skins/lightgray/dist/lightgray",
        plugins: "keyword",
        toolbar: "keyword",
        height: 600
      });
    };
  }
);