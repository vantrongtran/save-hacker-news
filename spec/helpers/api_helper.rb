module ApiHelper
  def response_body
    JSON.parse(response.body)
  end

  def error_message
    response_body["error"]["message"]
  end

  def expect_error_message message
    expect(error_message).to eq message
  end

  # rubocop:disable Metrics/AbcSize:
  def expect_body_contains root_key, *sub_keys
    body = response_body
    expect(body.key?(root_key.to_s)).to be true
    object = body[root_key.to_s].is_a?(Array) ? body[root_key.to_s][0] : body[root_key.to_s]
    sub_keys.map(&:to_s).each do |key|
      expect(object.key?(key)).to be true
    end
  end
  # rubocop:enable Metrics/AbcSize:

  def expect_http_status http_status
    expect(response).to have_http_status(http_status)
  end
end
