const marked = require('marked')

module.exports = function transformMarkdown (content) {
  return marked(content)
}
