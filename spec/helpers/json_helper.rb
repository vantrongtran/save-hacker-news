module JsonHelper
  def expect_json_contains json_object, *keys
    keys.map(&:to_s).each do |key|
      expect(json_object.key?(key)).to be true
    end
  end
end
