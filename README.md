# Emissary
The Open Source Live Chat Solution written in Node.js.

# Why make this?

Emissary is made from an early live chat prototype written in PHP called CloudChat. CloudChat was made because the live chat built into our billing platform was not functioning correctly at the time. I, Moe Alam, also needed practice. The alternatives were also lacking in desired structure and practice. I also wanted a self-hosted solution. This was a perfect chance to hone understanding of Websocket. Originally the project started in PHP mainly because that was the only server side language I knew at the time. Now that has changed with Node.js in the picture. I have fully modified the code to not use any PHP. This code is completely written in Node.js, EJS.

# How to Install on Ubuntu

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
    
- Install MariaDB (or MySQL)

    ```
    sudo apt install mariadb-server
    ```
    
- Install Node.js

    ```
    sudo apt install nodejs npm
    ```

- Update Node.js and Node Package Manager.

    ```
    sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
    npm install npm -g
    ```
    
- Install the Node.js Process Manager, PM2
    
    ```
    
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
- Install SQL files. You can replace `root` with your SQL login username.

    ```
    mysql -u root -e "source sql/user.sql;source sql/framework.sql" -p
    mysql -u root -e "source sql/framework.sql" -p
    mysql -u root -e "source sql/defaultAccount.sql" -p
    ```
    
- Setup configuration file. Modify it to reflect your SQL login details.

    ```
    cp conf.sample.json conf.json
    ```    

- Start Emissary

    ```
    pm2 start emissary.js
    ```
    
# Links

Website - http://emissary.chat
Community Chat (Discord) - https://discord.gg/kpt3CVp