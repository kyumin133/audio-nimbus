require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SoundHound
  class Application < Rails::Application
    config.assets.paths << Rails.root.join("app", "assets", "fonts")
    config.assets.paths << Rails.root.join("app", "assets", "music")

    config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/
    config.paperclip_defaults = {
      :storage => :s3,

      :s3_protocol => :https
      
      :s3_credentials => {
        :bucket => ENV["s3_bucket"],
        :access_key_id => ENV["s3_access_key_id"],
        :secret_access_key => ENV["s3_secret_access_key"],
        :s3_region => ENV["s3_region"],
        :s3_host_name => "s3-us-west-1.amazonaws.com"
      }
    }
  end
end
