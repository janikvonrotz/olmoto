import marked from 'marked';

var customRender = new marked.Renderer();
customRender.image = function (href, title, text) {
  return `<img style="vertical-align: top; max-width: 100%; min-width: 100%;
    width: 100%;" src="${href}" alt="${text}">`;
};

marked.setOptions({
  gfm: true,
  tables: true
});

export {marked, customRender};
