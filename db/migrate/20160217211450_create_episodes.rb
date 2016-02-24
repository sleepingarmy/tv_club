class CreateEpisodes < ActiveRecord::Migration
  def change
    create_table :episodes do |t|
      t.integer :season
      t.integer :episode_number
      t.text :summary
      t.datetime :air_date
      t.string :rating
      t.belongs_to :program

      t.timestamps null: false
    end
  end
end
