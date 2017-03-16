class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :artist_id, null: false

      t.timestamps
    end

    add_attachment :tracks, :image
    add_attachment :tracks, :music

  end
end
