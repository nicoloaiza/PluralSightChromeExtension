require 'json'
require 'fileutils'

def create_folder_if_not_exists(path)
	unless File.directory?(path)
	  FileUtils.mkdir_p(path)
	end
end

def sanitize(filename)
  bad_chars = [ '/', '\\', '?', '%', '*', ':', '|', '"', '<', '>', '.', ' ' ]
  bad_chars.each do |bad_char|
    filename.gsub!(bad_char, '_')
  end
  filename
end

current_path = Dir.pwd

files = Dir.entries(current_path)
json_files = files.select{ |x| x.include?('.json')}
puts json_files

if json_files.size > 0
	json_file = json_files[0]
	file = File.read(File.join(current_path, json_file))
	json_content = JSON.parse(file)
	modulos = json_content.uniq{|x| x['Module']}.map{|x| x['Module']}

	modulos.each { |x|
		new_current_path = File.join(current_path, x)
		create_folder_if_not_exists(new_current_path)
	}
	json_content.each { |x|
		src_path = File.join(current_path, x['FileName'])
		dst_path = File.join(current_path, x['Module'], x['FileName'])
		FileUtils.mv(src_path, dst_path) if src_path
	}	
end
