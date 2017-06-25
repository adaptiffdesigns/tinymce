/*eslint-env node */

module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      modern: {
        options: {
          cleancss: true,
          strictImports: true,
          compress: true
        },

        expand: true,
        rename: function () {
          return "dist/blueberry/skin.min.css";
        },
        src: ["src/main/less/Skin.less"],
        dest: "dist/blueberry"
      },

      content: {
        options: {
          cleancss: true,
          strictImports: true,
          compress: true
        },
        expand: true,
        rename: function () {
          return "dist/blueberry/content.min.css";
        },
        src: ["src/main/less/Content.less"],
        dest: "dist/blueberry"
      },

      "content-inline": {
        options: {
          cleancss: true,
          strictImports: true,
          compress: true
        },
        expand: true,
        rename: function () {
          return "dist/blueberry/content.inline.min.css";
        },
        src: ["src/main/less/Content.Inline.less"],
        dest: "dist/blueberry"
      }
    },

    copy: {
      "plugin": {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: "src/main/fonts",
            src: [
              "**",
              "!*.json",
              "!*.md"
            ],
            dest: "dist/blueberry/fonts"
          },
          {
            expand: true,
            flatten: true,
            cwd: "src/main/img",
            src: "**",
            dest: "dist/blueberry/img"
          }
        ]
      }
    },

    watch: {
      skin: {
        files: ["src/main/less/**/*"],
        tasks: ["less", "copy"],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.task.loadTasks("../../../node_modules/@ephox/bolt/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-copy/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-uglify/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-less/tasks");
  grunt.task.loadTasks("../../../node_modules/grunt-contrib-watch/tasks");

  grunt.registerTask("default", ["less", "copy"]);
};