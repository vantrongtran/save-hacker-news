class Parser::Parser < ApplicationService
  BASE_URL = "https://news.ycombinator.com"

  private

  def get_raw_html(url)
    url = URI.parse(url)
    Net::HTTP.get(url)
  end

  def parse_html(source)
    Nokogiri::HTML.parse source
  end

  def get_content_html(source)
    Readability::Document.new(source, remove_empty_nodes: true).content
  end

  def extract_number_from str
    str.scan(/\d+/).first.to_i
  end

  def get_text node
    node&.content
  end
end
