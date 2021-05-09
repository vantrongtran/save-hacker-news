require "rails_helper"

RSpec.describe Parser::ArticleList do
  describe ".perform" do
    subject(:articles) { described_class.perform(page) }

    context "with in page's range" do
      before do
        allow_any_instance_of(described_class).to receive(:get_raw_html)
          .and_return(File.new("./spec/fixtures/articles_page.html"))
      end

      let(:page) { 1 }

      it "return list article with correct meta" do
        expect(articles[1][:had_more]).to be_truthy
        expect(articles[1][:current_page]).to eq page
      end

      it "return list article with correct format" do
        expect(articles[0].any?).to be_truthy
        expect_json_contains articles[0].first, :id, :title, :page_src, :point, :comment_count, :published_time, :author
      end
    end

    context "with out of page's range" do
      before do
        allow_any_instance_of(described_class).to receive(:get_raw_html)
          .and_return(File.new("./spec/fixtures/empty_articles_page.html"))
      end

      let(:page) { 999 }

      it "return list article with correct meta" do
        expect(articles[1][:had_more]).to be_falsey
        expect(articles[1][:current_page]).to eq page
      end

      it "return list article with correct format" do
        expect(articles[0]).to eq []
      end
    end
  end
end
