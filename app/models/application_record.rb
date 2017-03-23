class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  private
  def get_dominant_colors!
    url = self.image.url
    url = "app/assets/images/dog.png" if url == "assets/dog.png"
    url = "app/assets/images/track.jpeg" if url == "assets/track.jpeg"
    colors = Miro::DominantColors.new(url).to_rgb

    min_brightness = 0;
    min_brightness_index = 0;
    max_brightness = 255;
    max_brightness_index = 0;

    colors.each_with_index do |color, i|
      brightness = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]
      if (brightness > min_brightness)
        min_brightness = brightness
        min_brightness_index = i
      end
      if (brightness < max_brightness)
        max_brightness = brightness
        max_brightness_index = i
      end
    end
    # p [colors[max_brightness_index], colors[min_brightness_index]]
    if (min_brightness == max_brightness)
      self.update_column(:dominant_colors, [[255, 255, 255], [0, 0, 0]])
    else
      self.update_column(:dominant_colors, [colors[max_brightness_index], colors[min_brightness_index]])
    end

  end
end
