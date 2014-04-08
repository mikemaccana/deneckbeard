var MAX_COLUMN_WIDTH = 550;

var log = console.log.bind(console),
  query = document.querySelector.bind(document),
  queryAll = document.querySelectorAll.bind(document);

NodeList.prototype.forEach = Array.prototype.forEach;

// Go find 'X-Subject' comments - this means we're a mailing list archive and probably need fixing
var needsDeneckbearding = false;
var treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT, null, null);
var comment;
while ( comment = treeWalker.nextNode() ) {
  if ( comment.data.indexOf("X-Subject") === 0 ) {
    needsDeneckbearding = true;
    log("site needs de-neckbearding")
    break;
  };
}

// Turn paragraphs into actual paragraphs, style them properly.
if ( needsDeneckbearding ) {
  queryAll("pre").forEach(function(preElement){
    if ( preElement.childNodes.length === 1 ) {
      var paragraphsContent = [];
      preElement.innerText.split('\n\n').forEach(function(paragraphLines){
        var paragraphContent = ''
        paragraphLines.split('\n').forEach(function(line){
          paragraphContent += ' '+line
        })
        paragraphsContent.push(paragraphContent)
      })
      var articleElement = document.createElement('article');
      paragraphsContent.forEach(function(paragraphContent){
        var paragraph = document.createElement('p');
        paragraph.innerText = paragraphContent
        paragraph.style['margin-top'] = '16px'
        articleElement.appendChild(paragraph)
      })
      preElement.parentNode.replaceChild(articleElement, preElement);
      articleElement.style['max-width'] = MAX_COLUMN_WIDTH+'px'
      articleElement.style['margin'] = '0px auto'
    } else {
      log('pre has more than one child node')
    }
  })
  // Font list borrowed from Readability
  query('body').style['font-family'] = "'Sentinel SSm A', 'Sentinel SSm B', 'Palatino Linotype', 'Book Antiqua', Palatino, serif"
}
