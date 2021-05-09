class Parser::ArticleList < Parser::Parser
  def perform(page)
    page ||= 1
    @parsed_html = parse_html(get_raw_html("#{BASE_URL}/best?p=#{page}"))
    [articles, { had_more: had_more?, current_page: page.to_i }]
  end

  private

  def had_more?
    @parsed_html.css("a.morelink").any?
  end

  def article_table
    @parsed_html.css("table.itemlist")
  end

  def article_rows
    article_table.css("tr.athing")
  end

  # rubocop:disable Metrics/AbcSize
  def articles
    article_rows.map do |item|
      article_meta = item.next

      Article.new.tap do |article|
        article.id = item["id"]
        article.title = get_text(item.css("td.title a.storylink").first)
        article.page_src = item.css("td.title a.storylink").first["href"]
        article.point = extract_number_from(get_text(article_meta.css("span.score").first))
        article.comment_count = extract_number_from(get_text(article_meta.css("a").last))
        article.published_time = get_text(article_meta.css("span.age").first)
        article.author = get_text(article_meta.css("a.hnuser").first)
      end.as_json
    end
  end
  # rubocop:enable Metrics/AbcSize
end
