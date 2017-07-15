const markdownpdf = require('markdown-pdf');
markdownpdf().from('./README.md').to('./resume.pdf', function(){
  console.log('done!')
})
