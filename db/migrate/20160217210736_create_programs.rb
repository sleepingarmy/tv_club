class CreatePrograms < ActiveRecord::Migration
  def change
    create_table :programs do |t|
      t.string :title
      t.text :description
      t.string :genre
      t.integer :num_of_seasons
      t.string :rating
      t.string :weekday
      t.belongs_to :network

      t.timestamps null: false
    end
  end
end
