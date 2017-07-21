# Emissary
The Open Source Live Chat Solution written in Node.js

1. Install Redis
    ```
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get install redis-server
    ```

- Edit Redis conf

    ```
    sudo nano /etc/redis/redis.conf
    ```

- Add lines to the bottom and save.

    ```
    maxmemory 128mb
    maxmemory-policy allkeys-lru
    bind-address 127.0.0.1
    ```
    
- Enable and start

    ```
    sudo systemctl restart redis-server.service
    sudo systemctl enable redis-server.service
    ```
    
- install mysql

    ```
    sudo apt install mariadb-server
    ```
    
- Install node.js

    ```
    sudo apt install nodejs npm
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    npm install npm -g
    npm install pm2 -g
    ```

- Clone Emissary

    ```
    git clone https://github.com/moeiscool/Emissary.git -b dev
    ```
    
- Install libraries

    ```
    npm install
    ```    
- Install SQL files. Replace `root` with your SQL login username.

    ```
    mysql -u root -e "source sql/user.sql"
    ```
    
- Setup configuration file. Modify it to reflect your SQL login details.

    ```
    cp conf.sample.json conf.json
    ```    

- Start Emissary

    ```
    pm2 start emissary.js
    ```