## autolink-js

autolink-js is a small tested JavaScript tool that takes
a string of text, finds URLs within it, and hyperlinks them.

## Why?

The original [bryanwoods/autolink-js](https://github.com/bryanwoods/autolink-js) adds an `autolink` function to `String.prototype`
This does not. it can be used with node by exporting an `autoLink` object with a `link` function.
With browsers it will create a global `autoLink` object.

### Basic Usage

after including either index.js to your page, it works like this:

```javascript
// Input
autoLink.link("This is a link to Google http://google.com")

// Output
"This is a link to Google <a href='http://google.com'>http://google.com</a>"
```

### Additional Options

You can pass any additional HTML attributes to the anchor tag with a JavaScript object, like this:

```javascript
// Input
autoLink.link("This is a link to Google http://google.com", { target: "_blank", rel: "nofollow", id: "1" })

// Output
"This is a link to Google <a href='http://google.com' target='_blank' rel='nofollow' id='1'>http://google.com</a>"
```

#### Callback

Callback option can be used to redefine how links will be rendered.

```javascript
// Input
autoLink.link("This is a link to image http://example.com/logo.png", {
  callback: function(url) {
    return /\.(gif|png|jpe?g)$/i.test(url) ? '<img src="' + url + '">' : null;
  }
});

// Output
"This is a link to image <img src='http://example.com/logo.png'>"
```

### Running the tests

After cloning this repository, simply open test/suite.html in your web
browser. The tests will run automatically.

