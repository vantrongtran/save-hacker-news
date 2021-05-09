require "rails_helper"

RSpec.describe "Api::V1::ArticlesController", type: :request do
  describe "GET api v1/articles" do
    context "with correct page's range" do
      before do
        allow_any_instance_of(Parser::ArticleList).to receive(:get_raw_html)
          .and_return(File.new("./spec/fixtures/articles_page.html"))
        get api_v1_articles_path(page: page)
      end

      let(:page) { rand 1..10 }
      let(:correct_meta) { { had_more: true, current_page: page }.as_json }

      it "reponse article list and meta with 200 http code" do
        expect_http_status :ok
        expect_body_contains :articles, :id, :title, :page_src, :point, :comment_count, :published_time, :author
        expect_body_contains :meta, :had_more, :current_page
      end

      it "reponse correct meta" do
        expect(response_body["meta"]).to eq correct_meta
      end
    end

    context "with incorrect page's range" do
      before do
        allow_any_instance_of(Parser::ArticleList).to receive(:get_raw_html)
          .and_return(File.new("./spec/fixtures/empty_articles_page.html"))
        get api_v1_articles_path(page: page)
      end

      let(:page) { 9999 }
      let(:correct_meta) { { had_more: false, current_page: page }.as_json }

      it "reponse empty article list and meta with 200 http code" do
        expect_http_status :ok
        expect_body_contains :articles
        expect_body_contains :meta
      end

      it "reponse correct meta" do
        expect(response_body["meta"]).to eq correct_meta
      end
    end
  end
end
