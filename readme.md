# Botany.js

## Introduction

Botany is a JavaScript/CSS library for creating tree view components using *declarative techniques*. This means that,
unlike imperative (but still very powerful) libraries like [jsTree](http://www.jstree.com/), botany trees can be built
using the DOM templating of JavaScript frameworks like Angular, React etc., and adding or removing elements from the
tree can be done without needing to tell the tree to update or redraw anything.

## Demos

Have a look at a live demo [here on GitHub Pages](tmiguelt.github.io/botany/#demo), or clone the repository and run the demo files.

## Installation

Run `npm install botany` or `git clone https://github.com/TMiguelT/botany` to get the latest version of the library,
then copy the contents of `dist` directory to your project (for example, you might put it in `static/libs/botany`).
This directory includes the stylesheet (`botany.css`), the script (`botany.js`) and all the relevant image files (`.svg`)

Then you'll need to reference both the stylesheet and the script in your HTML. You'll also need to include jQuery
because it's required by botany. Of course in a real website you'd put the scripts at the bottom of the page and
the stylesheets in the `<head>`:

```html
<link rel="stylesheet" href="static/libs/botany/botany.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="static/libs/botany/git adbotany.min.js"></script>
```

## Usage

To use botany, you first need to create an unordered list with the class `botany`, and give it a class indicating which
theme to use (see [themes](#themes) for more information). For example, your list element might look like this:

```html
<ul class="botany lines"></ul>
```

Then all you need to do is call `$("selector").botany()` on the list you just created. It may seem redundant to add the
class and call a jQuery function but the class determines the styling of the list, meaning that the style won't suddenly
change when you call the plugin. All the plugin does is setup the even handlers for opening and closing the nodes.

## Themes

The themes (like `lines`) in the above example, are one of the following:

* lines
* no-lines
* no-markers

Themes determine which images to use as the marker (indicating a node is open or closed), as well as the horizontal
and vertical lines that make up the tree. The default three themes are pretty self explanatory, but if you want to
write your own theme (use your own custom images), read the section on [custom themes](#custom-themes)

## Basic Customization

As shown in the demo files (have a look in the demo directory), a Botany tree consists of a `<ul>` element with the class
`botany`. You can have any DOM structure inside this tree, but there are some things to note:

* Any `<ul>` or `<li>` elements inside the `.botany` element will be styled.

* The `.open` class indicates when a node is open, and can be manually added to nodes that you want to start open (by
default nodes are closed). This class is also automatically toggled whenever a node is opened or closed by a user, so
you can write your own custom styles based on this.

* The `.botany-open` and `.botany-closed` classes are for manually specifying an open/closed indicator. Such an element
should be a direct child of an `<li>` and these should only be used when using a theme that has no indicators itself
(i.e. the no-markers theme). Have a look at the demo-bootstrap.html file for an example of using the `.botany-open` and
`.botany-closed` classes.

## Custom Themes

To create a custom theme for botany, all you need to do is add a `.json` file to the `src/css/themes` directory containing
paths to the image files you want to use as the open and closed markers, and the vertical and horizontal lines. It's
probably a good idea to use the existing json files as a template. Also note that you don't have to use SVGs as your
images, you can use any image format that CSS supports (png, jpeg etc.)

Then, just add the name of that json file to the themesList variable in botany.styl. It currently looks like this:

`themesList = "lines", "no-lines", "no-markers"`

Adding a custom theme would make it more like this (if you had a my-theme.json file in the themes directory)

`themesList = "lines", "no-lines", "no-markers", "my-theme"`

Then, to re-create the stylesheet, just run `gulp build`, and the files in the dist directory will be rebuilt. Of course
to do this you'll have to install the dev dependencies, so don't use the `--production` flag for `npm install`. You can
also rebuild botany if you want to make any other changes to the main stylesheet (botany.styl) or the main script (script.js)