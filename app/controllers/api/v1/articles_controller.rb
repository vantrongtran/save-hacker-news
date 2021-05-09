class Api::V1::ArticlesController < Api::ApiController
  def index
    articles, meta = Parser::ArticleList.perform(params[:page])
    res({ articles: articles, meta: meta })
  end
end
