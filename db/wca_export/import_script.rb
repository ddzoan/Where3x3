droptable = "DROP TABLE IF EXISTS"
key = "Competitions"
stopkey = "Scrambles"
write = false;

File.open('newfile.sql', "w") do |ofile|
  File.foreach('WCA_export.sql') do |iline|
    write = true if iline.include?(key) && iline.include?(droptable)
    write = false if iline.include?(stopkey) && iline.include?(droptable)

    ofile.puts(iline) if write
  end
end

# escape single quotes in psql with two single quotes, need to gsub Rubik\'s with Rubik''s
# could maybe even gsub \'s with ''s
# gsub n\'t with n''t
# maybe could just sube every \' with ''
