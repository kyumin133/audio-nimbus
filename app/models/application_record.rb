class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  # private
  def get_dominant_colors!
    url = self.image.url
    url = "app/assets/images/dog.png" if url == "assets/dog.png"
    url = "app/assets/images/track.jpeg" if url == "assets/track.jpeg"
    colors = Miro::DominantColors.new(url).to_rgb

    # min_brightness = 0;
    # min_brightness_index = 0;
    # max_brightness = 255;
    # max_brightness_index = 0;
    #
    # colors.each_with_index do |color, i|
    #   brightness = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]
    #   if (brightness > min_brightness)
    #     min_brightness = brightness
    #     min_brightness_index = i
    #   end
    #   if (brightness < max_brightness)
    #     max_brightness = brightness
    #     max_brightness_index = i
    #   end
    # end

    max_distance_overall = 0
    most_contrasting_indices = [0, 0]
    # distance_arr = []
    colors.each_with_index do |color1, i|
      max_distance = 0
      max_distance_index = i
      colors.each_with_index do |color2, j|
        next if i === j
        dr = color1[0] - color2[0]
        dg = color1[1] - color2[1]
        db = color1[2] - color2[2]
        distance = ((2 * dr * dr) + (4 * dg * dg) + (3 * db * db)) ** 0.5
        if distance > max_distance
          max_distance = distance
          max_distance_index = j
        end
      end
      # distance_arr << [max_distance, max_distance_index]
      if max_distance > max_distance_overall
        max_distance_overall = max_distance
        most_contrasting_indices = [i, max_distance_index]
      end
    end

    if colors[most_contrasting_indices[0]].reduce(:+) < colors[most_contrasting_indices[1]].reduce(:+)
      most_contrasting_indices[0], most_contrasting_indices[1] = most_contrasting_indices[1], most_contrasting_indices[0]
    end


    if (max_distance_overall === 0)
      self.update_column(:dominant_colors, [[255, 255, 255], [0, 0, 0]])
    else
      self.update_column(:dominant_colors, [colors[most_contrasting_indices[1]], colors[most_contrasting_indices[0]]])
    end

  end
end
