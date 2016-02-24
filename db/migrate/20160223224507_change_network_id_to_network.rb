class ChangeNetworkIdToNetwork < ActiveRecord::Migration
  def change
    remove_column :programs, :network_id
    add_column :programs, :network, :string
  end
end
