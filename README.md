Video list
============

Responsive page showing videos from BBC's endpoint.

Client Installation
--------------------

1. Install nodeJS
2. Install required nodejs modules via npm
3. Install grunt ``` npm install -g grunt-cli ``` if you don't have one
3. Ruby and Sass

```
npm install
gem install sass
```


### Running the build
Run `grunt` to build JS and CSS files and run tests


### Watching for changes
Grunt has been setup with a watch task to automatically watch JS and SCSS files for modifications, then build and files when they're modified.

To run Grunt in watch mode:
```
grunt watch
```

### Get dev verion
If you want to have latest version you need to:
1. Checkout master branch
2. ``` git checkout -t origin/video_list_feature ```

### Project structure

webapp  
    modules  
        app.src
            app.js
    sass
        style.scss
    style  
        style.css                - main css stylesheet  
