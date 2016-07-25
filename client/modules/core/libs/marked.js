import marked from 'marked';

var customRender = new marked.Renderer();
customRender.image = function (href, title, text) {
  return `<a href="/files/${text}/edit"><img class="img-fluid" src="${href}" alt="${text}"></a>`;
};

marked.setOptions({
  gfm: true,
  tables: true
});

export {marked, customRender};
