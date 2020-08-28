Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/xenial64"

  # NodeJS With Express Machine 
  config.vm.define "webserver" do |webserver|
    webserver.vm.hostname = "webserver"
    webserver.vm.network "forwarded_port", guest: 3000, host: 3001, host_ip: "127.0.0.1"
    webserver.vm.network "private_network", ip: "192.168.2.11"
    #webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
    webserver.vm.provision "shell", inline: <<-SHELL
      curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
      apt-get update
      apt-get install -y nodejs
      sudo npm install forever -g
      cd /vagrant/vm-1
      npm install
      forever start app.js &
      sleep 5s
    SHELL
  end

  # MongoDB Machine 
  config.vm.define "dbserver" do |dbserver|
    dbserver.vm.hostname = "dbserver"
    dbserver.vm.network "forwarded_port", guest: 27017, host: 27017, host_ip: "127.0.0.1"
    dbserver.vm.network "private_network", ip: "192.168.2.12"
    dbserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
    dbserver.vm.provision "shell", inline: <<-SHELL
      apt-get update
      wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
      echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
      sudo apt-get update
      sudo apt-get install -y mongodb-org
      sudo service mongod start &
      sleep 5s
    SHELL
  end
end
