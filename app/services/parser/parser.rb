class Parser::Parser < ApplicationService
  BASE_URL = "https://news.ycombinator.com"

  private

  def get_raw_html(url)
    url = URI.parse(url)
    Net::HTTP.get(url)
  end

  def parse_html(html)
    Nokogiri::HTML.parse html
  end

  def get_content_html(html)
    Readability::Document.new(html).content
  end

  def extract_number_from str
    str.scan(/\d+/).first.to_i
  end

  def get_text node
    node&.content
  end
end
