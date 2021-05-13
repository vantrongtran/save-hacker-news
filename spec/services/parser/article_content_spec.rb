require "rails_helper"

RSpec.describe Parser::ArticleContent do
  describe ".perform" do
    subject(:article) { described_class.perform(url) }

    context "with page have og image" do
      let(:url) { "http://2.bp.blogspot.com" }
      let(:expected_content) { File.new("./spec/fixtures/article_og_image.html").read }
      let(:expected_response) { { content: expected_content, image: "http://2.bp.blogspot.com/image.png" } }

      before do
        allow_any_instance_of(described_class).to receive(:get_raw_html)
          .and_return(File.new("./spec/fixtures/article_og_image.html"))
        allow_any_instance_of(described_class).to receive(:get_content_html)
          .and_return(expected_content)
      end

      it "return list article with correct format" do
        expect(article).to eq expected_response
      end
    end

    context "with page not have og image and have image tag" do
      let(:url) { "http://2.bp.blogspot.com" }
      let(:expected_content) { File.new("./spec/fixtures/article_img_tag.html").read }
      let(:expected_response) { { content: expected_content, image: "http://schema.org/post-image.png" } }

      before do
        allow_any_instance_of(described_class).to receive(:get_raw_html)
          .and_return(File.new("./spec/fixtures/article_img_tag.html"))
        allow_any_instance_of(described_class).to receive(:get_content_html)
          .and_return(expected_content)
      end

      it "return list article with correct format" do
        expect(article).to eq expected_response
      end
    end
  end
end
