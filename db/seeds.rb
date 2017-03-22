# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


10.times do
  User.create({
    username: Faker::Internet.user_name,
    password: "password",
    email: Faker::Internet.email
    image: open(Faker::LoremPixel.image("480x480", false, 'people'))
  })
end

User.create({
  username: "demo",
  password: "password",
  email: "demo@demo.com"
  })

# Dir.foreach("app/assets/music/artwork") do |el|
#   next if el !~ /.*\.jpe?g/
#
#   title = el.sub(/\.jpe?g/, "")
#   image = File.open("app/assets/music/artwork/#{el}")
#   music = File.open("app/assets/music/tracks/#{title}.mp3")
#
#   Track.create({
#     title: title,
#     image: image,
#     music: music,
#     artist_id: User.all.sample.id
#   })
# end

# tracks = ["cards", "citylights", "bach", "sunset"]
# track_names = ["The Man in a House of Cards", "City Lights", "Concerto for Two Violins in d minor (Guitar)", "What a Beautiful Sunset!"]
# artist_ids = [User.first.id, User.last.id]

# tracks.each_with_index do |track, i|
#   image = File.open("app/assets/music/artwork/#{track}.jpg")
#   music = File.open("app/assets/music/tracks/#{track}.mp3")
#   Track.create({
#       title: track_names[i],
#       image: image,
#       music: music,
#       artist_id: artist_ids[i % 2]
#     })
# end

# 100.times do
#   shows = [Faker::Friends, Faker::HarryPotter, Faker::StarWars, Faker::GameOfThrones]
#   quote = shows.sample.quote
#   Comment.create({
#     commentable_type: :Track,
#     commentable_id: Track.all.sample.id,
#     text: Faker::TwinPeaks.quote,
#     commenter_id: User.all.sample.id
#     })
# end
#
#
# User.all.each do |user|
#   user.image = open(Faker::LoremPixel.image("480x480", false, 'people'))
#   user.save
# end
