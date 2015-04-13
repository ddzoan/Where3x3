suffixes = [
    '=100/60000/s/0/',
    '=80/12000/s/0/',
    '=50/30000/s/0/',
    '=50/24000/s/0/',
    '=50/18000/s/0/',
    '=50/3000/s/0/',
    '=40/12000/s/0/',
    '=30/60000/s/0/',
    '=30/30000/s/0/',
    '=30/18000/s/0/',
    '=25/60000/s/0/',
    '=20/9000/s/0/',
    '=10/24000/s/0/',
    '=20///0/',
    '=70///0/',
    '=70//s/0/',
    '=60//s/0/',
    '=50//s/0/',
    '=40//s/0/',
    '=30//s/0/',
    '=//a/0/',
    '=//s/0/',
    '=///0/',
    '=///',
    '=/',
    '='
  ]

text = File.read('newfile.sql')
text.gsub!("\'", "''")
File.open(filepath, "w") {|file| file.puts text}

text = File.read(newfile.sql)
suffixes.each do |suffix|
  text.gsub!(suffix, "")
end
File.open(filepath, "w") {|file| file.puts text}
