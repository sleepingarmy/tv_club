class Program < ActiveRecord::Base
  validates :title, :network, :genre, presence: true

end
