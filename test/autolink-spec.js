describe("autolink", function() {
  it("can be called on a string", function() {
    return expect(autoLink("hi there")).toBeDefined();
  });
  it("does not alter a string with no URL present", function() {
    return expect(autoLink("hi again")).toEqual("hi again");
  });
  it("returns the string with the URLs hyperlinked", function() {
    return expect(autoLink("Check out this search engine http://google.com")).toEqual("Check out this search engine <a href='http://google.com'>" + "http://google.com</a>");
  });
  it("does not hyperlink additional non-URL text", function() {
    return expect(autoLink("LMSTFY: http://google.com and RTFM")).toEqual("LMSTFY: <a href='http://google.com'>http://google.com</a> and RTFM");
  });
  it("correctly hyperlinks text with multiple URLs", function() {
    return expect(autoLink("Google is http://google.com and Twitter is http://twitter.com")).toEqual("Google is <a href='http://google.com'>http://google.com</a> and " + "Twitter is <a href='http://twitter.com'>http://twitter.com</a>");
  });
  it("correctly hyperlinks URLs, regardless of TLD", function() {
    return expect(autoLink("Click here http://bit.ly/1337 now")).toEqual("Click here <a href='http://bit.ly/1337'>http://bit.ly/1337</a> now");
  });
  it("correctly hyperlinks URLs, regardless of subdomain", function() {
    return expect(autoLink("Check it: http://some.sub.domain")).toEqual("Check it: <a href='http://some.sub.domain'>http://some.sub.domain</a>");
  });
  it("correctly handles punctuation", function() {
    return expect(autoLink("Go here now http://google.com!")).toEqual("Go here now <a href='http://google.com'>http://google.com</a>!");
  });
  it("correctly handles hash character(#)", function() {
    return expect(autoLink("Go here now http://google.com/#query=index")).toEqual("Go here now <a href='http://google.com/#query=index'>http://google.com/#query=index</a>");
  });
  it("correctly handles escaped fragment character(#!)", function() {
    return expect(autoLink("Go here now http://twitter.com/#!/PostDeskUK")).toEqual("Go here now <a href='http://twitter.com/#!/PostDeskUK'>http://twitter.com/#!/PostDeskUK</a>");
  });
  it("correctly handles parentheses ()", function() {
    return expect(autoLink("My favorite Wikipedia Article http://en.wikipedia.org/wiki/Culture_of_honor_(Southern_United_States)")).toEqual("My favorite Wikipedia Article <a href='http://en.wikipedia.org/wiki/Culture_of_honor_(Southern_United_States)'>http://en.wikipedia.org/wiki/Culture_of_honor_(Southern_United_States)</a>");
  });
  it("allows single right quotes", function() {
    return expect(autoLink("Safety for Syria’s Women http://www.rescue.org/press-releases/syria’s-women-and-girls-continue-face-chaos-and-danger-fearing-their-safety-18565")).toEqual("Safety for Syria’s Women <a href='http://www.rescue.org/press-releases/syria’s-women-and-girls-continue-face-chaos-and-danger-fearing-their-safety-18565'>http://www.rescue.org/press-releases/syria’s-women-and-girls-continue-face-chaos-and-danger-fearing-their-safety-18565</a>");
  });
  it("correctly handles FTP links", function() {
    return expect(autoLink("Click here ftp://ftp.google.com")).toEqual("Click here <a href='ftp://ftp.google.com'>ftp://ftp.google.com</a>");
  });
  it("sets link attributes based on the options provided", function() {
    return expect(autoLink("Google it: http://google.com", {
      target: "_blank"
    })).toEqual("Google it: <a href='http://google.com' target='_blank'>" + "http://google.com</a>");
  });
  it("sets multiple link attributes if more than one is given", function() {
    return expect(autoLink("Google it: http://google.com", {
      target: "_blank",
      rel: "nofollow"
    })).toEqual("Google it: <a href='http://google.com' target='_blank' " + "rel='nofollow'>http://google.com</a>");
  });
  xit("correctly handles surrounding HTML tags", function() {
    return expect(autoLink("<p>http://nba.com</p>")).toEqual("<p><a href='http://nba.com'>http://nba.com</a></p>");
  });
  it("can begin with a hyperlink", function() {
    return expect(autoLink("http://google.com That is a link to Google")).toEqual("<a href='http://google.com'>http://google.com</a> " + "That is a link to Google");
  });
  it("can have a hyperlink as first part of a new line", function() {
    return expect(autoLink("I think I can help you.\nhttp://google.com That is a link to Google")).toEqual("I think I can help you.\n" + "<a href='http://google.com'>http://google.com</a> " + "That is a link to Google");
  });
  it("can have a hyperlink as first part of a new HTML line", function() {
    return expect(autoLink("I think I can help you.<br>http://google.com That is a link to Google")).toEqual("I think I can help you.<br>" + "<a href='http://google.com'>http://google.com</a> " + "That is a link to Google");
  });
  describe("callback option", function() {
    it("can be passed to redefine how link will be rendered", function() {
      return expect(autoLink("Google it: http://google.com", {
        callback: function(url) {
          return "[" + url + "](" + url + ")";
        }
      })).toEqual("Google it: [http://google.com](http://google.com)");
    });
    it("can accept other parameters", function() {
      return expect(autoLink("Google it: http://google.com", {
        target: "_blank",
        rel: "nofollow",
        callback: function(url) {
          return "<a href='" + url + "'>" + url + "</a>";
        }
      })).toEqual("Google it: <a href='http://google.com'>http://google.com</a>");
    });
    return it("can return nothing", function() {
      return expect(autoLink("Google it: http://google.com", {
        callback: function(url) {
          if (/\.(gif|png|jpe?g)$/i.test(url)) {
            return "<img src='" + url + "' alt='" + url + "'>";
          }
        }
      })).toEqual("Google it: <a href='http://google.com'>http://google.com</a>");
    });
  });
  return describe("html", function() {
    it("will not affect images", function() {
      return expect(autoLink("Image <img src='http://example.com/logo.png'>")).toEqual("Image <img src='http://example.com/logo.png'>");
    });
    it("will not affect anchors", function() {
      return expect(autoLink("Anchor <a href='http://example.com'>http://example.com</a>")).toEqual("Anchor <a href='http://example.com'>http://example.com</a>");
    });
    return it("will still work", function() {
      return expect(autoLink("Anchor <a href='http://example.com'>http://example.com</a> to http://example.com")).toEqual("Anchor <a href='http://example.com'>http://example.com</a> to <a href='http://example.com'>http://example.com</a>");
    });
  });
});
