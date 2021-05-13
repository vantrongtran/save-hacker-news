class Parser::ArticleContent < Parser::Parser
  def perform(url)
    @raw_html = get_raw_html(url)
    article
  end

  private

  def article_image
    html = parse_html(@raw_html)
    og_image = html.css("meta[property='og:image']").any? && html.css("meta[property='og:image']").first[:content]
    page_image = html.css("img").any? && html.css("img").first[:src]
    og_image || page_image
  end

  def article
    {
      image: article_image,
      content: get_content_html(@raw_html)
    }
  end
end
