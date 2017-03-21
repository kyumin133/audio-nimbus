class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :commenter_id, null: false
      t.references :commentable, null: false, polymorphic: true, index: true
      t.text :text, null: false

      t.timestamps
    end
  end
end
