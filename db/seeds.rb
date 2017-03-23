# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


counter = 0
10.times do
  User.create({
    username: Faker::Internet.user_name,
    password: "password",
    email: Faker::Internet.email,
    image: File.open("app/assets/avatars/#{counter}.jpg")
  })
  counter += 1
end

User.create({
  username: "demo",
  password: "password",
  email: "demo@demo.com",
  image: File.open("app/assets/avatars/10.jpg")
  })

Dir.foreach("app/assets/music/artwork") do |el|
  next if el !~ /.*\.png/

  title = el.sub(/\.png/, "")
  image = File.open("app/assets/music/artwork/#{el}")
  music = File.open("app/assets/music/tracks/#{title}.mp3")

  Track.create({
    title: title,
    image: image,
    music: music,
    artist_id: User.all.sample.id
  })
end

100.times do
  shows = [Faker::Friends, Faker::HarryPotter, Faker::StarWars, Faker::GameOfThrones]
  quote = shows.sample.quote
  Comment.create({
    commentable_type: :Track,
    commentable_id: Track.all.sample.id,
    text: Faker::TwinPeaks.quote,
    commenter_id: User.all.sample.id
    })
end
#
#
# User.all.each do |user|
#   user.get_dominant_colors
#   user.save
# end
#
# Track.all.each do |track|
#   track.get_dominant_colors
#   track.save
# end
