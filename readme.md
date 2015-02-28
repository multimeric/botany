# Botany.js

## Introduction

Botany is a JavaScript/CSS library for creating tree view components using *declarative techniques*. This means that,
unlike imperative (but still very powerful) libraries like [jsTree](http://www.jstree.com/), Botany trees can be built
using the DOM templating of JavaScript frameworks like Angular, React etc., and adding or removing elements from the
tree can be done without needing to tell the tree to update or redraw anything.

## Installation

Just run `npm install botany` to get the latest version of the library.

## Usage

First, choose a basic theme. Botany themes include the entire botany stylesheet, along with the image/svg files used
as the lines that make up the tree, as well as the image used to indicate when a node is opened or closed.
Include this theme folder in your static files directory along with script.min.js, then add references to the
stylesheet and the script like this:
```html
<script src="script.min.js">
<link rel="stylesheet" href="lines/lines.css">
```

As shown in the demo files (have a look in the demo directory), a Botany tree consists of a <ul> element with the class
`botany`. You can have any DOM structure inside this tree, but there are some things to note:

* The `.open` class indicates when a node is open, and can be manually added to nodes. This class is however automatically
toggled whenever a node is opened or closed by a user

* The `.botany-open` and `.botany-closed` classes are for manually specifying an open/closed indicator. Such an element
should be a direct child of an `<li>` and these should only be used when using a theme that has no indicators itself.