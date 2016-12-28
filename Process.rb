require 'json'
require 'fileutils'

def create_folder_if_not_exists(path)
	unless File.directory?(path)
	  FileUtils.mkdir_p(path)
	end
end

def get_correct_file_name(path, file_name, counter)
    return nil if counter > 200
	if counter == 0
		full_path = File.join(path, file_name + '.mp4')
		unless File.file?(full_path)     
			return get_correct_file_name(path, file_name, counter + 1)
        else
            return full_path
		end
	else
		full_path = File.join(path, file_name + ' (' + counter.to_s + ').mp4')
		unless File.file?(full_path)
			return fullpath = get_correct_file_name(path, file_name, counter + 1)
        else
            return full_path
		end
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
		src_path = get_correct_file_name(current_path, File.basename(x['FileName'], '.mp4'), 0)
		dst_path = File.join(current_path, x['Module'], sanitize(x['Title']) + '.mp4')
		FileUtils.mv(src_path, dst_path) if src_path
	}	
end
