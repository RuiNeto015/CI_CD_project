import os
import sys

def generate_flyway_config(value):
    config_content = """\
flyway.driver=com.mysql.jdbc.Driver
flyway.url=jdbc:mysql://{0}:3306/data_prod
flyway.user=tonysoprano
flyway.password=12345678
flyway.baselineOnMigrate=true
flyway.ignoreMigrationPatterns=*:*
""".format(value)
    return config_content

def execute():
    if not os.path.exists("flyway/conf"):
        os.makedirs("flyway/conf")

    with open(os.path.join("flyway/conf", "flyway.conf"), 'w') as file:
        file.write(generate_flyway_config(sys.argv[1]))

execute()