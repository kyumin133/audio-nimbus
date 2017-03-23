class AddDominantColors < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :dominant_colors, :text, array: true
    add_column :tracks, :dominant_colors, :text, array: true
  end
end
