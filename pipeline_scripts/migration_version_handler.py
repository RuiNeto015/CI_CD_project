import os
import shutil
import re
import sys


def get_most_recent_version(directory_path):
    files = os.listdir(directory_path)
    version_files = [file for file in files if file.startswith('V') and file.endswith('.sql')]

    if not version_files:
        return None

    sorted_files = sorted(version_files, key=lambda x: int(x[1:x.index('_')]))
    most_recent_version = sorted_files[-1][0:sorted_files[-1].index('_')]

    return most_recent_version

def execute():
    file_version = sys.argv[1]
    schema_version = sys.argv[2]
    type = sys.argv[3] 

    if schema_version == "null":
        schema_version = 1
    else:
        schema_version = int(schema_version)    

    if type == "forward":
        file_version = get_most_recent_version("flyway/migrations")

    print(file_version)
    
    pattern = re.compile(r'' + re.escape(file_version) + '_' + re.escape(type) + '.sql')

    tmp_dir = "flyway/migrations/tmp"
    if not os.path.exists(tmp_dir):
        os.makedirs(tmp_dir)
    else:
        shutil.rmtree(tmp_dir)
        os.makedirs(tmp_dir)

    for filename in os.listdir("flyway/migrations"):
        match = pattern.match(filename)

        if match:
            new_filename = "V{}__{}.sql".format(str(schema_version + 1), type)

            src_path = os.path.join("flyway/migrations", filename)
            dest_path = os.path.join(tmp_dir, new_filename)
            shutil.copy(src_path, dest_path)

execute()