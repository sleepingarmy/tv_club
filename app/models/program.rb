class Program < ActiveRecord::Base
  validates :title, :network, :genre, presence: true
  has_many :episodes

  
end
