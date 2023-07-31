function replaceHtmlEntities(text) {
  const htmlEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  };

  const regex = new RegExp(Object.keys(htmlEntities).join('|'), 'g');
  return text.replace(regex, (match) => htmlEntities[match]);
}

module.exports = replaceHtmlEntities;
